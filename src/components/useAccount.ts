"use client";

import type { User } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/cloud";

export type SyncState = "idle" | "syncing" | "saved" | "offline";
export const SYNC_EVENT = "peakprep:sync";

/** Latest sync state, shared by CloudSync (which sets it) and the account page (which shows it). */
export const syncStatus: { state: SyncState; at: Date | null } = { state: "idle", at: null };
export function setSync(state: SyncState) {
  syncStatus.state = state;
  if (state === "saved") syncStatus.at = new Date();
  window.dispatchEvent(new Event(SYNC_EVENT));
}

/** The signed-in user, or null. `ready` is false until the saved session has been checked. */
export function useAccount() {
  const [state, setState] = useState<{ ready: boolean; user: User | null }>({ ready: false, user: null });
  useEffect(() => {
    const sb = supabase();
    let live = true;
    sb.auth.getSession().then(({ data }) => live && setState({ ready: true, user: data.session?.user ?? null }));
    const { data } = sb.auth.onAuthStateChange((_e, session) => live && setState({ ready: true, user: session?.user ?? null }));
    return () => {
      live = false;
      data.subscription.unsubscribe();
    };
  }, []);
  return state;
}

export function useSyncStatus() {
  const [s, setS] = useState({ ...syncStatus });
  useEffect(() => {
    const on = () => setS({ ...syncStatus });
    on();
    window.addEventListener(SYNC_EVENT, on);
    return () => window.removeEventListener(SYNC_EVENT, on);
  }, []);
  return s;
}

export function displayName(user: User): string {
  const n = user.user_metadata?.name;
  return typeof n === "string" && n.trim() ? n.trim() : (user.email?.split("@")[0] ?? "Learner");
}
