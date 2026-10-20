// Checks every question bank for structural mistakes. Run with `npm run validate`.
import { units } from "../src/content/catalog.ts";
import { diagnosticQuestions } from "../src/content/diagnostic.ts";
import { boundariesLessons } from "../src/content/rw/boundaries.path.ts";
import { boundariesQuestions } from "../src/content/rw/boundaries.questions.ts";
import { transitionsLessons } from "../src/content/rw/transitions.path.ts";
import { transitionsQuestions } from "../src/content/rw/transitions.questions.ts";
import { wordsInContextLessons } from "../src/content/rw/words-in-context.path.ts";
import { wordsInContextQuestions } from "../src/content/rw/words-in-context.questions.ts";
import { formStructureSenseLessons } from "../src/content/rw/form-structure-sense.path.ts";
import { formStructureSenseQuestions } from "../src/content/rw/form-structure-sense.questions.ts";
import { centralIdeasLessons } from "../src/content/rw/central-ideas.path.ts";
import { centralIdeasQuestions } from "../src/content/rw/central-ideas.questions.ts";
import { linearEquationsOneVariableLessons } from "../src/content/math/linear-equations-one-variable.path.ts";
import { linearEquationsOneVariableQuestions } from "../src/content/math/linear-equations-one-variable.questions.ts";
import { linearFunctionsLessons } from "../src/content/math/linear-functions.path.ts";
import { linearFunctionsQuestions } from "../src/content/math/linear-functions.questions.ts";
import { systemsLessons } from "../src/content/math/systems.path.ts";
import { systemsQuestions } from "../src/content/math/systems.questions.ts";
import { percentagesLessons } from "../src/content/math/percentages.path.ts";
import { percentagesQuestions } from "../src/content/math/percentages.questions.ts";
import { BLANK, fillBlank } from "../src/lib/passage.ts";
import type { Lesson, Question } from "../src/lib/types.ts";
import { wardrobe } from "../src/content/wardrobe.ts";

const banks: Record<string, Question[]> = {
  boundaries: boundariesQuestions,
  "transitions": transitionsQuestions,
  "words-in-context": wordsInContextQuestions,
  "form-structure-sense": formStructureSenseQuestions,
  "central-ideas": centralIdeasQuestions,
  "linear-equations-one-variable": linearEquationsOneVariableQuestions,
  "linear-functions": linearFunctionsQuestions,
  "systems": systemsQuestions,
  "percentages": percentagesQuestions,
};
// Checked with the same rules as skill banks, but it spans every skill and has no lesson path.
const DIAGNOSTIC = "diagnostic";
banks[DIAGNOSTIC] = diagnosticQuestions;

const paths: Record<string, Lesson[]> = {
  boundaries: boundariesLessons,
  "transitions": transitionsLessons,
  "words-in-context": wordsInContextLessons,
  "form-structure-sense": formStructureSenseLessons,
  "central-ideas": centralIdeasLessons,
  "linear-equations-one-variable": linearEquationsOneVariableLessons,
  "linear-functions": linearFunctionsLessons,
  "systems": systemsLessons,
  "percentages": percentagesLessons,
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
    if (slug !== DIAGNOSTIC && q.skill !== slug) errors.push(`${where}: skill is "${q.skill}"`);
    if (q.passage.split(BLANK).length > 2) errors.push(`${where}: passage has more than one blank`);
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

for (const [slug, lessons] of Object.entries(paths)) {
  const bank = new Set((banks[slug] ?? []).map((q) => q.id));
  const used = new Set<string>();
  const slugs = new Set<string>();
  for (const l of lessons) {
    if (slugs.has(l.slug)) errors.push(`${slug}: duplicate lesson slug ${l.slug}`);
    slugs.add(l.slug);
    if (!l.review && l.questionIds.length < 3) errors.push(`${slug}/${l.slug}: needs at least 3 questions`);
    for (const id of l.questionIds) {
      if (!bank.has(id)) errors.push(`${slug}/${l.slug}: unknown question ${id}`);
      if (used.has(id)) errors.push(`${slug}/${l.slug}: question ${id} is already in another lesson`);
      used.add(id);
    }
  }
  for (const id of bank) if (!used.has(id)) errors.push(`${slug}: question ${id} isn't in any lesson`);
}
for (const slug of Object.keys(banks)) if (slug !== DIAGNOSTIC && !paths[slug]) errors.push(`${slug}: has questions but no lesson path`);

// Diagnostic: two questions for every skill in the catalog, and nothing else.
const catalogSkills = new Set(units.flatMap((u) => u.skills.map((s) => s.slug)));
for (const slug of catalogSkills) {
  const n = diagnosticQuestions.filter((q) => q.skill === slug).length;
  if (n !== 2) errors.push(`diagnostic: ${slug} has ${n} questions, expected 2`);
}
for (const q of diagnosticQuestions) if (!catalogSkills.has(q.skill)) errors.push(`diagnostic/${q.id}: unknown skill ${q.skill}`);

const counts = Object.entries(banks).map(([s, qs]) => {
  const byAnswer = qs.reduce<Record<string, number>>((m, q) => ((m[q.answer] = (m[q.answer] ?? 0) + 1), m), {});
  return `${s}: ${qs.length} questions, answers ${JSON.stringify(byAnswer)}`;
});

// Avatar items: unique ids, and every skill journey has exactly one halfway and one end reward.
const itemIds = new Set<string>();
for (const it of wardrobe) {
  if (itemIds.has(it.id)) errors.push(`wardrobe/${it.id}: duplicate id`);
  itemIds.add(it.id);
}
const skillSlugs = new Set(units.flatMap((u) => u.skills.map((s) => s.slug)));
for (const skill of skillSlugs) {
  for (const stage of ["half", "end"]) {
    const n = wardrobe.filter((i) => i.unlock.kind === "journey" && i.unlock.skill === skill && i.unlock.stage === stage).length;
    if (n !== 1) errors.push(`wardrobe: ${skill} has ${n} "${stage}" rewards, expected 1`);
  }
}
for (const rarity of ["common", "rare", "legendary"]) {
  if (!wardrobe.some((i) => i.unlock.kind === "box" && i.unlock.rarity === rarity)) errors.push(`wardrobe: no ${rarity} mystery box items`);
}
for (const it of wardrobe) {
  if (it.unlock.kind === "journey" && !skillSlugs.has(it.unlock.skill)) errors.push(`wardrobe/${it.id}: unknown skill ${it.unlock.skill}`);
}

if (errors.length) {
  console.error(errors.join("\n"));
  process.exit(1);
}
console.log(`Content OK\n${counts.join("\n")}\nwardrobe: ${wardrobe.length} items`);
