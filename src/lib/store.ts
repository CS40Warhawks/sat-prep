// Browser storage keys for everything a learner saves, plus a signal that fires on every save
// so a signed-in account can sync the change.
export const STORE_KEYS = {
  progress: "peakprep:progress:v2",
  diagnostic: "peakprep:diagnostic:v1",
  avatar: "peakprep:avatar:v1",
} as const;

export const STORE_EVENT = "peakprep:saved";

export function markSaved() {
  if (typeof window !== "undefined") window.dispatchEvent(new Event(STORE_EVENT));
}
