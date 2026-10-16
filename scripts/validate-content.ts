// Checks every question bank for structural mistakes. Run with `npm run validate`.
import { units } from "../src/content/catalog.ts";
import { boundariesQuestions } from "../src/content/rw/boundaries.questions.ts";
import { BLANK, fillBlank } from "../src/lib/passage.ts";
import type { Question } from "../src/lib/types.ts";

const banks: Record<string, Question[]> = {
  boundaries: boundariesQuestions,
};

const errors: string[] = [];
const ids = new Set<string>();

for (const unit of units) {
  for (const skill of unit.skills) {
    if (skill.available && !banks[skill.slug]) errors.push(`${skill.slug}: marked available but has no question bank`);
  }
}

for (const [slug, questions] of Object.entries(banks)) {
  if (questions.length < 10) errors.push(`${slug}: only ${questions.length} questions (minimum 10)`);
  for (const q of questions) {
    const where = `${slug}/${q.id}`;
    if (ids.has(q.id)) errors.push(`${where}: duplicate id`);
    ids.add(q.id);
    if (q.skill !== slug) errors.push(`${where}: skill is "${q.skill}"`);
    if (q.passage.split(BLANK).length !== 2) errors.push(`${where}: passage needs exactly one blank`);
    const letters = q.choices.map((c) => c.letter).join("");
    if (letters !== "ABCD") errors.push(`${where}: choices are "${letters}", expected ABCD`);
    if (!q.choices.some((c) => c.letter === q.answer)) errors.push(`${where}: answer ${q.answer} is not a choice`);
    if (new Set(q.choices.map((c) => c.text)).size !== q.choices.length) errors.push(`${where}: duplicate choice text`);
    for (const c of q.choices) {
      if (c.explanation.trim().length < 15) errors.push(`${where}: choice ${c.letter} needs an explanation`);
      const startsCorrect = c.explanation.startsWith("Correct");
      if (startsCorrect !== (c.letter === q.answer)) errors.push(`${where}: choice ${c.letter} explanation contradicts the key`);
    }
    if (fillBlank(q.passage, "x").includes("  ")) errors.push(`${where}: double space in passage`);
  }
}

const counts = Object.entries(banks).map(([s, qs]) => {
  const byAnswer = qs.reduce<Record<string, number>>((m, q) => ((m[q.answer] = (m[q.answer] ?? 0) + 1), m), {});
  return `${s}: ${qs.length} questions, answers ${JSON.stringify(byAnswer)}`;
});

if (errors.length) {
  console.error(errors.join("\n"));
  process.exit(1);
}
console.log(`Content OK\n${counts.join("\n")}`);
