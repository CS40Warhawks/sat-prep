import type { Lesson } from "@/lib/types";

// Boundaries, split into short lessons for the learning path.
export const boundariesLessons: Lesson[] = [
  {
    slug: "joining-sentences",
    title: "Joining sentences",
    tips: [
      {
        title: "Spot the complete sentences",
        body: "Every Boundaries question is about punctuation. First, check the words on each side of the blank. Could each side stand alone as a sentence?",
        example: { right: "The bridge was built to survive earthquakes. ← complete sentence" },
      },
      {
        title: "Two sentences need real glue",
        body: "Join two complete sentences with a period, a semicolon, or a comma + and/but/so (FANBOYS). A comma alone is a splice.",
        example: { wrong: "It rarely rains there, some stations have never recorded rain.", right: "It rarely rains there; some stations have never recorded rain." },
      },
      {
        title: "Intro pieces get a comma",
        body: "If the first part can't stand alone (\"Although…\", \"Founded in 1891…\"), follow it with a comma. Never a period or semicolon.",
        example: { wrong: "Although the recipe is short; it takes all day.", right: "Although the recipe is short, it takes all day." },
      },
    ],
    questionIds: ["rw-boundaries-001", "rw-boundaries-002", "rw-boundaries-012", "rw-boundaries-014", "rw-boundaries-013"],
  },
  {
    slug: "colons-and-transitions",
    title: "Colons and transitions",
    tips: [
      {
        title: "Colons explain",
        body: "A colon goes after a complete sentence and introduces a list or explanation.",
        example: { wrong: "The collection includes: fossils and meteorites.", right: "Octopuses have three hearts: two pump blood to the gills." },
      },
      {
        title: "\"However\" is not glue",
        body: "Transition words like however, therefore, and moreover can't join two sentences on their own. Use a semicolon before them and a comma after.",
        example: { wrong: "The cars were quiet, however, they had little range.", right: "The cars were quiet; however, they had little range." },
      },
      {
        title: "Lists with commas inside",
        body: "When list items already contain commas (Austin, Texas), separate the items with semicolons.",
        example: { right: "Austin, Texas; Denver, Colorado; and Portland, Oregon" },
      },
    ],
    questionIds: ["rw-boundaries-003", "rw-boundaries-010", "rw-boundaries-009", "rw-boundaries-011", "rw-boundaries-008"],
  },
  {
    slug: "extra-information",
    title: "Extra information",
    tips: [
      {
        title: "Removable info gets a matching pair",
        body: "If you could delete the phrase and the sentence would still make sense, set it off with two commas or two dashes. Close it the same way you opened it.",
        example: { wrong: "The chapter—rewritten eleven times, is the best.", right: "The chapter—rewritten eleven times—is the best." },
      },
      {
        title: "Essential info gets nothing",
        body: "If the words tell you which one, they're essential. Don't add commas.",
        example: { wrong: "The poet, Gwendolyn Brooks, won in 1950.", right: "The poet Gwendolyn Brooks won in 1950." },
      },
      {
        title: "No-comma zones",
        body: "Never put a single comma between a subject and its verb, or between a verb and its object, however long the sentence is.",
        example: { wrong: "The researchers who studied the reefs, concluded that…", right: "The researchers who studied the reefs concluded that…" },
      },
    ],
    questionIds: ["rw-boundaries-004", "rw-boundaries-006", "rw-boundaries-005", "rw-boundaries-007", "rw-boundaries-015"],
  },
  {
    slug: "review",
    title: "Skill review",
    tips: [],
    questionIds: [],
    review: true,
  },
];
