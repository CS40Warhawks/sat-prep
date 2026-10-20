// Every avatar item and how it is earned. Art is drawn in src/components/Avatar.tsx from `shape` and colors.

export type Slot = "hair" | "hat" | "face" | "top" | "bg";

export type HairShape = "short" | "long" | "curly" | "bun" | "buzz" | "spiky" | "shaved";
export type HatShape =
  | "beanie" | "cap" | "beret" | "gradcap" | "explorer" | "hardhat" | "fedora" | "crown" | "headphones" | "helmet" | "cone" | "halo" | "wizard";
export type FaceShape = "round" | "square" | "shades" | "goggles";
export type TopShape = "tee" | "hoodie" | "stripes" | "vest" | "jacket" | "turtleneck" | "spacesuit" | "varsity";
export type BgShape = "solid" | "dots" | "stripes" | "grid" | "stars" | "rays" | "rings" | "rainbow";

export type Rarity = "common" | "rare" | "legendary";
export const rarities: Rarity[] = ["common", "rare", "legendary"];

export type Unlock =
  | { kind: "starter" }
  /** "half": halfway through the skill's lessons. "end": every lesson done. */
  | { kind: "journey"; skill: string; stage: "half" | "end" }
  | { kind: "xp"; amount: number }
  | { kind: "streak"; days: number }
  | { kind: "diagnostic" }
  /** Only from mystery boxes, bought with XP. */
  | { kind: "box"; rarity: Rarity };

export interface Item {
  id: string;
  slot: Slot;
  name: string;
  shape: string;
  color: string;
  accent?: string;
  /** "metal" items shine; used for some legendary pieces. */
  finish?: "metal";
  unlock: Unlock;
}

type Spec = [slot: Slot, name: string, shape: string, color: string, accent?: string];

const slug = (name: string) =>
  name.toLowerCase().replace(/'/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

function item([slot, name, shape, color, accent]: Spec, unlock: Unlock): Item {
  return { id: slug(name), slot, name, shape, color, accent, unlock };
}

const starter = (spec: Spec) => item(spec, { kind: "starter" });

function box(rarity: Rarity, spec: Spec, finish?: "metal"): Item {
  return { ...item(spec, { kind: "box", rarity }), ...(finish ? { finish } : {}) };
}

/** Each skill is a journey with two rewards: one halfway, one at the end. */
function journey(skill: string, half: Spec, end: Spec): Item[] {
  return [item(half, { kind: "journey", skill, stage: "half" }), item(end, { kind: "journey", skill, stage: "end" })];
}

export const skinTones = ["#f9d9c3", "#f1c09b", "#dca47a", "#b47c52", "#8a5a3b", "#5e3b26"];
export const hairColors = ["#1f1a17", "#4a2f22", "#8b5a2b", "#d4a35a", "#ecdcb0", "#b91c1c", "#7c3aed", "#2563eb"];
export const expressions = ["smile", "grin", "calm"] as const;
export type Expression = (typeof expressions)[number];

/** Journey themes follow the units: Explorer, Scholar, Artist, Editor, Builder, Astronaut, Detective, Architect. */
export const journeyThemes: Record<string, string> = {
  "information-and-ideas": "Explorer",
  "craft-and-structure": "Scholar",
  "expression-of-ideas": "Artist",
  "standard-english-conventions": "Editor",
  algebra: "Builder",
  "advanced-math": "Astronaut",
  "problem-solving-data": "Detective",
  "geometry-trig": "Architect",
};

export const wardrobe: Item[] = [
  // Starters: everyone can look like themselves from day one.
  starter(["hair", "Side Sweep", "short", ""]),
  starter(["hair", "Long", "long", ""]),
  starter(["hair", "Curls", "curly", ""]),
  starter(["hair", "Top Bun", "bun", ""]),
  starter(["hair", "Buzz Cut", "buzz", ""]),
  starter(["hair", "Spikes", "spiky", ""]),
  starter(["hair", "Shaved", "shaved", ""]),
  starter(["top", "Sky Tee", "tee", "#60a5fa"]),
  starter(["top", "Mint Tee", "tee", "#34d399"]),
  starter(["top", "Coral Tee", "tee", "#fb7185"]),
  starter(["top", "Gray Hoodie", "hoodie", "#a8a29e", "#78716c"]),
  starter(["bg", "Sky", "solid", "#bae6fd"]),
  starter(["bg", "Mint", "solid", "#bbf7d0"]),
  starter(["bg", "Peach", "solid", "#fed7aa"]),
  starter(["bg", "Lilac", "solid", "#ddd6fe"]),

  // Habit rewards.
  item(["top", "Peak Hoodie", "hoodie", "#16a34a", "#15803d"], { kind: "diagnostic" }),
  item(["bg", "Confetti", "dots", "#fef3c7", "#f59e0b"], { kind: "xp", amount: 50 }),
  item(["hat", "Cozy Beanie", "beanie", "#4f46e5", "#a5b4fc"], { kind: "xp", amount: 150 }),
  item(["top", "Varsity Jacket", "varsity", "#1e3a8a", "#fbbf24"], { kind: "xp", amount: 400 }),
  item(["bg", "Gold Rays", "rays", "#fde68a", "#f59e0b"], { kind: "xp", amount: 1000 }),
  item(["face", "Cool Shades", "shades", "#1c1917"], { kind: "streak", days: 3 }),
  item(["hat", "Study Headphones", "headphones", "#292524", "#f97316"], { kind: "streak", days: 7 }),
  item(["hat", "Flame Cap", "cap", "#f97316", "#c2410c"], { kind: "streak", days: 14 }),
  item(["hat", "Crown", "crown", "#f59e0b", "#e11d48"], { kind: "streak", days: 30 }),

  // Information & Ideas: Explorer
  ...journey("central-ideas", ["bg", "Trail Map", "grid", "#fef3c7", "#d6b77a"], ["hat", "Explorer Hat", "explorer", "#c8a96a", "#6b4f2a"]),
  ...journey("command-of-evidence", ["face", "Field Glasses", "square", "#57534e"], ["top", "Field Vest", "vest", "#65733d", "#e7e5e4"]),
  ...journey("inferences", ["bg", "Campfire", "rays", "#ffedd5", "#fb923c"], ["top", "Trail Hoodie", "hoodie", "#166534", "#14532d"]),

  // Craft & Structure: Scholar
  ...journey("words-in-context", ["face", "Reading Glasses", "round", "#7c4a24"], ["top", "Library Cardigan", "jacket", "#881337", "#fde68a"]),
  ...journey("text-structure", ["bg", "Bookshelf", "stripes", "#fde7d0", "#c08457"], ["hat", "Graduation Cap", "gradcap", "#1e293b", "#f59e0b"]),
  ...journey("cross-text", ["top", "Debate Sweater", "stripes", "#1e3a8a", "#f5f5f4"], ["hat", "Honors Cap", "gradcap", "#7f1d1d", "#fde047"]),

  // Expression of Ideas: Artist
  ...journey("rhetorical-synthesis", ["bg", "Sunset", "rays", "#fce7f3", "#f472b6"], ["hat", "Painter's Beret", "beret", "#dc2626"]),
  ...journey("transitions", ["top", "Sunshine Tee", "tee", "#facc15"], ["face", "Star Shades", "shades", "#db2777"]),

  // Standard English Conventions: Editor
  ...journey("boundaries", ["face", "Editor's Specs", "round", "#1c1917"], ["top", "Editor's Turtleneck", "turtleneck", "#3f3f46"]),
  ...journey("form-structure-sense", ["bg", "Notebook Lines", "grid", "#eff6ff", "#93c5fd"], ["hat", "Ink Beret", "beret", "#18181b"]),

  // Algebra: Builder
  ...journey("linear-equations-one-variable", ["bg", "Blueprint", "grid", "#dbeafe", "#60a5fa"], ["hat", "Hard Hat", "hardhat", "#facc15", "#ca8a04"]),
  ...journey("linear-functions", ["top", "Builder Tee", "tee", "#f97316"], ["top", "Hi-Vis Vest", "vest", "#a3e635", "#78716c"]),
  ...journey("linear-equations-two-variables", ["face", "Safety Goggles", "goggles", "#0f766e", "#99f6e4"], ["hat", "Orange Hard Hat", "hardhat", "#fb923c", "#c2410c"]),
  ...journey("systems", ["bg", "Crossroads", "stripes", "#e7e5e4", "#a8a29e"], ["top", "Work Jacket", "jacket", "#1d4ed8", "#bfdbfe"]),
  ...journey("linear-inequalities", ["hat", "Builder Beanie", "beanie", "#ea580c", "#fed7aa"], ["bg", "Steel Beams", "grid", "#fee2e2", "#ef4444"]),

  // Advanced Math: Astronaut
  ...journey("equivalent-expressions", ["bg", "Night Sky", "stars", "#1e1b4b", "#fde68a"], ["hat", "Mission Headset", "headphones", "#cbd5e1", "#4f46e5"]),
  ...journey("nonlinear-equations", ["top", "Flight Jacket", "jacket", "#4d5b2a", "#fb923c"], ["top", "Space Suit", "spacesuit", "#e5e7eb", "#f97316"]),
  ...journey("nonlinear-functions", ["bg", "Orbit", "rings", "#ede9fe", "#a78bfa"], ["hat", "Space Helmet", "helmet", "#e5e7eb"]),

  // Problem-Solving & Data Analysis: Detective
  ...journey("ratios-rates", ["face", "Gold Frames", "round", "#b45309"], ["hat", "Detective Hat", "fedora", "#78350f", "#1c1917"]),
  ...journey("percentages", ["bg", "Case Board", "dots", "#f5e1c8", "#b45309"], ["top", "Trench Coat", "jacket", "#c8a77a", "#f5f5f4"]),
  ...journey("one-variable-data", ["top", "Data Hoodie", "hoodie", "#0d9488", "#115e59"], ["face", "Night Shades", "shades", "#0f172a"]),
  ...journey("two-variable-data", ["bg", "Scatter Plot", "dots", "#ccfbf1", "#14b8a6"], ["hat", "Gray Fedora", "fedora", "#57534e", "#1c1917"]),
  ...journey("probability", ["hat", "Lucky Cap", "cap", "#15803d", "#166534"], ["bg", "Jackpot", "rays", "#fef9c3", "#eab308"]),
  ...journey("inference-studies", ["top", "Lab Sweater", "stripes", "#f5f5f4", "#3b82f6"], ["top", "Lab Coat", "jacket", "#fafafa", "#60a5fa"]),
  ...journey("statistical-claims", ["face", "Fact-Check Frames", "square", "#dc2626"], ["hat", "Chief's Fedora", "fedora", "#1c1917", "#f59e0b"]),

  // Geometry & Trigonometry: Architect
  ...journey("area-volume", ["bg", "Tile Floor", "grid", "#ffedd5", "#ea580c"], ["top", "Architect Blazer", "jacket", "#334155", "#e2e8f0"]),
  ...journey("lines-angles-triangles", ["bg", "Prism", "rays", "#cffafe", "#06b6d4"], ["hat", "Triangle Hat", "cone", "#06b6d4", "#fde047"]),
  ...journey("right-triangles-trig", ["face", "Drafting Glasses", "square", "#0f172a"], ["top", "Compass Sweater", "stripes", "#0f766e", "#ccfbf1"]),
  ...journey("circles", ["hat", "Ring Cap", "cap", "#7c3aed", "#5b21b6"], ["bg", "Target Rings", "rings", "#fee2e2", "#f87171"]),

  // Mystery box pool. Each box gives one item you don't own yet.
  box("common", ["hat", "Lemon Beanie", "beanie", "#fde047", "#ca8a04"]),
  box("common", ["hat", "Mint Cap", "cap", "#6ee7b7", "#059669"]),
  box("common", ["hat", "Sky Beret", "beret", "#7dd3fc"]),
  box("common", ["face", "Teal Frames", "round", "#0d9488"]),
  box("common", ["face", "Tortoise Frames", "square", "#92400e"]),
  box("common", ["top", "Navy Tee", "tee", "#1e3a8a"]),
  box("common", ["top", "Lavender Tee", "tee", "#c4b5fd"]),
  box("common", ["top", "Red Hoodie", "hoodie", "#dc2626", "#991b1b"]),
  box("common", ["top", "Sage Turtleneck", "turtleneck", "#84a98c"]),
  box("common", ["bg", "Polka Pop", "dots", "#fce7f3", "#ec4899"]),
  box("common", ["bg", "Mint Stripes", "stripes", "#d1fae5", "#34d399"]),
  box("common", ["bg", "Lemon Grid", "grid", "#fef9c3", "#facc15"]),
  box("rare", ["hat", "Sun Hat", "explorer", "#f9a8d4", "#be185d"]),
  box("rare", ["hat", "Purple Headphones", "headphones", "#7c3aed", "#f0abfc"]),
  box("rare", ["face", "Neon Shades", "shades", "#65a30d"]),
  box("rare", ["face", "Rose Gold Frames", "round", "#e8a598"], "metal"),
  box("rare", ["top", "Denim Jacket", "jacket", "#3b82f6", "#e0f2fe"]),
  box("rare", ["top", "Teal Varsity", "varsity", "#0f766e", "#fde047"]),
  box("rare", ["bg", "Sunset Rings", "rings", "#ffedd5", "#f97316"]),
  box("rare", ["bg", "Aurora", "rays", "#cffafe", "#a78bfa"]),
  box("legendary", ["hat", "Halo", "halo", "#fde68a"]),
  box("legendary", ["hat", "Wizard Hat", "wizard", "#4c1d95", "#fde047"]),
  box("legendary", ["face", "Golden Shades", "shades", "#f59e0b"], "metal"),
  box("legendary", ["top", "Golden Jacket", "jacket", "#f59e0b", "#1c1917"], "metal"),
  box("legendary", ["bg", "Rainbow", "rainbow", "#e0f2fe"]),
];

export const itemsById: Record<string, Item> = Object.fromEntries(wardrobe.map((i) => [i.id, i]));

/** Slots that can be left empty. */
export const optionalSlots: Slot[] = ["hat", "face"];

export const rarityOf = (item: Item): Rarity | null => (item.unlock.kind === "box" ? item.unlock.rarity : null);
