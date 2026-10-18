import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { findSkill, sectionTitles } from "@/content/catalog";
import { skillContent } from "@/content/registry";

type Params = Promise<{ skill: string }>;

export function generateStaticParams() {
  return Object.keys(skillContent).map((skill) => ({ skill }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const found = findSkill((await params).skill);
  return found ? { title: `${found.skill.title} guidebook`, description: found.skill.summary } : {};
}

export default async function GuidePage({ params }: { params: Params }) {
  const { skill: slug } = await params;
  const found = findSkill(slug);
  const content = skillContent[slug];
  if (!found || !content) notFound();
  const { unit, skill } = found;
  const { Guidebook, lessons } = content;

  return (
    <div className="mx-auto max-w-2xl">
      <p className="text-xs font-semibold tracking-widest text-muted uppercase">
        Guidebook · {sectionTitles[unit.section]} · {unit.title}
      </p>
      <h1 className="mt-1 text-3xl font-semibold tracking-tight">{skill.title}</h1>
      <p className="mt-2 text-muted">Everything in this skill on one page. Use it to review before or after the lessons.</p>
      <div className="mt-8">
        <Guidebook />
      </div>
      <div className="mt-12 rounded-2xl border border-line bg-white p-6 text-center">
        <h2 className="text-lg font-semibold">Ready to practice?</h2>
        <p className="mt-1 text-sm">{lessons.length} short lessons on the path.</p>
        <Link href="/learn" className="btn-green mt-4">
          Go to the path
        </Link>
      </div>
    </div>
  );
}
