"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { sectionTitles } from "@/content/catalog";
import { loadDiagnostic, type DiagnosticResults } from "@/lib/diagnostic";
import type { Section } from "@/lib/types";
import { Eyebrow, Icon } from "./ui";

const MINUTES: Record<Section, number> = { rw: 15, math: 25 };

export function DiagnosticIntro({ counts }: { counts: Record<Section, number> }) {
  const [results, setResults] = useState<DiagnosticResults>({});
  useEffect(() => setResults(loadDiagnostic()), []);

  return (
    <div className="mx-auto max-w-2xl">
      <Eyebrow>Diagnostic</Eyebrow>
      <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">Find the points you&apos;re leaving on the table.</h1>
      <p className="mt-3 text-lg text-muted">
        One question for every skill the SAT tests, plus a follow-up for anything you miss. You get a plan that starts
        with the skills that show up most often and that you&apos;re closest to fixing.
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {(["rw", "math"] as const).map((s) => {
          const done = results[s];
          return (
            <div key={s} className="flex flex-col rounded-2xl border border-line bg-white p-5">
              <h2 className="text-lg font-semibold">{sectionTitles[s]}</h2>
              <p className="mt-1 text-sm text-muted">
                {counts[s]}–{counts[s] * 2} questions · about {MINUTES[s]} minutes
              </p>
              {done && (
                <p className="mt-3 flex items-center gap-1.5 text-sm text-brand-dark">
                  <Icon name="check" className="h-4 w-4" />
                  Taken {new Date(done.takenAt).toLocaleDateString()}
                </p>
              )}
              <Link href={`/diagnostic/${s}`} className={`${done ? "btn-ghost" : "btn-green"} mt-5`}>
                {done ? "Retake" : "Start"}
              </Link>
            </div>
          );
        })}
      </div>

      {(results.rw || results.math) && (
        <Link href="/plan" className="btn-blue mt-6 w-full">
          See my plan
          <Icon name="arrow" className="h-4 w-4" />
        </Link>
      )}

      <div className="mt-10 space-y-2 text-sm text-muted">
        <p>
          <span className="font-semibold text-ink">Tip:</span> answer honestly. If you&apos;d be guessing, choose
          &ldquo;I don&apos;t know&rdquo;. A lucky guess hides a skill that needs work.
        </p>
        <p>
          The diagnostic follows the official digital SAT skill list and section mix. All questions are original
          practice questions, not real test items.
        </p>
      </div>
    </div>
  );
}
