"use client";

import { DAILY_GOAL } from "@/lib/progress";
import { useProgress } from "./useProgress";

export function StatsBar() {
  const p = useProgress();
  const streak = p?.streak ?? 0;
  const goalPct = Math.min(1, (p?.todayXp ?? 0) / DAILY_GOAL);
  return (
    <div className="flex items-center gap-4 text-sm font-extrabold">
      <span className={streak > 0 ? "text-flame" : "text-[#afafaf]"} title="Day streak">
        🔥 {streak}
      </span>
      <span className="text-gold-dark" title="Total XP">
        ⚡ {p?.xp ?? 0}
      </span>
      <span className="flex items-center gap-1.5 text-muted" title={`Daily goal: ${DAILY_GOAL} XP`}>
        <svg viewBox="0 0 36 36" className="h-6 w-6 -rotate-90" aria-hidden>
          <circle cx="18" cy="18" r="15" fill="none" stroke="var(--color-line)" strokeWidth="5" />
          <circle
            cx="18" cy="18" r="15" fill="none" stroke="var(--color-brand)" strokeWidth="5" strokeLinecap="round"
            strokeDasharray={`${goalPct * 94.2} 94.2`}
          />
        </svg>
        <span className="sr-only sm:not-sr-only">
          {Math.min(p?.todayXp ?? 0, DAILY_GOAL)}/{DAILY_GOAL}
        </span>
      </span>
    </div>
  );
}
