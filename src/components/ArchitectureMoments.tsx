"use client";

import type { TimelinePeriod } from "@/lib/types";
import { formatCount, interpolate } from "@/lib/i18n";
import { formatMonthYear } from "@/lib/i18n/date-locales";
import { useLocale, useTranslations } from "./LanguageProvider";
import { SectionHeading } from "./EvolutionTimeline";

interface ArchitectureMomentsProps {
  periods: TimelinePeriod[];
}

export function ArchitectureMoments({ periods }: ArchitectureMomentsProps) {
  const t = useTranslations();
  const { locale } = useLocale();

  return (
    <section id="architecture-moments" className="animate-fade-in">
      <SectionHeading title={t.architectureMoments.title} description={t.architectureMoments.description} />

      {periods.length === 0 ? (
        <p className="mt-6 text-sm text-muted-dim">{t.architectureMoments.noneDetected}</p>
      ) : (
        <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {periods.map((period) => (
            <div
              key={period.key}
              className="rounded-xl border border-border-subtle bg-surface p-4 transition-colors hover:border-accent/40"
            >
              <p className="text-sm font-medium text-foreground">{formatMonthYear(period.key, locale)}</p>
              <p className="mt-1 text-xs text-muted-dim">
                {formatCount(locale, period.commitCount, t.units.commit)} ·{" "}
                {formatCount(locale, period.contributorCount, t.units.contributor)}
              </p>
              <ul className="mt-3 flex flex-col gap-1">
                {period.signals.map((signal) => (
                  <li key={signal.type} className="text-xs text-muted">
                    {interpolate(t.signals[signal.type], { percent: signal.percent })}
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
