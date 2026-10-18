"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { sectionTitles, units } from "@/content/catalog";
import { diagnosticQuestions } from "@/content/diagnostic";
import { officialResources } from "@/content/resources";
import { buildPlan, loadDiagnostic, type DiagnosticResults, type PlanItem, type SkillStatus } from "@/lib/diagnostic";
import type { Section } from "@/lib/types";
import { Eyebrow, Icon } from "./ui";

const STATUS: Record<SkillStatus, { label: string; chip: string; dot: string }> = {
  focus: { label: "Focus", chip: "bg-wrong-soft text-wrong-dark", dot: "bg-wrong" },
  review: { label: "Review", chip: "bg-amber-50 text-gold-dark", dot: "bg-gold" },
  strong: { label: "Strong", chip: "bg-brand-soft text-brand-dark", dot: "bg-brand" },
};

const START_COUNT = 3;
const NEXT_COUNT = 5;

function NextList({ items }: { items: PlanItem[] }) {
  return (
    <ul className="mt-4 divide-y divide-line rounded-2xl border border-line bg-white">
      {items.map((item) => (
        <li key={item.skill.slug} className="flex items-center justify-between gap-3 px-5 py-3">
          <div className="min-w-0">
            <p className="truncate font-medium">{item.skill.title}</p>
            <p className="text-xs text-muted">{about(item.perTest)} per test</p>
          </div>
          <span className={`shrink-0 rounded-full px-2 py-0.5 text-xs font-semibold ${STATUS[item.status].chip}`}>
            {STATUS[item.status].label}
          </span>
        </li>
      ))}
    </ul>
  );
}

function about(n: number) {
  return n < 1 ? "about 1 question" : `about ${Math.round(n)} questions`;
}

function FocusCard({ item, rank, hasLesson }: { item: PlanItem; rank: number; hasLesson: boolean }) {
  const s = STATUS[item.status];
  return (
    <div className="rounded-2xl border border-line bg-white p-5">
      <div className="flex items-start gap-4">
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-ink text-sm font-semibold text-white">
          {rank}
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="font-semibold">{item.skill.title}</h3>
            <span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${s.chip}`}>{s.label}</span>
          </div>
          <p className="mt-0.5 text-sm text-muted">
            {sectionTitles[item.unit.section]} · {item.unit.title} · {about(item.perTest)} per test
          </p>
          <ul className="mt-4 space-y-2 text-sm">
            <li>
              {hasLesson ? (
                <Link href="/learn" className="flex items-center gap-2 font-medium text-sky hover:underline">
                  <Icon name="star" className="h-4 w-4" />
                  Do the {item.skill.title} lessons here
                </Link>
              ) : (
                <span className="flex items-center gap-2 text-muted">
                  <Icon name="star" className="h-4 w-4" />
                  Lessons for this skill are coming soon
                </span>
              )}
            </li>
            <li>
              <a href={officialResources.khan.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 font-medium text-sky hover:underline">
                <Icon name="book" className="h-4 w-4" />
                Learn it: {officialResources.khan.name}, {item.unit.title} → {item.skill.title}
              </a>
            </li>
            <li>
              <a href={officialResources.questionBank.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 font-medium text-sky hover:underline">
                <Icon name="target" className="h-4 w-4" />
                Drill it: Question Bank, filter by &ldquo;{item.skill.title}&rdquo;, start with Easy
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export function PlanView({ lessonSkills }: { lessonSkills: string[] }) {
  const [results, setResults] = useState<DiagnosticResults | null>(null);
  const just = useSearchParams().get("just");
  useEffect(() => setResults(loadDiagnostic()), []);
  if (!results) return null;

  const taken = (["rw", "math"] as Section[]).filter((s) => results[s]);
  if (taken.length === 0) {
    return (
      <div className="mx-auto max-w-xl py-10 text-center">
        <h1 className="text-3xl font-semibold tracking-tight">No plan yet</h1>
        <p className="mt-3 text-muted">Take the diagnostic first. It finds the skills worth your time and builds the plan from there.</p>
        <Link href="/diagnostic" className="btn-green mt-8">
          Take the diagnostic
        </Link>
      </div>
    );
  }

  const plan = buildPlan(results);
  const needsWork = plan.filter((p) => p.priority > 0);
  const start = needsWork.slice(0, START_COUNT);
  const next = needsWork.slice(START_COUNT);
  const strong = plan.filter((p) => p.status === "strong");
  const startQuestions = start.reduce((n, p) => n + p.perTest, 0);
  const missing = (["rw", "math"] as Section[]).filter((s) => !results[s]);
  const missed = taken.flatMap((s) => results[s]!.missed);
  const missedQuestions = diagnosticQuestions.filter((q) => missed.includes(q.id));

  return (
    <div className="mx-auto max-w-2xl space-y-10">
      <header>
        <Eyebrow>{just ? "Diagnostic complete" : "Your plan"}</Eyebrow>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
          {needsWork.length === 0 ? "Nothing to fix. Nice." : "Here's where your next points are."}
        </h1>
        {start.length > 0 && (
          <p className="mt-3 text-lg text-muted">
            Your top {start.length === 1 ? "skill shows" : `${start.length} skills show`} up in {about(startQuestions)} on
            every SAT. Small, steady wins here count more than cramming everything at once.
          </p>
        )}
      </header>

      {/* Skill map */}
      <section className="rounded-2xl border border-line bg-white p-5">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h2 className="font-semibold">Skill map</h2>
          <div className="flex gap-3 text-xs text-muted">
            {(Object.keys(STATUS) as SkillStatus[]).map((k) => (
              <span key={k} className="flex items-center gap-1.5">
                <span className={`h-2.5 w-2.5 rounded-full ${STATUS[k].dot}`} />
                {STATUS[k].label}
              </span>
            ))}
          </div>
        </div>
        <div className="mt-4 space-y-3">
          {units
            .filter((u) => results[u.section])
            .map((u) => (
              <div key={u.slug} className="flex items-center gap-3">
                <span className="w-40 shrink-0 truncate text-sm text-muted sm:w-56">{u.title}</span>
                <div className="flex flex-1 gap-1">
                  {u.skills.map((sk) => {
                    const st = results[u.section]!.skills[sk.slug];
                    return (
                      <span
                        key={sk.slug}
                        title={`${sk.title}: ${st ? STATUS[st].label : "not tested"}`}
                        className={`h-3 flex-1 rounded-full ${st ? STATUS[st].dot : "bg-stone-200"}`}
                      />
                    );
                  })}
                </div>
              </div>
            ))}
        </div>
      </section>

      {start.length > 0 && (
        <section>
          <h2 className="text-xl font-semibold tracking-tight">Start here</h2>
          <p className="mt-1 text-sm text-muted">Ranked by how often the skill is tested and how much work it needs.</p>
          <div className="mt-4 space-y-3">
            {start.map((item, i) => (
              <FocusCard key={item.skill.slug} item={item} rank={i + 1} hasLesson={lessonSkills.includes(item.skill.slug)} />
            ))}
          </div>
        </section>
      )}

      {next.length > 0 && (
        <section>
          <h2 className="text-xl font-semibold tracking-tight">Up next</h2>
          <NextList items={next.slice(0, NEXT_COUNT)} />
          {next.length > NEXT_COUNT && (
            <details className="mt-3">
              <summary className="cursor-pointer text-sm font-medium text-muted hover:text-ink">
                Show {next.length - NEXT_COUNT} more
              </summary>
              <div className="mt-3">
                <NextList items={next.slice(NEXT_COUNT)} />
              </div>
            </details>
          )}
        </section>
      )}

      {strong.length > 0 && (
        <section>
          <h2 className="text-xl font-semibold tracking-tight">Already strong</h2>
          <div className="mt-3 flex flex-wrap gap-2">
            {strong.map((item) => (
              <span key={item.skill.slug} className="rounded-full bg-brand-soft px-3 py-1 text-sm font-medium text-brand-dark">
                {item.skill.title}
              </span>
            ))}
          </div>
          <p className="mt-2 text-xs text-muted">Based on one question each, so keep them warm with the occasional review.</p>
        </section>
      )}

      <section className="rounded-2xl bg-sky-soft p-5">
        <h2 className="font-semibold">Check your progress</h2>
        <p className="mt-1 text-sm">
          Once you&apos;ve worked through your top skills, take a full-length{" "}
          <a href={officialResources.bluebook.url} target="_blank" rel="noopener noreferrer" className="font-medium text-sky underline">
            Bluebook practice test
          </a>{" "}
          (Practice Tests 4–11 are free) and review it in{" "}
          <a href={officialResources.myPractice.url} target="_blank" rel="noopener noreferrer" className="font-medium text-sky underline">
            My Practice
          </a>
          . Then retake this diagnostic to refresh your plan.
        </p>
      </section>

      {missing.length > 0 && (
        <Link href={`/diagnostic/${missing[0]}`} className="btn-ghost w-full">
          Add {sectionTitles[missing[0]]} to your plan
          <Icon name="arrow" className="h-4 w-4" />
        </Link>
      )}

      {missedQuestions.length > 0 && (
        <details className="rounded-2xl border border-line bg-white p-5">
          <summary className="cursor-pointer font-semibold">Review the {missedQuestions.length} questions you missed</summary>
          <ol className="mt-4 space-y-5 text-sm">
            {missedQuestions.map((q) => {
              const ans = q.choices.find((c) => c.letter === q.answer)!;
              return (
                <li key={q.id} className="border-t border-line pt-4">
                  {q.passage && <p className="text-muted">{q.passage}</p>}
                  <p className="mt-1 font-medium">{q.prompt}</p>
                  <p className="mt-2 text-brand-dark">
                    <span className="font-semibold">Answer: </span>
                    {ans.text}. {ans.explanation.replace(/^Correct\.\s*/, "")}
                  </p>
                </li>
              );
            })}
          </ol>
        </details>
      )}

      <div className="flex justify-center">
        <Link href="/diagnostic" className="text-sm text-muted hover:text-ink">
          Retake the diagnostic
        </Link>
      </div>
    </div>
  );
}
