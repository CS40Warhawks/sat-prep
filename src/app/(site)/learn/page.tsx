import type { Metadata } from "next";
import { LearningPath, type PathUnit } from "@/components/LearningPath";
import { units } from "@/content/catalog";
import { skillContent } from "@/content/registry";

export const metadata: Metadata = { title: "Learn" };

export default function LearnPage() {
  const pathUnits: PathUnit[] = units.map((u) => ({
    slug: u.slug,
    section: u.section,
    title: u.title,
    skills: u.skills.map((s) => ({
      slug: s.slug,
      title: s.title,
      summary: s.summary,
      lessons: s.available
        ? skillContent[s.slug].lessons.map((l) => ({ slug: l.slug, title: l.title, review: !!l.review }))
        : [],
    })),
  }));
  return <LearningPath units={pathUnits} />;
}
