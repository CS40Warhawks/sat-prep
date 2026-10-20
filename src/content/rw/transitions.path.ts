import type { Lesson } from "@/lib/types";

// Transitions, split into short lessons for the learning path.
export const transitionsLessons: Lesson[] = [
  {
    slug: "same-way-or-turn",
    title: "Same way or a turn?",
    tips: [
      {
        title: "Name the relationship first",
        body: "Cover the choices. Read the sentence before the blank and the sentence after it, then ask: does the second one agree, disagree, or follow from the first? Pick your answer only after you know.",
        example: { right: "Most mammals use blubber. Sea otters, by contrast, use dense fur. ← a turn" },
      },
      {
        title: "Turns need a contrast word",
        body: "If the second idea pushes against the first, use however, by contrast, nevertheless, or in reality. Nevertheless and even so mean \"it happened anyway.\"",
        example: { wrong: "Her records sold poorly. Consequently, they inspired many musicians.", right: "Her records sold poorly. Nevertheless, they inspired many musicians." },
      },
      {
        title: "Same direction: add or intensify",
        body: "If the second idea keeps going the same way, use additionally or moreover for a new point and indeed for stronger proof of the same point.",
        example: { right: "Tardigrades are very tough. Indeed, some have survived the vacuum of space." },
      },
    ],
    questionIds: ["rw-transitions-001", "rw-transitions-003", "rw-transitions-004", "rw-transitions-002", "rw-transitions-005"],
  },
  {
    slug: "cause-and-effect",
    title: "Cause and effect",
    tips: [
      {
        title: "Effects follow causes",
        body: "If the first sentence explains why the second one happened, use as a result, consequently, therefore, or for this reason.",
        example: { right: "The cables had corroded. As a result, the bridge was closed to trucks." },
      },
      {
        title: "Check that it's really a cause",
        body: "Don't reach for therefore just because two facts sit side by side. Ask: did the first one actually make the second one happen? An expectation that fails is a contrast, not a cause.",
        example: { wrong: "They expected higher yields. Therefore, yields stayed flat.", right: "They expected higher yields. However, yields stayed flat." },
      },
      {
        title: "Connect the sentences, not the clauses",
        body: "A sentence can have a contrast inside it (dry regions vs. rainy regions) and still agree with the sentence before it. The transition links the two sentences, so judge it by how they relate.",
        example: { right: "She believed buildings should suit their climate. Accordingly, her designs varied by region." },
      },
    ],
    questionIds: ["rw-transitions-006", "rw-transitions-008", "rw-transitions-007", "rw-transitions-009", "rw-transitions-010"],
  },
  {
    slug: "examples-and-order",
    title: "Examples, restating, and order",
    tips: [
      {
        title: "Example, or restating?",
        body: "For example introduces one specific case of a general idea. In other words says the same idea again, usually more simply. Specifically zooms in on the details of the idea just mentioned.",
        example: { right: "Bats listen for echoes. In other words, they hunt by sound." },
      },
      {
        title: "Similar isn't the same as specific",
        body: "Use similarly or likewise when a new subject does something alike. If the new subject isn't part of the first group, it can't be a specific case of it.",
        example: { wrong: "Songbirds sing to attract mates. Specifically, whales sing too.", right: "Songbirds sing to attract mates. Similarly, whales sing during their breeding season." },
      },
      {
        title: "Steps go in order",
        body: "When a text describes a process, look for words like first. The next step takes next, then, or after that. Save in conclusion for a real summary.",
        example: { right: "First, soak the fibers. Next, lift a screen through the pulp." },
      },
    ],
    questionIds: ["rw-transitions-011", "rw-transitions-013", "rw-transitions-012", "rw-transitions-014", "rw-transitions-015"],
  },
  {
    slug: "review",
    title: "Skill review",
    tips: [],
    questionIds: [],
    review: true,
  },
];
