import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LessonPlayer } from "@/components/LessonPlayer";
import { findSkill } from "@/content/catalog";
import { skillContent } from "@/content/registry";

type Params = Promise<{ skill: string; lesson: string }>;

export function generateStaticParams() {
  return Object.entries(skillContent).flatMap(([skill, c]) => c.lessons.map((l) => ({ skill, lesson: l.slug })));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { skill, lesson } = await params;
  const found = findSkill(skill);
  const l = skillContent[skill]?.lessons.find((x) => x.slug === lesson);
  return found && l ? { title: `${l.title} · ${found.skill.title}` } : {};
}

export default async function LessonPage({ params }: { params: Params }) {
  const { skill, lesson: slug } = await params;
  const content = skillContent[skill];
  const lesson = content?.lessons.find((l) => l.slug === slug);
  if (!content || !lesson) notFound();
  return <LessonPlayer skill={skill} lesson={lesson} questions={content.questions} />;
}
