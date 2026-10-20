import type { Question } from "@/lib/types";

const PROMPT = "Which choice completes the text with the most logical and precise word or phrase?";

export const wordsInContextQuestions: Question[] = [
  {
    id: "rw-words-in-context-001",
    skill: "words-in-context",
    difficulty: "easy",
    type: "multiple-choice",
    passage:
      "Although the comet can be seen without a telescope only once every few decades, astronomers can ______ its path with powerful telescopes for years before and after its closest approach to Earth.",
    prompt: PROMPT,
    answer: "A",
    choices: [
      { letter: "A", text: "track", explanation: "Correct. \"Although\" sets up a contrast: the comet is rarely visible to the eye, but astronomers can still follow its path with telescopes. \"Track\" means follow." },
      { letter: "B", text: "ignore", explanation: "Nothing suggests astronomers pay no attention to the comet. The sentence is about how they can still observe it." },
      { letter: "C", text: "invent", explanation: "Astronomers don't make up a comet's path. They observe it." },
      { letter: "D", text: "conceal", explanation: "Telescopes help people see the comet, not hide its path." },
    ],
  },
  {
    id: "rw-words-in-context-002",
    skill: "words-in-context",
    difficulty: "easy",
    type: "multiple-choice",
    passage:
      "The new library was designed to be ______: its reading rooms, study areas, and auditorium can all be rearranged to suit different kinds of events.",
    prompt: PROMPT,
    answer: "C",
    choices: [
      { letter: "A", text: "fragile", explanation: "\"Fragile\" means easily broken. The colon's explanation is about rearranging spaces, not breaking them." },
      { letter: "B", text: "ancient", explanation: "The library is described as new, so \"ancient\" contradicts the text." },
      { letter: "C", text: "flexible", explanation: "Correct. The part after the colon explains the blank: spaces that can be rearranged for different uses make the building flexible." },
      { letter: "D", text: "isolated", explanation: "Nothing in the text is about the library being far away or cut off from other places." },
    ],
  },
  {
    id: "rw-words-in-context-003",
    skill: "words-in-context",
    difficulty: "medium",
    type: "multiple-choice",
    passage:
      "The historian's account of the factory strike is notably ______: she presents the views of the owners, the workers, and city officials alike without favoring any one group.",
    prompt: PROMPT,
    answer: "B",
    choices: [
      { letter: "A", text: "partisan", explanation: "\"Partisan\" means strongly favoring one side, which is the opposite of \"without favoring any one group.\"" },
      { letter: "B", text: "evenhanded", explanation: "Correct. \"Evenhanded\" means fair to all sides, which is exactly what the explanation after the colon describes." },
      { letter: "C", text: "speculative", explanation: "\"Speculative\" means based on guesses. The text is about fairness to different groups, not about guessing." },
      { letter: "D", text: "concise", explanation: "\"Concise\" means brief. The text says nothing about the length of the account." },
    ],
  },
  {
    id: "rw-words-in-context-004",
    skill: "words-in-context",
    difficulty: "medium",
    type: "multiple-choice",
    passage:
      "Early reviewers dismissed the painter's bold colors as garish, but later critics ______ that judgment, arguing that her palette was decades ahead of its time.",
    prompt: PROMPT,
    answer: "D",
    choices: [
      { letter: "A", text: "confirmed", explanation: "\"But\" signals that later critics disagreed. Confirming the judgment would mean they agreed that her colors were garish." },
      { letter: "B", text: "anticipated", explanation: "To \"anticipate\" is to expect something before it happens. Later critics couldn't anticipate a judgment that early reviewers had already made." },
      { letter: "C", text: "inherited", explanation: "Inheriting the judgment suggests they took it on as their own, but they argued the opposite." },
      { letter: "D", text: "overturned", explanation: "Correct. The later critics reversed the early verdict, praising the colors instead of dismissing them. \"Overturned\" means reversed." },
    ],
  },
  {
    id: "rw-words-in-context-005",
    skill: "words-in-context",
    difficulty: "medium",
    type: "multiple-choice",
    passage:
      "The researchers wanted to ______ the effect of temperature on plant growth from the effect of light, so they kept the lighting the same for every plant while changing only the temperature.",
    prompt: PROMPT,
    answer: "A",
    choices: [
      { letter: "A", text: "isolate", explanation: "Correct. Keeping the lighting constant lets the researchers separate the effect of temperature from the effect of light. \"Isolate\" means set apart." },
      { letter: "B", text: "magnify", explanation: "Nothing in the method makes the temperature effect bigger. The method keeps the two effects apart." },
      { letter: "C", text: "conceal", explanation: "The researchers are trying to study the temperature effect, not hide it." },
      { letter: "D", text: "replicate", explanation: "To \"replicate\" is to repeat or copy. It doesn't fit \"from the effect of light,\" and copying the effect isn't the goal of the method." },
    ],
  },
  {
    id: "rw-words-in-context-006",
    skill: "words-in-context",
    difficulty: "easy",
    type: "multiple-choice",
    passage:
      "Many cacti ______ water in their thick, fleshy stems, which allows them to survive long periods without rain.",
    prompt: PROMPT,
    answer: "B",
    choices: [
      { letter: "A", text: "waste", explanation: "Wasting water wouldn't help a plant survive dry periods. The text says the stems help the plants survive." },
      { letter: "B", text: "store", explanation: "Correct. Keeping water in their stems for later is what lets cacti survive long periods without rain." },
      { letter: "C", text: "seek", explanation: "Plants don't search for water inside their own stems. The stems hold water the plant already has." },
      { letter: "D", text: "release", explanation: "Releasing water would leave the plant with less, which wouldn't help it survive without rain." },
    ],
  },
  {
    id: "rw-words-in-context-007",
    skill: "words-in-context",
    difficulty: "medium",
    type: "multiple-choice",
    passage:
      "The town's population grew only ______ during the 1800s, increasing by just a few hundred residents over the entire century.",
    prompt: PROMPT,
    answer: "C",
    choices: [
      { letter: "A", text: "rapidly", explanation: "A few hundred people over a hundred years is slow growth, not rapid growth. \"Only\" also signals a small amount." },
      { letter: "B", text: "unpredictably", explanation: "The text gives the size of the growth, not whether it was steady or surprising." },
      { letter: "C", text: "modestly", explanation: "Correct. \"Only\" and \"just a few hundred residents\" tell you the growth was small. \"Modestly\" means by a small amount." },
      { letter: "D", text: "dramatically", explanation: "\"Dramatically\" means by a large amount, the opposite of what the numbers show." },
    ],
  },
  {
    id: "rw-words-in-context-008",
    skill: "words-in-context",
    difficulty: "hard",
    type: "multiple-choice",
    passage:
      "Doctors hoped the new treatment would ______ the spread of the infection, stopping it before it reached the patient's lungs.",
    prompt: PROMPT,
    answer: "D",
    choices: [
      { letter: "A", text: "accelerate", explanation: "\"Accelerate\" means speed up. Doctors want to stop the infection, not make it spread faster." },
      { letter: "B", text: "survey", explanation: "To \"survey\" is to look over or examine. The text says the treatment is meant to stop the infection, not just observe it." },
      { letter: "C", text: "publicize", explanation: "Making the infection widely known has nothing to do with stopping it from reaching the lungs." },
      { letter: "D", text: "arrest", explanation: "Correct. Here \"arrest\" doesn't mean taking someone into custody. It means stop or halt, which matches \"stopping it before it reached the patient's lungs.\"" },
    ],
  },
  {
    id: "rw-words-in-context-009",
    skill: "words-in-context",
    difficulty: "hard",
    type: "multiple-choice",
    passage:
      "The committee gave the proposal only ______ support: members approved the general plan but insisted that several of its key features be revised.",
    prompt: PROMPT,
    answer: "B",
    choices: [
      { letter: "A", text: "unanimous", explanation: "\"Unanimous\" means everyone agreed. It says nothing about the support being limited, and \"only\" signals a limit." },
      { letter: "B", text: "qualified", explanation: "Correct. \"Qualified\" support is support with conditions or limits, which matches approving the plan while demanding revisions." },
      { letter: "C", text: "enthusiastic", explanation: "Insisting that key features be revised isn't enthusiastic. \"Only\" also signals that the support was held back." },
      { letter: "D", text: "permanent", explanation: "The text is about the support having conditions, not about how long it lasts." },
    ],
  },
  {
    id: "rw-words-in-context-010",
    skill: "words-in-context",
    difficulty: "medium",
    type: "multiple-choice",
    passage:
      "Rather than celebrating the city's rapid growth, the essayist takes a ______ view, warning that new construction is erasing the neighborhoods that gave the city its character.",
    prompt: PROMPT,
    answer: "A",
    choices: [
      { letter: "A", text: "skeptical", explanation: "Correct. \"Rather than celebrating\" and \"warning\" show that the essayist doubts the growth is a good thing. \"Skeptical\" means doubtful." },
      { letter: "B", text: "triumphant", explanation: "\"Triumphant\" is celebratory, which is exactly what \"rather than celebrating\" rules out." },
      { letter: "C", text: "neutral", explanation: "A writer issuing a warning has taken a side. That's not neutral." },
      { letter: "D", text: "whimsical", explanation: "\"Whimsical\" means playful. A serious warning about losing neighborhoods isn't playful." },
    ],
  },
  {
    id: "rw-words-in-context-011",
    skill: "words-in-context",
    difficulty: "medium",
    type: "multiple-choice",
    passage:
      "Though the two frog species look nearly identical, their mating calls are quite ______, which allows researchers to tell the species apart in the field.",
    prompt: PROMPT,
    answer: "C",
    choices: [
      { letter: "A", text: "similar", explanation: "\"Though\" sets up a contrast with looking identical, and similar calls wouldn't help researchers tell the species apart." },
      { letter: "B", text: "faint", explanation: "Quiet calls would make the frogs harder to study, not easier to tell apart." },
      { letter: "C", text: "distinct", explanation: "Correct. \"Though\" contrasts the frogs' identical looks with their calls, and calls that are clearly different let researchers tell the species apart." },
      { letter: "D", text: "constant", explanation: "Calls that never stop wouldn't explain how researchers tell two species apart." },
    ],
  },
  {
    id: "rw-words-in-context-012",
    skill: "words-in-context",
    difficulty: "medium",
    type: "multiple-choice",
    passage:
      "The scientist's findings were at first met with doubt, but after several other laboratories ______ her results using different methods, most researchers in the field accepted her conclusions.",
    prompt: PROMPT,
    answer: "B",
    choices: [
      { letter: "A", text: "disputed", explanation: "If other labs disagreed with her results, researchers wouldn't then accept her conclusions." },
      { letter: "B", text: "corroborated", explanation: "Correct. \"Corroborated\" means confirmed with more evidence. Other labs getting the same results is what would turn doubt into acceptance." },
      { letter: "C", text: "simplified", explanation: "Making the results simpler wouldn't explain why doubters changed their minds. The phrase \"using different methods\" points to checking the results." },
      { letter: "D", text: "publicized", explanation: "Spreading the word about results doesn't prove they're right. Doubters would need confirmation, not publicity." },
    ],
  },
  {
    id: "rw-words-in-context-013",
    skill: "words-in-context",
    difficulty: "easy",
    type: "multiple-choice",
    passage:
      "The documentary is ______ rather than comprehensive: it focuses closely on just three musicians instead of trying to cover the entire history of jazz.",
    prompt: PROMPT,
    answer: "A",
    choices: [
      { letter: "A", text: "selective", explanation: "Correct. Choosing just three musicians instead of covering everything is the definition of being selective, and it's the opposite of \"comprehensive.\"" },
      { letter: "B", text: "exhaustive", explanation: "\"Exhaustive\" means covering everything, which is basically a synonym for \"comprehensive.\" The text says the film is the opposite." },
      { letter: "C", text: "inaccurate", explanation: "Narrow focus doesn't mean the film gets facts wrong. Nothing in the text suggests errors." },
      { letter: "D", text: "repetitive", explanation: "The text is about how much the film covers, not about it repeating itself." },
    ],
  },
  {
    id: "rw-words-in-context-014",
    skill: "words-in-context",
    difficulty: "hard",
    type: "multiple-choice",
    passage:
      "Predators such as wolves can help ______ the growth of deer populations, which might otherwise expand until the deer overgraze their habitat.",
    prompt: PROMPT,
    answer: "C",
    choices: [
      { letter: "A", text: "promote", explanation: "\"Promote\" means encourage. Predators limit deer numbers, which is the opposite." },
      { letter: "B", text: "observe", explanation: "Watching deer wouldn't keep their population from growing too large. \"Otherwise\" tells you the predators prevent something." },
      { letter: "C", text: "check", explanation: "Correct. Here \"check\" means hold back or limit. Without predators, deer numbers \"might otherwise expand,\" so predators keep that growth in check." },
      { letter: "D", text: "predict", explanation: "Predators don't forecast anything. The text is about predators affecting deer numbers." },
    ],
  },
  {
    id: "rw-words-in-context-015",
    skill: "words-in-context",
    difficulty: "hard",
    type: "multiple-choice",
    passage:
      "The novelist's prose is famously ______; she rarely uses two words where one will do, and her chapters seldom run longer than a few pages.",
    prompt: PROMPT,
    answer: "D",
    choices: [
      { letter: "A", text: "ornate", explanation: "\"Ornate\" means heavily decorated, the opposite of using as few words as possible." },
      { letter: "B", text: "obscure", explanation: "\"Obscure\" means hard to understand. The text is about how few words she uses, not about clarity." },
      { letter: "C", text: "rambling", explanation: "Rambling writing wanders on and on. Short chapters and few words are the opposite." },
      { letter: "D", text: "economical", explanation: "Correct. \"Economical\" prose uses no more words than it needs, which matches \"rarely uses two words where one will do\" and short chapters." },
    ],
  },
];
