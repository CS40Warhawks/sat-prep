import type { ComponentType } from "react";
import type { Lesson, Question } from "@/lib/types";
import { BoundariesLesson } from "./rw/boundaries.lesson";
import { boundariesLessons } from "./rw/boundaries.path";
import { boundariesQuestions } from "./rw/boundaries.questions";
import { TransitionsLesson } from "./rw/transitions.lesson";
import { transitionsLessons } from "./rw/transitions.path";
import { transitionsQuestions } from "./rw/transitions.questions";
import { WordsInContextLesson } from "./rw/words-in-context.lesson";
import { wordsInContextLessons } from "./rw/words-in-context.path";
import { wordsInContextQuestions } from "./rw/words-in-context.questions";
import { FormStructureSenseLesson } from "./rw/form-structure-sense.lesson";
import { formStructureSenseLessons } from "./rw/form-structure-sense.path";
import { formStructureSenseQuestions } from "./rw/form-structure-sense.questions";
import { CentralIdeasLesson } from "./rw/central-ideas.lesson";
import { centralIdeasLessons } from "./rw/central-ideas.path";
import { centralIdeasQuestions } from "./rw/central-ideas.questions";
import { LinearEquationsOneVariableLesson } from "./math/linear-equations-one-variable.lesson";
import { linearEquationsOneVariableLessons } from "./math/linear-equations-one-variable.path";
import { linearEquationsOneVariableQuestions } from "./math/linear-equations-one-variable.questions";
import { LinearFunctionsLesson } from "./math/linear-functions.lesson";
import { linearFunctionsLessons } from "./math/linear-functions.path";
import { linearFunctionsQuestions } from "./math/linear-functions.questions";
import { SystemsLesson } from "./math/systems.lesson";
import { systemsLessons } from "./math/systems.path";
import { systemsQuestions } from "./math/systems.questions";
import { PercentagesLesson } from "./math/percentages.lesson";
import { percentagesLessons } from "./math/percentages.path";
import { percentagesQuestions } from "./math/percentages.questions";

interface SkillContent {
  /** Full written lesson, shown as the skill's guidebook. */
  Guidebook: ComponentType;
  lessons: Lesson[];
  questions: Question[];
}

// Every skill marked `available` in the catalog needs an entry here.
export const skillContent: Record<string, SkillContent> = {
  boundaries: { Guidebook: BoundariesLesson, lessons: boundariesLessons, questions: boundariesQuestions },
  "transitions": { Guidebook: TransitionsLesson, lessons: transitionsLessons, questions: transitionsQuestions },
  "words-in-context": { Guidebook: WordsInContextLesson, lessons: wordsInContextLessons, questions: wordsInContextQuestions },
  "form-structure-sense": { Guidebook: FormStructureSenseLesson, lessons: formStructureSenseLessons, questions: formStructureSenseQuestions },
  "central-ideas": { Guidebook: CentralIdeasLesson, lessons: centralIdeasLessons, questions: centralIdeasQuestions },
  "linear-equations-one-variable": { Guidebook: LinearEquationsOneVariableLesson, lessons: linearEquationsOneVariableLessons, questions: linearEquationsOneVariableQuestions },
  "linear-functions": { Guidebook: LinearFunctionsLesson, lessons: linearFunctionsLessons, questions: linearFunctionsQuestions },
  "systems": { Guidebook: SystemsLesson, lessons: systemsLessons, questions: systemsQuestions },
  "percentages": { Guidebook: PercentagesLesson, lessons: percentagesLessons, questions: percentagesQuestions },
};
