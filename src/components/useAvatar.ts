"use client";

import { useCallback, useEffect, useState } from "react";
import { AVATAR_EVENT, loadAvatar, saveAvatar, unlockContext, unlockedIds, wearable, type AvatarLook, type AvatarSave } from "@/lib/avatar";
import { wardrobe } from "@/content/wardrobe";
import { loadProgress, type Progress } from "@/lib/progress";

export interface AvatarState {
  look: AvatarLook;
  seen: Set<string>;
  unlocked: Set<string>;
  /** Earned but not yet seen in the studio. */
  fresh: Set<string>;
  progress: Progress;
}

/** The saved avatar plus what the learner has earned. Null until mounted, to keep hydration stable. */
export function useAvatar() {
  const [state, setState] = useState<AvatarState | null>(null);

  const read = useCallback(() => {
    const progress = loadProgress();
    const unlocked = unlockedIds(unlockContext(progress));
    const save = loadAvatar();
    const seen = new Set(save.seen);
    const fresh = new Set(wardrobe.filter((i) => i.unlock.kind !== "starter" && unlocked.has(i.id) && !seen.has(i.id)).map((i) => i.id));
    setState({ look: wearable(save.look, unlocked), seen, unlocked, fresh, progress });
  }, []);

  useEffect(() => {
    read();
    window.addEventListener(AVATAR_EVENT, read);
    return () => window.removeEventListener(AVATAR_EVENT, read);
  }, [read]);

  const save = useCallback(
    (next: Partial<AvatarSave> & { look?: AvatarLook }) => {
      if (!state) return;
      saveAvatar({ look: next.look ?? state.look, seen: next.seen ?? [...state.seen] });
    },
    [state],
  );

  return { state, save };
}
