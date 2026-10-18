import type { ComponentType } from "react";
import type { Lesson, Question } from "@/lib/types";
import { BoundariesLesson } from "./rw/boundaries.lesson";
import { boundariesLessons } from "./rw/boundaries.path";
import { boundariesQuestions } from "./rw/boundaries.questions";

interface SkillContent {
  /** Full written lesson, shown as the skill's guidebook. */
  Guidebook: ComponentType;
  lessons: Lesson[];
  questions: Question[];
}

// Every skill marked `available` in the catalog needs an entry here.
export const skillContent: Record<string, SkillContent> = {
  boundaries: { Guidebook: BoundariesLesson, lessons: boundariesLessons, questions: boundariesQuestions },
};
