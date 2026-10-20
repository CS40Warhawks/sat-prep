import type { Lesson } from "@/lib/types";

// Percentages, split into short lessons for the learning path.
export const percentagesLessons: Lesson[] = [
  {
    slug: "percent-of",
    title: "Percent of a number",
    tips: [
      {
        title: "Percent means per hundred",
        body: "To use a percent in math, divide it by 100 to get a decimal. \"Of\" means multiply.",
        example: { wrong: "35% of 240 = 3.5 × 240", right: "35% of 240 = 0.35 × 240 = 84" },
      },
      {
        title: "Part ÷ whole",
        body: "\"A is what percent of B?\" means A ÷ B × 100. The number after \"of\" is the whole, and it goes on the bottom.",
        example: { right: "18 is what percent of 72? 18 ÷ 72 = 0.25 = 25%" },
      },
      {
        title: "A percent of a percent multiplies",
        body: "\"30% of the 60% who play a sport\" is 0.30 × 0.60 of the whole. Never add or subtract the percents.",
      },
    ],
    questionIds: ["math-percentages-001", "math-percentages-002", "math-percentages-003", "math-percentages-008", "math-percentages-009"],
  },
  {
    slug: "percent-change",
    title: "Percent change",
    tips: [
      {
        title: "Divide by the original",
        body: "Percent change = (new − original) ÷ original. Dividing by the new value is the most common mistake.",
        example: { wrong: "2,400 → 3,000: 600 ÷ 3,000 = 20%", right: "2,400 → 3,000: 600 ÷ 2,400 = 25%" },
      },
      {
        title: "Use multipliers",
        body: "An increase of r% multiplies by (1 + r/100). A decrease multiplies by (1 − r/100). Up 15% is × 1.15. Down 15% is × 0.85.",
      },
      {
        title: "Successive changes multiply",
        body: "Two changes in a row multiply. They don't add. Up 20% then down 20% is 1.20 × 0.80 = 0.96, a 4% drop overall. Plugging in 100 makes these easy to check.",
        example: { wrong: "+20% then −20% = no change", right: "$100 → $120 → $96" },
      },
    ],
    questionIds: ["math-percentages-004", "math-percentages-006", "math-percentages-007", "math-percentages-011", "math-percentages-012"],
  },
  {
    slug: "working-backward",
    title: "Working backward",
    tips: [
      {
        title: "Divide by the multiplier",
        body: "If you know the price after a change, write original × multiplier = final, then divide. After 20% off, $360 is 0.80 × original.",
        example: { wrong: "360 + 20% of 360 = $432", right: "360 ÷ 0.80 = $450" },
      },
      {
        title: "Tax and tips are on the original",
        body: "A total that includes 8% tax is 1.08 × the price. To find the price, divide by 1.08. Subtracting 8% of the total gives the wrong answer.",
      },
      {
        title: "Mixtures: track the part and the whole",
        body: "When you add pure juice (or pure anything), the part and the whole both grow. Write (part + x) ÷ (whole + x) = target percent.",
      },
    ],
    questionIds: ["math-percentages-005", "math-percentages-010", "math-percentages-013", "math-percentages-014", "math-percentages-015"],
  },
  {
    slug: "review",
    title: "Skill review",
    tips: [],
    questionIds: [],
    review: true,
  },
];
