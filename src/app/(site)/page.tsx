import Link from "next/link";
import { Icon, type IconName } from "@/components/ui";

const steps: { icon: IconName; title: string; body: string }[] = [
  { icon: "target", title: "Find your gaps", body: "A short diagnostic covers every skill on the digital SAT and shows which ones are costing you points." },
  { icon: "star", title: "Fix one skill at a time", body: "Five-minute lessons: a few tips, five questions, instant feedback. Missed questions come back until they stick." },
  { icon: "flame", title: "Keep the habit", body: "A daily goal and a streak keep you moving. Small, steady wins add up by test day." },
];

export default function Home() {
  return (
    <div>
      <section className="py-12 sm:py-20">
        <p className="inline-flex items-center gap-2 rounded-full border border-line bg-white px-3 py-1 text-xs font-medium text-muted">
          <span className="h-1.5 w-1.5 rounded-full bg-brand" aria-hidden />
          Digital SAT · Reading &amp; Writing and Math
        </p>
        <h1 className="mt-6 max-w-2xl text-4xl font-semibold tracking-tight sm:text-6xl">
          A few minutes a day.
          <br />
          <span className="text-brand">A few more points each week.</span>
        </h1>
        <p className="mt-5 max-w-xl text-lg text-muted">
          No 300-point promises. Find the exact skills holding you back, then fix them one short lesson at a time.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link href="/diagnostic" className="btn-green">
            Take the diagnostic
            <Icon name="arrow" className="h-4 w-4" />
          </Link>
          <Link href="/learn" className="btn-ghost">
            Jump into lessons
          </Link>
        </div>
      </section>

      <section className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-3">
        {steps.map((s, i) => (
          <div key={s.title} className="bg-white p-6">
            <div className="flex items-center gap-3">
              <span className="text-sm font-semibold text-muted tabular-nums">0{i + 1}</span>
              <Icon name={s.icon} className="h-5 w-5 text-brand" />
            </div>
            <h2 className="mt-4 font-semibold">{s.title}</h2>
            <p className="mt-1.5 text-sm text-muted">{s.body}</p>
          </div>
        ))}
      </section>
    </div>
  );
}
