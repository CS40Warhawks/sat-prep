"use client";

import Link from "next/link";
import { useState } from "react";
import { sectionTitles } from "@/content/catalog";
import { DAILY_GOAL, lessonKey, type Progress } from "@/lib/progress";
import type { Section } from "@/lib/types";
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

const UNIT_COLORS = ["bg-brand", "bg-sky", "bg-[#ce82ff]", "bg-flame"];
// Sideways offsets that make the path zig-zag.
const OFFSETS = [0, 44, 66, 44, 0, -44, -66, -44];

type NodeState = "done" | "current" | "locked";

function LessonNode({
  href,
  state,
  title,
  review,
  offset,
}: {
  href: string;
  state: NodeState;
  title: string;
  review: boolean;
  offset: number;
}) {
  const face =
    state === "done"
      ? "bg-gold border-gold-dark text-white"
      : state === "current"
        ? "bg-brand border-brand-dark text-white"
        : "bg-line border-[#cecece] text-[#afafaf]";
  const icon = state === "done" ? "✓" : review ? "🏆" : state === "locked" ? "🔒" : "★";
  const circle = (
    <span
      className={`flex h-[72px] w-[72px] items-center justify-center rounded-full border-b-[6px] text-3xl font-extrabold transition-transform ${face} ${state !== "locked" ? "hover:brightness-105 active:translate-y-1 active:border-b-2" : ""}`}
    >
      {icon}
    </span>
  );
  return (
    <div className="relative flex flex-col items-center" style={{ transform: `translateX(${offset}px)` }}>
      {state === "current" && (
        <span className="animate-bob absolute -top-11 z-10 whitespace-nowrap rounded-xl border-2 border-line bg-white px-3 py-1.5 text-xs font-extrabold uppercase tracking-wide text-brand shadow-sm">
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
      <span className="mt-1.5 max-w-[9rem] text-center text-xs font-bold text-muted">{title}</span>
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

export function LearningPath({ units }: { units: PathUnit[] }) {
  const progress = useProgress();
  const [section, setSection] = useState<Section>("rw");
  const playable = (u: PathUnit) => u.skills.some((s) => s.lessons.length > 0);
  // Units with lessons come first, so learners land on something they can start.
  const shown = units
    .filter((u) => u.section === section)
    .sort((a, b) => Number(playable(b)) - Number(playable(a)));

  return (
    <div className="flex flex-col gap-8 lg:flex-row-reverse">
      <aside className="space-y-4 lg:sticky lg:top-24 lg:w-72 lg:self-start">
        <div className="flex rounded-2xl border-2 border-line p-1" role="tablist">
          {(["rw", "math"] as const).map((s) => (
            <button
              key={s}
              role="tab"
              aria-selected={section === s}
              onClick={() => setSection(s)}
              className={`flex-1 rounded-xl py-2 text-sm font-extrabold ${section === s ? "bg-sky-soft text-sky" : "text-muted"}`}
            >
              {sectionTitles[s]}
            </button>
          ))}
        </div>
        <div className="hidden rounded-2xl border-2 border-line p-4 lg:block">
          <h2 className="font-extrabold">Daily goal</h2>
          <div className="mt-3 h-4 w-full overflow-hidden rounded-full bg-line">
            <div
              className="h-full rounded-full bg-gold transition-all"
              style={{ width: `${Math.min(100, ((progress?.todayXp ?? 0) / DAILY_GOAL) * 100)}%` }}
            />
          </div>
          <p className="mt-2 text-sm text-muted">
            {(progress?.todayXp ?? 0) >= DAILY_GOAL
              ? "Goal reached. Nice work today!"
              : `${Math.min(progress?.todayXp ?? 0, DAILY_GOAL)} / ${DAILY_GOAL} XP today. That's about two lessons.`}
          </p>
        </div>
      </aside>

      <div className="flex-1 space-y-12">
        {!shown.some(playable) && (
          <p className="rounded-2xl border-2 border-dashed border-line p-6 text-center font-bold text-muted">
            🚧 {sectionTitles[section]} lessons are on the way. Start with Reading &amp; Writing for now.
          </p>
        )}
        {shown.map((unit, ui) => (
            <section key={unit.slug}>
              <div className={`rounded-2xl p-5 text-white ${UNIT_COLORS[ui % UNIT_COLORS.length]}`}>
                <p className="text-xs font-extrabold uppercase tracking-wider opacity-80">Unit {ui + 1}</p>
                <h2 className="text-xl font-extrabold">{unit.title}</h2>
              </div>

              <div className="mt-6 space-y-10">
                {unit.skills.filter((s) => s.lessons.length > 0).map((skill) => {
                  const states = nodeStates(skill.slug, skill.lessons, progress);
                  return (
                    <div key={skill.slug}>
                      <div className="flex items-center justify-between gap-3">
                        <div>
                          <h3 className="font-extrabold">{skill.title}</h3>
                          <p className="text-sm text-muted">{skill.summary}</p>
                        </div>
                        <Link href={`/guide/${skill.slug}`} className="btn-ghost shrink-0 px-3 py-2 text-xs">
                          📖 Guide
                        </Link>
                      </div>
                      <div className="mt-14 flex flex-col items-center gap-16">
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
                    <span className="font-extrabold text-[#afafaf]">🔒 Coming soon:</span>
                    {unit.skills
                      .filter((s) => s.lessons.length === 0)
                      .map((s) => (
                        <span key={s.slug} className="rounded-full bg-gray-100 px-3 py-1 font-bold text-muted">
                          {s.title}
                        </span>
                      ))}
                  </div>
                )}
              </div>
            </section>
          ))}
      </div>
    </div>
  );
}
