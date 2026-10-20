import type { Lesson } from "@/lib/types";

// Systems of Linear Equations, split into short lessons for the learning path.
export const systemsLessons: Lesson[] = [
  {
    slug: "solving-systems",
    title: "Solving a system",
    tips: [
      {
        title: "Substitute when a variable is alone",
        body: "If one equation already reads y = … or x = …, plug that expression into the other equation. Then you have one equation with one variable.",
        example: { right: "y = 3x and 2x + y = 20 → 2x + 3x = 20 → x = 4" },
      },
      {
        title: "Eliminate when coefficients match",
        body: "If a variable has the same or opposite coefficients in both equations, add or subtract the equations to cancel it.",
        example: { right: "(5x + 3y = 23) − (2x + 3y = 11) → 3x = 12 → x = 4" },
      },
      {
        title: "Answer the question that was asked",
        body: "Once you find one variable, reread the question. It may want y, x − y, or the y-coordinate of an intersection point. Most wrong choices are the other numbers from your work.",
      },
    ],
    questionIds: ["math-systems-001", "math-systems-002", "math-systems-003", "math-systems-007", "math-systems-012"],
  },
  {
    slug: "systems-word-problems",
    title: "Word problems",
    tips: [
      {
        title: "Two unknowns, two facts",
        body: "Name each unknown with a letter. Most word problems give you a count (how many items) and a total (how much money or how much stuff). Each one becomes an equation.",
        example: { right: "a + s = 150 (tickets)  and  12a + 8s = 1,520 (dollars)" },
      },
      {
        title: "\"When are they equal?\"",
        body: "For two plans or two growing amounts, write each as start + rate × time and set them equal.",
        example: { right: "40 + 25m = 100 + 15m → m = 6" },
      },
      {
        title: "With and against",
        body: "With a current or wind, the speeds add (k + c). Against it, they subtract (k − c). Add the two equations to find k.",
      },
    ],
    questionIds: ["math-systems-004", "math-systems-008", "math-systems-011", "math-systems-013", "math-systems-014"],
  },
  {
    slug: "number-of-solutions",
    title: "How many solutions?",
    tips: [
      {
        title: "Compare the coefficients",
        body: "Different slopes mean exactly one solution. Same slope with a different intercept means parallel lines and no solution. If one equation is a multiple of the other, it's the same line, with infinitely many solutions.",
        example: { right: "4x − 6y = 10 and 6x − 9y = 15: the second is 1.5 × the first → infinitely many" },
      },
      {
        title: "Find the scale factor",
        body: "For \"no solution\" or \"infinitely many\" questions with a constant k, find the number that turns one equation's known coefficients into the other's. Then apply it to the unknown coefficient.",
        example: { wrong: "3x + ky = 8, 6x + 10y = 5 → k = 10", right: "6 is 2 × 3, so 10 = 2k → k = 5" },
      },
      {
        title: "Combine equations to skip steps",
        body: "If the question asks for an expression like 6x + 4y, try adding or subtracting the equations first. The answer may fall right out.",
      },
    ],
    questionIds: ["math-systems-005", "math-systems-006", "math-systems-009", "math-systems-010", "math-systems-015"],
  },
  {
    slug: "review",
    title: "Skill review",
    tips: [],
    questionIds: [],
    review: true,
  },
];
