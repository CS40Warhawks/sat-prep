import Link from "next/link";
import { AvatarBadge } from "@/components/AvatarBadge";
import { StatsBar } from "@/components/StatsBar";
import { site } from "@/lib/site";

const NAV = [
  { href: "/learn", label: "Learn" },
  { href: "/diagnostic", label: "Diagnostic" },
  { href: "/plan", label: "Plan" },
  { href: "/avatar", label: "Avatar" },
];

export default function SiteLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-10 border-b border-line bg-paper/90 backdrop-blur">
        <nav className="mx-auto flex max-w-4xl items-center justify-between gap-4 px-4 py-3">
          <div className="flex items-center gap-6">
            <Link href="/" className="flex items-center gap-2 text-lg font-semibold tracking-tight">
              <span className="h-2.5 w-2.5 rounded-full bg-brand" aria-hidden />
              {site.name}
            </Link>
            <div className="hidden items-center gap-5 text-sm text-muted sm:flex">
              {NAV.map((n) => (
                <Link key={n.href} href={n.href} className="hover:text-ink">
                  {n.label}
                </Link>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-4">
            <StatsBar />
            <AvatarBadge />
          </div>
        </nav>
        <div className="flex justify-center gap-6 border-t border-line py-2 text-sm text-muted sm:hidden">
          {NAV.map((n) => (
            <Link key={n.href} href={n.href} className="hover:text-ink">
              {n.label}
            </Link>
          ))}
        </div>
      </header>
      <main className="mx-auto w-full max-w-4xl flex-1 px-4 py-10">{children}</main>
      <footer className="border-t border-line px-4 py-6 text-center text-xs text-muted">{site.disclaimer}</footer>
    </div>
  );
}
