"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { sectionTitles, units } from "@/content/catalog";
import { expressions, hairColors, itemsById, journeyThemes, rarityOf, skinTones, wardrobe, type Slot } from "@/content/wardrobe";
import { journeyRewards, journeyStatus, unlockHint, type AvatarLook } from "@/lib/avatar";
import type { Section } from "@/lib/types";
import { Avatar, AvatarViewer, ItemPreview } from "./Avatar";
import { MysteryBox, RARITY } from "./MysteryBox";
import { Eyebrow, Icon } from "./ui";
import { useAvatar } from "./useAvatar";

const TABS: { slot: Slot; label: string }[] = [
  { slot: "hair", label: "Hair" },
  { slot: "hat", label: "Hats" },
  { slot: "face", label: "Glasses" },
  { slot: "top", label: "Tops" },
  { slot: "bg", label: "Backdrops" },
];

const EXPRESSION_LABEL: Record<string, string> = { smile: "Smile", grin: "Grin", calm: "Calm" };

function Swatches({ label, values, value, onPick }: { label: string; values: string[]; value: string; onPick: (v: string) => void }) {
  return (
    <div>
      <p className="text-xs font-medium text-muted">{label}</p>
      <div className="mt-2 flex flex-wrap gap-2">
        {values.map((v) => (
          <button
            key={v}
            onClick={() => onPick(v)}
            aria-label={`${label} ${v}`}
            aria-pressed={v === value}
            className={`h-7 w-7 rounded-full ring-offset-2 transition ${v === value ? "ring-2 ring-ink" : "ring-1 ring-line hover:ring-ink/30"}`}
            style={{ background: v }}
          />
        ))}
      </div>
    </div>
  );
}

export function AvatarStudio() {
  const { state, save } = useAvatar();
  const [tab, setTab] = useState<Slot>("hair");
  const [newAtOpen, setNewAtOpen] = useState<Set<string>>(new Set());
  const marked = useRef(false);

  // Remember which items were new when the page opened, then mark everything earned as seen.
  useEffect(() => {
    if (!state || marked.current) return;
    marked.current = true;
    setNewAtOpen(state.fresh);
    const wanted = new URLSearchParams(window.location.search).get("item");
    if (wanted && itemsById[wanted]) setTab(itemsById[wanted].slot);
    if (state.fresh.size) save({ seen: [...state.unlocked] });
  }, [state, save]);

  if (!state) return null;
  const { look, unlocked } = state;
  const set = (patch: Partial<AvatarLook>) => save({ look: { ...look, ...patch } });

  const earnable = wardrobe.filter((i) => i.unlock.kind !== "starter");
  const earned = earnable.filter((i) => unlocked.has(i.id)).length;
  const items = wardrobe
    .filter((i) => i.slot === tab)
    .sort((a, b) => Number(unlocked.has(b.id)) - Number(unlocked.has(a.id)));
  const optional = tab === "hat" || tab === "face";
  const current = look[tab];
  // Close-ups for things worn on the head; the whole body for clothes and backdrops.
  const framing = tab === "top" || tab === "bg" ? "full" : "portrait";

  return (
    <div className="space-y-12">
      <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
        <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-2xl border border-line bg-white p-6 text-center">
            <AvatarViewer look={look} size={240} className="mx-auto" />
            <p className="mt-2 text-xs text-muted">Drag to spin</p>
            <div className="mt-5 text-left">
              <div className="flex items-baseline justify-between text-sm">
                <span className="font-semibold">Collection</span>
                <span className="text-muted tabular-nums">
                  {earned}/{earnable.length} earned
                </span>
              </div>
              <div className="mt-2 h-2 overflow-hidden rounded-full bg-stone-200">
                <div className="h-full rounded-full bg-gold" style={{ width: `${(earned / earnable.length) * 100}%` }} />
              </div>
            </div>
          </div>
          <div className="space-y-4 rounded-2xl border border-line bg-white p-5">
            <Swatches label="Skin" values={skinTones} value={look.skin} onPick={(skin) => set({ skin })} />
            <Swatches label="Hair color" values={hairColors} value={look.hairColor} onPick={(hairColor) => set({ hairColor })} />
            <div>
              <p className="text-xs font-medium text-muted">Expression</p>
              <div className="mt-2 flex gap-2">
                {expressions.map((e) => (
                  <button
                    key={e}
                    onClick={() => set({ expression: e })}
                    aria-pressed={look.expression === e}
                    className={`rounded-lg px-3 py-1.5 text-sm font-medium ${look.expression === e ? "bg-ink text-white" : "bg-stone-100 text-muted hover:text-ink"}`}
                  >
                    {EXPRESSION_LABEL[e]}
                  </button>
                ))}
              </div>
            </div>
          </div>
          <MysteryBox
            look={look}
            balance={state.balance}
            progress={state.progress}
            owned={unlocked}
            onWear={(item) => {
              setTab(item.slot);
              save({ look: { ...look, [item.slot]: item.id } });
            }}
          />
        </aside>

        <section>
          <div className="flex overflow-x-auto rounded-xl bg-stone-100 p-1" role="tablist">
            {TABS.map((t) => (
              <button
                key={t.slot}
                role="tab"
                aria-selected={tab === t.slot}
                onClick={() => setTab(t.slot)}
                className={`relative flex-1 rounded-lg px-3 py-2 text-sm font-medium whitespace-nowrap transition ${tab === t.slot ? "bg-white text-ink shadow-sm" : "text-muted"}`}
              >
                {t.label}
                {wardrobe.some((i) => i.slot === t.slot && newAtOpen.has(i.id)) && (
                  <span className="absolute top-1.5 right-1.5 h-1.5 w-1.5 rounded-full bg-wrong" />
                )}
              </button>
            ))}
          </div>

          <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-4">
            {optional && (
              <button
                onClick={() => set({ [tab]: null })}
                className={`rounded-2xl border bg-white p-3 text-center transition ${current === null ? "border-brand ring-2 ring-brand" : "border-line hover:border-stone-300"}`}
              >
                <Avatar look={{ ...look, [tab]: null }} size={88} className="mx-auto" framing={framing} />
                <p className="mt-2 text-sm font-medium">None</p>
              </button>
            )}
            {items.map((item) => {
              const open = unlocked.has(item.id);
              const on = current === item.id;
              return (
                <button
                  key={item.id}
                  disabled={!open}
                  onClick={() => set({ [tab]: item.id })}
                  className={`relative rounded-2xl border p-3 text-center transition ${
                    on ? "border-brand bg-white ring-2 ring-brand" : open ? "border-line bg-white hover:border-stone-300" : "cursor-default border-dashed border-stone-300 bg-stone-50"
                  }`}
                >
                  {rarityOf(item) && (
                    <span className={`absolute top-2 right-2 rounded-full px-1.5 py-0.5 text-[10px] font-bold uppercase ${RARITY[rarityOf(item)!].chip}`}>
                      {RARITY[rarityOf(item)!].label}
                    </span>
                  )}
                  {newAtOpen.has(item.id) && (
                    <span className="absolute top-2 left-2 rounded-full bg-wrong px-1.5 py-0.5 text-[10px] font-bold text-white uppercase">New</span>
                  )}
                  <span className="mx-auto block w-fit">
                    <ItemPreview look={look} item={item} size={88} locked={!open} framing={framing} />
                  </span>
                  <p className="mt-2 text-sm font-medium">{item.name}</p>
                  {!open && <p className="mt-0.5 text-xs text-muted">{unlockHint(item)}</p>}
                </button>
              );
            })}
          </div>
        </section>
      </div>

      <section>
        <Eyebrow>Skill journeys</Eyebrow>
        <h2 className="mt-1 text-2xl font-semibold tracking-tight">Every skill is a journey</h2>
        <p className="mt-1 text-muted">Reach the halfway point for one item and finish the journey for its signature piece. Each unit has its own outfit theme.</p>
        {(["rw", "math"] as Section[]).map((section) => (
          <div key={section} className="mt-8">
            <h3 className="text-sm font-semibold text-muted">{sectionTitles[section]}</h3>
            <div className="mt-3 grid gap-4 md:grid-cols-2">
              {units
                .filter((u) => u.section === section)
                .map((u) => (
                  <div key={u.slug} className="rounded-2xl border border-line bg-white p-5">
                    <div className="flex items-baseline justify-between gap-2">
                      <h4 className="font-semibold">{u.title}</h4>
                      <span className="text-xs font-medium text-muted">{journeyThemes[u.slug]} set</span>
                    </div>
                    <ul className="mt-3 divide-y divide-line">
                      {u.skills.map((sk) => {
                        const j = journeyStatus(sk.slug, state.progress);
                        const r = journeyRewards(sk.slug);
                        return (
                          <li key={sk.slug} className="flex items-center justify-between gap-3 py-3">
                            <div className="min-w-0">
                              <p className="truncate text-sm font-medium">{sk.title}</p>
                              <p className="text-xs text-muted">{j.total ? `${j.done} of ${j.total} lessons` : "Coming soon"}</p>
                            </div>
                            <div className="flex shrink-0 gap-1.5">
                              {[r.half, r.end].map(
                                (it) =>
                                  it && (
                                    <span key={it.id} title={`${it.name}: ${unlockHint(it)}`}>
                                      <ItemPreview look={look} item={it} size={36} locked={!unlocked.has(it.id)} />
                                    </span>
                                  ),
                              )}
                            </div>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                ))}
            </div>
          </div>
        ))}
        <div className="mt-8 text-center">
          <Link href="/learn" className="btn-green">
            Start a journey
            <Icon name="arrow" className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
