import Link from "next/link";

const steps = [
  { icon: "⏱️", title: "5-minute lessons", body: "Each lesson is a few quick tips and five questions. Fit one in between classes." },
  { icon: "🎯", title: "One skill at a time", body: "Lock in a single rule, like where a semicolon goes, until you never miss it again." },
  { icon: "🔥", title: "Keep your streak", body: "Earn XP, hit your daily goal, and watch small wins add up week after week." },
];

export default function Home() {
  return (
    <div>
      <section className="flex flex-col items-center py-10 text-center">
        <div className="animate-bob text-7xl" aria-hidden>
          ⛰️
        </div>
        <h1 className="mt-6 max-w-xl text-4xl font-extrabold tracking-tight sm:text-5xl">
          Get a little better at the SAT every day.
        </h1>
        <p className="mt-4 max-w-lg text-lg text-muted">
          No 300-point promises. Just short, focused lessons that win you real points, one skill at a time.
        </p>
        <div className="mt-8 flex w-full max-w-xs flex-col gap-3">
          <Link href="/learn" className="btn-green">
            Start learning
          </Link>
          <Link href="/guide/boundaries" className="btn-ghost">
            Browse a guidebook
          </Link>
        </div>
      </section>

      <section className="mt-6 grid gap-4 sm:grid-cols-3">
        {steps.map((s) => (
          <div key={s.title} className="rounded-2xl border-2 border-line p-5">
            <div className="text-3xl" aria-hidden>
              {s.icon}
            </div>
            <h2 className="mt-3 font-extrabold">{s.title}</h2>
            <p className="mt-1 text-sm text-muted">{s.body}</p>
          </div>
        ))}
      </section>

      <section className="mt-12 rounded-2xl bg-sky-soft p-6 text-center">
        <h2 className="text-xl font-extrabold">Why small steps?</h2>
        <p className="mx-auto mt-2 max-w-xl text-sm text-ink">
          Each skill on the SAT shows up a few times per test. Master one and those questions become yours for good. A
          handful of points from each skill adds up, and a daily habit is easier to keep than a cram session.
        </p>
      </section>
    </div>
  );
}
