import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";
import "./globals.css";

export const metadata: Metadata = {
  title: { default: `${site.name}: Digital SAT Prep`, template: `%s · ${site.name}` },
  description: site.tagline,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="flex min-h-screen flex-col antialiased">
        <header className="border-b border-slate-200 dark:border-slate-800">
          <nav className="mx-auto flex max-w-4xl items-center justify-between px-4 py-4">
            <Link href="/" className="text-lg font-bold">
              {site.name}
            </Link>
            <Link href="/course" className="text-sm font-medium hover:underline">
              Course
            </Link>
          </nav>
        </header>
        <main className="mx-auto w-full max-w-4xl flex-1 px-4 py-10">{children}</main>
        <footer className="border-t border-slate-200 px-4 py-6 text-center text-xs text-slate-500 dark:border-slate-800">
          {site.disclaimer}
        </footer>
      </body>
    </html>
  );
}
