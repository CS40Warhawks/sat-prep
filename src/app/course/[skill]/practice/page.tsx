import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PracticeSession } from "@/components/PracticeSession";
import { findSkill } from "@/content/catalog";
import { skillContent } from "@/content/registry";

type Params = Promise<{ skill: string }>;

export function generateStaticParams() {
  return Object.keys(skillContent).map((skill) => ({ skill }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const found = findSkill((await params).skill);
  return found ? { title: `${found.skill.title} practice` } : {};
}

export default async function PracticePage({ params }: { params: Params }) {
  const { skill: slug } = await params;
  const found = findSkill(slug);
  const content = skillContent[slug];
  if (!found || !content) notFound();

  return <PracticeSession skill={slug} skillTitle={found.skill.title} questions={content.questions} />;
}
