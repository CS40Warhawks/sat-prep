import type { Metadata } from "next";
import { Suspense } from "react";
import { AccountPanel } from "@/components/AccountPanel";

export const metadata: Metadata = { title: "Account" };

export default function AccountPage() {
  return (
    <Suspense>
      <AccountPanel />
    </Suspense>
  );
}
