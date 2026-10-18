"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";
import { BLANK, fillBlank } from "@/lib/passage";
import { finishLesson } from "@/lib/progress";
import type { ChoiceLetter, Lesson, Question } from "@/lib/types";

const PRAISE = ["Nice!", "Great job!", "Correct!", "You got it!", "Excellent!"];
const REVIEW_SIZE = 8;

function shuffle<T>(items: T[]): T[] {
  const a = [...items];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function Passage({ text }: { text: string }) {
  const [before, after] = text.split(BLANK);
  return (
    <p className="text-lg leading-relaxed">
      {before}
      <span className="mx-1 inline-block w-16 border-b-[3px] border-ink/50 align-baseline" aria-label="blank" />
      {after}
    </p>
  );
}

function ProgressBar({ value }: { value: number }) {
  return (
    <div className="h-4 flex-1 overflow-hidden rounded-full bg-line" role="progressbar" aria-valuenow={Math.round(value * 100)} aria-valuemin={0} aria-valuemax={100}>
      <div className="relative h-full rounded-full bg-brand transition-all duration-500" style={{ width: `${Math.max(value * 100, 3)}%` }}>
        <div className="absolute inset-x-2 top-1 h-1 rounded-full bg-white/30" />
      </div>
    </div>
  );
}

type Phase = { kind: "tip"; index: number } | { kind: "question" } | { kind: "done" };

export function LessonPlayer({
  skill,
  lesson,
  questions,
}: {
  skill: string;
  lesson: Lesson;
  questions: Question[];
}) {
  // Review lessons pick a random mix, so build the queue after mount to keep hydration stable.
  const [queue, setQueue] = useState<Question[] | null>(null);
  useEffect(() => {
    setQueue(
      lesson.review
        ? shuffle(questions).slice(0, REVIEW_SIZE)
        : lesson.questionIds.map((id) => questions.find((q) => q.id === id)!),
    );
  }, [lesson, questions]);

  const total = useMemo(() => (lesson.review ? Math.min(REVIEW_SIZE, questions.length) : lesson.questionIds.length), [lesson, questions]);
  const [phase, setPhase] = useState<Phase>(lesson.tips.length ? { kind: "tip", index: 0 } : { kind: "question" });
  const [selected, setSelected] = useState<ChoiceLetter | null>(null);
  const [checked, setChecked] = useState(false);
  const [mastered, setMastered] = useState(0);
  const [firstTry, setFirstTry] = useState<Record<string, boolean>>({});
  const [combo, setCombo] = useState(0);
  const [result, setResult] = useState<ReturnType<typeof finishLesson> | null>(null);
  const [praise, setPraise] = useState(PRAISE[0]);

  const current = queue?.[0];
  const isCorrect = checked && current && selected === current.answer;
  const answer = current?.choices.find((c) => c.letter === current.answer);

  const check = useCallback(() => {
    if (!current || !selected || checked) return;
    const right = selected === current.answer;
    setChecked(true);
    setPraise(PRAISE[Math.floor(Math.random() * PRAISE.length)]);
    setFirstTry((m) => (current.id in m ? m : { ...m, [current.id]: right }));
    setCombo((c) => (right ? c + 1 : 0));
    if (right) setMastered((n) => n + 1);
  }, [current, selected, checked]);

  const advance = useCallback(() => {
    if (!queue || !current) return;
    // A missed question comes back at the end, like a flashcard.
    const rest = isCorrect ? queue.slice(1) : [...queue.slice(1), current];
    setQueue(rest);
    setSelected(null);
    setChecked(false);
    if (rest.length === 0) {
      const correctFirst = Object.values(firstTry).filter(Boolean).length;
      setResult(finishLesson(skill, lesson.slug, correctFirst, total));
      setPhase({ kind: "done" });
    }
  }, [queue, current, isCorrect, firstTry, skill, lesson.slug, total]);

  const nextTip = useCallback(() => {
    if (phase.kind !== "tip") return;
    setPhase(phase.index + 1 < lesson.tips.length ? { kind: "tip", index: phase.index + 1 } : { kind: "question" });
  }, [phase, lesson.tips.length]);

  // Keyboard: 1–4 pick a choice, Enter checks or continues.
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (phase.kind === "tip" && e.key === "Enter") nextTip();
      if (phase.kind !== "question" || !current) return;
      const n = Number(e.key);
      if (!checked && n >= 1 && n <= current.choices.length) setSelected(current.choices[n - 1].letter);
      if (e.key === "Enter") (checked ? advance : check)();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [phase, current, checked, advance, check, nextTip]);

  const tipCount = lesson.tips.length;
  const steps = tipCount + total;
  const done = phase.kind === "tip" ? phase.index : tipCount + mastered;

  if (phase.kind === "done" && result) {
    const correctFirst = Object.values(firstTry).filter(Boolean).length;
    const accuracy = Math.round((correctFirst / total) * 100);
    return (
      <div className="mx-auto flex min-h-screen max-w-md flex-col items-center justify-center px-6 text-center">
        <div className="animate-pop text-8xl" aria-hidden>
          {accuracy === 100 ? "🏆" : "🎉"}
        </div>
        <h1 className="mt-6 text-3xl font-extrabold text-gold-dark">
          {accuracy === 100 ? "Perfect lesson!" : "Lesson complete!"}
        </h1>
        <div className="mt-8 grid w-full grid-cols-3 gap-3">
          {[
            { label: "Total XP", value: `⚡ ${result.xp}`, color: "border-gold bg-gold" },
            { label: "Accuracy", value: `🎯 ${accuracy}%`, color: "border-brand bg-brand" },
            { label: "Streak", value: `🔥 ${result.progress.streak}`, color: "border-flame bg-flame" },
          ].map((s, i) => (
            <div key={s.label} className={`animate-pop overflow-hidden rounded-2xl border-2 ${s.color}`} style={{ animationDelay: `${0.15 * (i + 1)}s` }}>
              <p className="py-1 text-xs font-extrabold uppercase text-white">{s.label}</p>
              <p className="rounded-xl bg-white py-3 text-lg font-extrabold">{s.value}</p>
            </div>
          ))}
        </div>
        <p className="mt-8 text-muted">
          {result.extendedStreak
            ? "Your streak grew today. Small steps, real points."
            : "Every question you lock in is a point you keep on test day."}
        </p>
        <Link href="/learn" className="btn-green mt-10 w-full">
          Continue
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto flex min-h-screen max-w-2xl flex-col px-4">
      <div className="flex items-center gap-4 py-6">
        <Link href="/learn" aria-label="Quit lesson" className="text-2xl font-bold text-[#afafaf] hover:text-muted">
          ✕
        </Link>
        <ProgressBar value={done / steps} />
        {combo >= 3 && <span className="animate-pop text-sm font-extrabold text-flame">🔥 {combo}</span>}
      </div>

      <div className="flex-1 pb-48">
        {phase.kind === "tip" && (
          <div key={phase.index} className="animate-pop">
            <p className="text-sm font-extrabold uppercase tracking-wide text-sky">
              💡 Quick tip {phase.index + 1} of {tipCount}
            </p>
            <h1 className="mt-2 text-2xl font-extrabold">{lesson.tips[phase.index].title}</h1>
            <p className="mt-4 text-lg leading-relaxed">{lesson.tips[phase.index].body}</p>
            {lesson.tips[phase.index].example && (
              <div className="mt-6 space-y-2 rounded-2xl border-2 border-line p-4">
                {lesson.tips[phase.index].example!.wrong && (
                  <p className="rounded-xl bg-wrong-soft px-3 py-2 text-wrong-dark">
                    <span className="font-extrabold">✗ </span>
                    {lesson.tips[phase.index].example!.wrong}
                  </p>
                )}
                <p className="rounded-xl bg-brand-soft px-3 py-2 text-brand-dark">
                  <span className="font-extrabold">✓ </span>
                  {lesson.tips[phase.index].example!.right}
                </p>
              </div>
            )}
          </div>
        )}

        {phase.kind === "question" && current && (
          <div key={current.id + (firstTry[current.id] === false ? "-retry" : "")}>
            <p className="text-sm font-extrabold uppercase tracking-wide text-sky">
              {firstTry[current.id] === false && !checked ? "🔁 Let's try this one again" : "Fill in the blank"}
            </p>
            <div className="mt-3 rounded-2xl border-2 border-line p-5">
              <Passage text={current.passage} />
            </div>
            <p className="mt-5 font-bold">{current.prompt}</p>
            <div className="mt-4 grid gap-3">
              {current.choices.map((c, i) => {
                const isSel = selected === c.letter;
                const isAns = c.letter === current.answer;
                let tone = "border-line hover:bg-gray-50";
                if (isSel && !checked) tone = "border-sky bg-sky-soft text-sky-dark";
                if (checked && isAns) tone = "border-brand bg-brand-soft text-brand-dark";
                if (checked && isSel && !isAns) tone = "border-wrong bg-wrong-soft text-wrong-dark";
                return (
                  <button
                    key={c.letter}
                    type="button"
                    disabled={checked}
                    onClick={() => setSelected(c.letter)}
                    aria-pressed={isSel}
                    className={`flex items-center gap-3 rounded-2xl border-2 border-b-4 p-4 text-left text-base font-semibold transition-colors ${tone}`}
                  >
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border-2 border-current text-xs font-extrabold opacity-70">
                      {i + 1}
                    </span>
                    {c.text}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Bottom action bar */}
      <div
        className={`fixed inset-x-0 bottom-0 border-t-2 ${
          !checked ? "border-line bg-white" : isCorrect ? "animate-slide-up border-transparent bg-brand-soft" : "animate-slide-up border-transparent bg-wrong-soft"
        }`}
      >
        <div className="mx-auto flex max-w-2xl flex-col gap-4 px-4 py-5 sm:flex-row sm:items-end sm:justify-between">
          {phase.kind === "tip" && (
            <button onClick={nextTip} className="btn-green w-full sm:ml-auto sm:w-40">
              Continue
            </button>
          )}
          {phase.kind === "question" && current && !checked && (
            <button onClick={check} disabled={!selected} className={`${selected ? "btn-green" : "btn-off"} w-full sm:ml-auto sm:w-40`}>
              Check
            </button>
          )}
          {phase.kind === "question" && current && checked && (
            <>
              <div className={isCorrect ? "text-brand-dark" : "text-wrong-dark"}>
                <p className="text-2xl font-extrabold">{isCorrect ? `✓ ${praise}` : "✗ Not quite"}</p>
                {isCorrect ? (
                  <p className="mt-1 text-sm">{answer!.explanation.replace(/^Correct\.\s*/, "")}</p>
                ) : (
                  <>
                    <p className="mt-1 text-sm">
                      <span className="font-extrabold">Why: </span>
                      {current.choices.find((c) => c.letter === selected)!.explanation}
                    </p>
                    <p className="mt-2 text-sm">
                      <span className="font-extrabold">Correct sentence: </span>
                      {fillBlank(current.passage, answer!.text)}
                    </p>
                  </>
                )}
              </div>
              <button onClick={advance} className={`${isCorrect ? "btn-green" : "btn-red"} w-full shrink-0 sm:w-40`}>
                Continue
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
