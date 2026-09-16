"use client";

import { useMemo, useState } from "react";
import { Bar, BarChart, CartesianGrid, Cell, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import type { TimelinePeriod } from "@/lib/types";
import { pluralize } from "@/lib/format";
import { PeriodDetailPanel } from "./PeriodDetailPanel";

interface EvolutionTimelineProps {
  timeline: TimelinePeriod[];
  repoName: string;
}

const BAR_WIDTH_PX = 14;
const MIN_CHART_WIDTH_PX = 640;

export function EvolutionTimeline({ timeline, repoName }: EvolutionTimelineProps) {
  const [selectedKey, setSelectedKey] = useState<string | null>(null);

  const selectedIndex = useMemo(() => timeline.findIndex((p) => p.key === selectedKey), [timeline, selectedKey]);
  const selectedPeriod = selectedIndex >= 0 ? timeline[selectedIndex] : null;
  const previousPeriod = selectedIndex > 0 ? timeline[selectedIndex - 1] : null;

  const chartWidth = Math.max(MIN_CHART_WIDTH_PX, timeline.length * BAR_WIDTH_PX);

  if (timeline.length === 0) {
    return (
      <section id="timeline">
        <SectionHeading
          title="Evolution Timeline"
          description="No commit history was available to build a timeline for this repository."
        />
      </section>
    );
  }

  return (
    <section id="timeline" className="animate-fade-in">
      <SectionHeading
        title="Evolution Timeline"
        description="Commit activity across the repository's history. Click any period for details — bars marked in amber were flagged as unusually active."
      />

      <div className="mt-6 overflow-x-auto rounded-xl border border-border-subtle bg-surface p-4 scrollbar-thin">
        <div style={{ width: chartWidth, height: 200 }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={timeline} margin={{ top: 8, right: 8, left: 0, bottom: 0 }} barCategoryGap={1}>
              <CartesianGrid vertical={false} stroke="var(--border-subtle)" />
              <XAxis
                dataKey="key"
                tickFormatter={(key: string) => (key.endsWith("-01") ? key.slice(0, 4) : "")}
                interval={0}
                axisLine={{ stroke: "var(--border-subtle)" }}
                tickLine={false}
                tick={{ fill: "var(--muted-dim)", fontSize: 11 }}
              />
              <YAxis hide />
              <Tooltip
                cursor={{ fill: "var(--surface-hover)" }}
                content={({ active, payload }) => {
                  if (!active || !payload?.length) return null;
                  const period = payload[0].payload as TimelinePeriod;
                  return (
                    <div className="rounded-lg border border-border-strong bg-surface-elevated px-3 py-2 text-xs shadow-xl">
                      <p className="font-medium text-foreground">{period.label}</p>
                      <p className="text-muted">
                        {period.commitCount} {pluralize(period.commitCount, "commit")}
                      </p>
                      {period.isSignificant && <p className="mt-1 text-accent">Significant activity detected</p>}
                    </div>
                  );
                }}
              />
              <Bar
                dataKey="commitCount"
                radius={[2, 2, 0, 0]}
                onClick={(entry) => setSelectedKey((entry as unknown as TimelinePeriod).key)}
                cursor="pointer"
              >
                {timeline.map((period) => (
                  <Cell
                    key={period.key}
                    fill={period.key === selectedKey ? "var(--accent-strong)" : period.isSignificant ? "var(--accent)" : "var(--chart-2)"}
                    fillOpacity={period.key === selectedKey ? 1 : period.isSignificant ? 0.9 : 0.55}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {selectedPeriod && (
        <PeriodDetailPanel
          period={selectedPeriod}
          previousPeriod={previousPeriod}
          repoName={repoName}
          onClose={() => setSelectedKey(null)}
        />
      )}
    </section>
  );
}

export function SectionHeading({ title, description }: { title: string; description: string }) {
  return (
    <div>
      <h2 className="text-xl font-semibold tracking-tight text-foreground">{title}</h2>
      <p className="mt-1 max-w-2xl text-sm text-muted">{description}</p>
    </div>
  );
}
