import type { Metadata } from "next";
import { Icon } from "@/components/ui";
import { safeNext } from "@/lib/access";
import { site } from "@/lib/site";

export const metadata: Metadata = { title: "Enter password", robots: { index: false, follow: false } };

type Search = Promise<{ next?: string; error?: string }>;

export default async function UnlockPage({ searchParams }: { searchParams: Search }) {
  const { next, error } = await searchParams;
  return (
    <main className="mx-auto flex min-h-screen max-w-sm flex-col items-center justify-center px-6 text-center">
      <span className="flex h-14 w-14 items-center justify-center rounded-full bg-ink text-white">
        <Icon name="lock" className="h-6 w-6" />
      </span>
      <h1 className="mt-4 text-2xl font-semibold tracking-tight">{site.name}</h1>
      <p className="mt-2 text-muted">This site is in early access. Enter the password to continue.</p>
      <form action="/api/unlock" method="post" className="mt-8 w-full space-y-3">
        <input type="hidden" name="next" value={safeNext(next)} />
        <label htmlFor="password" className="sr-only">
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          autoFocus
          autoComplete="current-password"
          placeholder="Password"
          aria-invalid={!!error}
          className={`w-full rounded-xl border bg-white px-4 py-3 text-lg outline-none focus:border-sky ${error ? "border-wrong" : "border-line"}`}
        />
        {error && <p className="text-sm font-bold text-wrong-dark">That password didn&apos;t work. Try again.</p>}
        <button type="submit" className="btn-green w-full">
          Unlock
        </button>
      </form>
    </main>
  );
}
