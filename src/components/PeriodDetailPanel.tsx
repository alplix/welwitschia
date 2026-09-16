"use client";

import { useState } from "react";
import type { TimelinePeriod } from "@/lib/types";
import { TRANSLATIONS, interpolate } from "@/lib/i18n";
import { formatMonthYear } from "@/lib/i18n/date-locales";
import { useLocale, useTranslations } from "./LanguageProvider";

interface PeriodDetailPanelProps {
  period: TimelinePeriod;
  previousPeriod: TimelinePeriod | null;
  repoName: string;
  onClose: () => void;
}

export function PeriodDetailPanel({ period, previousPeriod, repoName, onClose }: PeriodDetailPanelProps) {
  const t = useTranslations();
  const { locale } = useLocale();
  const [explanation, setExplanation] = useState<string | null>(null);
  const [explainStatus, setExplainStatus] = useState<"idle" | "loading" | "error">("idle");

  async function handleExplain() {
    setExplainStatus("loading");
    setExplanation(null);
    try {
      // Signal descriptions are sent in English regardless of UI language, to
      // keep the data contract sent to the AI stable; `locale` tells the AI
      // which language to reply in.
      const en = TRANSLATIONS.en;
      const response = await fetch("/api/explain", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          repoName,
          locale,
          periodLabel: formatMonthYear(period.key, "en"),
          commitCount: period.commitCount,
          contributorCount: period.contributorCount,
          additions: period.additions,
          deletions: period.deletions,
          filesChanged: period.filesChanged,
          activityVsPrevious: period.activityVsPrevious,
          topDirectories: period.topDirectories.map((d) => d.path),
          topFiles: period.topFiles.map((f) => f.path),
          signals: period.signals.map((s) => interpolate(en.signals[s.type], { percent: s.percent })),
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

  const activityLabel =
    period.activityVsPrevious === null
      ? ""
      : `${period.activityVsPrevious >= 0 ? "+" : ""}${period.activityVsPrevious.toFixed(0)}%`;

  return (
    <div className="mt-4 animate-fade-in rounded-xl border border-border-subtle bg-surface-elevated p-6">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs uppercase tracking-wide text-muted-dim">{formatMonthYear(period.key, locale)}</p>
          {period.isSignificant && <p className="mt-1 text-xs text-accent">{t.periodDetail.significantBadge}</p>}
        </div>
        <button
          type="button"
          onClick={onClose}
          className="cursor-pointer rounded-md px-2 py-1 text-xs text-muted-dim transition-colors hover:text-foreground"
        >
          {t.common.close} ✕
        </button>
      </div>

      <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-4">
        <Metric label={t.periodDetail.commits} value={period.commitCount.toLocaleString(locale)} />
        <Metric label={t.periodDetail.contributors} value={period.contributorCount.toLocaleString(locale)} />
        <Metric label={t.periodDetail.filesChanged} value={period.filesChanged.toLocaleString(locale)} />
        <Metric
          label={t.periodDetail.linesChanged}
          value={`+${period.additions.toLocaleString(locale)} / -${period.deletions.toLocaleString(locale)}`}
        />
      </div>

      {period.activityVsPrevious !== null && previousPeriod && (
        <p className="mt-4 text-sm text-muted">
          {interpolate(t.periodDetail.activityCompared, {
            percent: activityLabel,
            period: formatMonthYear(previousPeriod.key, locale),
          })
            .split(activityLabel)
            .map((part, i, arr) =>
              i < arr.length - 1 ? (
                <span key={i}>
                  {part}
                  <span className={period.activityVsPrevious! >= 0 ? "text-leaf" : "text-danger"}>{activityLabel}</span>
                </span>
              ) : (
                <span key={i}>{part}</span>
              ),
            )}
        </p>
      )}

      {period.signals.length > 0 && (
        <ul className="mt-4 flex flex-col gap-1.5">
          {period.signals.map((signal) => (
            <li key={signal.type} className="flex items-start gap-2 text-sm text-muted">
              <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-accent" />
              <span>{interpolate(t.signals[signal.type], { percent: signal.percent })}</span>
            </li>
          ))}
        </ul>
      )}

      <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div>
          <p className="text-xs uppercase tracking-wide text-muted-dim">{t.periodDetail.mostChangedDirectories}</p>
          {period.topDirectories.length === 0 ? (
            <p className="mt-2 text-sm text-muted-dim">{t.periodDetail.noSampledChanges}</p>
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
          <p className="text-xs uppercase tracking-wide text-muted-dim">{t.periodDetail.mostChangedFiles}</p>
          {period.topFiles.length === 0 ? (
            <p className="mt-2 text-sm text-muted-dim">{t.periodDetail.noSampledChanges}</p>
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
            {explainStatus === "loading" ? t.periodDetail.thinking : t.periodDetail.explainButton}
          </button>
        )}
        {explainStatus === "error" && <p className="mt-2 text-xs text-danger">{t.periodDetail.explainUnavailable}</p>}
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
