import type { Question } from "@/lib/types";

const MAIN_IDEA = "Which choice best states the main idea of the text?";

export const centralIdeasQuestions: Question[] = [
  {
    id: "rw-central-ideas-001",
    skill: "central-ideas",
    difficulty: "easy",
    type: "multiple-choice",
    passage:
      "Many people picture deserts as lifeless, but the ground itself is often alive. In many dry regions, thin crusts made of cyanobacteria, lichens, and mosses cover the soil surface. These crusts hold soil in place during windstorms and capture nitrogen that nearby plants need to grow. Because the crusts recover very slowly once they are crushed, land managers urge visitors to stay on marked trails.",
    prompt: MAIN_IDEA,
    answer: "B",
    choices: [
      { letter: "A", text: "Deserts receive too little rain to support most forms of life.", explanation: "The text argues the opposite: desert soil is often full of life." },
      { letter: "B", text: "Living crusts on desert soil play important roles in desert environments.", explanation: "Correct. The text introduces the crusts, explains how they protect soil and help plants, and says they deserve protection. This choice covers all of that." },
      { letter: "C", text: "Visitors to deserts cause more damage to soil than windstorms do.", explanation: "The text never compares the damage done by visitors with the damage done by wind. It actually says the crusts protect soil from wind." },
      { letter: "D", text: "Mosses are the most common organisms found in desert soil crusts.", explanation: "Mosses are listed as one part of the crusts, but the text never says which organism is most common. This is too narrow and unsupported." },
    ],
  },
  {
    id: "rw-central-ideas-002",
    skill: "central-ideas",
    difficulty: "easy",
    type: "multiple-choice",
    passage:
      "In many small American towns of the nineteenth century, the general store was far more than a place to buy flour and nails. Mail was often delivered there, so residents stopped by regularly to collect letters and newspapers. While they waited, they traded news, discussed local politics, and arranged business deals. For many rural families, a trip to the store was one of the few chances during the week to see their neighbors.",
    prompt: "According to the text, why did residents stop by the general store regularly?",
    answer: "C",
    choices: [
      { letter: "A", text: "To attend scheduled meetings about local politics", explanation: "People discussed politics at the store, but the text never mentions scheduled meetings, and that isn't the reason it gives for regular visits." },
      { letter: "B", text: "To sell crops they had grown on their farms", explanation: "The text doesn't mention residents selling crops at the store." },
      { letter: "C", text: "To pick up mail that was delivered to the store", explanation: "Correct. The text says mail was often delivered there, \"so residents stopped by regularly to collect letters and newspapers.\"" },
      { letter: "D", text: "To buy flour and nails, which were sold nowhere else", explanation: "The text says the store was \"far more than\" a place to buy these goods, and it never says they were sold nowhere else." },
    ],
  },
  {
    id: "rw-central-ideas-003",
    skill: "central-ideas",
    difficulty: "medium",
    type: "multiple-choice",
    passage:
      "A researcher studying neighborhood libraries noticed that the busiest branches were not always the ones with the largest collections. Branches with long evening hours and plenty of seating tended to draw the most visitors, even when their shelves held fewer books. In interviews, many patrons said they came mainly to study, use the internet, or simply spend time in a quiet, safe place. The researcher concluded that a library's value to its community may depend as much on space and access as on books.",
    prompt: MAIN_IDEA,
    answer: "D",
    choices: [
      { letter: "A", text: "Libraries with large collections usually have fewer visitors than libraries with small collections.", explanation: "The text says the busiest branches were \"not always\" the biggest ones. That's much weaker than saying big libraries usually have fewer visitors." },
      { letter: "B", text: "Most library patrons no longer read books.", explanation: "The text says many patrons come mainly for other reasons, but it never claims that most patrons have stopped reading." },
      { letter: "C", text: "Libraries should reduce their collections to make room for more seating.", explanation: "The researcher draws a conclusion about what makes libraries valuable but never recommends cutting collections." },
      { letter: "D", text: "The researcher's findings suggest that a library's popularity depends heavily on factors other than the size of its collection.", explanation: "Correct. The study found that hours, seating, and a quiet space mattered a lot, which leads to the researcher's conclusion in the last sentence." },
    ],
  },
  {
    id: "rw-central-ideas-004",
    skill: "central-ideas",
    difficulty: "medium",
    type: "multiple-choice",
    passage:
      "Each autumn, monarch butterflies from eastern North America fly thousands of kilometers to spend the winter in mountain forests in central Mexico. The butterflies that make this trip have never been there before; they are several generations removed from the monarchs that left the forests the previous spring. Scientists have found that the insects use the position of the sun, together with an internal clock, to keep flying in the right direction. Some evidence suggests they may also sense Earth's magnetic field.",
    prompt: "According to the text, what is notable about the monarchs that fly to Mexico each autumn?",
    answer: "A",
    choices: [
      { letter: "A", text: "They have never made the journey before.", explanation: "Correct. The text says the butterflies making the trip \"have never been there before\" because they're several generations removed from the ones that left." },
      { letter: "B", text: "They follow older butterflies that already know the route.", explanation: "The text says the travelers are generations removed from the last monarchs to make the trip, and it never mentions following guides." },
      { letter: "C", text: "They fly only on days when the sun is not visible.", explanation: "The text says they use the sun's position to navigate, so this is the opposite of what it describes." },
      { letter: "D", text: "They spend the winter in the same forests where they hatched.", explanation: "The text says these butterflies have never been to the Mexican forests, so they couldn't have hatched there." },
    ],
  },
  {
    id: "rw-central-ideas-005",
    skill: "central-ideas",
    difficulty: "easy",
    type: "multiple-choice",
    passage:
      "The following text is from a novel. Lena is returning to her hometown after ten years away.\n\nWhen Lena stepped off the bus, she expected the town to look smaller, the way childhood places are supposed to. Instead, everything seemed exactly the right size: the hardware store with its faded green awning, the bench outside the post office, the hill she used to race her brother down. What had changed, she realized, was the way she looked at it all. Ten years ago she had counted the days until she could leave; now she found herself noticing how carefully someone still swept the sidewalk in front of the bakery.",
    prompt: MAIN_IDEA,
    answer: "B",
    choices: [
      { letter: "A", text: "Lena is disappointed to find that her hometown has changed while she was gone.", explanation: "The text suggests the town looks the same. What changed is Lena's point of view, and she doesn't seem disappointed." },
      { letter: "B", text: "Lena realizes that her feelings about her hometown have changed even though the town itself has not.", explanation: "Correct. The town seems \"exactly the right size,\" and Lena realizes that what changed was \"the way she looked at it all\": she once wanted to leave and now notices its small, caring details." },
      { letter: "C", text: "Lena regrets leaving her hometown and plans to move back for good.", explanation: "Lena sees the town more warmly now, but the text never mentions regret or plans to move back." },
      { letter: "D", text: "Lena notices that many of the town's businesses are struggling.", explanation: "The text mentions a faded awning and a bakery, but nothing suggests the businesses are struggling." },
    ],
  },
  {
    id: "rw-central-ideas-006",
    skill: "central-ideas",
    difficulty: "medium",
    type: "multiple-choice",
    passage:
      "An urban planner tracked how residents of a midsize city traveled to work over two years. After the city added protected bike lanes along one major avenue, bicycle trips on that route roughly doubled within six months. Bicycle trips on nearby streets without protected lanes barely changed. When surveyed, many of the new riders on the avenue said they had owned bicycles for years but had felt too unsafe to ride in traffic.",
    prompt: "According to the text, what did many of the new riders on the avenue report?",
    answer: "D",
    choices: [
      { letter: "A", text: "They had bought bicycles because the new lanes were built.", explanation: "The riders said the opposite: they had owned bicycles \"for years.\"" },
      { letter: "B", text: "They preferred streets without protected lanes.", explanation: "Trips on streets without protected lanes barely changed, and the riders never said they preferred those streets." },
      { letter: "C", text: "They had recently moved closer to the avenue.", explanation: "The text says nothing about riders moving." },
      { letter: "D", text: "They had not ridden before because riding in traffic felt unsafe to them.", explanation: "Correct. The riders said they owned bicycles but \"had felt too unsafe to ride in traffic,\" which is why they hadn't been riding until the protected lanes opened." },
    ],
  },
  {
    id: "rw-central-ideas-007",
    skill: "central-ideas",
    difficulty: "medium",
    type: "multiple-choice",
    passage:
      "Many harbor walls and piers built by the ancient Romans have survived in seawater for about two thousand years, while modern concrete in the sea can start to break down within decades. Researchers studying Roman structures have found that the ancient concrete contained volcanic ash. Over time, seawater seeping into the concrete reacted with the ash to form new minerals. Rather than weakening the structures, these minerals appear to have helped bind them more tightly together.",
    prompt: "According to the text, what effect did seawater have on Roman concrete?",
    answer: "A",
    choices: [
      { letter: "A", text: "It caused reactions that formed minerals, which appear to have strengthened the concrete.", explanation: "Correct. The text says seawater reacted with the volcanic ash to form new minerals that \"helped bind\" the structures together." },
      { letter: "B", text: "It slowly dissolved the volcanic ash, causing the concrete to crumble.", explanation: "The text says the Roman structures survived for two thousand years. Crumbling describes modern concrete, not Roman concrete." },
      { letter: "C", text: "It had no effect, because the volcanic ash kept water out.", explanation: "The text says seawater seeped into the concrete and reacted with the ash, so it clearly had an effect." },
      { letter: "D", text: "It weakened the concrete at first but stopped affecting it after a few decades.", explanation: "The text describes the seawater's effect as strengthening, not weakening, and never describes it stopping." },
    ],
  },
  {
    id: "rw-central-ideas-008",
    skill: "central-ideas",
    difficulty: "medium",
    type: "multiple-choice",
    passage:
      "Along parts of the Pacific coast of North America, sea otters were hunted nearly to extinction for their fur during the eighteenth and nineteenth centuries. In many areas where otters disappeared, populations of sea urchins, one of the otters' main prey, grew rapidly. The urchins grazed heavily on kelp, and in some places dense underwater kelp forests were reduced to bare, rocky seafloor. Where otters have since returned, kelp has often recovered, though the pace of recovery varies from place to place.",
    prompt: "According to the text, what happened in many areas after sea otters disappeared?",
    answer: "B",
    choices: [
      { letter: "A", text: "Kelp forests grew larger because otters no longer disturbed them.", explanation: "The text says kelp forests shrank, in some places to bare seafloor, after otters disappeared." },
      { letter: "B", text: "Sea urchin populations grew, and kelp forests declined in some places.", explanation: "Correct. The text says urchin populations \"grew rapidly\" and their grazing reduced some kelp forests to bare seafloor." },
      { letter: "C", text: "Sea urchins were also hunted, which caused the loss of kelp.", explanation: "The text never says urchins were hunted. Their numbers increased, and that's what harmed the kelp." },
      { letter: "D", text: "Kelp recovered quickly everywhere once hunting stopped.", explanation: "Recovery is linked to otters returning, not just to hunting stopping, and the text says its pace \"varies from place to place.\"" },
    ],
  },
  {
    id: "rw-central-ideas-009",
    skill: "central-ideas",
    difficulty: "hard",
    type: "multiple-choice",
    passage:
      "For a long time, historians described medieval Europe as a period of little scientific progress, sometimes calling it the \"Dark Ages.\" More recent scholarship has challenged that picture. Researchers point to developments from the period such as mechanical clocks, eyeglasses, and the spread of water-powered mills, as well as the founding of universities in cities like Bologna and Paris. These scholars argue that the older view reflected the biases of later writers more than the evidence itself.",
    prompt: MAIN_IDEA,
    answer: "C",
    choices: [
      { letter: "A", text: "Medieval Europe produced more scientific advances than any period that followed it.", explanation: "This goes far beyond the text, which only argues that the period was more productive than once believed. It never compares it with later periods." },
      { letter: "B", text: "Historians have long agreed that medieval Europe made little scientific progress.", explanation: "This is the older view the text sets up only to challenge. The main idea comes after the pivot \"More recent scholarship has challenged that picture.\"" },
      { letter: "C", text: "Recent scholars argue that medieval Europe was more scientifically productive than earlier historians claimed.", explanation: "Correct. The text presents the old \"Dark Ages\" view, then spends the rest explaining how newer research challenges it." },
      { letter: "D", text: "Eyeglasses and mechanical clocks were the most important inventions of the medieval period.", explanation: "These are examples supporting the main point, and the text never ranks them as the most important inventions." },
    ],
  },
  {
    id: "rw-central-ideas-010",
    skill: "central-ideas",
    difficulty: "hard",
    type: "multiple-choice",
    passage:
      "The following text is from a novel. Mr. Abernathy has run a small radio repair shop for forty years.\n\nMr. Abernathy kept every broken radio that customers had abandoned at his shop, stacking them on shelves that now reached the ceiling. His daughter called the collection a fire hazard and begged him to clear it out. He always agreed that she was right, and he always found a reason to wait. Some quiet afternoons, he would take one of the radios down, turn it over in his hands, and try to remember the person who had left it behind.",
    prompt: MAIN_IDEA,
    answer: "D",
    choices: [
      { letter: "A", text: "Mr. Abernathy ignores his daughter because he believes the radios are valuable.", explanation: "He actually agrees with his daughter, and nothing in the text suggests he thinks the radios are worth money." },
      { letter: "B", text: "Mr. Abernathy plans to repair the radios and return them to their owners.", explanation: "The text never mentions plans to repair or return the radios. He only tries to remember who left them." },
      { letter: "C", text: "Mr. Abernathy's daughter is mainly worried about the shop's finances.", explanation: "The daughter's stated concern is that the radios are a fire hazard, not money." },
      { letter: "D", text: "Mr. Abernathy accepts that the radios should go but keeps putting it off because they hold personal meaning for him.", explanation: "Correct. He agrees with his daughter yet always waits, and the last sentence shows why: the radios connect him to the people who left them." },
    ],
  },
  {
    id: "rw-central-ideas-011",
    skill: "central-ideas",
    difficulty: "hard",
    type: "multiple-choice",
    passage:
      "City planners often plant trees to provide shade and improve air quality. A team of researchers studying one city found another benefit: on blocks where trees had been planted, summer electricity use in nearby homes dropped, likely because residents ran their air conditioners less. The researchers cautioned, however, that the effect depended on where the trees were placed. Trees on the west side of homes, which get strong afternoon sun, reduced energy use far more than trees planted in other spots.",
    prompt: MAIN_IDEA,
    answer: "B",
    choices: [
      { letter: "A", text: "Planting trees improves air quality more than any other method city planners use.", explanation: "Air quality is mentioned only as a familiar reason to plant trees. The text never compares it with other methods." },
      { letter: "B", text: "Researchers found that trees can reduce household energy use, though the size of the effect depends on where the trees are planted.", explanation: "Correct. This captures both the new finding (lower electricity use) and the important limit the researchers added after \"however\" (placement matters)." },
      { letter: "C", text: "Homeowners should plant trees only on the west side of their houses.", explanation: "The text says west-side trees saved the most energy, but it never says trees should be planted only there." },
      { letter: "D", text: "Air conditioners are the main source of electricity use in most cities.", explanation: "The text doesn't make any claim about what uses the most electricity in cities." },
    ],
  },
  {
    id: "rw-central-ideas-012",
    skill: "central-ideas",
    difficulty: "hard",
    type: "multiple-choice",
    passage:
      "In the novel The Quiet Score, a young composer named Teodora Vance begins writing film music at a time when most studios want music to underline every feeling on screen: swelling strings for romance, crashing brass for danger. Vance takes a different approach. She often writes soft, restrained music for a film's most dramatic scenes, convinced that audiences will feel more if the music doesn't tell them what to feel. Studio executives resist her at first, but over time several directors begin asking for her by name.",
    prompt: "According to the text, why does Vance often write restrained music for dramatic scenes?",
    answer: "A",
    choices: [
      { letter: "A", text: "She believes audiences will react more strongly if the music doesn't direct their emotions.", explanation: "Correct. The text says she's \"convinced that audiences will feel more if the music doesn't tell them what to feel.\"" },
      { letter: "B", text: "Studio executives want her scores to be cheaper to record.", explanation: "The text says executives resisted her approach, and it never mentions recording costs." },
      { letter: "C", text: "She prefers writing for strings rather than brass instruments.", explanation: "Strings and brass are mentioned only as examples of what most studios wanted, not as her preference." },
      { letter: "D", text: "Directors ask her to avoid emotional music in their films.", explanation: "Directors ask for her by name, but the text doesn't say they tell her what kind of music to write. The approach is her own." },
    ],
  },
  {
    id: "rw-central-ideas-013",
    skill: "central-ideas",
    difficulty: "easy",
    type: "multiple-choice",
    passage:
      "When people think of pollinators, they often picture honeybees. But many other insects also carry pollen from flower to flower, and some can do things that honeybees can't. Bumblebees, for example, can grab a flower and rapidly vibrate their flight muscles, shaking loose pollen that is held tightly inside. This technique, called buzz pollination, is especially useful for crops such as tomatoes and blueberries.",
    prompt: MAIN_IDEA,
    answer: "C",
    choices: [
      { letter: "A", text: "Honeybees are poor pollinators for most crops.", explanation: "The text says other insects can do some things honeybees can't, but it never calls honeybees poor pollinators." },
      { letter: "B", text: "Tomatoes and blueberries can be pollinated only by bumblebees.", explanation: "The text says buzz pollination is \"especially useful\" for these crops, not that bumblebees are the only possible pollinators." },
      { letter: "C", text: "Insects other than honeybees are valuable pollinators, and some have abilities that honeybees lack.", explanation: "Correct. The text opens by moving past honeybees, then uses bumblebees and buzz pollination as an example of a skill honeybees don't have." },
      { letter: "D", text: "Bumblebees vibrate their muscles mainly to keep warm in cold weather.", explanation: "The text describes vibration only as a way to release pollen. It says nothing about staying warm." },
    ],
  },
  {
    id: "rw-central-ideas-014",
    skill: "central-ideas",
    difficulty: "medium",
    type: "multiple-choice",
    passage:
      "In 1843, Ada Lovelace published an English translation of an article about the Analytical Engine, a calculating machine designed by Charles Babbage but never completed. Lovelace added her own notes, which ended up far longer than the article itself. In them, she laid out a step-by-step method the machine could follow to calculate a series of numbers, and she suggested that such a machine might someday work with symbols other than numbers, perhaps even composing music. Many historians now see her notes as a remarkably early vision of what computers could do.",
    prompt: MAIN_IDEA,
    answer: "A",
    choices: [
      { letter: "A", text: "Lovelace's notes are significant because they foresaw what computing machines might eventually do.", explanation: "Correct. The text describes what her notes contained and ends with why they matter: historians see them as an early vision of computing." },
      { letter: "B", text: "Lovelace helped Babbage finish building the Analytical Engine.", explanation: "The text says the machine was never completed." },
      { letter: "C", text: "Lovelace was more interested in music than in mathematics.", explanation: "Music comes up only as one possibility she imagined. Most of the text is about her mathematical method." },
      { letter: "D", text: "Lovelace's translation was more popular than the original article.", explanation: "The text says her notes were longer than the article, not that her translation was more popular." },
    ],
  },
  {
    id: "rw-central-ideas-015",
    skill: "central-ideas",
    difficulty: "hard",
    type: "multiple-choice",
    passage:
      "Scientists once assumed that the deep ocean floor, far beyond the reach of sunlight, could support very little life. That view began to change in 1977, when researchers exploring the seafloor near the Galápagos Islands found hydrothermal vents surrounded by dense communities of tube worms, clams, and other animals. These communities do not depend on sunlight. Instead, they rely on microbes that use chemicals released from the vents to make food, a process called chemosynthesis.",
    prompt: MAIN_IDEA,
    answer: "C",
    choices: [
      { letter: "A", text: "Most deep-sea animals live near hydrothermal vents.", explanation: "The text describes rich communities around vents, but it never says most deep-sea animals live there." },
      { letter: "B", text: "In 1977, researchers went to the Galápagos Islands specifically to look for tube worms.", explanation: "The text doesn't say what the researchers were searching for, and this detail isn't the main point anyway." },
      { letter: "C", text: "The discovery of life around deep-sea vents challenged an earlier belief by showing that ecosystems can run on chemical energy instead of sunlight.", explanation: "Correct. The text starts with the old assumption, then explains how the vent discovery overturned it and what powers these communities." },
      { letter: "D", text: "Chemosynthesis produces food more efficiently than photosynthesis does.", explanation: "The text explains what chemosynthesis is but never compares how efficient it is with photosynthesis." },
    ],
  },
];
