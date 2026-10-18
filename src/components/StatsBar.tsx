"use client";

import { DAILY_GOAL } from "@/lib/progress";
import { Icon } from "./ui";
import { useProgress } from "./useProgress";

export function StatsBar() {
  const p = useProgress();
  const streak = p?.streak ?? 0;
  const today = Math.min(p?.todayXp ?? 0, DAILY_GOAL);
  return (
    <div className="flex items-center gap-4 text-sm font-semibold tabular-nums">
      <span className={`flex items-center gap-1 ${streak > 0 ? "text-flame" : "text-stone-300"}`} title="Day streak">
        <Icon name="flame" className="h-4 w-4" />
        {streak}
      </span>
      <span className="flex items-center gap-1 text-gold" title="Total XP">
        <Icon name="bolt" className="h-4 w-4" />
        <span className="text-ink">{p?.xp ?? 0}</span>
      </span>
      <span className="flex items-center gap-1.5 text-muted" title={`Daily goal: ${DAILY_GOAL} XP`}>
        <svg viewBox="0 0 36 36" className="h-5 w-5 -rotate-90" aria-hidden>
          <circle cx="18" cy="18" r="15" fill="none" stroke="var(--color-line)" strokeWidth="5" />
          <circle
            cx="18" cy="18" r="15" fill="none" stroke="var(--color-brand)" strokeWidth="5" strokeLinecap="round"
            strokeDasharray={`${(today / DAILY_GOAL) * 94.2} 94.2`}
          />
        </svg>
        <span className="sr-only sm:not-sr-only">
          {today}/{DAILY_GOAL}
        </span>
      </span>
    </div>
  );
}
