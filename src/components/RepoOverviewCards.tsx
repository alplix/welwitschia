"use client";

import { format } from "date-fns";
import type { AnalysisMeta, RepoOverview } from "@/lib/types";
import { DATE_FNS_LOCALES } from "@/lib/i18n/date-locales";
import { interpolate } from "@/lib/i18n";
import { useLocale, useTranslations } from "./LanguageProvider";

interface RepoOverviewCardsProps {
  overview: RepoOverview;
  meta: AnalysisMeta;
  contributorCount: number;
}

export function RepoOverviewCards({ overview, meta, contributorCount }: RepoOverviewCardsProps) {
  const t = useTranslations();
  const { locale } = useLocale();
  const dateLocale = DATE_FNS_LOCALES[locale];

  const formatCompactDate = (iso: string) => format(new Date(iso), "MMM yyyy", { locale: dateLocale });
  const formatNumber = (n: number) => n.toLocaleString(locale);

  const stats = [
    { label: t.overview.stars, value: formatNumber(overview.stars) },
    { label: t.overview.forks, value: formatNumber(overview.forks) },
    { label: t.overview.contributors, value: formatNumber(contributorCount) },
    { label: t.overview.analyzedCommits, value: formatNumber(meta.analyzedCommitCount) },
    { label: t.overview.analyzedFiles, value: formatNumber(meta.analyzedFileCount) },
    { label: t.overview.created, value: formatCompactDate(overview.createdAt) },
  ];

  return (
    <section className="animate-fade-in">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight text-foreground">
            {overview.owner}
            <span className="text-muted-dim">/</span>
            {overview.name}
          </h1>
          {overview.description && <p className="mt-2 max-w-2xl text-sm leading-6 text-muted">{overview.description}</p>}
        </div>
        <a
          href={overview.htmlUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-accent hover:text-accent-strong"
        >
          {t.common.viewOnGithub} →
        </a>
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-dim">
        {overview.primaryLanguage && (
          <span className="inline-flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-accent" />
            {overview.primaryLanguage}
          </span>
        )}
        <span>{interpolate(t.overview.defaultBranch, { branch: overview.defaultBranch })}</span>
        <span>{interpolate(t.overview.lastUpdated, { date: formatCompactDate(overview.updatedAt) })}</span>
      </div>

      <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-xl border border-border-subtle bg-surface px-4 py-4 transition-colors hover:border-border-strong"
          >
            <p className="text-xs text-muted-dim">{stat.label}</p>
            <p className="mt-1.5 text-xl font-semibold text-foreground">{stat.value}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
