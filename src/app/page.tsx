import Link from "next/link";
import { site } from "@/lib/site";

const features = [
  { title: "Lessons that get to the point", body: "Each skill is one short lesson with the rules that actually get tested." },
  { title: "Every answer explained", body: "See why the right answer works and why each wrong answer doesn't." },
  { title: "Built for the digital test", body: "Organized around the domains on your score report, Reading and Writing plus Math." },
];

export default function Home() {
  return (
    <div>
      <section className="py-10 text-center">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">Raise your SAT score, one skill at a time.</h1>
        <p className="mx-auto mt-4 max-w-xl text-lg text-slate-600 dark:text-slate-400">{site.tagline}</p>
        <div className="mt-8 flex justify-center gap-3">
          <Link href="/course/boundaries" className="btn-primary">
            Try a free lesson
          </Link>
          <Link href="/course" className="btn-secondary">
            See the course
          </Link>
        </div>
      </section>
      <section className="mt-10 grid gap-4 sm:grid-cols-3">
        {features.map((f) => (
          <div key={f.title} className="rounded-xl border border-slate-200 p-5 dark:border-slate-800">
            <h2 className="font-semibold">{f.title}</h2>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">{f.body}</p>
          </div>
        ))}
      </section>
    </div>
  );
}
