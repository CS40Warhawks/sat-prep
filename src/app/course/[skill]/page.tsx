import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { findSkill, sectionTitles } from "@/content/catalog";
import { skillContent } from "@/content/registry";

type Params = Promise<{ skill: string }>;

export function generateStaticParams() {
  return Object.keys(skillContent).map((skill) => ({ skill }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const found = findSkill((await params).skill);
  return found ? { title: `${found.skill.title} lesson`, description: found.skill.summary } : {};
}

export default async function LessonPage({ params }: { params: Params }) {
  const { skill: slug } = await params;
  const found = findSkill(slug);
  const content = skillContent[slug];
  if (!found || !content) notFound();
  const { unit, skill } = found;
  const { Lesson, questions } = content;

  return (
    <div>
      <p className="text-sm text-slate-500">
        {sectionTitles[unit.section]} · {unit.title}
      </p>
      <h1 className="mt-1 text-3xl font-bold">{skill.title}</h1>
      <p className="mt-2 text-slate-600 dark:text-slate-400">{skill.summary}</p>
      <div className="mt-8">
        <Lesson />
      </div>
      <div className="mt-12 rounded-xl bg-indigo-50 p-6 dark:bg-indigo-950">
        <h2 className="text-lg font-semibold">Ready to practice?</h2>
        <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
          {questions.length} questions from easy to hard, with an explanation for every choice.
        </p>
        <Link href={`/course/${slug}/practice`} className="btn-primary mt-4">
          Start practice
        </Link>
      </div>
    </div>
  );
}
