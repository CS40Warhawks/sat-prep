import type { Metadata } from "next";
import Link from "next/link";
import { sectionTitles, units } from "@/content/catalog";

export const metadata: Metadata = { title: "Course" };

export default function CoursePage() {
  return (
    <div>
      <h1 className="text-3xl font-bold">The course</h1>
      <p className="mt-2 text-slate-600 dark:text-slate-400">
        Eight units covering every content domain on the digital SAT. New skills are added regularly.
      </p>
      {(["rw", "math"] as const).map((section) => (
        <section key={section} className="mt-10">
          <h2 className="text-2xl font-semibold">{sectionTitles[section]}</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {units
              .filter((u) => u.section === section)
              .map((unit) => (
                <div key={unit.slug} className="rounded-xl border border-slate-200 p-5 dark:border-slate-800">
                  <h3 className="font-semibold">{unit.title}</h3>
                  <ul className="mt-3 space-y-2 text-sm">
                    {unit.skills.map((skill) => (
                      <li key={skill.slug} className="flex items-center justify-between gap-2">
                        {skill.available ? (
                          <Link href={`/course/${skill.slug}`} className="font-medium text-indigo-700 hover:underline dark:text-indigo-400">
                            {skill.title}
                          </Link>
                        ) : (
                          <span className="text-slate-500">{skill.title}</span>
                        )}
                        {!skill.available && <span className="shrink-0 text-xs text-slate-400">Coming soon</span>}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
          </div>
        </section>
      ))}
    </div>
  );
}
