import type { Metadata } from "next";
import { DiagnosticIntro } from "@/components/DiagnosticIntro";
import { diagnosticPairs } from "@/content/diagnosticPairs";

export const metadata: Metadata = {
  title: "Diagnostic",
  description: "Find the SAT skills that will win you the most points, then get a plan for them.",
};

export default function DiagnosticPage() {
  return <DiagnosticIntro counts={{ rw: diagnosticPairs("rw").length, math: diagnosticPairs("math").length }} />;
}
