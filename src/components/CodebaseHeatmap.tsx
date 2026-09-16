"use client";

import { useMemo, useState } from "react";
import { ResponsiveContainer, Treemap } from "recharts";
import type { FolderHeatmapNode } from "@/lib/types";
import { formatCount, interpolate } from "@/lib/i18n";
import { useLocale, useTranslations } from "./LanguageProvider";
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
  const clipId = `treemap-clip-${x}-${y}`;

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
        <>
          <clipPath id={clipId}>
            <rect x={x} y={y} width={width} height={height} />
          </clipPath>
          <text
            x={x + 6}
            y={y + 16}
            fontSize={11}
            fill="var(--foreground)"
            opacity={0.9}
            clipPath={`url(#${clipId})`}
          >
            {name && name.length > width / 7 ? `${name.slice(0, Math.floor(width / 7))}…` : name}
          </text>
        </>
      )}
    </g>
  );
}

export function CodebaseHeatmap({ root }: CodebaseHeatmapProps) {
  const t = useTranslations();
  const { locale } = useLocale();
  const [hovered, setHovered] = useState<{ name: string; path: string; changes: number } | null>(null);

  // Render a single flat depth: pass only leaf-level stats (no nested
  // `children`), otherwise recharts' Treemap recursively lays out and labels
  // each node's descendants inside it, overlapping this level's own label.
  const data = useMemo(
    () =>
      (root.children ?? []).map((node) => ({
        name:
          node.overflowCount !== undefined
            ? interpolate(t.codebaseHeatmap.otherCount, { count: node.overflowCount })
            : node.name,
        path: node.path,
        changes: node.changes,
      })),
    [root, t],
  );
  const maxChanges = useMemo(() => Math.max(1, ...data.map((d) => d.changes)), [data]);

  if (data.length === 0) {
    return (
      <section id="codebase-heatmap" className="animate-fade-in">
        <SectionHeading title={t.codebaseHeatmap.title} description={t.codebaseHeatmap.description} />
        <p className="mt-6 text-sm text-muted-dim">{t.codebaseHeatmap.noData}</p>
      </section>
    );
  }

  return (
    <section id="codebase-heatmap" className="animate-fade-in">
      <SectionHeading title={t.codebaseHeatmap.title} description={t.codebaseHeatmap.description} />

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
            ? `${hovered.path || hovered.name} — ${formatCount(locale, hovered.changes, t.units.change)}`
            : t.codebaseHeatmap.hoverHint}
        </div>
      </div>
    </section>
  );
}
