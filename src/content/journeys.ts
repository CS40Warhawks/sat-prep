import { boundariesLessons } from "./rw/boundaries.path";

/** Lesson slugs for each skill journey, in path order. Skills without lessons are "coming soon". */
export const journeyLessons: Record<string, string[]> = {
  boundaries: boundariesLessons.map((l) => l.slug),
};
