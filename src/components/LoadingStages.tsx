"use client";

import type { ProgressStep } from "@/lib/types";
import { useTranslations } from "./LanguageProvider";

const STEP_ORDER: ProgressStep[] = [
  "fetching_repo",
  "analyzing_commits",
  "analyzing_contributors",
  "building_timeline",
  "preparing_visualization",
];

interface LoadingStagesProps {
  completedSteps: ProgressStep[];
  currentStep: ProgressStep | null;
}

export function LoadingStages({ completedSteps, currentStep }: LoadingStagesProps) {
  const t = useTranslations();

  return (
    <div className="flex flex-1 flex-col items-center justify-center px-6 py-24">
      <div className="w-full max-w-sm">
        <p className="mb-8 text-center text-sm tracking-wide text-muted-dim">{t.loading.heading}</p>
        <ul className="flex flex-col gap-4">
          {STEP_ORDER.map((step) => {
            const isDone = completedSteps.includes(step);
            const isActive = currentStep === step;
            return (
              <li key={step} className="flex items-center gap-3">
                <span
                  className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border text-[10px] transition-colors ${
                    isDone
                      ? "border-leaf bg-leaf-soft text-leaf"
                      : isActive
                        ? "border-accent bg-accent-soft text-accent"
                        : "border-border-subtle text-muted-dim"
                  }`}
                >
                  {isDone ? "✓" : isActive ? <span className="h-1.5 w-1.5 animate-pulse-soft rounded-full bg-accent" /> : ""}
                </span>
                <span
                  className={`text-sm transition-colors ${
                    isDone ? "text-muted" : isActive ? "text-foreground" : "text-muted-dim"
                  }`}
                >
                  {t.loading.steps[step]}
                </span>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
