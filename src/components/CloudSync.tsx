"use client";

import { useEffect } from "react";
import { pushLocal, supabase, syncOnSignIn } from "@/lib/cloud";
import { STORE_EVENT } from "@/lib/store";
import { setSync } from "./useAccount";

/** Keeps a signed-in learner's account in step with this browser. Renders nothing. */
export function CloudSync() {
  useEffect(() => {
    const sb = supabase();
    let userId: string | null = null;
    let synced = false;
    let timer: ReturnType<typeof setTimeout> | undefined;

    const push = async () => {
      if (!userId || !synced) return;
      setSync("syncing");
      try {
        await pushLocal(userId);
        setSync("saved");
      } catch {
        setSync("offline");
      }
    };

    const start = async (id: string) => {
      userId = id;
      synced = false;
      setSync("syncing");
      try {
        const changed = await syncOnSignIn(id);
        synced = true;
        setSync("saved");
        // Show the account's progress everywhere on the page.
        if (changed) window.location.reload();
      } catch {
        setSync("offline");
      }
    };

    const { data } = sb.auth.onAuthStateChange((event, session) => {
      const id = session?.user.id ?? null;
      if (!id) {
        userId = null;
        synced = false;
        setSync("idle");
        return;
      }
      if (id !== userId || !synced) {
        // Run outside the auth callback, which must not wait on other Supabase calls.
        if (event === "INITIAL_SESSION" || event === "SIGNED_IN" || event === "TOKEN_REFRESHED") setTimeout(() => start(id), 0);
      }
    });

    const onSaved = () => {
      clearTimeout(timer);
      timer = setTimeout(push, 800);
    };
    const flush = () => {
      if (document.visibilityState === "hidden" && timer) {
        clearTimeout(timer);
        timer = undefined;
        push();
      }
    };
    window.addEventListener(STORE_EVENT, onSaved);
    document.addEventListener("visibilitychange", flush);
    return () => {
      data.subscription.unsubscribe();
      clearTimeout(timer);
      window.removeEventListener(STORE_EVENT, onSaved);
      document.removeEventListener("visibilitychange", flush);
    };
  }, []);
  return null;
}
