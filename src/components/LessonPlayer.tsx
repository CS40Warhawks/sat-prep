"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";
import { fillBlank } from "@/lib/passage";
import type { Item } from "@/content/wardrobe";
import { newlyUnlocked } from "@/lib/avatar";
import { finishLesson } from "@/lib/progress";
import type { ChoiceLetter, Lesson, Question } from "@/lib/types";
import { ItemPreview } from "./Avatar";
import { Choices, Eyebrow, Icon, Passage, ProgressBar } from "./ui";
import { useAvatar } from "./useAvatar";

const PRAISE = ["Nice work", "Correct", "You got it", "Exactly right", "Well done"];
const REVIEW_SIZE = 8;

function shuffle<T>(items: T[]): T[] {
  const a = [...items];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
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
  const [rewards, setRewards] = useState<Item[]>([]);
  const { state: avatar } = useAvatar();

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
      const done = finishLesson(skill, lesson.slug, correctFirst, total);
      setResult(done);
      setRewards(newlyUnlocked(done.before, done.progress));
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
        <div className="animate-pop flex h-20 w-20 items-center justify-center rounded-full bg-gold text-white">
          <Icon name={accuracy === 100 ? "trophy" : "check"} className="h-10 w-10" />
        </div>
        <h1 className="mt-6 text-3xl font-semibold tracking-tight">
          {accuracy === 100 ? "Perfect lesson" : "Lesson complete"}
        </h1>
        <div className="mt-8 grid w-full grid-cols-3 gap-3">
          {[
            { label: "XP earned", value: `+${result.xp}`, icon: "bolt" as const, color: "text-gold" },
            { label: "Accuracy", value: `${accuracy}%`, icon: "target" as const, color: "text-brand" },
            { label: "Day streak", value: `${result.progress.streak}`, icon: "flame" as const, color: "text-flame" },
          ].map((s, i) => (
            <div
              key={s.label}
              className="animate-pop rounded-2xl border border-line bg-white px-2 py-4"
              style={{ animationDelay: `${0.12 * (i + 1)}s` }}
            >
              <Icon name={s.icon} className={`mx-auto h-5 w-5 ${s.color}`} />
              <p className="mt-2 text-2xl font-semibold tabular-nums">{s.value}</p>
              <p className="text-xs text-muted">{s.label}</p>
            </div>
          ))}
        </div>
        {rewards.length > 0 && avatar && (
          <div className="animate-pop mt-6 w-full rounded-2xl border border-gold/40 bg-amber-50 p-4 text-left" style={{ animationDelay: "0.5s" }}>
            <p className="flex items-center gap-2 text-sm font-semibold text-gold-dark">
              <Icon name="gift" className="h-4 w-4" />
              {rewards.length === 1 ? "New for your avatar" : `${rewards.length} new items for your avatar`}
            </p>
            <div className="mt-3 flex flex-wrap gap-4">
              {rewards.map((it) => (
                <div key={it.id} className="flex items-center gap-2">
                  <ItemPreview look={avatar.look} item={it} size={48} />
                  <span className="text-sm font-medium">{it.name}</span>
                </div>
              ))}
            </div>
            <Link href={`/avatar?item=${rewards[0].id}`} className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-sky hover:underline">
              Try it on
              <Icon name="arrow" className="h-4 w-4" />
            </Link>
          </div>
        )}
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
        <Link href="/learn" aria-label="Quit lesson" className="text-stone-400 hover:text-ink">
          <Icon name="close" className="h-6 w-6" />
        </Link>
        <ProgressBar value={done / steps} />
        {combo >= 3 && (
          <span className="animate-pop flex items-center gap-1 text-sm font-semibold text-flame">
            <Icon name="flame" className="h-4 w-4" />
            {combo}
          </span>
        )}
      </div>

      <div className="flex-1 pb-48">
        {phase.kind === "tip" && (
          <div key={phase.index} className="animate-pop">
            <Eyebrow className="text-sky">
              Quick tip {phase.index + 1} of {tipCount}
            </Eyebrow>
            <h1 className="mt-2 text-2xl font-semibold tracking-tight">{lesson.tips[phase.index].title}</h1>
            <p className="mt-4 text-lg leading-relaxed">{lesson.tips[phase.index].body}</p>
            {lesson.tips[phase.index].example && (
              <div className="mt-6 space-y-2 rounded-2xl border border-line bg-white p-4">
                {lesson.tips[phase.index].example!.wrong && (
                  <p className="rounded-xl bg-wrong-soft px-3 py-2 text-wrong-dark">
                    <span className="font-semibold">✗ </span>
                    {lesson.tips[phase.index].example!.wrong}
                  </p>
                )}
                <p className="rounded-xl bg-brand-soft px-3 py-2 text-brand-dark">
                  <span className="font-semibold">✓ </span>
                  {lesson.tips[phase.index].example!.right}
                </p>
              </div>
            )}
          </div>
        )}

        {phase.kind === "question" && current && (
          <div key={current.id + (firstTry[current.id] === false ? "-retry" : "")}>
            <Eyebrow className="mb-3 text-sky">
              {firstTry[current.id] === false && !checked ? "Try this one again" : "Fill in the blank"}
            </Eyebrow>
            <Passage text={current.passage} />
            <p className="mt-5 font-medium">{current.prompt}</p>
            <div className="mt-4">
              <Choices question={current} selected={selected} onSelect={setSelected} reveal={checked} />
            </div>
          </div>
        )}
      </div>

      {/* Bottom action bar */}
      <div
        className={`fixed inset-x-0 bottom-0 border-t ${
          !checked ? "border-line bg-paper" : isCorrect ? "animate-slide-up border-transparent bg-brand-soft" : "animate-slide-up border-transparent bg-wrong-soft"
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
                <p className="text-xl font-semibold">{isCorrect ? praise : "Not quite"}</p>
                {isCorrect ? (
                  <p className="mt-1 text-sm">{answer!.explanation.replace(/^Correct\.\s*/, "")}</p>
                ) : (
                  <>
                    <p className="mt-1 text-sm">
                      <span className="font-semibold">Why: </span>
                      {current.choices.find((c) => c.letter === selected)!.explanation}
                    </p>
                    <p className="mt-2 text-sm">
                      <span className="font-semibold">Correct sentence: </span>
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
