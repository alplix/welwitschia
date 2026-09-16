"use client";

import { useMemo } from "react";
import type { ContributorEvolutionEntry, ContributorSummary } from "@/lib/types";
import { formatCount } from "@/lib/i18n";
import { useLocale, useTranslations } from "./LanguageProvider";
import { SectionHeading } from "./EvolutionTimeline";

interface ContributorEvolutionProps {
  contributors: ContributorEvolutionEntry[];
  contributorTotals: ContributorSummary[];
}

const DISPLAY_LIMIT = 10;
const ROW_HEIGHT_PX = 28;

export function ContributorEvolution({ contributors, contributorTotals }: ContributorEvolutionProps) {
  const t = useTranslations();
  const { locale } = useLocale();
  const avatarByLogin = useMemo(() => {
    const map = new Map<string, string>();
    for (const c of contributorTotals) map.set(c.login, c.avatarUrl);
    return map;
  }, [contributorTotals]);

  const displayed = contributors.slice(0, DISPLAY_LIMIT);

  const years = useMemo(() => {
    const set = new Set<string>();
    for (const c of displayed) for (const bucket of c.buckets) set.add(bucket.key);
    return [...set].sort();
  }, [displayed]);

  const maxCommitsInYear = useMemo(() => {
    let max = 1;
    for (const c of displayed) for (const bucket of c.buckets) max = Math.max(max, bucket.commitCount);
    return max;
  }, [displayed]);

  if (displayed.length === 0) {
    return (
      <section id="contributors" className="animate-fade-in">
        <SectionHeading title={t.contributorEvolution.title} description={t.contributorEvolution.noData} />
      </section>
    );
  }

  return (
    <section id="contributors" className="animate-fade-in">
      <SectionHeading title={t.contributorEvolution.title} description={t.contributorEvolution.description} />

      <div className="mt-6 overflow-x-auto rounded-xl border border-border-subtle bg-surface p-5 scrollbar-thin">
        <div className="mb-2 flex items-center pl-40 gap-1">
          {years.map((year) => (
            <div key={year} className="w-8 shrink-0 text-center text-[10px] text-muted-dim">
              {year}
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-3">
          {displayed.map((contributor) => {
            const bucketByYear = new Map(contributor.buckets.map((b) => [b.key, b.commitCount]));
            const avatar = avatarByLogin.get(contributor.login);
            return (
              <div key={contributor.login} className="flex items-center gap-3">
                <div className="flex w-40 shrink-0 items-center gap-2">
                  {avatar ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={avatar} alt="" className="h-6 w-6 rounded-full" />
                  ) : (
                    <span className="h-6 w-6 rounded-full bg-surface-hover" />
                  )}
                  <span className="truncate text-sm text-foreground">{contributor.login}</span>
                </div>
                <div className="flex items-end gap-1" style={{ height: ROW_HEIGHT_PX }}>
                  {years.map((year) => {
                    const commitCount = bucketByYear.get(year) ?? 0;
                    const heightPct = Math.max(commitCount > 0 ? 12 : 0, (commitCount / maxCommitsInYear) * 100);
                    return (
                      <div
                        key={year}
                        className="flex h-full w-8 shrink-0 items-end justify-center"
                        title={`${year}: ${formatCount(locale, commitCount, t.units.commit)}`}
                      >
                        <div
                          className="w-3 rounded-sm bg-leaf"
                          style={{ height: `${heightPct}%`, opacity: commitCount > 0 ? 0.85 : 0 }}
                        />
                      </div>
                    );
                  })}
                </div>
                <span className="ml-2 shrink-0 text-xs text-muted-dim">
                  {formatCount(locale, contributor.totalCommits, t.units.commit)}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
