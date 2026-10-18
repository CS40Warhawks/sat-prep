import { questionsPerTest, units } from "@/content/catalog";
import type { Section, Skill, Unit } from "./types";

// Diagnostic results, stored in the browser until accounts exist.
const KEY = "peakprep:diagnostic:v1";

/** strong: first question right. review: first wrong, follow-up right. focus: both wrong. */
export type SkillStatus = "strong" | "review" | "focus";

export interface SectionResult {
  takenAt: string;
  skills: Record<string, SkillStatus>;
  /** Ids of questions answered incorrectly or skipped, for review. */
  missed: string[];
}

export type DiagnosticResults = Partial<Record<Section, SectionResult>>;

export function loadDiagnostic(): DiagnosticResults {
  try {
    return JSON.parse(localStorage.getItem(KEY) ?? "{}") as DiagnosticResults;
  } catch {
    return {};
  }
}

export function saveSection(section: Section, result: SectionResult) {
  const all = { ...loadDiagnostic(), [section]: result };
  try {
    localStorage.setItem(KEY, JSON.stringify(all));
  } catch {
    // Storage unavailable; results only last for this visit.
  }
  return all;
}

const NEED: Record<SkillStatus, number> = { focus: 1, review: 0.5, strong: 0 };

export interface PlanItem {
  unit: Unit;
  skill: Skill;
  status: SkillStatus;
  /** Approximate questions per real test that come from this skill. */
  perTest: number;
  priority: number;
}

/** Every diagnosed skill, biggest expected payoff first: how often it's tested times how much work it needs. */
export function buildPlan(results: DiagnosticResults): PlanItem[] {
  const items: PlanItem[] = [];
  for (const unit of units) {
    const section = results[unit.section];
    if (!section) continue;
    for (const skill of unit.skills) {
      const status = section.skills[skill.slug];
      if (!status) continue;
      const perTest = questionsPerTest(unit);
      items.push({ unit, skill, status, perTest, priority: perTest * NEED[status] });
    }
  }
  return items.sort((a, b) => b.priority - a.priority || b.perTest - a.perTest);
}
