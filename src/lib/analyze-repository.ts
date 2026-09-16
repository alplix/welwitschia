import {
  aggregateContributors,
  aggregateMostChangedFiles,
  buildFolderHeatmap,
  buildTimeline,
  computeFileSurvival,
} from "./analysis";
import { readCachedAnalysis, writeCachedAnalysis } from "./cache";
import {
  fetchCommitDetails,
  fetchContributorTotals,
  fetchRepoOverview,
  fetchStratifiedCommitStubs,
  SAMPLING_LIMITS,
} from "./github";
import type { ProgressStep, RepositoryAnalysis } from "./types";

export interface AnalyzeOptions {
  owner: string;
  repo: string;
  skipCache?: boolean;
  onProgress?: (step: ProgressStep, label: string) => void;
}

const STEP_LABELS: Record<ProgressStep, string> = {
  fetching_repo: "Fetching repository...",
  analyzing_commits: "Analyzing commit history...",
  analyzing_contributors: "Analyzing contributors...",
  building_timeline: "Building timeline...",
  preparing_visualization: "Preparing visualization...",
};

export async function analyzeRepository(options: AnalyzeOptions): Promise<RepositoryAnalysis> {
  const { owner, repo, skipCache, onProgress } = options;
  const emit = (step: ProgressStep) => onProgress?.(step, STEP_LABELS[step]);

  if (!skipCache) {
    const cached = await readCachedAnalysis(owner, repo);
    if (cached) {
      return { ...cached, meta: { ...cached.meta, fromCache: true } };
    }
  }

  emit("fetching_repo");
  const overview = await fetchRepoOverview(owner, repo);

  emit("analyzing_commits");
  const { commits, totalPageCount, sampledPageCount } = await fetchStratifiedCommitStubs(
    owner,
    repo,
    SAMPLING_LIMITS.maxListPages,
  );
  const detailedCommits = await fetchCommitDetails(owner, repo, commits, SAMPLING_LIMITS.maxDetailCommits);

  emit("analyzing_contributors");
  const contributorTotals = await fetchContributorTotals(owner, repo);
  const contributors = aggregateContributors(commits);

  emit("building_timeline");
  const timeline = buildTimeline(commits, detailedCommits);
  const significantPeriods = timeline.filter((p) => p.isSignificant);

  emit("preparing_visualization");
  const mostChangedFiles = aggregateMostChangedFiles(detailedCommits);
  const folderHeatmap = buildFolderHeatmap(detailedCommits);
  const fileSurvival = computeFileSurvival(detailedCommits);
  const analyzedFileCount = new Set(detailedCommits.flatMap((c) => c.files.map((f) => f.path))).size;

  const analysis: RepositoryAnalysis = {
    overview,
    meta: {
      analyzedCommitCount: commits.length,
      detailedCommitCount: detailedCommits.length,
      analyzedFileCount,
      sampledPageCount,
      totalPageCount,
      isPartialHistory: sampledPageCount < totalPageCount,
      analyzedAt: new Date().toISOString(),
      fromCache: false,
    },
    timeline,
    mostChangedFiles,
    folderHeatmap,
    contributors,
    contributorTotals,
    fileSurvival,
    significantPeriods,
  };

  await writeCachedAnalysis(owner, repo, analysis);

  return analysis;
}
