import { findSkill } from "@/content/catalog";
import { journeyLessons } from "@/content/journeys";
import { itemsById, rarities, wardrobe, type Expression, type Item, type Rarity, type Slot } from "@/content/wardrobe";
import { loadDiagnostic } from "./diagnostic";
import { lessonKey, type Progress } from "./progress";

// The learner's avatar, stored in the browser until accounts exist.
const KEY = "peakprep:avatar:v1";
/** Fired after a save so every avatar on the page (like the header badge) updates. */
export const AVATAR_EVENT = "peakprep:avatar";

export interface AvatarLook {
  skin: string;
  hairColor: string;
  expression: Expression;
  hair: string;
  hat: string | null;
  face: string | null;
  top: string;
  bg: string;
}

export const defaultLook: AvatarLook = {
  skin: "#f1c09b",
  hairColor: "#4a2f22",
  expression: "smile",
  hair: "side-sweep",
  hat: null,
  face: null,
  top: "sky-tee",
  bg: "sky",
};

export interface AvatarSave {
  look: AvatarLook;
  /** Earned items the learner has already seen, so new ones can be flagged. */
  seen: string[];
  /** Items won from mystery boxes. */
  boxItems: string[];
  /** XP spent on boxes. Total XP never goes down, so XP rewards stay earned. */
  spentXp: number;
}

const list = (v: unknown): string[] => (Array.isArray(v) ? v.filter((x) => typeof x === "string") : []);

export function loadAvatar(): AvatarSave {
  try {
    const raw = JSON.parse(localStorage.getItem(KEY) ?? "{}");
    const look = { ...defaultLook, ...raw.look };
    // Skin and hair accept any color from the picker, but only as a plain hex value.
    for (const k of ["skin", "hairColor"] as const) if (!/^#[0-9a-f]{6}$/i.test(look[k])) look[k] = defaultLook[k];
    return {
      look,
      seen: list(raw.seen),
      boxItems: list(raw.boxItems).filter((id) => itemsById[id]?.unlock.kind === "box"),
      spentXp: Number.isFinite(raw.spentXp) && raw.spentXp > 0 ? raw.spentXp : 0,
    };
  } catch {
    return { look: { ...defaultLook }, seen: [], boxItems: [], spentXp: 0 };
  }
}

/** Saves only the fields given, keeping the rest as stored. */
export function saveAvatar(patch: Partial<AvatarSave>) {
  try {
    localStorage.setItem(KEY, JSON.stringify({ ...loadAvatar(), ...patch }));
  } catch {
    // Storage unavailable; the avatar only lasts for this visit.
  }
  window.dispatchEvent(new Event(AVATAR_EVENT));
}

export interface JourneyStatus {
  total: number;
  done: number;
  /** Lessons needed for the halfway reward. */
  half: number;
}

export function journeyStatus(skill: string, progress: Progress | null): JourneyStatus {
  const lessons = journeyLessons[skill] ?? [];
  const done = lessons.filter((l) => progress?.lessons[lessonKey(skill, l)]).length;
  return { total: lessons.length, done, half: Math.ceil(lessons.length / 2) };
}

export interface UnlockContext {
  progress: Progress | null;
  diagnosticTaken: boolean;
  boxItems: Set<string>;
}

export function unlockContext(progress: Progress | null): UnlockContext {
  const d = loadDiagnostic();
  return { progress, diagnosticTaken: !!(d.rw || d.math), boxItems: new Set(loadAvatar().boxItems) };
}

export function isUnlocked(item: Item, ctx: UnlockContext): boolean {
  const u = item.unlock;
  const p = ctx.progress;
  switch (u.kind) {
    case "starter":
      return true;
    case "box":
      return ctx.boxItems.has(item.id);
    case "diagnostic":
      return ctx.diagnosticTaken;
    case "xp":
      return (p?.xp ?? 0) >= u.amount;
    case "streak":
      return Math.max(p?.bestStreak ?? 0, p?.streak ?? 0) >= u.days;
    case "journey": {
      const j = journeyStatus(u.skill, p);
      if (j.total === 0) return false;
      return j.done >= (u.stage === "half" ? j.half : j.total);
    }
  }
}

export function unlockedIds(ctx: UnlockContext): Set<string> {
  return new Set(wardrobe.filter((i) => isUnlocked(i, ctx)).map((i) => i.id));
}

/** How to earn an item, in plain words. */
export function unlockHint(item: Item): string {
  const u = item.unlock;
  switch (u.kind) {
    case "starter":
      return "Free";
    case "box":
      return `Mystery box · ${u.rarity[0].toUpperCase()}${u.rarity.slice(1)}`;
    case "diagnostic":
      return "Take the diagnostic";
    case "xp":
      return `Earn ${u.amount} XP`;
    case "streak":
      return `Reach a ${u.days}-day streak`;
    case "journey": {
      const title = findSkill(u.skill)?.skill.title ?? u.skill;
      const soon = (journeyLessons[u.skill] ?? []).length === 0 ? " (coming soon)" : "";
      return u.stage === "half" ? `Reach halfway on ${title}${soon}` : `Finish the ${title} journey${soon}`;
    }
  }
}

export function journeyRewards(skill: string): { half?: Item; end?: Item } {
  const mine = wardrobe.filter((i) => i.unlock.kind === "journey" && i.unlock.skill === skill);
  return {
    half: mine.find((i) => i.unlock.kind === "journey" && i.unlock.stage === "half"),
    end: mine.find((i) => i.unlock.kind === "journey" && i.unlock.stage === "end"),
  };
}

/** Items earned between two progress snapshots, e.g. by the lesson just finished. */
export function newlyUnlocked(before: Progress | null, after: Progress): Item[] {
  const was = unlockedIds(unlockContext(before));
  const now = unlockContext(after);
  return wardrobe.filter((i) => !was.has(i.id) && isUnlocked(i, now));
}

/** Swap anything the learner can't wear (yet) back to a default, so a reset never shows locked gear. */
export function wearable(look: AvatarLook, unlocked: Set<string>): AvatarLook {
  const fix = (slot: Slot, id: string | null): string | null => {
    if (id === null) return null;
    const it = itemsById[id];
    if (it && it.slot === slot && unlocked.has(id)) return id;
    return (defaultLook[slot as keyof AvatarLook] as string | null) ?? null;
  };
  return {
    ...look,
    hair: fix("hair", look.hair) ?? defaultLook.hair,
    hat: fix("hat", look.hat),
    face: fix("face", look.face),
    top: fix("top", look.top) ?? defaultLook.top,
    bg: fix("bg", look.bg) ?? defaultLook.bg,
  };
}

export function withItem(look: AvatarLook, item: Item): AvatarLook {
  return { ...look, [item.slot]: item.id };
}

// Mystery boxes: spend XP for a random accessory you don't own yet.
export const BOX_COST = 100;
/** Chance of each tier per box. Shown to learners on the box. */
export const BOX_ODDS: Record<Rarity, number> = { common: 0.65, rare: 0.28, legendary: 0.07 };

export const boxPool = (rarity?: Rarity) => wardrobe.filter((i) => i.unlock.kind === "box" && (!rarity || i.unlock.rarity === rarity));

export function xpBalance(progress: Progress | null, save: Pick<AvatarSave, "spentXp">): number {
  return Math.max(0, (progress?.xp ?? 0) - save.spentXp);
}

export type BoxResult = { ok: true; item: Item; rarity: Rarity } | { ok: false; reason: "xp" | "empty" };

export function openBox(progress: Progress | null, random = Math.random): BoxResult {
  const save = loadAvatar();
  if (xpBalance(progress, save) < BOX_COST) return { ok: false, reason: "xp" };
  const owned = new Set(save.boxItems);
  const left = (r: Rarity) => boxPool(r).filter((i) => !owned.has(i.id));

  const roll = random();
  let rarity: Rarity = roll < BOX_ODDS.legendary ? "legendary" : roll < BOX_ODDS.legendary + BOX_ODDS.rare ? "rare" : "common";
  // If that tier is all collected, step to the nearest tier that still has items.
  if (!left(rarity).length) {
    const order = rarity === "common" ? rarities : rarity === "rare" ? ["rare", "common", "legendary"] : [...rarities].reverse();
    const next = (order as Rarity[]).find((r) => left(r).length);
    if (!next) return { ok: false, reason: "empty" };
    rarity = next;
  }
  const choices = left(rarity);
  const item = choices[Math.floor(random() * choices.length)];
  saveAvatar({ boxItems: [...save.boxItems, item.id], spentXp: save.spentXp + BOX_COST, seen: [...save.seen, item.id] });
  return { ok: true, item, rarity };
}
