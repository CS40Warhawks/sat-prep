import type { Question } from "@/lib/types";

const PROMPT = "Which choice completes the text with the most logical transition?";

export const transitionsQuestions: Question[] = [
  {
    id: "rw-transitions-001",
    skill: "transitions",
    difficulty: "easy",
    type: "multiple-choice",
    passage:
      "Most marine mammals rely on a thick layer of blubber to stay warm in cold water. Sea otters, ______ have very little blubber; instead, they depend on extremely dense fur that traps a layer of air against their skin.",
    prompt: PROMPT,
    answer: "B",
    choices: [
      { letter: "A", text: "for example,", explanation: "Sea otters aren't an example of animals that rely on blubber. They're the exception, so an example transition points the wrong way." },
      { letter: "B", text: "by contrast,", explanation: "Correct. Most marine mammals use blubber, but sea otters don't. The second sentence sets up a difference, so a contrast transition fits." },
      { letter: "C", text: "similarly,", explanation: "\"Similarly\" signals that sea otters do the same thing as other marine mammals. The text says they do something different." },
      { letter: "D", text: "therefore,", explanation: "Other mammals having blubber doesn't cause sea otters to lack it. There's no cause-and-effect link here." },
    ],
  },
  {
    id: "rw-transitions-002",
    skill: "transitions",
    difficulty: "medium",
    type: "multiple-choice",
    passage:
      "The Great Wall of China is often described as if it were a single, continuous structure. ______ it is a network of many separate walls built and rebuilt by different dynasties over many centuries.",
    prompt: PROMPT,
    answer: "D",
    choices: [
      { letter: "A", text: "Similarly,", explanation: "The second sentence doesn't describe something alike. It corrects the popular description in the first sentence." },
      { letter: "B", text: "For example,", explanation: "A network of many walls isn't an example of a single structure. It contradicts that idea." },
      { letter: "C", text: "As a result,", explanation: "The wall wasn't built in many pieces because people describe it as one structure. That reverses the logic." },
      { letter: "D", text: "In reality,", explanation: "Correct. The first sentence gives a common belief and the second gives the actual situation. \"In reality\" signals that correction." },
    ],
  },
  {
    id: "rw-transitions-003",
    skill: "transitions",
    difficulty: "medium",
    type: "multiple-choice",
    passage:
      "Mangrove forests help protect coastlines by absorbing much of the energy of storm waves. ______ they store large amounts of carbon in their roots and in the waterlogged soil beneath them.",
    prompt: PROMPT,
    answer: "A",
    choices: [
      { letter: "A", text: "Additionally,", explanation: "Correct. Storing carbon is a second, separate benefit of mangroves, so a transition that adds a new point fits." },
      { letter: "B", text: "Nevertheless,", explanation: "\"Nevertheless\" signals that something happens despite the first idea. Storing carbon doesn't go against protecting coastlines." },
      { letter: "C", text: "Instead,", explanation: "\"Instead\" means one thing replaces another. Mangroves do both jobs, not one in place of the other." },
      { letter: "D", text: "For instance,", explanation: "Storing carbon isn't an example of absorbing wave energy. It's a different benefit." },
    ],
  },
  {
    id: "rw-transitions-004",
    skill: "transitions",
    difficulty: "medium",
    type: "multiple-choice",
    passage:
      "The violinist's early recordings sold poorly and received little attention from critics. ______ many younger musicians who heard them were deeply influenced, and several later named her as a key inspiration.",
    prompt: PROMPT,
    answer: "C",
    choices: [
      { letter: "A", text: "Consequently,", explanation: "Poor sales and little attention wouldn't cause musicians to be influenced. The second idea happens despite the first, not because of it." },
      { letter: "B", text: "Likewise,", explanation: "\"Likewise\" signals a similar idea, but being deeply influential is the opposite of being overlooked." },
      { letter: "C", text: "Nevertheless,", explanation: "Correct. The recordings were overlooked, yet they still influenced musicians. \"Nevertheless\" signals an outcome that happens in spite of the first fact." },
      { letter: "D", text: "In other words,", explanation: "The second sentence doesn't restate the first. It says something surprising that pushes against it." },
    ],
  },
  {
    id: "rw-transitions-005",
    skill: "transitions",
    difficulty: "hard",
    type: "multiple-choice",
    passage:
      "Tardigrades, tiny animals often called water bears, can survive conditions that would kill most other organisms. ______ some tardigrades have survived days of direct exposure to the vacuum of space.",
    prompt: PROMPT,
    answer: "B",
    choices: [
      { letter: "A", text: "However,", explanation: "Surviving in space doesn't go against the claim that tardigrades are tough. It supports it, so a contrast transition is wrong." },
      { letter: "B", text: "Indeed,", explanation: "Correct. Surviving the vacuum of space is a striking piece of evidence that backs up and strengthens the first sentence. \"Indeed\" signals that kind of emphasis." },
      { letter: "C", text: "Instead,", explanation: "\"Instead\" means something replaces something else. Nothing is being replaced here." },
      { letter: "D", text: "Even so,", explanation: "\"Even so\" sets up a contrast, as if surviving in space were surprising given the first sentence. It's actually exactly what the first sentence leads you to expect." },
    ],
  },
  {
    id: "rw-transitions-006",
    skill: "transitions",
    difficulty: "easy",
    type: "multiple-choice",
    passage:
      "After decades of exposure to salty ocean air, the bridge's steel cables had badly corroded. ______ city engineers closed the bridge to heavy trucks until the cables could be replaced.",
    prompt: PROMPT,
    answer: "C",
    choices: [
      { letter: "A", text: "However,", explanation: "Closing the bridge doesn't go against the cables being damaged. It's a response to it." },
      { letter: "B", text: "For example,", explanation: "Closing the bridge isn't an example of corrosion. It's what happened because of the corrosion." },
      { letter: "C", text: "As a result,", explanation: "Correct. The damaged cables caused the engineers to close the bridge, so a cause-and-effect transition fits." },
      { letter: "D", text: "Similarly,", explanation: "The second sentence doesn't describe something alike. It describes an effect of the first." },
    ],
  },
  {
    id: "rw-transitions-007",
    skill: "transitions",
    difficulty: "medium",
    type: "multiple-choice",
    passage:
      "Venus's thick atmosphere is made mostly of carbon dioxide, a gas that traps heat very effectively. ______ the surface of Venus is hotter than the surface of Mercury, even though Mercury is closer to the Sun.",
    prompt: PROMPT,
    answer: "A",
    choices: [
      { letter: "A", text: "Consequently,", explanation: "Correct. The heat-trapping atmosphere is the reason Venus is so hot, so the second sentence is an effect of the first." },
      { letter: "B", text: "Alternatively,", explanation: "\"Alternatively\" offers another option. The second sentence isn't an option. It's a result." },
      { letter: "C", text: "For instance,", explanation: "Venus's surface temperature isn't an example of carbon dioxide trapping heat in general. It's the outcome of this specific atmosphere." },
      { letter: "D", text: "Meanwhile,", explanation: "\"Meanwhile\" means something is happening at the same time. It misses the cause-and-effect link between the atmosphere and the heat." },
    ],
  },
  {
    id: "rw-transitions-008",
    skill: "transitions",
    difficulty: "medium",
    type: "multiple-choice",
    passage:
      "Researchers expected the new fertilizer to increase crop yields. ______ yields in the test fields stayed about the same as yields in fields that received no fertilizer at all.",
    prompt: PROMPT,
    answer: "D",
    choices: [
      { letter: "A", text: "Therefore,", explanation: "The expectation didn't cause the yields to stay flat. The result actually went against what was expected." },
      { letter: "B", text: "Similarly,", explanation: "Nothing in the second sentence matches the first. The results were the opposite of the prediction." },
      { letter: "C", text: "For example,", explanation: "Flat yields aren't an example of an increase. They contradict it." },
      { letter: "D", text: "However,", explanation: "Correct. The researchers expected an increase but didn't get one. \"However\" signals that contrast between expectation and result." },
    ],
  },
  {
    id: "rw-transitions-009",
    skill: "transitions",
    difficulty: "hard",
    type: "multiple-choice",
    passage:
      "A honeybee colony can lose many of its workers over a harsh winter. A healthy colony, though, can raise thousands of new workers within a few weeks once spring flowers bloom. ______ beekeepers who find a small colony in early spring are often advised not to panic.",
    prompt: PROMPT,
    answer: "B",
    choices: [
      { letter: "A", text: "Even so,", explanation: "\"Even so\" would mean the advice goes against the colony's ability to recover. In fact, the colony's ability to recover is the reason for the advice." },
      { letter: "B", text: "For this reason,", explanation: "Correct. Because a healthy colony can rebuild quickly, a small spring colony isn't necessarily a problem. The advice follows from the sentence before it." },
      { letter: "C", text: "By contrast,", explanation: "The advice doesn't contrast with the colony's quick recovery. It depends on it." },
      { letter: "D", text: "In the same way,", explanation: "The beekeepers' advice isn't parallel to anything in the earlier sentences. It's a conclusion drawn from them." },
    ],
  },
  {
    id: "rw-transitions-010",
    skill: "transitions",
    difficulty: "hard",
    type: "multiple-choice",
    passage:
      "The architect believed that buildings should respond to their local climate rather than follow a single international style. ______ her designs in hot, dry regions featured thick earthen walls and small windows, while her designs in rainy regions had steep roofs and wide overhangs.",
    prompt: PROMPT,
    answer: "C",
    choices: [
      { letter: "A", text: "Nonetheless,", explanation: "Her designs don't go against her belief. They put it into practice." },
      { letter: "B", text: "In contrast,", explanation: "This is the trap. The second sentence contains a contrast between dry and rainy regions, but the transition has to connect it to the first sentence, and the two sentences agree." },
      { letter: "C", text: "Accordingly,", explanation: "Correct. \"Accordingly\" means \"in a way that matches.\" Her climate-specific designs follow directly from her belief that buildings should respond to climate." },
      { letter: "D", text: "Previously,", explanation: "Nothing suggests these designs came before she held this belief. The sentences are connected by logic, not by time order." },
    ],
  },
  {
    id: "rw-transitions-011",
    skill: "transitions",
    difficulty: "easy",
    type: "multiple-choice",
    passage:
      "Many foods that people call vegetables are actually fruits in the botanical sense. ______ tomatoes, cucumbers, and pumpkins all develop from a flower and contain seeds.",
    prompt: PROMPT,
    answer: "A",
    choices: [
      { letter: "A", text: "For example,", explanation: "Correct. Tomatoes, cucumbers, and pumpkins are specific examples of \"vegetables\" that are botanically fruits." },
      { letter: "B", text: "However,", explanation: "The second sentence supports the first. It doesn't push against it." },
      { letter: "C", text: "Instead,", explanation: "\"Instead\" signals a replacement, but the second sentence just illustrates the first." },
      { letter: "D", text: "As a result,", explanation: "These foods don't develop from flowers because people call them vegetables. The second sentence gives examples, not an effect." },
    ],
  },
  {
    id: "rw-transitions-012",
    skill: "transitions",
    difficulty: "medium",
    type: "multiple-choice",
    passage:
      "Bats that hunt using echolocation produce high-pitched calls and listen for the echoes that bounce back from nearby objects. ______ these bats find their prey mainly by sound rather than by sight.",
    prompt: PROMPT,
    answer: "D",
    choices: [
      { letter: "A", text: "Nevertheless,", explanation: "Finding prey by sound doesn't go against using echoes. It's the same idea." },
      { letter: "B", text: "For instance,", explanation: "Finding prey by sound isn't one example of echolocation. It sums up what echolocation is." },
      { letter: "C", text: "Meanwhile,", explanation: "\"Meanwhile\" introduces something separate happening at the same time. The second sentence isn't a separate event." },
      { letter: "D", text: "In other words,", explanation: "Correct. The second sentence restates the first in simpler terms: listening for echoes means hunting by sound." },
    ],
  },
  {
    id: "rw-transitions-013",
    skill: "transitions",
    difficulty: "easy",
    type: "multiple-choice",
    passage:
      "To make paper by hand, workers first soak plant fibers in water and beat them into a soft pulp. ______ they lift a fine screen through the pulp so that a thin, even layer of fibers collects on its surface.",
    prompt: PROMPT,
    answer: "B",
    choices: [
      { letter: "A", text: "Similarly,", explanation: "Lifting a screen isn't like soaking fibers. It's the next step in the process." },
      { letter: "B", text: "Next,", explanation: "Correct. The text describes a process in order. \"First\" sets up the opening step, and \"Next\" introduces the following one." },
      { letter: "C", text: "In conclusion,", explanation: "\"In conclusion\" sums up an argument. This is just the second step of a process, not a summary." },
      { letter: "D", text: "For example,", explanation: "Lifting a screen isn't an example of making pulp. It's a separate step that comes after." },
    ],
  },
  {
    id: "rw-transitions-014",
    skill: "transitions",
    difficulty: "medium",
    type: "multiple-choice",
    passage:
      "In many songbird species, males sing complex songs during the breeding season, possibly to attract mates. ______ male humpback whales produce long, patterned songs during their breeding season.",
    prompt: PROMPT,
    answer: "C",
    choices: [
      { letter: "A", text: "In contrast,", explanation: "The whales do something very much like the birds, so a contrast transition doesn't fit." },
      { letter: "B", text: "As a result,", explanation: "Birds singing doesn't cause whales to sing. The two facts are parallel, not cause and effect." },
      { letter: "C", text: "Similarly,", explanation: "Correct. Male whales, like male songbirds, sing during the breeding season. \"Similarly\" points out that likeness." },
      { letter: "D", text: "Specifically,", explanation: "\"Specifically\" narrows in on a detail of the first sentence. Whales aren't songbirds, so they can't be a specific case of them." },
    ],
  },
  {
    id: "rw-transitions-015",
    skill: "transitions",
    difficulty: "hard",
    type: "multiple-choice",
    passage:
      "A team of researchers tested whether a new medication could reduce how often patients experience migraines. They found that the medication's benefits varied with a patient's age. ______ it was most effective in patients under forty and had little effect in patients over sixty.",
    prompt: PROMPT,
    answer: "A",
    choices: [
      { letter: "A", text: "Specifically,", explanation: "Correct. The last sentence gives the precise details of how the benefits varied with age. \"Specifically\" introduces that kind of zoomed-in detail." },
      { letter: "B", text: "Regardless,", explanation: "\"Regardless\" means \"no matter what was just said.\" The last sentence depends on the previous one, so it doesn't fit." },
      { letter: "C", text: "Conversely,", explanation: "\"Conversely\" introduces an opposite idea. The last sentence doesn't oppose the claim that benefits varied with age. It explains it." },
      { letter: "D", text: "Subsequently,", explanation: "\"Subsequently\" means \"later in time.\" The age details aren't a later event. They're part of the same finding." },
    ],
  },
];
