import type { Metadata } from "next";
import { Suspense } from "react";
import { PlanView } from "@/components/PlanView";
import { skillContent } from "@/content/registry";

export const metadata: Metadata = { title: "Your plan" };

export default function PlanPage() {
  return (
    <Suspense>
      <PlanView lessonSkills={Object.keys(skillContent)} />
    </Suspense>
  );
}
