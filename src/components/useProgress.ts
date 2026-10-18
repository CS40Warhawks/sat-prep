"use client";

import { useEffect, useState } from "react";
import { loadProgress, type Progress } from "@/lib/progress";

/** Reads saved progress after mount, so server and client render the same first frame. */
export function useProgress(): Progress | null {
  const [progress, setProgress] = useState<Progress | null>(null);
  useEffect(() => setProgress(loadProgress()), []);
  return progress;
}
