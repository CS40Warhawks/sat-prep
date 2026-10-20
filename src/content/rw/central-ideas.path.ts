import type { Lesson } from "@/lib/types";

// Central Ideas and Details, split into short lessons for the learning path.
export const centralIdeasLessons: Lesson[] = [
  {
    slug: "main-idea",
    title: "Finding the main idea",
    tips: [
      {
        title: "Sum it up first",
        body: "Before you look at the choices, say what the whole text is about in one short sentence. Then pick the choice closest to yours.",
        example: { right: "\"Desert soil crusts are alive and help the desert.\" ← your summary" },
      },
      {
        title: "Check the first and last sentences",
        body: "The topic often shows up early, and the point or conclusion often comes at the end. The middle usually holds examples that support it.",
      },
      {
        title: "The answer covers the whole text",
        body: "The right choice fits every sentence. A choice that only matches one detail is too narrow, even if it's true.",
        example: { wrong: "Mosses grow in desert crusts. (just one detail)", right: "Living crusts play important roles in deserts." },
      },
    ],
    questionIds: [
      "rw-central-ideas-001",
      "rw-central-ideas-013",
      "rw-central-ideas-005",
      "rw-central-ideas-003",
      "rw-central-ideas-014",
    ],
  },
  {
    slug: "key-details",
    title: "Key details",
    tips: [
      {
        title: "\"According to the text\" means find it",
        body: "Detail questions are open-book. Find the sentence that answers the question, and choose the option that says the same thing in different words.",
      },
      {
        title: "Right words, wrong idea",
        body: "Wrong choices often reuse words from the text but change what they mean, or flip cause and effect. Check that the whole choice matches.",
        example: { wrong: "Kelp grew because otters disappeared.", right: "Urchins grew in number, and kelp declined." },
      },
      {
        title: "No outside knowledge",
        body: "A choice might be true in real life but not stated in the text. If you can't point to where the text says it, don't pick it.",
      },
    ],
    questionIds: [
      "rw-central-ideas-002",
      "rw-central-ideas-004",
      "rw-central-ideas-006",
      "rw-central-ideas-007",
      "rw-central-ideas-008",
    ],
  },
  {
    slug: "answer-traps",
    title: "Dodging answer traps",
    tips: [
      {
        title: "Watch for the pivot",
        body: "Texts often start with an old view, then turn with \"but,\" \"however,\" or \"more recent research.\" The main idea usually comes after the turn.",
        example: { wrong: "Historians agree the Middle Ages lacked progress. (the old view)", right: "Newer research says the period was more productive than once thought." },
      },
      {
        title: "Too strong is wrong",
        body: "Be suspicious of \"only,\" \"always,\" \"most,\" \"more than any,\" and advice the text never gives. The right answer is usually as careful as the text.",
      },
      {
        title: "Stories have main ideas too",
        body: "For a passage from a novel, ask what the character feels or realizes and why. Base it on what the text shows, not on what might happen next.",
      },
    ],
    questionIds: [
      "rw-central-ideas-009",
      "rw-central-ideas-011",
      "rw-central-ideas-015",
      "rw-central-ideas-010",
      "rw-central-ideas-012",
    ],
  },
  {
    slug: "review",
    title: "Skill review",
    tips: [],
    questionIds: [],
    review: true,
  },
];
