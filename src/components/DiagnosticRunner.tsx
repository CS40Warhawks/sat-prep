"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import { saveSection, type SkillStatus } from "@/lib/diagnostic";
import type { ChoiceLetter, Question, Section } from "@/lib/types";
import { Choices, Eyebrow, Icon, Passage, ProgressBar } from "./ui";

interface SkillPair {
  skill: string;
  title: string;
  first: Question;
  followUp: Question;
}

/**
 * Two short rounds. Round 1 asks one question per skill. Round 2 asks a follow-up
 * only for skills missed in round 1, to tell a slip apart from a real gap.
 */
export function DiagnosticRunner({ section, sectionTitle, pairs }: { section: Section; sectionTitle: string; pairs: SkillPair[] }) {
  const router = useRouter();
  const [round, setRound] = useState<1 | 2>(1);
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<ChoiceLetter | null>(null);
  const [firstRight, setFirstRight] = useState<Record<string, boolean>>({});
  const [followRight, setFollowRight] = useState<Record<string, boolean>>({});
  const [missed, setMissed] = useState<string[]>([]);
  const [interlude, setInterlude] = useState(false);

  const followUps = useMemo(() => pairs.filter((p) => firstRight[p.skill] === false), [pairs, firstRight]);
  const list = round === 1 ? pairs : followUps;
  const pair = list[index];
  const question = round === 1 ? pair?.first : pair?.followUp;

  // Progress counts round 1 as most of the work; follow-ups fill the rest.
  const progress = round === 1 ? (index / pairs.length) * 0.8 : 0.8 + (index / Math.max(followUps.length, 1)) * 0.2;

  const finish = useCallback(
    (first: Record<string, boolean>, follow: Record<string, boolean>, missedIds: string[]) => {
      const skills: Record<string, SkillStatus> = {};
      for (const p of pairs) skills[p.skill] = first[p.skill] ? "strong" : follow[p.skill] ? "review" : "focus";
      saveSection(section, { takenAt: new Date().toISOString(), skills, missed: missedIds });
      router.push(`/plan?just=${section}`);
    },
    [pairs, section, router],
  );

  const submit = useCallback(
    (choice: ChoiceLetter | null) => {
      if (!pair || !question) return;
      const right = choice === question.answer;
      const nextMissed = right ? missed : [...missed, question.id];
      setMissed(nextMissed);
      setSelected(null);

      if (round === 1) {
        const first = { ...firstRight, [pair.skill]: right };
        setFirstRight(first);
        if (index + 1 < pairs.length) return setIndex(index + 1);
        if (pairs.some((p) => !first[p.skill])) {
          setRound(2);
          setIndex(0);
          setInterlude(true);
          return;
        }
        return finish(first, followRight, nextMissed);
      }

      const follow = { ...followRight, [pair.skill]: right };
      setFollowRight(follow);
      if (index + 1 < followUps.length) return setIndex(index + 1);
      finish(firstRight, follow, nextMissed);
    },
    [pair, question, missed, round, firstRight, followRight, index, pairs, followUps.length, finish],
  );

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (interlude) {
        if (e.key === "Enter") setInterlude(false);
        return;
      }
      if (!question) return;
      const n = Number(e.key);
      if (n >= 1 && n <= question.choices.length) setSelected(question.choices[n - 1].letter);
      if (e.key === "Enter" && selected) submit(selected);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [question, selected, submit, interlude]);

  if (interlude) {
    return (
      <div className="mx-auto flex min-h-screen max-w-md flex-col items-center justify-center px-6 text-center">
        <Eyebrow>Round 1 done</Eyebrow>
        <h1 className="mt-2 text-2xl font-semibold tracking-tight">A few quick follow-ups</h1>
        <p className="mt-3 text-muted">
          You&apos;ll get one more question for each of the {followUps.length} skills you missed. This tells a careless slip
          apart from a real gap.
        </p>
        <button onClick={() => setInterlude(false)} className="btn-green mt-8 w-full">
          Continue
        </button>
      </div>
    );
  }

  if (!pair || !question) return null;

  return (
    <div className="mx-auto flex min-h-screen max-w-2xl flex-col px-4">
      <div className="flex items-center gap-4 py-6">
        <Link href="/diagnostic" aria-label="Leave the diagnostic" className="text-stone-400 hover:text-ink">
          <Icon name="close" className="h-6 w-6" />
        </Link>
        <ProgressBar value={progress} />
      </div>

      <div className="flex-1 pb-36">
        <Eyebrow className="mb-3">
          {sectionTitle} · {round === 1 ? `Question ${index + 1} of ${pairs.length}` : `Follow-up ${index + 1} of ${followUps.length}`}
        </Eyebrow>
        <div key={question.id} className="animate-pop space-y-5">
          <Passage text={question.passage} />
          <p className="text-lg font-medium">{question.prompt}</p>
          <Choices question={question} selected={selected} onSelect={setSelected} reveal={false} />
        </div>
      </div>

      <div className="fixed inset-x-0 bottom-0 border-t border-line bg-paper">
        <div className="mx-auto flex max-w-2xl gap-3 px-4 py-5">
          <button onClick={() => submit(null)} className="btn-ghost flex-1 sm:flex-none">
            I don&apos;t know
          </button>
          <button
            onClick={() => submit(selected)}
            disabled={!selected}
            className={`${selected ? "btn-green" : "btn-off"} flex-1 sm:ml-auto sm:w-40 sm:flex-none`}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
