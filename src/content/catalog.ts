import type { Skill, Unit } from "@/lib/types";

// Course map, following the College Board's content domains and skills for the digital SAT
// (Digital SAT Suite of Assessments Specifications Overview, tables 2 and 3).
export const units: Unit[] = [
  {
    slug: "information-and-ideas",
    section: "rw",
    title: "Information & Ideas",
    testShare: { percent: 26, questions: [12, 14] },
    skills: [
      { slug: "central-ideas", title: "Central Ideas and Details", summary: "Find the main point of a short text.", available: false },
      { slug: "command-of-evidence", title: "Command of Evidence", summary: "Pick the quotation or data that supports a claim.", available: false },
      { slug: "inferences", title: "Inferences", summary: "Complete a text with the most logical conclusion.", available: false },
    ],
  },
  {
    slug: "craft-and-structure",
    section: "rw",
    title: "Craft & Structure",
    testShare: { percent: 28, questions: [13, 15] },
    skills: [
      { slug: "words-in-context", title: "Words in Context", summary: "Choose the most precise word for the blank.", available: false },
      { slug: "text-structure", title: "Text Structure and Purpose", summary: "Describe what a text or sentence is doing.", available: false },
      { slug: "cross-text", title: "Cross-Text Connections", summary: "Compare how two authors would respond to each other.", available: false },
    ],
  },
  {
    slug: "expression-of-ideas",
    section: "rw",
    title: "Expression of Ideas",
    testShare: { percent: 20, questions: [8, 12] },
    skills: [
      { slug: "rhetorical-synthesis", title: "Rhetorical Synthesis", summary: "Use a student's notes to meet a stated goal.", available: false },
      { slug: "transitions", title: "Transitions", summary: "Pick the word that shows how ideas connect.", available: false },
    ],
  },
  {
    slug: "standard-english-conventions",
    section: "rw",
    title: "Standard English Conventions",
    testShare: { percent: 26, questions: [11, 15] },
    skills: [
      { slug: "boundaries", title: "Boundaries", summary: "Punctuate sentences and clauses correctly.", available: true },
      { slug: "form-structure-sense", title: "Form, Structure, and Sense", summary: "Agreement, verb tense, pronouns, and modifiers.", available: false },
    ],
  },
  {
    slug: "algebra",
    section: "math",
    title: "Algebra",
    testShare: { percent: 35, questions: [13, 15] },
    skills: [
      { slug: "linear-equations-one-variable", title: "Linear Equations in One Variable", summary: "Solve and interpret linear equations.", available: false },
      { slug: "linear-functions", title: "Linear Functions", summary: "Slopes, intercepts, and linear models.", available: false },
      { slug: "linear-equations-two-variables", title: "Linear Equations in Two Variables", summary: "Graphs and solutions of two-variable equations.", available: false },
      { slug: "systems", title: "Systems of Linear Equations", summary: "Solve two equations at once.", available: false },
      { slug: "linear-inequalities", title: "Linear Inequalities", summary: "Write and solve inequalities.", available: false },
    ],
  },
  {
    slug: "advanced-math",
    section: "math",
    title: "Advanced Math",
    testShare: { percent: 35, questions: [13, 15] },
    skills: [
      { slug: "equivalent-expressions", title: "Equivalent Expressions", summary: "Rewrite and simplify expressions.", available: false },
      { slug: "nonlinear-equations", title: "Nonlinear Equations and Systems", summary: "Quadratics, radicals, and rational equations.", available: false },
      { slug: "nonlinear-functions", title: "Nonlinear Functions", summary: "Quadratic, exponential, and polynomial functions.", available: false },
    ],
  },
  {
    slug: "problem-solving-data",
    section: "math",
    title: "Problem-Solving & Data Analysis",
    testShare: { percent: 15, questions: [5, 7] },
    skills: [
      { slug: "ratios-rates", title: "Ratios, Rates, and Units", summary: "Proportions and unit conversions.", available: false },
      { slug: "percentages", title: "Percentages", summary: "Percent change and percent of a whole.", available: false },
      { slug: "one-variable-data", title: "One-Variable Data", summary: "Mean, median, spread, and distributions.", available: false },
      { slug: "two-variable-data", title: "Two-Variable Data", summary: "Scatterplots and lines of best fit.", available: false },
      { slug: "probability", title: "Probability", summary: "Probability and conditional probability.", available: false },
      { slug: "inference-studies", title: "Inference from Samples", summary: "Sample statistics and margins of error.", available: false },
      { slug: "statistical-claims", title: "Evaluating Statistical Claims", summary: "What studies and experiments can and can't show.", available: false },
    ],
  },
  {
    slug: "geometry-trig",
    section: "math",
    title: "Geometry & Trigonometry",
    testShare: { percent: 15, questions: [5, 7] },
    skills: [
      { slug: "area-volume", title: "Area and Volume", summary: "Formulas for shapes and solids.", available: false },
      { slug: "lines-angles-triangles", title: "Lines, Angles, and Triangles", summary: "Angle rules, congruence, and similarity.", available: false },
      { slug: "right-triangles-trig", title: "Right Triangles and Trigonometry", summary: "Pythagorean theorem, sine, cosine, tangent.", available: false },
      { slug: "circles", title: "Circles", summary: "Arcs, sectors, radians, and circle equations.", available: false },
    ],
  },
];

export const sectionTitles = { rw: "Reading & Writing", math: "Math" } as const;

export function findSkill(slug: string): { unit: Unit; skill: Skill } | undefined {
  for (const unit of units) {
    const skill = unit.skills.find((s) => s.slug === slug);
    if (skill) return { unit, skill };
  }
  return undefined;
}

/** Roughly how many questions on one real test come from a skill: the domain's midpoint split evenly across its skills. */
export function questionsPerTest(unit: Unit): number {
  const [lo, hi] = unit.testShare.questions;
  return (lo + hi) / 2 / unit.skills.length;
}
