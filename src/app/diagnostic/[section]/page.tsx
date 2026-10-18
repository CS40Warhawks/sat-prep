import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DiagnosticRunner } from "@/components/DiagnosticRunner";
import { sectionTitles } from "@/content/catalog";
import { diagnosticPairs } from "@/content/diagnosticPairs";
import type { Section } from "@/lib/types";

type Params = Promise<{ section: string }>;

export function generateStaticParams() {
  return [{ section: "rw" }, { section: "math" }];
}

export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { section } = await params;
  return { title: `${sectionTitles[section as Section] ?? ""} diagnostic` };
}

export default async function DiagnosticSectionPage({ params }: { params: Params }) {
  const { section } = await params;
  if (section !== "rw" && section !== "math") notFound();
  return <DiagnosticRunner section={section} sectionTitle={sectionTitles[section]} pairs={diagnosticPairs(section)} />;
}
