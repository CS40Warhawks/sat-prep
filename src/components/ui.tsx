import type { ReactNode, SVGProps } from "react";
import { BLANK } from "@/lib/passage";
import type { ChoiceLetter, Question } from "@/lib/types";

const PATHS = {
  flame: "M12 2c1 3 4 5 4 9a4 4 0 0 1-8 0c0-1.5.5-2.5 1.5-3.5C9.5 9 10 10 11 10c0-3 1-5 1-8Zm0 20a7 7 0 0 1-7-7c0-2 .8-3.7 2-5 0 2 1 3.5 2.5 3.5a3 3 0 0 0 5 2.5A7 7 0 0 1 12 22Z",
  bolt: "M13 2 4 14h7l-1 8 9-12h-7l1-8Z",
  check: "m5 12.5 4.5 4.5L19 7.5",
  star: "m12 3 2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1-4.4-4.3 6.1-.9L12 3Z",
  lock: "M7 11V8a5 5 0 0 1 10 0v3M6 11h12v10H6z",
  trophy: "M8 4h8v5a4 4 0 0 1-8 0V4Zm0 2H5a3 3 0 0 0 3 4m8-4h3a3 3 0 0 1-3 4M12 13v4m-4 3h8",
  book: "M5 4h10a3 3 0 0 1 3 3v13H8a3 3 0 0 1-3-3V4Zm0 13a3 3 0 0 1 3-3h10",
  close: "M6 6l12 12M18 6 6 18",
  target: "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Zm0-5a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm0-3a1 1 0 1 0 0-2",
  arrow: "M5 12h14m-6-6 6 6-6 6",
  gift: "M4 11h16v10H4zM3 7h18v4H3zM12 7v14M12 7C10 3 6 3 6 6s4 1 6 1Zm0 0c2-4 6-4 6-1s-4 1-6 1Z",
} as const;

export type IconName = keyof typeof PATHS;
const FILLED: IconName[] = ["flame", "bolt", "star"];

export function Icon({ name, ...props }: { name: IconName } & SVGProps<SVGSVGElement>) {
  const filled = FILLED.includes(name);
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden
      fill={filled ? "currentColor" : "none"}
      stroke={filled ? "none" : "currentColor"}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d={PATHS[name]} />
    </svg>
  );
}

/** A passage with an optional blank. Math questions have no passage, so nothing renders. */
export function Passage({ text }: { text: string }) {
  if (!text) return null;
  const parts = text.split(BLANK);
  return (
    <div className="rounded-2xl border border-line bg-white p-5">
      <p className="text-lg leading-relaxed whitespace-pre-line">
        {parts[0]}
        {parts.length > 1 && (
          <>
            <span className="mx-1 inline-block w-16 border-b-2 border-ink/40 align-baseline" aria-label="blank" />
            {parts[1]}
          </>
        )}
      </p>
    </div>
  );
}

export function ProgressBar({ value }: { value: number }) {
  return (
    <div
      className="h-2.5 flex-1 overflow-hidden rounded-full bg-stone-200"
      role="progressbar"
      aria-valuenow={Math.round(value * 100)}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <div className="h-full rounded-full bg-brand transition-all duration-500" style={{ width: `${Math.max(value * 100, 2)}%` }} />
    </div>
  );
}

/** Answer choices. With `reveal`, the key and the learner's pick are colored. */
export function Choices({
  question,
  selected,
  onSelect,
  reveal,
}: {
  question: Question;
  selected: ChoiceLetter | null;
  onSelect: (letter: ChoiceLetter) => void;
  reveal: boolean;
}) {
  return (
    <div className="grid gap-2.5">
      {question.choices.map((c, i) => {
        const isSel = selected === c.letter;
        const isAns = c.letter === question.answer;
        let tone = "border-line bg-white hover:border-stone-300";
        if (isSel && !reveal) tone = "border-sky bg-sky-soft text-sky-dark";
        if (reveal && isAns) tone = "border-brand bg-brand-soft text-brand-dark";
        if (reveal && isSel && !isAns) tone = "border-wrong bg-wrong-soft text-wrong-dark";
        return (
          <button
            key={c.letter}
            type="button"
            disabled={reveal}
            onClick={() => onSelect(c.letter)}
            aria-pressed={isSel}
            className={`flex items-center gap-3 rounded-xl border border-b-[3px] px-4 py-3.5 text-left font-medium transition-colors ${tone}`}
          >
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md border border-current text-xs font-semibold opacity-60">
              {i + 1}
            </span>
            {c.text}
          </button>
        );
      })}
    </div>
  );
}

export function Eyebrow({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <p className={`text-xs font-semibold tracking-widest text-muted uppercase ${className}`}>{children}</p>;
}
