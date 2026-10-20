import type { Lesson } from "@/lib/types";

const id = (n: string) => `math-linear-equations-one-variable-${n}`;

// Linear Equations in One Variable, split into short lessons for the learning path.
export const linearEquationsOneVariableLessons: Lesson[] = [
  {
    slug: "isolate-the-variable",
    title: "Isolate the variable",
    tips: [
      {
        title: "Undo in reverse order",
        body: "Solving means peeling operations off x. Undo adding or subtracting first, then undo multiplying or dividing. Whatever you do to one side, do to the other.",
        example: { right: "6x + 5 = 41 → 6x = 36 → x = 6" },
      },
      {
        title: "Distribute to every term",
        body: "A number outside parentheses multiplies everything inside. Forgetting the second term is the most common slip on the test.",
        example: { wrong: "4(x − 6) = 4x − 6", right: "4(x − 6) = 4x − 24" },
      },
      {
        title: "Collect x on one side",
        body: "When x shows up on both sides, subtract the smaller x term from both sides first. Then plug your answer back in to check.",
        example: { right: "8x − 3 = 5x + 12 → 3x − 3 = 12 → 3x = 15 → x = 5" },
      },
    ],
    questionIds: [id("001"), id("002"), id("004"), id("009"), id("014")],
  },
  {
    slug: "fractions-and-word-problems",
    title: "Fractions and word problems",
    tips: [
      {
        title: "Clear fractions first",
        body: "Multiply every term on both sides by the least common denominator. The fractions disappear and you're left with a plain equation.",
        example: { right: "x/2 + x/5 = 21 → (×10) → 5x + 2x = 210 → x = 30" },
      },
      {
        title: "Turn the story into an equation",
        body: "Name the unknown, then write \"start + rate × amount = total.\" A one-time fee is added once; a per-month or per-item charge is multiplied.",
        example: { right: "$30 fee + $12 per class, $114 total → 30 + 12c = 114" },
      },
      {
        title: "\"When are they equal?\" means set them equal",
        body: "If two quantities change at different rates, write an expression for each and set them equal. Then reread the question: it may ask for the time, not the amount.",
        example: { right: "80 − 4t = 50 − 1.5t → 30 = 2.5t → t = 12" },
      },
    ],
    questionIds: [id("003"), id("005"), id("008"), id("010"), id("012"), id("013")],
  },
  {
    slug: "how-many-solutions",
    title: "How many solutions?",
    tips: [
      {
        title: "Simplify both sides, then compare",
        body: "Write each side as (number)x + (number). Different x coefficients: exactly one solution. Same x coefficient, different constants: no solution. Everything the same: infinitely many.",
        example: { right: "3(x + 2) = 3x + 1 → 3x + 6 = 3x + 1 → 6 = 1 → no solution" },
      },
      {
        title: "Match the pieces to find a constant",
        body: "If the question says \"infinitely many solutions,\" both sides must be identical. Set the x coefficients equal and the constants equal.",
        example: { right: "4(x + k) = 4x + 28 → 4k = 28 → k = 7" },
      },
      {
        title: "x = 0 is a real solution",
        body: "Getting 0 for x doesn't mean there's no solution. \"No solution\" only happens when the x terms cancel and leave a false statement.",
        example: { wrong: "2x = 0, so there's no solution", right: "2x = 0, so x = 0 (one solution)" },
      },
    ],
    questionIds: [id("006"), id("007"), id("011"), id("015")],
  },
  {
    slug: "review",
    title: "Skill review",
    tips: [],
    questionIds: [],
    review: true,
  },
];
