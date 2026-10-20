"use client";

import { useEffect, useState } from "react";
import { rarities, type Item, type Rarity } from "@/content/wardrobe";
import { BOX_COST, BOX_ODDS, boxPool, openBox, withItem, type AvatarLook } from "@/lib/avatar";
import type { Progress } from "@/lib/progress";
import { Avatar } from "./Avatar";
import { Icon } from "./ui";

export const RARITY: Record<Rarity, { label: string; text: string; chip: string; glow: string; ring: string }> = {
  common: { label: "Common", text: "text-stone-600", chip: "bg-stone-100 text-stone-700", glow: "from-stone-200 to-stone-50", ring: "ring-stone-300" },
  rare: { label: "Rare", text: "text-sky", chip: "bg-sky-soft text-sky-dark", glow: "from-indigo-300 to-sky-soft", ring: "ring-sky" },
  legendary: { label: "Legendary", text: "text-gold-dark", chip: "bg-amber-100 text-gold-dark", glow: "from-amber-300 via-yellow-100 to-amber-50", ring: "ring-gold" },
};

function BoxArt({ size = 72, shaking = false }: { size?: number; shaking?: boolean }) {
  return (
    <svg viewBox="0 0 64 64" width={size} height={size} className={shaking ? "animate-wiggle" : ""} aria-hidden>
      <rect x={8} y={26} width={48} height={32} rx={5} fill="#4f46e5" />
      <rect x={5} y={18} width={54} height={12} rx={4} fill="#6366f1" />
      <rect x={28} y={18} width={8} height={40} fill="#f59e0b" />
      <path d="M32 18 C26 6 14 8 18 15 C20 18 28 18 32 18 Z M32 18 C38 6 50 8 46 15 C44 18 36 18 32 18 Z" fill="#fbbf24" />
      <text x={32} y={50} textAnchor="middle" fontSize={16} fontWeight={800} fill="#fff" fontFamily="ui-sans-serif, system-ui">?</text>
    </svg>
  );
}

type Phase = { kind: "idle" } | { kind: "shaking" } | { kind: "reveal"; item: Item; rarity: Rarity };

export function MysteryBox({
  look,
  balance,
  progress,
  owned,
  onWear,
}: {
  look: AvatarLook;
  balance: number;
  progress: Progress;
  owned: Set<string>;
  onWear: (item: Item) => void;
}) {
  const [phase, setPhase] = useState<Phase>({ kind: "idle" });
  const pool = boxPool();
  const left = pool.filter((i) => !owned.has(i.id)).length;
  const canOpen = balance >= BOX_COST && left > 0;

  function open() {
    if (!canOpen) return;
    setPhase({ kind: "shaking" });
    // Decide the prize up front, then let the box shake for a moment before the reveal.
    const result = openBox(progress);
    setTimeout(() => {
      if (result.ok) setPhase({ kind: "reveal", item: result.item, rarity: result.rarity });
      else setPhase({ kind: "idle" });
    }, 1300);
  }

  useEffect(() => {
    if (phase.kind === "idle") return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && phase.kind === "reveal" && setPhase({ kind: "idle" });
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [phase]);

  return (
    <section className="rounded-2xl border border-line bg-white p-5">
      <div className="flex items-center gap-4">
        <BoxArt />
        <div className="min-w-0 flex-1">
          <h2 className="font-semibold">Mystery box</h2>
          <p className="text-sm text-muted">Spend {BOX_COST} XP on a random accessory you don&apos;t have yet.</p>
          <p className="mt-1 flex items-center gap-1 text-sm font-semibold tabular-nums">
            <Icon name="bolt" className="h-4 w-4 text-gold" />
            {balance} XP to spend
          </p>
        </div>
      </div>

      <ul className="mt-4 grid grid-cols-3 gap-2 text-center text-xs">
        {rarities.map((r) => {
          const tier = boxPool(r);
          const got = tier.filter((i) => owned.has(i.id)).length;
          return (
            <li key={r} className={`rounded-xl px-2 py-2 ${RARITY[r].chip}`}>
              <p className="font-semibold">{RARITY[r].label}</p>
              <p className="tabular-nums">{Math.round(BOX_ODDS[r] * 100)}% chance</p>
              <p className="tabular-nums opacity-70">
                {got}/{tier.length} found
              </p>
            </li>
          );
        })}
      </ul>

      <button onClick={open} disabled={!canOpen} className={`${canOpen ? "btn-blue" : "btn-off"} mt-4 w-full`}>
        {left === 0 ? "You've found everything" : canOpen ? `Open for ${BOX_COST} XP` : `Earn ${BOX_COST - balance} more XP to open`}
      </button>
      <p className="mt-2 text-center text-xs text-muted">Spending XP never lowers your total, streak or XP rewards.</p>

      {phase.kind !== "idle" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/60 p-6 backdrop-blur-sm" role="dialog" aria-modal="true" aria-label="Mystery box">
          {phase.kind === "shaking" ? (
            <div className="flex flex-col items-center text-white">
              <BoxArt size={140} shaking />
              <p className="mt-6 font-semibold">Opening…</p>
            </div>
          ) : (
            <div className="animate-pop w-full max-w-sm rounded-3xl bg-white p-6 text-center shadow-2xl">
              <p className={`text-xs font-bold tracking-widest uppercase ${RARITY[phase.rarity].text}`}>{RARITY[phase.rarity].label}</p>
              <div className="relative mx-auto mt-4 h-48 w-48">
                <div className={`animate-spin-slow absolute inset-0 rounded-full bg-gradient-to-br ${RARITY[phase.rarity].glow} opacity-90 blur-md`} />
                <div className={`absolute inset-2 overflow-hidden rounded-full ring-4 ${RARITY[phase.rarity].ring}`}>
                  <Avatar
                    look={withItem(look, phase.item)}
                    size={176}
                    title={phase.item.name}
                    framing={phase.item.slot === "top" || phase.item.slot === "bg" ? "full" : "portrait"}
                  />
                </div>
              </div>
              <h3 className="mt-5 text-2xl font-semibold tracking-tight">{phase.item.name}</h3>
              <p className="mt-1 text-sm text-muted">Added to your collection.</p>
              <div className="mt-6 flex flex-col gap-2">
                <button
                  className="btn-green w-full"
                  onClick={() => {
                    onWear(phase.item);
                    setPhase({ kind: "idle" });
                  }}
                >
                  Wear it
                </button>
                <button className="btn-ghost w-full" onClick={() => setPhase({ kind: "idle" })}>
                  Keep it for later
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </section>
  );
}
