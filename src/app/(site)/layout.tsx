import Link from "next/link";
import { StatsBar } from "@/components/StatsBar";
import { site } from "@/lib/site";

export default function SiteLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-10 border-b-2 border-line bg-white">
        <nav className="mx-auto flex max-w-4xl items-center justify-between gap-4 px-4 py-3">
          <Link href="/" className="text-xl font-extrabold tracking-tight text-brand">
            {site.name}
          </Link>
          <div className="flex items-center gap-5">
            <Link href="/learn" className="hidden text-sm font-extrabold uppercase tracking-wide text-sky sm:inline">
              Learn
            </Link>
            <StatsBar />
          </div>
        </nav>
      </header>
      <main className="mx-auto w-full max-w-4xl flex-1 px-4 py-8">{children}</main>
      <footer className="border-t-2 border-line px-4 py-6 text-center text-xs text-muted">{site.disclaimer}</footer>
    </div>
  );
}
