import type { Lesson } from "@/lib/types";

// Words in Context, split into short lessons for the learning path.
export const wordsInContextLessons: Lesson[] = [
  {
    slug: "find-the-clue",
    title: "Find the clue",
    tips: [
      {
        title: "Predict before you peek",
        body: "Cover the choices and read the whole text. Put your own simple word in the blank, then pick the choice closest to it.",
        example: { right: "\"The population grew only ___, by just a few hundred.\" ← predict \"a little\"" },
      },
      {
        title: "Colons explain the blank",
        body: "Whatever comes after a colon usually describes the blank word. Read it closely, because it's often a near-definition.",
        example: { right: "The building is flexible: its rooms can be rearranged for any event." },
      },
      {
        title: "The answer is in the text",
        body: "Every right answer is supported by words in the passage. If you can't point to the clue that backs up a choice, it's probably a trap.",
      },
    ],
    questionIds: ["rw-words-in-context-002", "rw-words-in-context-006", "rw-words-in-context-003", "rw-words-in-context-007", "rw-words-in-context-005"],
  },
  {
    slug: "signal-words",
    title: "Follow the signal words",
    tips: [
      {
        title: "Contrast words flip the meaning",
        body: "But, although, though, and rather than tell you the blank goes the opposite way from the other part of the sentence.",
        example: { wrong: "Early reviewers dismissed her colors, but later critics confirmed that judgment.", right: "Early reviewers dismissed her colors, but later critics overturned that judgment." },
      },
      {
        title: "Support words keep the direction",
        body: "Words like and, because, which allows, and so tell you the blank agrees with or leads to the rest of the sentence.",
        example: { right: "Their calls are distinct, which allows researchers to tell them apart." },
      },
      {
        title: "Watch for opposite traps",
        body: "One wrong choice is often the exact opposite of the right answer. If a choice would fit perfectly without the signal word, double-check it.",
      },
    ],
    questionIds: ["rw-words-in-context-001", "rw-words-in-context-004", "rw-words-in-context-010", "rw-words-in-context-011", "rw-words-in-context-012"],
  },
  {
    slug: "precise-meanings",
    title: "Precise meanings",
    tips: [
      {
        title: "Common words, uncommon meanings",
        body: "The test loves everyday words used in a less common way. Arrest can mean stop. Check can mean limit. Qualified can mean limited. Don't rule a word out just because you know a different meaning.",
        example: { right: "The drug arrested the infection. ← stopped it" },
      },
      {
        title: "Match the strength",
        body: "Precise means the right amount, too. If the text says \"only\" or \"just,\" a strong word like dramatic or enthusiastic is too much.",
        example: { wrong: "The committee gave only enthusiastic support.", right: "The committee gave only qualified support." },
      },
      {
        title: "Plug it back in",
        body: "Once you choose, read the whole sentence with your word in the blank. It should sound natural and match every clue, not just one.",
      },
    ],
    questionIds: ["rw-words-in-context-013", "rw-words-in-context-015", "rw-words-in-context-008", "rw-words-in-context-014", "rw-words-in-context-009"],
  },
  {
    slug: "review",
    title: "Skill review",
    tips: [],
    questionIds: [],
    review: true,
  },
];
