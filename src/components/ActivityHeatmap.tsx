"use client";

import { useMemo, useState } from "react";
import type { TimelinePeriod } from "@/lib/types";
import { pluralize } from "@/lib/format";
import { SectionHeading } from "./EvolutionTimeline";

interface ActivityHeatmapProps {
  timeline: TimelinePeriod[];
}

const MONTH_LABELS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function intensityColor(ratio: number): string {
  if (ratio <= 0) return "var(--surface-hover)";
  // Interpolate opacity of the accent color by intensity bucket.
  if (ratio < 0.15) return "rgba(215, 162, 74, 0.18)";
  if (ratio < 0.4) return "rgba(215, 162, 74, 0.4)";
  if (ratio < 0.7) return "rgba(215, 162, 74, 0.7)";
  return "var(--accent)";
}

export function ActivityHeatmap({ timeline }: ActivityHeatmapProps) {
  const [hovered, setHovered] = useState<TimelinePeriod | null>(null);

  const { years, byYearMonth, maxCommits } = useMemo(() => {
    const map = new Map<string, TimelinePeriod>();
    let max = 0;
    for (const period of timeline) {
      map.set(period.key, period);
      if (period.commitCount > max) max = period.commitCount;
    }
    const yearSet = new Set(timeline.map((p) => p.key.slice(0, 4)));
    return { years: [...yearSet].sort(), byYearMonth: map, maxCommits: max };
  }, [timeline]);

  if (timeline.length === 0) return null;

  return (
    <section id="heatmap" className="animate-fade-in">
      <SectionHeading
        title="Activity Heatmap"
        description="A month-by-month view of development intensity — quiet stretches versus development bursts."
      />

      <div className="mt-6 overflow-x-auto rounded-xl border border-border-subtle bg-surface p-5 scrollbar-thin">
        <div className="inline-flex flex-col gap-1.5">
          <div className="ml-12 flex gap-1.5">
            {MONTH_LABELS.map((m) => (
              <div key={m} className="w-6 text-center text-[10px] text-muted-dim">
                {m}
              </div>
            ))}
          </div>
          {years.map((year) => (
            <div key={year} className="flex items-center gap-1.5">
              <div className="w-10 shrink-0 text-right text-[11px] text-muted-dim">{year}</div>
              {MONTH_LABELS.map((_, monthIdx) => {
                const key = `${year}-${String(monthIdx + 1).padStart(2, "0")}`;
                const period = byYearMonth.get(key);
                const ratio = period && maxCommits > 0 ? period.commitCount / maxCommits : 0;
                return (
                  <div
                    key={key}
                    onMouseEnter={() => period && setHovered(period)}
                    onMouseLeave={() => setHovered((prev) => (prev?.key === key ? null : prev))}
                    className="h-6 w-6 rounded-[4px] transition-transform hover:scale-110"
                    style={{
                      backgroundColor: period ? intensityColor(ratio) : "transparent",
                      border: period ? "none" : "1px dashed var(--border-subtle)",
                    }}
                  />
                );
              })}
            </div>
          ))}
        </div>
      </div>

      <div className="mt-3 flex items-center justify-between text-xs text-muted-dim">
        <span>
          {hovered
            ? `${hovered.label} — ${hovered.commitCount} ${pluralize(hovered.commitCount, "commit")}`
            : "Hover a cell for details"}
        </span>
        <div className="flex items-center gap-1.5">
          <span>Quiet</span>
          {[0, 0.1, 0.3, 0.6, 1].map((r) => (
            <span key={r} className="h-3 w-3 rounded-[3px]" style={{ backgroundColor: intensityColor(r) }} />
          ))}
          <span>Intense</span>
        </div>
      </div>
    </section>
  );
}
