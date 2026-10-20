import type { Lesson } from "@/lib/types";

const id = (n: string) => `math-linear-functions-${n}`;

// Linear Functions, split into short lessons for the learning path.
export const linearFunctionsLessons: Lesson[] = [
  {
    slug: "slope-and-intercepts",
    title: "Slope and intercepts",
    tips: [
      {
        title: "Slope is rise over run",
        body: "Subtract the y-values, subtract the x-values in the same order, and divide. Change in y always goes on top.",
        example: { right: "(1, 3) and (5, 11): (11 − 3)/(5 − 1) = 8/4 = 2" },
      },
      {
        title: "Intercepts: set the other variable to 0",
        body: "The y-intercept is where x = 0; the x-intercept is where y = 0. In y = mx + b, the y-intercept is (0, b).",
        example: { right: "2x + 3y = 12: y = 0 gives x = 6, so the x-intercept is (6, 0)" },
      },
      {
        title: "Parallel and perpendicular",
        body: "Parallel lines have equal slopes. Perpendicular lines have negative reciprocal slopes: flip the fraction and change the sign.",
        example: { wrong: "Perpendicular to slope 4/5: slope 5/4", right: "Perpendicular to slope 4/5: slope −5/4" },
      },
    ],
    questionIds: [id("002"), id("003"), id("007"), id("008"), id("013"), id("015")],
  },
  {
    slug: "function-notation",
    title: "Function notation and equations",
    tips: [
      {
        title: "f(4) means \"plug in 4\"",
        body: "f(4) is the output when x = 4. If instead you're told f(x) equals a number, set the formula equal to that number and solve for x.",
        example: { right: "f(x) = 2x + 9 → f(3) = 2(3) + 9 = 15" },
      },
      {
        title: "Build y = mx + b from a point",
        body: "Find the slope m, then plug any known point into y = mx + b and solve for b.",
        example: { right: "slope 3 through (2, 1): 1 = 3(2) + b → b = −5 → y = 3x − 5" },
      },
      {
        title: "Two values are enough",
        body: "Any two input-output pairs pin down a linear function. Use them to get the slope, then step from a known value.",
        example: { right: "f(1) = 4, f(4) = 13 → slope 3 → f(−2) = 4 − 3(3) = −5" },
      },
    ],
    questionIds: [id("001"), id("005"), id("006"), id("010"), id("012")],
  },
  {
    slug: "linear-models",
    title: "Linear models in context",
    tips: [
      {
        title: "Slope = rate, intercept = starting value",
        body: "In a model like R(h) = 18h + 10, the slope is how much the output changes per unit of input, and the constant is the value when the input is 0.",
        example: { right: "18 = dollars per hour; 10 = the flat fee" },
      },
      {
        title: "Build the model from two facts",
        body: "Use the starting amount as b and the change divided by the time as m. If the amount is falling, the slope is negative.",
        example: { right: "90 L, then 60 L after 12 min → m = −30/12 = −2.5 → V(t) = 90 − 2.5t" },
      },
      {
        title: "A difference of outputs is a change",
        body: "d(5) − d(2) is how much the output changed between those inputs. It equals the slope times the change in input.",
        example: { right: "d(t) = 55t + 20 → d(5) − d(2) = 55 × 3 = 165" },
      },
    ],
    questionIds: [id("004"), id("009"), id("011"), id("014")],
  },
  {
    slug: "review",
    title: "Skill review",
    tips: [],
    questionIds: [],
    review: true,
  },
];
