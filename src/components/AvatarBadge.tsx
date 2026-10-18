"use client";

import Link from "next/link";
import { Avatar } from "./Avatar";
import { useAvatar } from "./useAvatar";

/** Small avatar in the header that opens the avatar studio. */
export function AvatarBadge() {
  const { state } = useAvatar();
  const fresh = (state?.fresh.size ?? 0) > 0;
  return (
    <Link href="/avatar" className="relative block h-8 w-8 shrink-0 rounded-full ring-1 ring-line hover:ring-ink/30" aria-label="Your avatar">
      {state ? <Avatar look={state.look} size={32} /> : <span className="block h-8 w-8 rounded-full bg-stone-200" />}
      {fresh && <span className="absolute -top-0.5 -right-0.5 h-2.5 w-2.5 rounded-full border-2 border-paper bg-wrong" aria-label="New items" />}
    </Link>
  );
}
