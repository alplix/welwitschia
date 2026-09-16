import { format } from "date-fns";
import type { FileSurvivalEntry } from "@/lib/types";
import { SectionHeading } from "./EvolutionTimeline";

interface FileSurvivalProps {
  entries: FileSurvivalEntry[];
}

export function FileSurvival({ entries }: FileSurvivalProps) {
  return (
    <section id="file-survival" className="animate-fade-in pb-4">
      <SectionHeading
        title="File Survival"
        description="Files observed as active across the longest stretch of the analyzed commit sample — a proxy for long-lived, foundational code."
      />

      {entries.length === 0 ? (
        <p className="mt-6 text-sm text-muted-dim">No file-level data was available in the analyzed sample.</p>
      ) : (
        <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {entries.map((entry) => (
            <div key={entry.path} className="rounded-xl border border-border-subtle bg-surface p-4">
              <p className="truncate font-mono text-sm text-foreground" title={entry.path}>
                {entry.path}
              </p>
              <dl className="mt-3 grid grid-cols-2 gap-y-1.5 text-xs">
                <dt className="text-muted-dim">Age</dt>
                <dd className="text-right text-muted">{entry.ageLabel}</dd>
                <dt className="text-muted-dim">Changes</dt>
                <dd className="text-right text-muted">{entry.changeCount.toLocaleString()}</dd>
                <dt className="text-muted-dim">First observed</dt>
                <dd className="text-right text-muted">{format(new Date(entry.firstObservedAt), "yyyy")}</dd>
                <dt className="text-muted-dim">Last changed</dt>
                <dd className="text-right text-muted">{format(new Date(entry.lastObservedAt), "yyyy")}</dd>
              </dl>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
