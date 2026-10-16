import type { ComponentType } from "react";
import type { Question } from "@/lib/types";
import { BoundariesLesson } from "./rw/boundaries.lesson";
import { boundariesQuestions } from "./rw/boundaries.questions";

interface SkillContent {
  Lesson: ComponentType;
  questions: Question[];
}

// Every skill marked `available` in the catalog needs an entry here.
export const skillContent: Record<string, SkillContent> = {
  boundaries: { Lesson: BoundariesLesson, questions: boundariesQuestions },
};
