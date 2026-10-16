import type { Question } from "@/lib/types";

const PROMPT =
  "Which choice completes the text so that it conforms to the conventions of Standard English?";

export const boundariesQuestions: Question[] = [
  {
    id: "rw-boundaries-001",
    skill: "boundaries",
    difficulty: "easy",
    type: "multiple-choice",
    passage:
      "The Atacama Desert in Chile is one of the driest places on ______ weather stations there have gone years without recording any rain.",
    prompt: PROMPT,
    answer: "B",
    choices: [
      { letter: "A", text: "Earth, some", explanation: "This is a comma splice. Both sides are complete sentences, and a comma alone can't join them." },
      { letter: "B", text: "Earth; some", explanation: "Correct. A semicolon joins two independent clauses, and both sides here can stand alone as sentences." },
      { letter: "C", text: "Earth some", explanation: "This is a run-on. Two independent clauses are jammed together with no punctuation." },
      { letter: "D", text: "Earth, and, some", explanation: "The comma after \"and\" breaks up the clause for no reason. \"Earth, and some\" would work, but this version doesn't." },
    ],
  },
  {
    id: "rw-boundaries-002",
    skill: "boundaries",
    difficulty: "easy",
    type: "multiple-choice",
    passage:
      "Honeybees share the location of food through a movement known as the waggle ______ angle of the dance tells other bees which direction to fly relative to the sun.",
    prompt: PROMPT,
    answer: "D",
    choices: [
      { letter: "A", text: "dance, the", explanation: "This is a comma splice. \"The angle of the dance tells…\" is a complete sentence, so a comma alone can't attach it." },
      { letter: "B", text: "dance the", explanation: "This is a run-on with no punctuation between two complete sentences." },
      { letter: "C", text: "dance; and the", explanation: "Use a semicolon or a comma + \"and,\" not both. The semicolon plus \"and\" is redundant." },
      { letter: "D", text: "dance. The", explanation: "Correct. A period separates two complete sentences." },
    ],
  },
  {
    id: "rw-boundaries-003",
    skill: "boundaries",
    difficulty: "medium",
    type: "multiple-choice",
    passage:
      "The chef's new menu is built around a single ______ ingredient must come from a farm within fifty miles of the restaurant.",
    prompt: PROMPT,
    answer: "C",
    choices: [
      { letter: "A", text: "principle, every", explanation: "This is a comma splice. The second part is a complete sentence." },
      { letter: "B", text: "principle every", explanation: "This is a run-on. The two complete sentences need punctuation between them." },
      { letter: "C", text: "principle: every", explanation: "Correct. The first clause is complete and sets up an explanation, so a colon introduces what that principle is." },
      { letter: "D", text: "principle, that every", explanation: "\"That every ingredient…\" can't follow a comma here. It would need to be \"principle that every…\" with no comma, and even then the sentence becomes wordy." },
    ],
  },
  {
    id: "rw-boundaries-004",
    skill: "boundaries",
    difficulty: "medium",
    type: "multiple-choice",
    passage:
      "Maria ______ often described as the first professional female astronomer in the United States, discovered a comet in 1847.",
    prompt: PROMPT,
    answer: "A",
    choices: [
      { letter: "A", text: "Mitchell,", explanation: "Correct. \"Often described as… United States\" is extra information. It closes with a comma, so it must open with a comma too." },
      { letter: "B", text: "Mitchell—", explanation: "A nonessential element has to start and end with the same mark. It ends with a comma, so it can't open with a dash." },
      { letter: "C", text: "Mitchell", explanation: "Without an opening comma, the extra information isn't set off, and the lone comma later separates the subject from its verb." },
      { letter: "D", text: "Mitchell;", explanation: "A semicolon needs a complete sentence on each side. \"Maria Mitchell\" is not a complete sentence." },
    ],
  },
  {
    id: "rw-boundaries-005",
    skill: "boundaries",
    difficulty: "medium",
    type: "multiple-choice",
    passage:
      "The researchers who studied the coral reefs off the coast of Belize ______ water temperature was the strongest predictor of bleaching.",
    prompt: PROMPT,
    answer: "B",
    choices: [
      { letter: "A", text: "concluded, that", explanation: "Don't put a comma between a verb and the \"that\" clause that serves as its object." },
      { letter: "B", text: "concluded that", explanation: "Correct. The subject (\"The researchers…Belize\") flows straight into the verb and its object with no punctuation." },
      { letter: "C", text: ", concluded that", explanation: "A single comma between a subject and its verb is always an error, however long the subject is." },
      { letter: "D", text: "concluded: that", explanation: "A colon must follow a complete clause, and it can't split a verb from its object." },
    ],
  },
  {
    id: "rw-boundaries-006",
    skill: "boundaries",
    difficulty: "medium",
    type: "multiple-choice",
    passage:
      "Students ______ complete the summer reading program receive a certificate at the fall assembly.",
    prompt: PROMPT,
    answer: "C",
    choices: [
      { letter: "A", text: ", who", explanation: "\"Who complete the summer reading program\" is essential. It tells us which students, so it shouldn't be set off with commas." },
      { letter: "B", text: "who,", explanation: "A comma after \"who\" separates the pronoun from its own verb, \"complete.\"" },
      { letter: "C", text: "who", explanation: "Correct. The clause identifies which students get the certificate, so it's essential and takes no commas." },
      { letter: "D", text: "—who", explanation: "A dash would mark the clause as extra information, but it's essential, and there's no closing dash." },
    ],
  },
  {
    id: "rw-boundaries-007",
    skill: "boundaries",
    difficulty: "hard",
    type: "multiple-choice",
    passage:
      "The novel's final chapter—which the author rewrote eleven times before ______ is widely considered the strongest in the book.",
    prompt: PROMPT,
    answer: "D",
    choices: [
      { letter: "A", text: "publication,", explanation: "The interruption opens with a dash, so it must close with a dash. You can't mix a dash and a comma." },
      { letter: "B", text: "publication", explanation: "Without a closing mark, the interruption never ends and runs into the main verb \"is.\"" },
      { letter: "C", text: "publication;", explanation: "A semicolon needs complete sentences on both sides. It can't close an interruption." },
      { letter: "D", text: "publication—", explanation: "Correct. The opening dash is matched by a closing dash, and the sentence continues with \"is widely considered…\"" },
    ],
  },
  {
    id: "rw-boundaries-008",
    skill: "boundaries",
    difficulty: "hard",
    type: "multiple-choice",
    passage:
      "The traveling exhibit will stop in three cities next year: Austin, Texas; Denver, ______ and Portland, Oregon.",
    prompt: PROMPT,
    answer: "A",
    choices: [
      { letter: "A", text: "Colorado;", explanation: "Correct. When list items already contain commas, semicolons separate the items. The earlier \"Texas;\" sets this pattern." },
      { letter: "B", text: "Colorado,", explanation: "A comma here would blur where one item ends and the next begins. The list already uses semicolons between items." },
      { letter: "C", text: "Colorado", explanation: "Each item in the list needs a separator, and this one needs a semicolon to match the pattern." },
      { letter: "D", text: "Colorado:", explanation: "A colon introduces a list. It doesn't separate the items inside one." },
    ],
  },
  {
    id: "rw-boundaries-009",
    skill: "boundaries",
    difficulty: "medium",
    type: "multiple-choice",
    passage:
      "Early electric cars were quiet and easy to ______ they could travel only short distances before their batteries needed recharging.",
    prompt: PROMPT,
    answer: "B",
    choices: [
      { letter: "A", text: "start, however,", explanation: "This is a comma splice. \"However\" isn't a conjunction like \"but,\" so commas alone can't join two sentences around it." },
      { letter: "B", text: "start; however,", explanation: "Correct. A semicolon separates the two complete sentences, and a comma follows the transition \"however.\"" },
      { letter: "C", text: "start however,", explanation: "This is a run-on. Nothing separates the first sentence from \"however.\"" },
      { letter: "D", text: "start, however", explanation: "This is still a comma splice, and \"however\" also needs a comma after it." },
    ],
  },
  {
    id: "rw-boundaries-010",
    skill: "boundaries",
    difficulty: "easy",
    type: "multiple-choice",
    passage:
      "Octopuses have three ______ pump blood through the gills, and the third pumps it to the rest of the body.",
    prompt: PROMPT,
    answer: "C",
    choices: [
      { letter: "A", text: "hearts, two", explanation: "This is a comma splice. \"Two pump blood…\" is a complete sentence." },
      { letter: "B", text: "hearts two", explanation: "This is a run-on with no punctuation between two complete sentences." },
      { letter: "C", text: "hearts: two", explanation: "Correct. The first clause is complete, and what follows explains it, which is exactly what a colon is for." },
      { letter: "D", text: "hearts, two of them", explanation: "This is still a comma splice. \"Two of them pump blood…\" is a complete sentence." },
    ],
  },
  {
    id: "rw-boundaries-011",
    skill: "boundaries",
    difficulty: "hard",
    type: "multiple-choice",
    passage:
      "The museum's permanent collection ______ fossils, meteorites, and minerals gathered from six continents.",
    prompt: PROMPT,
    answer: "A",
    choices: [
      { letter: "A", text: "includes", explanation: "Correct. The verb leads straight into its objects. No punctuation belongs between a verb and what it acts on." },
      { letter: "B", text: "includes:", explanation: "A colon must follow a complete sentence. \"The museum's permanent collection includes\" is incomplete without its objects." },
      { letter: "C", text: "includes,", explanation: "A comma can't separate a verb from its objects." },
      { letter: "D", text: "includes;", explanation: "A semicolon needs a complete sentence on each side, and neither side is one here." },
    ],
  },
  {
    id: "rw-boundaries-012",
    skill: "boundaries",
    difficulty: "medium",
    type: "multiple-choice",
    passage:
      "The bridge was designed to withstand strong ______ engineers still inspect it after every major tremor.",
    prompt: PROMPT,
    answer: "D",
    choices: [
      { letter: "A", text: "earthquakes but,", explanation: "The comma belongs before \"but,\" not after it." },
      { letter: "B", text: "earthquakes,", explanation: "This is a comma splice. A comma alone can't join two complete sentences." },
      { letter: "C", text: "earthquakes; but", explanation: "Use either a semicolon or a comma + \"but.\" Pairing a semicolon with \"but\" is redundant." },
      { letter: "D", text: "earthquakes, but", explanation: "Correct. A comma plus a coordinating conjunction (for, and, nor, but, or, yet, so) joins two complete sentences." },
    ],
  },
  {
    id: "rw-boundaries-013",
    skill: "boundaries",
    difficulty: "medium",
    type: "multiple-choice",
    passage:
      "Although the recipe calls for only five ______ it properly takes most of a day.",
    prompt: PROMPT,
    answer: "B",
    choices: [
      { letter: "A", text: "ingredients; preparing", explanation: "\"Although the recipe…ingredients\" is a dependent clause, not a complete sentence, so a semicolon can't follow it." },
      { letter: "B", text: "ingredients, preparing", explanation: "Correct. An introductory dependent clause is followed by a comma before the main clause." },
      { letter: "C", text: "ingredients. Preparing", explanation: "This leaves \"Although the recipe calls for only five ingredients\" as a fragment." },
      { letter: "D", text: "ingredients: preparing", explanation: "A colon must follow a complete sentence, and an \"although\" clause isn't one." },
    ],
  },
  {
    id: "rw-boundaries-014",
    skill: "boundaries",
    difficulty: "easy",
    type: "multiple-choice",
    passage:
      "Founded in 1891 by a group of local ______ cooperative now sells produce to grocery stores across the region.",
    prompt: PROMPT,
    answer: "C",
    choices: [
      { letter: "A", text: "farmers; the", explanation: "\"Founded in 1891 by a group of local farmers\" is a phrase, not a complete sentence, so it can't come before a semicolon." },
      { letter: "B", text: "farmers. The", explanation: "This leaves the opening phrase as a fragment." },
      { letter: "C", text: "farmers, the", explanation: "Correct. An introductory phrase is followed by a comma, then the main clause." },
      { letter: "D", text: "farmers: the", explanation: "A colon must follow a complete sentence, and the opening phrase isn't one." },
    ],
  },
  {
    id: "rw-boundaries-015",
    skill: "boundaries",
    difficulty: "hard",
    type: "multiple-choice",
    passage: "The poet ______ won the Pulitzer Prize for Poetry in 1950 for her collection Annie Allen.",
    prompt: PROMPT,
    answer: "A",
    choices: [
      { letter: "A", text: "Gwendolyn Brooks", explanation: "Correct. \"The poet\" alone doesn't tell us who. The name is essential information, so it takes no commas." },
      { letter: "B", text: ", Gwendolyn Brooks,", explanation: "Commas would mark the name as removable, but without it the sentence doesn't say which poet. Essential names take no commas." },
      { letter: "C", text: ", Gwendolyn Brooks", explanation: "This puts a single comma between the subject and its verb, and the name is essential anyway." },
      { letter: "D", text: "Gwendolyn Brooks,", explanation: "A single comma can't separate the subject (\"The poet Gwendolyn Brooks\") from its verb (\"won\")." },
    ],
  },
];
