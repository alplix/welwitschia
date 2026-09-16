import type { TimelinePeriod } from "@/lib/types";
import { pluralize } from "@/lib/format";
import { SectionHeading } from "./EvolutionTimeline";

interface ArchitectureMomentsProps {
  periods: TimelinePeriod[];
}

export function ArchitectureMoments({ periods }: ArchitectureMomentsProps) {
  return (
    <section id="architecture-moments" className="animate-fade-in">
      <SectionHeading
        title="Architecture Moments"
        description="Periods where activity was unusually high compared to the surrounding history, based on a simple rule-based comparison — not a confirmed record of what changed."
      />

      {periods.length === 0 ? (
        <p className="mt-6 text-sm text-muted-dim">No unusually active periods were detected in the analyzed sample.</p>
      ) : (
        <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {periods.map((period) => (
            <div
              key={period.key}
              className="rounded-xl border border-border-subtle bg-surface p-4 transition-colors hover:border-accent/40"
            >
              <p className="text-sm font-medium text-foreground">{period.label}</p>
              <p className="mt-1 text-xs text-muted-dim">
                {period.commitCount} {pluralize(period.commitCount, "commit")} ·{" "}
                {period.contributorCount} {pluralize(period.contributorCount, "contributor")}
              </p>
              <ul className="mt-3 flex flex-col gap-1">
                {period.signals.map((signal) => (
                  <li key={signal.label} className="text-xs text-muted">
                    {signal.detail}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
