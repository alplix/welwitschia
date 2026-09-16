"use client";

import { useMemo, useState } from "react";
import { ResponsiveContainer, Treemap } from "recharts";
import type { FolderHeatmapNode } from "@/lib/types";
import { pluralize } from "@/lib/format";
import { SectionHeading } from "./EvolutionTimeline";

interface CodebaseHeatmapProps {
  root: FolderHeatmapNode;
}

interface TreemapContentProps {
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  name?: string;
  changes?: number;
  maxChanges: number;
  onHover: (node: { name: string; path: string; changes: number } | null) => void;
  path?: string;
}

function TreemapCell({ x = 0, y = 0, width = 0, height = 0, name, changes = 0, maxChanges, onHover, path }: TreemapContentProps) {
  const ratio = maxChanges > 0 ? changes / maxChanges : 0;
  const opacity = 0.25 + ratio * 0.65;
  const showLabel = width > 46 && height > 26;

  return (
    <g
      onMouseEnter={() => onHover({ name: name ?? "", path: path ?? "", changes })}
      onMouseLeave={() => onHover(null)}
    >
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        style={{
          fill: "var(--accent)",
          fillOpacity: opacity,
          stroke: "var(--background)",
          strokeWidth: 2,
          cursor: "pointer",
        }}
      />
      {showLabel && (
        <text x={x + 6} y={y + 16} fontSize={11} fill="var(--foreground)" opacity={0.9}>
          {name && name.length > width / 7 ? `${name.slice(0, Math.floor(width / 7))}…` : name}
        </text>
      )}
    </g>
  );
}

export function CodebaseHeatmap({ root }: CodebaseHeatmapProps) {
  const [hovered, setHovered] = useState<{ name: string; path: string; changes: number } | null>(null);

  const data = useMemo(() => root.children ?? [], [root]);
  const maxChanges = useMemo(() => Math.max(1, ...data.map((d) => d.changes)), [data]);

  if (data.length === 0) {
    return (
      <section id="codebase-heatmap" className="animate-fade-in">
        <SectionHeading
          title="Codebase Heatmap"
          description="Which parts of this codebase receive the most development activity?"
        />
        <p className="mt-6 text-sm text-muted-dim">No directory-level data was available in the analyzed sample.</p>
      </section>
    );
  }

  return (
    <section id="codebase-heatmap" className="animate-fade-in">
      <SectionHeading
        title="Codebase Heatmap"
        description="Which parts of this codebase receive the most development activity? Larger, brighter blocks changed more often."
      />

      <div className="mt-6 rounded-xl border border-border-subtle bg-surface p-4">
        <div style={{ width: "100%", height: 360 }}>
          <ResponsiveContainer>
            <Treemap
              data={data as unknown as Record<string, unknown>[]}
              dataKey="changes"
              nameKey="name"
              stroke="var(--background)"
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              content={(props: any) => (
                <TreemapCell {...props} maxChanges={maxChanges} onHover={setHovered} />
              )}
              isAnimationActive={false}
            />
          </ResponsiveContainer>
        </div>
        <div className="mt-3 h-5 text-xs text-muted-dim">
          {hovered
            ? `${hovered.path || hovered.name} — ${hovered.changes.toLocaleString()} ${pluralize(hovered.changes, "change")}`
            : "Hover a block for details"}
        </div>
      </div>
    </section>
  );
}
