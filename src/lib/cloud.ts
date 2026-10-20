// Accounts: sign-in through Supabase, and syncing the learner's saved data to their account.
// Signed out, everything keeps working from browser storage alone.
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import type { AvatarSave } from "./avatar";
import type { DiagnosticResults } from "./diagnostic";
import type { LessonRecord, Progress } from "./progress";
import { STORE_KEYS } from "./store";

// The publishable key is meant to be public; row-level security keeps each learner's data private.
const URL = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://qupkzkbrkyiapdldtbxh.supabase.co";
const KEY = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || "sb_publishable_z29zVsBAUljp8qgoFtHkmQ_a8-4zNgh";

/** Which account the data in this browser belongs to, so one learner's progress never mixes into another's. */
const OWNER_KEY = "peakprep:owner";

let client: SupabaseClient | null = null;
export function supabase(): SupabaseClient {
  client ??= createClient(URL, KEY, { auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: true } });
  return client;
}

export interface Snapshot {
  progress: Partial<Progress>;
  diagnostic: DiagnosticResults;
  avatar: Partial<AvatarSave>;
}

function readJson<T>(key: string): T {
  try {
    return JSON.parse(localStorage.getItem(key) ?? "{}") ?? ({} as T);
  } catch {
    return {} as T;
  }
}

export function readLocal(): Snapshot {
  return {
    progress: readJson(STORE_KEYS.progress),
    diagnostic: readJson(STORE_KEYS.diagnostic),
    avatar: readJson(STORE_KEYS.avatar),
  };
}

function writeLocal(s: Snapshot) {
  try {
    localStorage.setItem(STORE_KEYS.progress, JSON.stringify(s.progress));
    localStorage.setItem(STORE_KEYS.diagnostic, JSON.stringify(s.diagnostic));
    localStorage.setItem(STORE_KEYS.avatar, JSON.stringify(s.avatar));
  } catch {
    // Storage unavailable; the account still has the data.
  }
}

export function clearLocal() {
  try {
    for (const k of [...Object.values(STORE_KEYS), OWNER_KEY]) localStorage.removeItem(k);
  } catch {
    // Nothing to clear.
  }
}

const isEmpty = (o: object | null | undefined) => !o || Object.keys(o).length === 0;
const union = (a: string[] = [], b: string[] = []) => [...new Set([...a, ...b])];

/** Combines two copies of progress without losing anything either one earned. */
export function mergeProgress(a: Partial<Progress>, b: Partial<Progress>): Partial<Progress> {
  if (isEmpty(a)) return b;
  if (isEmpty(b)) return a;
  const lessons: Record<string, LessonRecord> = { ...a.lessons };
  for (const [k, r] of Object.entries(b.lessons ?? {})) {
    const o = lessons[k];
    lessons[k] = o ? { completions: Math.max(o.completions, r.completions), bestAccuracy: Math.max(o.bestAccuracy, r.bestAccuracy) } : r;
  }
  const la = a.lastActive ?? "";
  const lb = b.lastActive ?? "";
  const recent = la === lb ? null : la > lb ? a : b;
  return {
    xp: Math.max(a.xp ?? 0, b.xp ?? 0),
    bestStreak: Math.max(a.bestStreak ?? 0, b.bestStreak ?? 0, a.streak ?? 0, b.streak ?? 0),
    streak: recent ? (recent.streak ?? 0) : Math.max(a.streak ?? 0, b.streak ?? 0),
    todayXp: recent ? (recent.todayXp ?? 0) : Math.max(a.todayXp ?? 0, b.todayXp ?? 0),
    lastActive: recent ? (recent.lastActive ?? null) : (a.lastActive ?? null),
    lessons,
  };
}

/** Keeps the most recent result for each section. */
export function mergeDiagnostic(a: DiagnosticResults, b: DiagnosticResults): DiagnosticResults {
  const out: DiagnosticResults = { ...a };
  for (const [section, r] of Object.entries(b) as [keyof DiagnosticResults, NonNullable<DiagnosticResults["rw"]>][]) {
    const o = out[section];
    if (!o || (r.takenAt ?? "") > (o.takenAt ?? "")) out[section] = r;
  }
  return out;
}

/** The account's look wins when it has one; owned items and spent XP are combined. */
export function mergeAvatar(account: Partial<AvatarSave>, device: Partial<AvatarSave>): Partial<AvatarSave> {
  if (isEmpty(account)) return device;
  if (isEmpty(device)) return account;
  return {
    look: account.look ?? device.look,
    seen: union(account.seen, device.seen),
    boxItems: union(account.boxItems, device.boxItems),
    spentXp: Math.max(account.spentXp ?? 0, device.spentXp ?? 0),
  };
}

export function mergeSnapshots(account: Snapshot, device: Snapshot): Snapshot {
  return {
    progress: mergeProgress(account.progress, device.progress),
    diagnostic: mergeDiagnostic(account.diagnostic, device.diagnostic),
    avatar: mergeAvatar(account.avatar, device.avatar),
  };
}

async function fetchAccount(userId: string): Promise<Snapshot | null> {
  const { data, error } = await supabase().from("user_state").select("progress, diagnostic, avatar").eq("user_id", userId).maybeSingle();
  if (error) throw error;
  return data ? { progress: data.progress ?? {}, diagnostic: data.diagnostic ?? {}, avatar: data.avatar ?? {} } : null;
}

export async function pushLocal(userId: string) {
  const s = readLocal();
  const { error } = await supabase()
    .from("user_state")
    .upsert({ user_id: userId, ...s, updated_at: new Date().toISOString() });
  if (error) throw error;
}

/**
 * Brings this browser and the account into line after sign-in. Progress made here while signed
 * out is added to the account; data left by a different account is replaced. Returns true when
 * the data in this browser changed, so the page can refresh.
 */
export async function syncOnSignIn(userId: string): Promise<boolean> {
  const owner = localStorage.getItem(OWNER_KEY);
  const device = readLocal();
  const account = (await fetchAccount(userId)) ?? { progress: {}, diagnostic: {}, avatar: {} };
  const merged = owner && owner !== userId ? account : mergeSnapshots(account, device);
  const changed = JSON.stringify(merged) !== JSON.stringify(device);
  writeLocal(merged);
  localStorage.setItem(OWNER_KEY, userId);
  await pushLocal(userId);
  return changed;
}
