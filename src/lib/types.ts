export type Section = "rw" | "math";
export type Difficulty = "easy" | "medium" | "hard";
export type ChoiceLetter = "A" | "B" | "C" | "D";

export interface Choice {
  letter: ChoiceLetter;
  text: string;
  /** Why this choice is right or wrong. Every choice gets one. */
  explanation: string;
}

export interface MultipleChoiceQuestion {
  id: string;
  skill: string;
  difficulty: Difficulty;
  type: "multiple-choice";
  /** Passage text. Use "______" to mark the blank. */
  passage: string;
  prompt: string;
  choices: Choice[];
  answer: ChoiceLetter;
}

export type Question = MultipleChoiceQuestion;

export interface Skill {
  slug: string;
  title: string;
  summary: string;
  /** False until the lesson and question bank are written. */
  available: boolean;
}

export interface Unit {
  slug: string;
  section: Section;
  title: string;
  skills: Skill[];
}

/** A short teaching card shown before a lesson's questions. */
export interface Tip {
  title: string;
  body: string;
  example?: { wrong?: string; right: string };
}

/** One bite-sized step on the learning path. */
export interface Lesson {
  slug: string;
  title: string;
  tips: Tip[];
  /** Question ids from the skill's bank. A review lesson leaves this empty and draws from the whole bank. */
  questionIds: string[];
  review?: boolean;
}
