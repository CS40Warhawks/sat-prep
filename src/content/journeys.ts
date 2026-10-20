import { boundariesLessons } from "./rw/boundaries.path";
import { transitionsLessons } from "./rw/transitions.path";
import { wordsInContextLessons } from "./rw/words-in-context.path";
import { formStructureSenseLessons } from "./rw/form-structure-sense.path";
import { centralIdeasLessons } from "./rw/central-ideas.path";
import { linearEquationsOneVariableLessons } from "./math/linear-equations-one-variable.path";
import { linearFunctionsLessons } from "./math/linear-functions.path";
import { systemsLessons } from "./math/systems.path";
import { percentagesLessons } from "./math/percentages.path";

/** Lesson slugs for each skill journey, in path order. Skills without lessons are "coming soon". */
export const journeyLessons: Record<string, string[]> = {
  boundaries: boundariesLessons.map((l) => l.slug),
  "transitions": transitionsLessons.map((l) => l.slug),
  "words-in-context": wordsInContextLessons.map((l) => l.slug),
  "form-structure-sense": formStructureSenseLessons.map((l) => l.slug),
  "central-ideas": centralIdeasLessons.map((l) => l.slug),
  "linear-equations-one-variable": linearEquationsOneVariableLessons.map((l) => l.slug),
  "linear-functions": linearFunctionsLessons.map((l) => l.slug),
  "systems": systemsLessons.map((l) => l.slug),
  "percentages": percentagesLessons.map((l) => l.slug),
};
