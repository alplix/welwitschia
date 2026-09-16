"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { LoadingStages } from "./LoadingStages";
import { ErrorState } from "./ErrorState";
import { RepoOverviewCards } from "./RepoOverviewCards";
import { EvolutionTimeline } from "./EvolutionTimeline";
import { ActivityHeatmap } from "./ActivityHeatmap";
import { ArchitectureMoments } from "./ArchitectureMoments";
import { MostChangedFiles } from "./MostChangedFiles";
import { CodebaseHeatmap } from "./CodebaseHeatmap";
import { ContributorEvolution } from "./ContributorEvolution";
import { FileSurvival } from "./FileSurvival";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { useLocale, useTranslations } from "./LanguageProvider";
import { formatCount, interpolate } from "@/lib/i18n";
import type { Dictionary } from "@/lib/i18n";
import type { ProgressStep, RepositoryAnalysis, StreamEvent } from "@/lib/types";

interface AnalysisViewProps {
  owner: string;
  repo: string;
}

type Status = "loading" | "error" | "done";

function resolveErrorMessage(t: Dictionary, code: string, fallback: string): string {
  const codes = t.error.codes as Record<string, string>;
  return codes[code] ?? fallback;
}

export function AnalysisView({ owner, repo }: AnalysisViewProps) {
  const t = useTranslations();
  const [status, setStatus] = useState<Status>("loading");
  const [completedSteps, setCompletedSteps] = useState<ProgressStep[]>([]);
  const [currentStep, setCurrentStep] = useState<ProgressStep | null>(null);
  const [data, setData] = useState<RepositoryAnalysis | null>(null);
  const [errorCode, setErrorCode] = useState<string>("");
  const [retryToken, setRetryToken] = useState(0);
  const abortRef = useRef<AbortController | null>(null);

  const runAnalysis = useCallback(
    async (refresh: boolean) => {
      setStatus("loading");
      setCompletedSteps([]);
      setCurrentStep(null);
      setData(null);
      setErrorCode("");

      const controller = new AbortController();
      abortRef.current = controller;

      try {
        const response = await fetch(`/api/analyze/${owner}/${repo}${refresh ? "?refresh=1" : ""}`, {
          signal: controller.signal,
        });

        if (!response.body) {
          setErrorCode("STREAMING_UNSUPPORTED");
          setStatus("error");
          return;
        }

        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let buffer = "";

        while (true) {
          const { value, done } = await reader.read();
          if (done) break;
          buffer += decoder.decode(value, { stream: true });

          let newlineIndex = buffer.indexOf("\n");
          while (newlineIndex !== -1) {
            const line = buffer.slice(0, newlineIndex).trim();
            buffer = buffer.slice(newlineIndex + 1);
            newlineIndex = buffer.indexOf("\n");
            if (!line) continue;

            const event = JSON.parse(line) as StreamEvent;
            if (event.type === "progress") {
              setCurrentStep(event.step);
              setCompletedSteps((prev) => (prev.includes(event.step) ? prev : [...prev, event.step]));
            } else if (event.type === "done") {
              setData(event.data);
              setStatus("done");
            } else if (event.type === "error") {
              setErrorCode(event.code);
              setStatus("error");
            }
          }
        }
      } catch (error) {
        if (error instanceof Error && error.name === "AbortError") return;
        setErrorCode("CONNECTION_ERROR");
        setStatus("error");
      }
    },
    [owner, repo],
  );

  useEffect(() => {
    // Kicks off the streaming fetch for the new owner/repo; runAnalysis resets
    // loading state up front before performing any network I/O.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    runAnalysis(false);
    return () => abortRef.current?.abort();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [owner, repo, retryToken]);

  if (status === "loading") {
    return (
      <div className="flex flex-1 flex-col">
        <TopBar owner={owner} repo={repo} />
        <LoadingStages completedSteps={completedSteps} currentStep={currentStep} />
      </div>
    );
  }

  if (status === "error") {
    const message =
      errorCode === "STREAMING_UNSUPPORTED"
        ? t.error.streamingUnsupported
        : errorCode === "CONNECTION_ERROR"
          ? t.error.connectionError
          : resolveErrorMessage(t, errorCode, t.error.connectionError);
    return (
      <div className="flex flex-1 flex-col">
        <TopBar owner={owner} repo={repo} />
        <ErrorState message={message} onRetry={() => setRetryToken((n) => n + 1)} />
      </div>
    );
  }

  if (!data) return null;

  return (
    <div className="flex flex-1 flex-col">
      <TopBar owner={owner} repo={repo} onRefresh={() => runAnalysis(true)} fromCache={data.meta.fromCache} />

      <div className="mx-auto flex w-full max-w-6xl flex-col gap-16 px-6 py-12">
        <RepoOverviewCards
          overview={data.overview}
          meta={data.meta}
          contributorCount={data.contributorTotals.length}
        />
        <EvolutionTimeline timeline={data.timeline} repoName={data.overview.fullName} />
        <ActivityHeatmap timeline={data.timeline} />
        <ArchitectureMoments periods={data.significantPeriods} />
        <MostChangedFiles files={data.mostChangedFiles} />
        <CodebaseHeatmap root={data.folderHeatmap} />
        <ContributorEvolution contributors={data.contributors} contributorTotals={data.contributorTotals} />
        <FileSurvival entries={data.fileSurvival} />
      </div>

      <Footer meta={data.meta} />
    </div>
  );
}

function TopBar({
  owner,
  repo,
  onRefresh,
  fromCache,
}: {
  owner: string;
  repo: string;
  onRefresh?: () => void;
  fromCache?: boolean;
}) {
  const t = useTranslations();

  return (
    <header className="sticky top-0 z-10 border-b border-border-subtle bg-background/85 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="text-sm font-semibold tracking-wide text-foreground">
          WELWITSCHIA
        </Link>
        <div className="flex items-center gap-3">
          <span className="hidden text-sm text-muted sm:inline">
            {owner}/{repo}
          </span>
          {onRefresh && (
            <button
              type="button"
              onClick={onRefresh}
              className="cursor-pointer rounded-lg border border-border-subtle px-3 py-1.5 text-xs text-muted transition-colors hover:border-border-strong hover:text-foreground"
              title={fromCache ? t.common.loadedFromCache : t.common.refresh}
            >
              {fromCache ? `${t.common.loadedFromCache} · ${t.common.refresh}` : t.common.refresh}
            </button>
          )}
          <LanguageSwitcher />
        </div>
      </div>
    </header>
  );
}

function Footer({ meta }: { meta: RepositoryAnalysis["meta"] }) {
  const t = useTranslations();
  const { locale } = useLocale();

  const partial = meta.isPartialHistory
    ? interpolate(t.footer.partialSuffix, { sampled: meta.sampledPageCount, total: meta.totalPageCount })
    : "";

  const summary = interpolate(t.footer.summary, {
    count: formatCount(locale, meta.analyzedCommitCount, t.units.commit),
    partial,
  });

  return (
    <footer className="border-t border-border-subtle px-6 py-8 text-center text-xs text-muted-dim">
      <p>{summary}</p>
      <p className="mt-2">{t.common.codedBy}</p>
    </footer>
  );
}
