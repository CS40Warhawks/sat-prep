// Practice progress, stored in the browser until accounts exist.
const KEY = "peakprep:progress:v1";

export interface SkillProgress {
  best: number;
  total: number;
  attempts: number;
}

type ProgressMap = Record<string, SkillProgress>;

function read(): ProgressMap {
  try {
    return JSON.parse(localStorage.getItem(KEY) ?? "{}") as ProgressMap;
  } catch {
    return {};
  }
}

export function getProgress(skill: string): SkillProgress | undefined {
  return read()[skill];
}

export function recordSession(skill: string, correct: number, total: number): SkillProgress {
  const all = read();
  const prev = all[skill];
  const next = {
    best: Math.max(prev?.best ?? 0, correct),
    total,
    attempts: (prev?.attempts ?? 0) + 1,
  };
  all[skill] = next;
  try {
    localStorage.setItem(KEY, JSON.stringify(all));
  } catch {
    // Storage unavailable (private mode); progress just isn't saved.
  }
  return next;
}
