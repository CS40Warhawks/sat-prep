import type { Lesson } from "@/lib/types";

// Form, Structure, and Sense, split into short lessons for the learning path.
export const formStructureSenseLessons: Lesson[] = [
  {
    slug: "subject-verb-agreement",
    title: "Subject-verb agreement",
    tips: [
      {
        title: "Find the real subject",
        body: "Cross out prepositional phrases (of the letters, in the box) and extra info between commas. What's left is the subject, and the verb has to match it.",
        example: { wrong: "The box of old photos are in the attic.", right: "The box of old photos is in the attic." },
      },
      {
        title: "\"And\" makes it plural",
        body: "Two subjects joined by \"and\" take a plural verb. With \"either…or\" or \"neither…nor,\" match the verb to the noun closest to it.",
        example: { wrong: "Neither the coach nor the players was ready.", right: "Neither the coach nor the players were ready." },
      },
      {
        title: "Watch for flipped sentences",
        body: "When a sentence starts with a place (\"Beneath the floor…\", \"Among the guests…\"), the subject often comes after the verb. Flip it back to check.",
        example: { wrong: "On the shelf sits three old trophies.", right: "On the shelf sit three old trophies." },
      },
    ],
    questionIds: [
      "rw-form-structure-sense-001",
      "rw-form-structure-sense-002",
      "rw-form-structure-sense-004",
      "rw-form-structure-sense-003",
      "rw-form-structure-sense-005",
    ],
  },
  {
    slug: "pronouns-and-possessives",
    title: "Pronouns and possessives",
    tips: [
      {
        title: "Match the pronoun to what it replaces",
        body: "Find the noun the pronoun stands for. A singular noun (including a group word like team or committee) gets it/its. A plural noun gets they/their.",
        example: { wrong: "The committee announced their decision.", right: "The committee announced its decision." },
      },
      {
        title: "Its vs. it's",
        body: "\"It's\" always means \"it is\" or \"it has.\" The possessive is \"its\" with no apostrophe, just like his and hers. Same idea for their/they're and whose/who's.",
        example: { wrong: "The quilt is famous for it's pattern.", right: "The quilt is famous for its pattern." },
      },
      {
        title: "Plural, possessive, or both?",
        body: "Plural: birds. One bird owns it: bird's. Several birds own it: birds'. Count the owners, then check whether anything is actually owned.",
        example: { wrong: "The two teams's coaches met.", right: "The two teams' coaches met." },
      },
    ],
    questionIds: [
      "rw-form-structure-sense-006",
      "rw-form-structure-sense-008",
      "rw-form-structure-sense-009",
      "rw-form-structure-sense-007",
      "rw-form-structure-sense-010",
    ],
  },
  {
    slug: "verbs-and-modifiers",
    title: "Verbs and modifiers",
    tips: [
      {
        title: "Let time clues pick the tense",
        body: "Dates, words like \"last summer\" or \"now,\" and the other verbs in the sentence tell you the tense. Keep it consistent unless the time really changes.",
        example: { wrong: "Last year she traveled to Peru and studies the ruins.", right: "Last year she traveled to Peru and studied the ruins." },
      },
      {
        title: "Every sentence needs a main verb",
        body: "Words like \"drawing,\" \"to draw,\" and \"having drawn\" can't be the main verb on their own. If the subject has no real verb, the sentence is a fragment.",
        example: { wrong: "The poet, who grew up on a farm, drawing on her childhood.", right: "The poet, who grew up on a farm, drew on her childhood." },
      },
      {
        title: "Modifiers describe the next noun",
        body: "An opening phrase like \"Having studied the ruins,\" describes whatever comes right after the comma. Make sure that's the person or thing actually doing it.",
        example: { wrong: "Having studied the ruins, the map was finished.", right: "Having studied the ruins, the archaeologist finished the map." },
      },
    ],
    questionIds: [
      "rw-form-structure-sense-011",
      "rw-form-structure-sense-012",
      "rw-form-structure-sense-013",
      "rw-form-structure-sense-014",
      "rw-form-structure-sense-015",
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
