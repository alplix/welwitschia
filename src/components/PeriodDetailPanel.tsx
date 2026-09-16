"use client";

import { useState } from "react";
import type { TimelinePeriod } from "@/lib/types";

interface PeriodDetailPanelProps {
  period: TimelinePeriod;
  previousPeriod: TimelinePeriod | null;
  repoName: string;
  onClose: () => void;
}

export function PeriodDetailPanel({ period, previousPeriod, repoName, onClose }: PeriodDetailPanelProps) {
  const [explanation, setExplanation] = useState<string | null>(null);
  const [explainStatus, setExplainStatus] = useState<"idle" | "loading" | "error">("idle");

  async function handleExplain() {
    setExplainStatus("loading");
    setExplanation(null);
    try {
      const response = await fetch("/api/explain", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          repoName,
          periodLabel: period.label,
          commitCount: period.commitCount,
          contributorCount: period.contributorCount,
          additions: period.additions,
          deletions: period.deletions,
          filesChanged: period.filesChanged,
          activityVsPrevious: period.activityVsPrevious,
          topDirectories: period.topDirectories.map((d) => d.path),
          topFiles: period.topFiles.map((f) => f.path),
          signals: period.signals.map((s) => s.detail),
        }),
      });
      const body = await response.json();
      if (!response.ok) throw new Error(body.error ?? "Failed");
      setExplanation(body.explanation);
      setExplainStatus("idle");
    } catch {
      setExplainStatus("error");
    }
  }

  return (
    <div className="mt-4 animate-fade-in rounded-xl border border-border-subtle bg-surface-elevated p-6">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs uppercase tracking-wide text-muted-dim">{period.label}</p>
          {period.isSignificant && (
            <p className="mt-1 text-xs text-accent">Significant repository activity detected</p>
          )}
        </div>
        <button
          type="button"
          onClick={onClose}
          className="cursor-pointer rounded-md px-2 py-1 text-xs text-muted-dim transition-colors hover:text-foreground"
        >
          Close ✕
        </button>
      </div>

      <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-4">
        <Metric label="Commits" value={period.commitCount.toLocaleString()} />
        <Metric label="Contributors" value={period.contributorCount.toLocaleString()} />
        <Metric label="Files changed" value={period.filesChanged.toLocaleString()} />
        <Metric
          label="Lines changed"
          value={`+${period.additions.toLocaleString()} / -${period.deletions.toLocaleString()}`}
        />
      </div>

      {period.activityVsPrevious !== null && previousPeriod && (
        <p className="mt-4 text-sm text-muted">
          Activity{" "}
          <span className={period.activityVsPrevious >= 0 ? "text-leaf" : "text-danger"}>
            {period.activityVsPrevious >= 0 ? "+" : ""}
            {period.activityVsPrevious.toFixed(0)}%
          </span>{" "}
          compared with {previousPeriod.label}
        </p>
      )}

      {period.signals.length > 0 && (
        <ul className="mt-4 flex flex-col gap-1.5">
          {period.signals.map((signal) => (
            <li key={signal.label} className="flex items-start gap-2 text-sm text-muted">
              <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-accent" />
              <span>{signal.detail}</span>
            </li>
          ))}
        </ul>
      )}

      <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div>
          <p className="text-xs uppercase tracking-wide text-muted-dim">Most changed directories</p>
          {period.topDirectories.length === 0 ? (
            <p className="mt-2 text-sm text-muted-dim">No sampled changes in this period.</p>
          ) : (
            <ul className="mt-2 flex flex-col gap-1.5">
              {period.topDirectories.map((dir) => (
                <li key={dir.path} className="flex items-center justify-between text-sm">
                  <span className="truncate text-muted">{dir.path}</span>
                  <span className="text-muted-dim">{dir.changes}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div>
          <p className="text-xs uppercase tracking-wide text-muted-dim">Most changed files</p>
          {period.topFiles.length === 0 ? (
            <p className="mt-2 text-sm text-muted-dim">No sampled changes in this period.</p>
          ) : (
            <ul className="mt-2 flex flex-col gap-1.5">
              {period.topFiles.map((file) => (
                <li key={file.path} className="flex items-center justify-between text-sm">
                  <span className="truncate text-muted">{file.path}</span>
                  <span className="text-muted-dim">{file.changes}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <div className="mt-6 border-t border-border-subtle pt-5">
        {explanation ? (
          <p className="text-sm leading-6 text-muted">{explanation}</p>
        ) : (
          <button
            type="button"
            onClick={handleExplain}
            disabled={explainStatus === "loading"}
            className="cursor-pointer rounded-lg border border-border-subtle px-3 py-1.5 text-xs text-muted transition-colors hover:border-border-strong hover:text-foreground disabled:cursor-wait disabled:opacity-60"
          >
            {explainStatus === "loading" ? "Thinking..." : "Explain This Period"}
          </button>
        )}
        {explainStatus === "error" && (
          <p className="mt-2 text-xs text-danger">The AI explanation is unavailable right now.</p>
        )}
      </div>
    </div>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs text-muted-dim">{label}</p>
      <p className="mt-1 text-base font-medium text-foreground">{value}</p>
    </div>
  );
}
