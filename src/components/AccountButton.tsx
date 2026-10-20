"use client";

import Link from "next/link";
import { displayName, useAccount } from "./useAccount";

/** Header link: "Sign in" for guests, the learner's name once signed in. */
export function AccountButton() {
  const { ready, user } = useAccount();
  if (!ready) return <span className="hidden w-14 sm:block" />;
  return user ? (
    <Link href="/account" className="hidden max-w-28 truncate text-sm font-medium text-muted hover:text-ink sm:block" title="Your account">
      {displayName(user)}
    </Link>
  ) : (
    <Link href="/account" className="rounded-lg border border-line bg-white px-3 py-1.5 text-sm font-semibold whitespace-nowrap hover:bg-stone-50">
      Sign in
    </Link>
  );
}
