"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { ChoiceLetter, Difficulty, Question } from "@/lib/types";
import { BLANK, fillBlank } from "@/lib/passage";
import { recordSession } from "@/lib/progress";

const ORDER: Record<Difficulty, number> = { easy: 0, medium: 1, hard: 2 };

function Passage({ text }: { text: string }) {
  const [before, after] = text.split(BLANK);
  return (
    <p className="text-lg leading-relaxed">
      {before}
      <span className="mx-1 inline-block w-20 border-b-2 border-slate-500 align-baseline" aria-label="blank" />
      {after}
    </p>
  );
}

export function PracticeSession({
  skill,
  skillTitle,
  questions,
}: {
  skill: string;
  skillTitle: string;
  questions: Question[];
}) {
  const ordered = useMemo(
    () => [...questions].sort((a, b) => ORDER[a.difficulty] - ORDER[b.difficulty]),
    [questions],
  );
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<ChoiceLetter | null>(null);
  const [checked, setChecked] = useState(false);
  const [results, setResults] = useState<boolean[]>([]);
  const [best, setBest] = useState<number | null>(null);

  const done = index >= ordered.length;
  const correctCount = results.filter(Boolean).length;

  function check() {
    if (!selected) return;
    setChecked(true);
    setResults((r) => [...r, selected === ordered[index].answer]);
  }

  function next() {
    const isLast = index === ordered.length - 1;
    setChecked(false);
    setSelected(null);
    setIndex((i) => i + 1);
    if (isLast) {
      setBest(recordSession(skill, correctCount, ordered.length).best);
    }
  }

  function restart() {
    setIndex(0);
    setSelected(null);
    setChecked(false);
    setResults([]);
    setBest(null);
  }

  if (done) {
    return (
      <div className="rounded-xl border border-slate-200 p-8 text-center dark:border-slate-700">
        <h2 className="text-2xl font-semibold">Set complete</h2>
        <p className="mt-2 text-4xl font-bold">
          {correctCount} / {ordered.length}
        </p>
        {best !== null && <p className="mt-1 text-slate-500">Your best: {best} / {ordered.length}</p>}
        <ul className="mx-auto mt-6 max-w-xs space-y-1 text-sm">
          {(["easy", "medium", "hard"] as Difficulty[]).map((d) => {
            const idx = ordered.map((q, i) => (q.difficulty === d ? i : -1)).filter((i) => i >= 0);
            const right = idx.filter((i) => results[i]).length;
            return (
              <li key={d} className="flex justify-between capitalize">
                <span>{d}</span>
                <span>
                  {right} / {idx.length}
                </span>
              </li>
            );
          })}
        </ul>
        <div className="mt-8 flex justify-center gap-3">
          <button onClick={restart} className="btn-primary">
            Try again
          </button>
          <Link href={`/course/${skill}`} className="btn-secondary">
            Review the lesson
          </Link>
        </div>
      </div>
    );
  }

  const q = ordered[index];
  const correct = checked && selected === q.answer;

  return (
    <div>
      <div className="mb-4 flex items-center justify-between text-sm text-slate-500">
        <span>
          {skillTitle} · Question {index + 1} of {ordered.length}
        </span>
        <span className="capitalize">{q.difficulty}</span>
      </div>
      <div className="mb-4 h-1.5 w-full rounded bg-slate-200 dark:bg-slate-800">
        <div
          className="h-1.5 rounded bg-indigo-600 transition-all"
          style={{ width: `${(index / ordered.length) * 100}%` }}
        />
      </div>

      <div className="rounded-xl border border-slate-200 p-6 dark:border-slate-700">
        <Passage text={q.passage} />
        <p className="mt-6 font-medium">{q.prompt}</p>

        <fieldset className="mt-4 space-y-2" disabled={checked}>
          <legend className="sr-only">Answer choices</legend>
          {q.choices.map((c) => {
            const isSel = selected === c.letter;
            const isAns = c.letter === q.answer;
            let tone = checked ? "border-slate-300 dark:border-slate-600" : "border-slate-300 hover:border-indigo-400 dark:border-slate-600";
            if (isSel && !checked) tone = "border-indigo-600 ring-2 ring-indigo-200 dark:ring-indigo-900";
            if (checked && isAns) tone = "border-green-600 bg-green-50 dark:bg-green-950";
            if (checked && isSel && !isAns) tone = "border-red-600 bg-red-50 dark:bg-red-950";
            return (
              <div key={c.letter}>
                <button
                  type="button"
                  onClick={() => setSelected(c.letter)}
                  aria-pressed={isSel}
                  className={`flex w-full items-start gap-3 rounded-lg border p-3 text-left ${tone}`}
                >
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-current text-xs font-semibold">
                    {c.letter}
                  </span>
                  <span>{c.text}</span>
                </button>
                {checked && (
                  <p className={`ml-9 mt-1 text-sm ${isAns ? "text-green-700 dark:text-green-400" : "text-slate-600 dark:text-slate-400"}`}>
                    {c.explanation}
                  </p>
                )}
              </div>
            );
          })}
        </fieldset>

        {checked && (
          <p className="mt-4 rounded-lg bg-slate-50 p-3 text-sm dark:bg-slate-900">
            <span className="font-semibold">Correct sentence: </span>
            {fillBlank(q.passage, q.choices.find((c) => c.letter === q.answer)!.text)}
          </p>
        )}

        <div className="mt-6 flex items-center justify-between">
          {checked ? (
            <p className={`font-semibold ${correct ? "text-green-700 dark:text-green-400" : "text-red-700 dark:text-red-400"}`}>
              {correct ? "Correct!" : `Not quite. The answer is ${q.answer}.`}
            </p>
          ) : (
            <span />
          )}
          {checked ? (
            <button onClick={next} className="btn-primary">
              {index === ordered.length - 1 ? "See results" : "Next question"}
            </button>
          ) : (
            <button onClick={check} disabled={!selected} className="btn-primary">
              Check answer
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
