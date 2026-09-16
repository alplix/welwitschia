"use client";

import { format, formatDistanceStrict } from "date-fns";
import type { FileSurvivalEntry } from "@/lib/types";
import { DATE_FNS_LOCALES } from "@/lib/i18n/date-locales";
import { useLocale, useTranslations } from "./LanguageProvider";
import { SectionHeading } from "./EvolutionTimeline";

interface FileSurvivalProps {
  entries: FileSurvivalEntry[];
}

export function FileSurvival({ entries }: FileSurvivalProps) {
  const t = useTranslations();
  const { locale } = useLocale();
  const dateLocale = DATE_FNS_LOCALES[locale];

  return (
    <section id="file-survival" className="animate-fade-in pb-4">
      <SectionHeading title={t.fileSurvival.title} description={t.fileSurvival.description} />

      {entries.length === 0 ? (
        <p className="mt-6 text-sm text-muted-dim">{t.fileSurvival.noData}</p>
      ) : (
        <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {entries.map((entry) => {
            const ageText = formatDistanceStrict(new Date(entry.firstObservedAt), new Date(entry.lastObservedAt), {
              locale: dateLocale,
              roundingMethod: "floor",
            });
            return (
              <div key={entry.path} className="rounded-xl border border-border-subtle bg-surface p-4">
                <p className="truncate font-mono text-sm text-foreground" title={entry.path}>
                  {entry.path}
                </p>
                <dl className="mt-3 grid grid-cols-2 gap-y-1.5 text-xs">
                  <dt className="text-muted-dim">{t.fileSurvival.age}</dt>
                  <dd className="text-right text-muted">{ageText}</dd>
                  <dt className="text-muted-dim">{t.fileSurvival.changes}</dt>
                  <dd className="text-right text-muted">{entry.changeCount.toLocaleString(locale)}</dd>
                  <dt className="text-muted-dim">{t.fileSurvival.firstObserved}</dt>
                  <dd className="text-right text-muted">{format(new Date(entry.firstObservedAt), "yyyy", { locale: dateLocale })}</dd>
                  <dt className="text-muted-dim">{t.fileSurvival.lastChanged}</dt>
                  <dd className="text-right text-muted">{format(new Date(entry.lastObservedAt), "yyyy", { locale: dateLocale })}</dd>
                </dl>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}
