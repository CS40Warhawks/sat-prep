// Learner progress, stored in the browser until accounts exist.
const KEY = "peakprep:progress:v2";
export const DAILY_GOAL = 30;

export interface LessonRecord {
  completions: number;
  bestAccuracy: number;
}

export interface Progress {
  xp: number;
  streak: number;
  /** Longest streak so far, so streak rewards stay earned after a missed day. */
  bestStreak: number;
  /** Local date (YYYY-MM-DD) of the last finished lesson. */
  lastActive: string | null;
  todayXp: number;
  lessons: Record<string, LessonRecord>;
}

const empty: Progress = { xp: 0, streak: 0, bestStreak: 0, lastActive: null, todayXp: 0, lessons: {} };

export function localDay(d = new Date()): string {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

function daysBetween(a: string, b: string): number {
  return Math.round((Date.parse(b) - Date.parse(a)) / 86_400_000);
}

export function lessonKey(skill: string, lesson: string) {
  return `${skill}/${lesson}`;
}

/** Progress as of today: a missed day resets the streak, and daily XP starts over each day. */
export function loadProgress(): Progress {
  let p: Progress;
  try {
    p = { ...empty, ...JSON.parse(localStorage.getItem(KEY) ?? "{}") };
  } catch {
    p = { ...empty };
  }
  // Older saves have no bestStreak; their current streak is the best one known.
  p.bestStreak = Math.max(p.bestStreak ?? 0, p.streak);
  const today = localDay();
  if (p.lastActive && p.lastActive !== today) {
    p.todayXp = 0;
    if (daysBetween(p.lastActive, today) > 1) p.streak = 0;
  }
  return p;
}

export function xpForLesson(correctFirstTry: number, total: number): number {
  return 10 + correctFirstTry + (correctFirstTry === total ? 5 : 0);
}

export function finishLesson(skill: string, lesson: string, correctFirstTry: number, total: number) {
  const p = loadProgress();
  const today = localDay();
  const extendedStreak = p.lastActive !== today;
  const xp = xpForLesson(correctFirstTry, total);
  const key = lessonKey(skill, lesson);
  const prev = p.lessons[key];
  const streak = extendedStreak ? p.streak + 1 : p.streak;
  const next: Progress = {
    xp: p.xp + xp,
    streak,
    bestStreak: Math.max(p.bestStreak, streak),
    lastActive: today,
    todayXp: p.todayXp + xp,
    lessons: {
      ...p.lessons,
      [key]: {
        completions: (prev?.completions ?? 0) + 1,
        bestAccuracy: Math.max(prev?.bestAccuracy ?? 0, correctFirstTry / total),
      },
    },
  };
  try {
    localStorage.setItem(KEY, JSON.stringify(next));
  } catch {
    // Storage unavailable (private mode); progress just isn't saved.
  }
  return { before: p, progress: next, xp, extendedStreak };
}
