"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { sectionTitles } from "@/content/catalog";
import { buildPlan, loadDiagnostic, type DiagnosticResults, type SkillStatus } from "@/lib/diagnostic";
import { DAILY_GOAL, lessonKey, type Progress } from "@/lib/progress";
import type { Section } from "@/lib/types";
import { Eyebrow, Icon, type IconName } from "./ui";
import { useProgress } from "./useProgress";

export interface PathUnit {
  slug: string;
  section: Section;
  title: string;
  skills: {
    slug: string;
    title: string;
    summary: string;
    lessons: { slug: string; title: string; review: boolean }[];
  }[];
}

// Sideways offsets that make the path zig-zag.
const OFFSETS = [0, 40, 60, 40, 0, -40, -60, -40];

type NodeState = "done" | "current" | "locked";

const NODE: Record<NodeState, string> = {
  done: "bg-gold border-gold-dark text-white",
  current: "bg-brand border-brand-dark text-white hover:bg-brand-dark",
  locked: "bg-stone-200 border-stone-300 text-stone-400",
};

function LessonNode({ href, state, title, review, offset }: { href: string; state: NodeState; title: string; review: boolean; offset: number }) {
  const icon: IconName = state === "done" ? "check" : state === "locked" ? "lock" : review ? "trophy" : "star";
  const circle = (
    <span
      className={`flex h-16 w-16 items-center justify-center rounded-full border-b-[5px] transition ${NODE[state]} ${state !== "locked" ? "active:translate-y-0.5 active:border-b-2" : ""}`}
    >
      <Icon name={icon} className="h-7 w-7" />
    </span>
  );
  return (
    <div className="relative flex flex-col items-center" style={{ transform: `translateX(${offset}px)` }}>
      {state === "current" && (
        <span className="animate-bob absolute -top-10 z-10 rounded-lg border border-line bg-white px-2.5 py-1 text-xs font-semibold text-brand-dark shadow-sm">
          Start
        </span>
      )}
      {state === "locked" ? (
        <span aria-label={`${title} (locked)`} title="Finish the lesson before this one to unlock it">
          {circle}
        </span>
      ) : (
        <Link href={href} aria-label={title}>
          {circle}
        </Link>
      )}
      <span className="mt-2 max-w-[9rem] text-center text-xs font-medium text-muted">{title}</span>
    </div>
  );
}

function nodeStates(skill: string, lessons: { slug: string }[], progress: Progress | null): NodeState[] {
  let unlocked = true;
  return lessons.map((l) => {
    const done = !!progress?.lessons[lessonKey(skill, l.slug)];
    const state: NodeState = done ? "done" : unlocked ? "current" : "locked";
    if (!done) unlocked = false;
    return state;
  });
}

const TAG: Partial<Record<SkillStatus, string>> = {
  focus: "bg-wrong-soft text-wrong-dark",
  review: "bg-amber-50 text-gold-dark",
};

function PlanBanner({ results }: { results: DiagnosticResults | null }) {
  if (!results) return null;
  const top = buildPlan(results).filter((p) => p.priority > 0).slice(0, 3);
  const taken = results.rw || results.math;
  if (!taken) {
    return (
      <Link href="/diagnostic" className="group flex items-center justify-between gap-4 rounded-2xl bg-ink p-5 text-white">
        <div>
          <p className="font-semibold">Not sure where to start?</p>
          <p className="mt-0.5 text-sm text-stone-300">Take the diagnostic and get a plan built around your weak spots.</p>
        </div>
        <Icon name="arrow" className="h-5 w-5 shrink-0 transition group-hover:translate-x-1" />
      </Link>
    );
  }
  return (
    <Link href="/plan" className="group flex items-center justify-between gap-4 rounded-2xl border border-line bg-white p-5">
      <div className="min-w-0">
        <Eyebrow>Your focus</Eyebrow>
        <p className="mt-1 truncate font-semibold">{top.length ? top.map((t) => t.skill.title).join(" · ") : "All skills look strong"}</p>
      </div>
      <Icon name="arrow" className="h-5 w-5 shrink-0 text-muted transition group-hover:translate-x-1" />
    </Link>
  );
}

export function LearningPath({ units }: { units: PathUnit[] }) {
  const progress = useProgress();
  const [results, setResults] = useState<DiagnosticResults | null>(null);
  useEffect(() => setResults(loadDiagnostic()), []);
  const [section, setSection] = useState<Section>("rw");
  const playable = (u: PathUnit) => u.skills.some((s) => s.lessons.length > 0);
  // Units with lessons come first, so learners land on something they can start.
  const shown = units.filter((u) => u.section === section).sort((a, b) => Number(playable(b)) - Number(playable(a)));
  const statusOf = (slug: string) => results?.[section]?.skills[slug];
  const todayXp = Math.min(progress?.todayXp ?? 0, DAILY_GOAL);

  return (
    <div className="flex flex-col gap-8 lg:flex-row-reverse">
      <aside className="space-y-4 lg:sticky lg:top-24 lg:w-72 lg:self-start">
        <div className="flex rounded-xl bg-stone-100 p-1" role="tablist">
          {(["rw", "math"] as const).map((s) => (
            <button
              key={s}
              role="tab"
              aria-selected={section === s}
              onClick={() => setSection(s)}
              className={`flex-1 rounded-lg py-2 text-sm font-medium transition ${section === s ? "bg-white text-ink shadow-sm" : "text-muted"}`}
            >
              {sectionTitles[s]}
            </button>
          ))}
        </div>
        <div className="hidden rounded-2xl border border-line bg-white p-4 lg:block">
          <div className="flex items-baseline justify-between">
            <h2 className="font-semibold">Daily goal</h2>
            <span className="text-sm text-muted tabular-nums">
              {todayXp}/{DAILY_GOAL} XP
            </span>
          </div>
          <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-stone-200">
            <div className="h-full rounded-full bg-gold transition-all" style={{ width: `${(todayXp / DAILY_GOAL) * 100}%` }} />
          </div>
          <p className="mt-2 text-sm text-muted">{todayXp >= DAILY_GOAL ? "Goal reached. Nice work today." : "About two lessons a day."}</p>
        </div>
      </aside>

      <div className="flex-1 space-y-10">
        <PlanBanner results={results} />
        {!shown.some(playable) && (
          <p className="rounded-2xl border border-dashed border-stone-300 p-6 text-center text-muted">
            {sectionTitles[section]} lessons are on the way. Your diagnostic and plan already cover {sectionTitles[section]}.
          </p>
        )}
        {shown.map((unit, ui) => (
          <section key={unit.slug}>
            <div className="border-l-4 border-brand pl-4">
              <Eyebrow>Unit {ui + 1}</Eyebrow>
              <h2 className="text-xl font-semibold tracking-tight">{unit.title}</h2>
            </div>

            <div className="mt-6 space-y-10">
              {unit.skills
                .filter((s) => s.lessons.length > 0)
                .map((skill) => {
                  const states = nodeStates(skill.slug, skill.lessons, progress);
                  const st = statusOf(skill.slug);
                  return (
                    <div key={skill.slug}>
                      <div className="flex items-center justify-between gap-3">
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="font-semibold">{skill.title}</h3>
                            {st && TAG[st] && (
                              <span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${TAG[st]}`}>
                                {st === "focus" ? "Focus" : "Review"}
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-muted">{skill.summary}</p>
                        </div>
                        <Link href={`/guide/${skill.slug}`} className="btn-ghost shrink-0 px-3 py-2 text-xs">
                          <Icon name="book" className="h-4 w-4" />
                          Guide
                        </Link>
                      </div>
                      <div className="mt-14 flex flex-col items-center gap-14">
                        {skill.lessons.map((lesson, i) => (
                          <LessonNode
                            key={lesson.slug}
                            href={`/lesson/${skill.slug}/${lesson.slug}`}
                            state={states[i]}
                            title={lesson.title}
                            review={lesson.review}
                            offset={OFFSETS[i % OFFSETS.length]}
                          />
                        ))}
                      </div>
                    </div>
                  );
                })}
              {unit.skills.some((s) => s.lessons.length === 0) && (
                <div className="flex flex-wrap items-center gap-2 text-sm">
                  <span className="flex items-center gap-1 text-stone-400">
                    <Icon name="lock" className="h-4 w-4" />
                    Coming soon
                  </span>
                  {unit.skills
                    .filter((s) => s.lessons.length === 0)
                    .map((s) => {
                      const st = statusOf(s.slug);
                      return (
                        <span
                          key={s.slug}
                          className={`rounded-full px-3 py-1 font-medium ${st && TAG[st] ? TAG[st] : "bg-stone-100 text-muted"}`}
                        >
                          {s.title}
                        </span>
                      );
                    })}
                </div>
              )}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
