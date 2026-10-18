import type { Section } from "@/lib/types";
import { units } from "./catalog";
import { diagnosticQuestions } from "./diagnostic";

/** Each skill in a section with its first question and follow-up, in course order. */
export function diagnosticPairs(section: Section) {
  return units
    .filter((u) => u.section === section)
    .flatMap((u) => u.skills)
    .map((s) => {
      const [first, followUp] = diagnosticQuestions.filter((q) => q.skill === s.slug);
      return { skill: s.slug, title: s.title, first, followUp };
    });
}
