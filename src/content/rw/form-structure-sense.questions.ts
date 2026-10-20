import type { Question } from "@/lib/types";

const PROMPT =
  "Which choice completes the text so that it conforms to the conventions of Standard English?";

export const formStructureSenseQuestions: Question[] = [
  {
    id: "rw-form-structure-sense-001",
    skill: "form-structure-sense",
    difficulty: "easy",
    type: "multiple-choice",
    passage:
      "The collection of handwritten letters, donated to the museum by the poet's grandniece, ______ new insight into the poet's early career.",
    prompt: PROMPT,
    answer: "B",
    choices: [
      { letter: "A", text: "offer", explanation: "\"Offer\" is a plural verb, but the subject is \"collection,\" which is singular. \"Letters\" is inside a prepositional phrase and isn't the subject." },
      { letter: "B", text: "offers", explanation: "Correct. The subject is the singular noun \"collection,\" so it takes the singular verb \"offers.\"" },
      { letter: "C", text: "are offering", explanation: "\"Are\" is plural. It agrees with \"letters,\" which is the object of \"of,\" not the subject of the sentence." },
      { letter: "D", text: "have offered", explanation: "\"Have\" is plural, so it doesn't agree with the singular subject \"collection.\"" },
    ],
  },
  {
    id: "rw-form-structure-sense-002",
    skill: "form-structure-sense",
    difficulty: "easy",
    type: "multiple-choice",
    passage:
      "Each spring, huge flocks of sandhill cranes ______ along the Platte River in Nebraska, where the birds rest and feed before continuing north.",
    prompt: PROMPT,
    answer: "C",
    choices: [
      { letter: "A", text: "gathers", explanation: "\"Gathers\" is singular, but the subject is the plural \"flocks.\"" },
      { letter: "B", text: "has gathered", explanation: "\"Has\" is singular, so it doesn't agree with the plural subject \"flocks.\"" },
      { letter: "C", text: "gather", explanation: "Correct. The subject is the plural noun \"flocks,\" so it needs the plural verb \"gather.\" The present tense also fits a yearly event (\"Each spring\")." },
      { letter: "D", text: "is gathering", explanation: "\"Is\" is singular. It would agree with \"spring\" or \"river,\" but neither is the subject." },
    ],
  },
  {
    id: "rw-form-structure-sense-003",
    skill: "form-structure-sense",
    difficulty: "medium",
    type: "multiple-choice",
    passage:
      "Beneath the floorboards of the old farmhouse ______ two leather ledgers that recorded the family's harvests for nearly sixty years.",
    prompt: PROMPT,
    answer: "D",
    choices: [
      { letter: "A", text: "was", explanation: "\"Was\" is singular. The sentence is inverted, so the subject comes after the verb: \"two leather ledgers,\" which is plural." },
      { letter: "B", text: "has been", explanation: "\"Has been\" is singular, and the subject that follows the verb, \"ledgers,\" is plural." },
      { letter: "C", text: "is", explanation: "\"Is\" is singular, so it doesn't agree with the plural subject \"ledgers.\" \"Floorboards\" and \"farmhouse\" are inside prepositional phrases." },
      { letter: "D", text: "were", explanation: "Correct. Flip the sentence around: \"Two leather ledgers were beneath the floorboards.\" The plural subject needs the plural verb \"were,\" and the past tense matches \"recorded.\"" },
    ],
  },
  {
    id: "rw-form-structure-sense-004",
    skill: "form-structure-sense",
    difficulty: "medium",
    type: "multiple-choice",
    passage:
      "The architect's earliest sketchbook and her collection of hand-built models ______ on display in the library's east gallery until the end of June.",
    prompt: PROMPT,
    answer: "A",
    choices: [
      { letter: "A", text: "are", explanation: "Correct. Two things joined by \"and\" (the sketchbook and the collection) make a plural subject, which takes the plural verb \"are.\"" },
      { letter: "B", text: "is", explanation: "\"Is\" is singular, but the subject is two items joined by \"and,\" which makes it plural." },
      { letter: "C", text: "was", explanation: "\"Was\" is singular, so it doesn't agree with the compound subject \"sketchbook and…collection.\"" },
      { letter: "D", text: "has been", explanation: "\"Has been\" is singular. A subject made of two nouns joined by \"and\" needs a plural verb." },
    ],
  },
  {
    id: "rw-form-structure-sense-005",
    skill: "form-structure-sense",
    difficulty: "hard",
    type: "multiple-choice",
    passage:
      "Neither the lead chemist nor her two lab assistants ______ able to explain why the samples had turned bright orange overnight.",
    prompt: PROMPT,
    answer: "C",
    choices: [
      { letter: "A", text: "was", explanation: "With \"neither…nor,\" the verb agrees with the noun closest to it. That noun is \"assistants,\" which is plural, so \"was\" doesn't work." },
      { letter: "B", text: "is", explanation: "\"Is\" is singular and in the present tense. The verb should agree with the plural \"assistants,\" and the past-tense \"had turned\" signals a past event." },
      { letter: "C", text: "were", explanation: "Correct. In a \"neither…nor\" subject, the verb agrees with the nearer noun, \"assistants.\" That calls for the plural \"were,\" and the past tense fits the story." },
      { letter: "D", text: "has been", explanation: "\"Has been\" is singular. It would agree with \"chemist,\" but the verb must agree with the nearer noun, \"assistants.\"" },
    ],
  },
  {
    id: "rw-form-structure-sense-006",
    skill: "form-structure-sense",
    difficulty: "easy",
    type: "multiple-choice",
    passage:
      "The new rooftop garden at the public library has quickly become popular with visitors, but ______ requires hours of watering each week during the summer.",
    prompt: PROMPT,
    answer: "A",
    choices: [
      { letter: "A", text: "it", explanation: "Correct. The pronoun refers to \"the new rooftop garden,\" which is singular, so \"it\" is right." },
      { letter: "B", text: "they", explanation: "\"They\" is plural, but the thing that needs watering is the singular \"garden.\" \"Visitors\" don't need watering." },
      { letter: "C", text: "them", explanation: "\"Them\" is plural and is an object pronoun. The blank needs a subject for \"requires.\"" },
      { letter: "D", text: "these", explanation: "\"These\" is plural, so it doesn't match the singular \"garden\" or the singular verb \"requires.\"" },
    ],
  },
  {
    id: "rw-form-structure-sense-007",
    skill: "form-structure-sense",
    difficulty: "medium",
    type: "multiple-choice",
    passage:
      "Biologists recorded songs from two populations of the same bird species, one living near a busy highway and one in a quiet forest. Comparing the two ______ songs, they found that the highway birds sang at a noticeably higher pitch.",
    prompt: PROMPT,
    answer: "D",
    choices: [
      { letter: "A", text: "population's", explanation: "This is the singular possessive, but there are two populations." },
      { letter: "B", text: "populations", explanation: "This is a plain plural with no apostrophe. The songs belong to the populations, so a possessive is needed." },
      { letter: "C", text: "populations's", explanation: "A plural noun that already ends in s takes only an apostrophe. Adding another s is incorrect." },
      { letter: "D", text: "populations'", explanation: "Correct. The songs belong to two populations, so you need the plural possessive: \"populations\" plus an apostrophe." },
    ],
  },
  {
    id: "rw-form-structure-sense-008",
    skill: "form-structure-sense",
    difficulty: "medium",
    type: "multiple-choice",
    passage:
      "The museum's newest acquisition, a quilt sewn in the 1880s, is remarkable for ______ intricate pattern of more than four thousand hand-cut pieces.",
    prompt: PROMPT,
    answer: "A",
    choices: [
      { letter: "A", text: "its", explanation: "Correct. \"Its\" (no apostrophe) is the possessive form, showing that the pattern belongs to the quilt." },
      { letter: "B", text: "it's", explanation: "\"It's\" means \"it is.\" \"Remarkable for it is intricate pattern\" makes no sense." },
      { letter: "C", text: "their", explanation: "\"Their\" is plural, but it refers to the singular \"quilt.\"" },
      { letter: "D", text: "its'", explanation: "\"Its'\" isn't a word in Standard English. The possessive is simply \"its.\"" },
    ],
  },
  {
    id: "rw-form-structure-sense-009",
    skill: "form-structure-sense",
    difficulty: "medium",
    type: "multiple-choice",
    passage:
      "The sculptor's earliest works, carved from driftwood she gathered on the beaches near her home, were largely ignored by critics. Only decades later did ______ begin to attract serious attention.",
    prompt: PROMPT,
    answer: "B",
    choices: [
      { letter: "A", text: "it", explanation: "\"It\" is singular, but the thing that attracted attention is \"works,\" which is plural." },
      { letter: "B", text: "they", explanation: "Correct. The pronoun refers back to \"the sculptor's earliest works,\" which is plural, and it's the subject of \"begin,\" so the subject pronoun \"they\" fits." },
      { letter: "C", text: "them", explanation: "\"Them\" is plural, but it's an object pronoun. The blank is the subject of \"begin,\" so it needs \"they.\"" },
      { letter: "D", text: "its", explanation: "\"Its\" is a singular possessive. The sentence needs a plural subject pronoun." },
    ],
  },
  {
    id: "rw-form-structure-sense-010",
    skill: "form-structure-sense",
    difficulty: "hard",
    type: "multiple-choice",
    passage:
      "The city's budget ______ decision to postpone the vote surprised many residents; just a week earlier, its chair had promised a quick resolution.",
    prompt: PROMPT,
    answer: "A",
    choices: [
      { letter: "A", text: "committee's", explanation: "Correct. The decision belongs to one committee (the second sentence refers to \"its chair\"), so the singular possessive \"committee's\" is right." },
      { letter: "B", text: "committees", explanation: "This is a plain plural with no apostrophe. The decision belongs to the committee, so a possessive is needed." },
      { letter: "C", text: "committees'", explanation: "This is the plural possessive, but \"its chair\" shows there is only one committee." },
      { letter: "D", text: "committees's", explanation: "This form isn't standard. A plural ending in s takes only an apostrophe, and there's only one committee anyway." },
    ],
  },
  {
    id: "rw-form-structure-sense-011",
    skill: "form-structure-sense",
    difficulty: "easy",
    type: "multiple-choice",
    passage:
      "In July 1969, the Apollo 11 mission ______ the first humans to the surface of the Moon.",
    prompt: PROMPT,
    answer: "D",
    choices: [
      { letter: "A", text: "carries", explanation: "\"Carries\" is present tense, but \"In July 1969\" places the event in the past." },
      { letter: "B", text: "will carry", explanation: "\"Will carry\" is future tense. The date shows the event already happened." },
      { letter: "C", text: "has carried", explanation: "The present perfect (\"has carried\") isn't used with a specific past date like \"In July 1969.\"" },
      { letter: "D", text: "carried", explanation: "Correct. The sentence describes a completed event at a specific past time, so the simple past \"carried\" is right." },
    ],
  },
  {
    id: "rw-form-structure-sense-012",
    skill: "form-structure-sense",
    difficulty: "medium",
    type: "multiple-choice",
    passage:
      "Last summer, the botanist traveled to the highlands of Ecuador, where she ______ dozens of orchid specimens and recorded the conditions in which each one grew.",
    prompt: PROMPT,
    answer: "D",
    choices: [
      { letter: "A", text: "collects", explanation: "\"Collects\" is present tense, but \"Last summer,\" \"traveled,\" and \"recorded\" all describe the past." },
      { letter: "B", text: "will collect", explanation: "\"Will collect\" is future tense, which clashes with a trip that happened \"Last summer.\"" },
      { letter: "C", text: "has been collecting", explanation: "This form suggests an action still going on now. The trip is over, and the paired verb \"recorded\" is simple past." },
      { letter: "D", text: "collected", explanation: "Correct. The simple past matches \"Last summer\" and the parallel verb \"recorded.\"" },
    ],
  },
  {
    id: "rw-form-structure-sense-013",
    skill: "form-structure-sense",
    difficulty: "medium",
    type: "multiple-choice",
    passage:
      "The poet, who grew up on a sheep farm in the hills of New Zealand, ______ many of her most striking images from the landscapes of her childhood.",
    prompt: PROMPT,
    answer: "C",
    choices: [
      { letter: "A", text: "drawing", explanation: "An -ing word can't be the main verb on its own. With \"drawing,\" the subject \"The poet\" never gets a verb, so the sentence is incomplete." },
      { letter: "B", text: "to draw", explanation: "\"To draw\" is an infinitive, which can't serve as a sentence's main verb. The sentence would be a fragment." },
      { letter: "C", text: "drew", explanation: "Correct. \"Who grew up…New Zealand\" is extra information, so the subject \"The poet\" still needs a main verb. \"Drew\" supplies one in the past tense, matching \"grew.\"" },
      { letter: "D", text: "having drawn", explanation: "\"Having drawn\" is a participle phrase, not a main verb. The subject \"The poet\" would be left without a verb." },
    ],
  },
  {
    id: "rw-form-structure-sense-014",
    skill: "form-structure-sense",
    difficulty: "medium",
    type: "multiple-choice",
    passage:
      "Having studied the ruins for more than a decade, ______",
    prompt: PROMPT,
    answer: "B",
    choices: [
      { letter: "A", text: "the city's layout was finally mapped by the archaeologist.", explanation: "This says the city's layout studied the ruins. The opening phrase must describe the noun right after the comma, and a layout can't study anything." },
      { letter: "B", text: "the archaeologist finally mapped the city's layout.", explanation: "Correct. The person who studied the ruins is the archaeologist, so \"the archaeologist\" must come right after the opening phrase." },
      { letter: "C", text: "the mapping of the city's layout was finally completed by the archaeologist.", explanation: "This makes \"the mapping\" the one that studied the ruins. That's a dangling modifier." },
      { letter: "D", text: "the archaeologist's map of the city's layout was finally finished.", explanation: "The noun after the comma is \"map\" (\"archaeologist's\" just describes it), so this says the map studied the ruins." },
    ],
  },
  {
    id: "rw-form-structure-sense-015",
    skill: "form-structure-sense",
    difficulty: "hard",
    type: "multiple-choice",
    passage:
      "The gallery's spring exhibit gathers more than sixty landscapes painted over four decades. Known for her bold colors and flattened sense of perspective, ______",
    prompt: PROMPT,
    answer: "C",
    choices: [
      { letter: "A", text: "critics have praised the paintings of Ines Calloway for decades.", explanation: "The noun right after the comma is \"critics,\" so this says the critics are known for her bold colors. The modifier describes the wrong noun." },
      { letter: "B", text: "Ines Calloway's paintings have been praised by critics for decades.", explanation: "This is a tempting trap. The noun after the comma is \"paintings,\" not Calloway herself, and \"her bold colors\" has to describe a person, not the paintings." },
      { letter: "C", text: "Ines Calloway has been praised by critics for decades.", explanation: "Correct. The opening phrase describes a person known for \"her\" bold colors, and the noun right after the comma is that person, Ines Calloway." },
      { letter: "D", text: "decades of critical praise have followed Ines Calloway.", explanation: "This puts \"decades\" right after the comma, so the sentence says the decades are known for her bold colors." },
    ],
  },
];
