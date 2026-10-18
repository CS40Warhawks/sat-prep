import type { Metadata } from "next";
import { AvatarStudio } from "@/components/AvatarStudio";
import { Eyebrow } from "@/components/ui";

export const metadata: Metadata = { title: "Your avatar" };

export default function AvatarPage() {
  return (
    <div>
      <header className="mb-8">
        <Eyebrow>Avatar</Eyebrow>
        <h1 className="mt-1 text-3xl font-semibold tracking-tight">Make it yours</h1>
        <p className="mt-2 text-muted">Start with the basics. Lessons, streaks and skill journeys unlock the rest.</p>
      </header>
      <AvatarStudio />
    </div>
  );
}
