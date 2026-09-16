import { format } from "date-fns";
import type {
  CommitDetail,
  CommitStub,
  ContributorEvolutionEntry,
  DirectoryStat,
  FileStat,
  FileSurvivalEntry,
  FolderHeatmapNode,
  MostChangedFile,
  PeriodSignal,
  TimelinePeriod,
} from "./types";

export function monthKey(iso: string): string {
  return iso.slice(0, 7); // "YYYY-MM"
}

export function monthLabel(key: string): string {
  const [year, month] = key.split("-").map(Number);
  return format(new Date(Date.UTC(year, month - 1, 1)), "MMMM yyyy");
}

function nextMonthKey(key: string): string {
  const [year, month] = key.split("-").map(Number);
  const date = new Date(Date.UTC(year, month, 1)); // month is 0-indexed target = next month
  return `${date.getUTCFullYear()}-${String(date.getUTCMonth() + 1).padStart(2, "0")}`;
}

function enumerateMonthRange(startKey: string, endKey: string): string[] {
  const keys: string[] = [];
  let current = startKey;
  let guard = 0;
  while (current <= endKey && guard < 2000) {
    keys.push(current);
    current = nextMonthKey(current);
    guard += 1;
  }
  return keys;
}

function authorKey(commit: CommitStub): string {
  return commit.authorLogin ?? `name:${commit.authorName}`;
}

function directoryOf(filePath: string, depth: number): string {
  const segments = filePath.split("/").slice(0, -1);
  if (segments.length === 0) return "(root)";
  return segments.slice(0, depth).join("/");
}

function topN<T>(entries: T[], scoreOf: (item: T) => number, n: number): T[] {
  return [...entries].sort((a, b) => scoreOf(b) - scoreOf(a)).slice(0, n);
}

/**
 * Builds a continuous month-by-month timeline. Months with no sampled commit
 * activity are still included (as zero-activity periods) so quiet stretches
 * are visible rather than silently skipped.
 */
export function buildTimeline(commitStubs: CommitStub[], detailedCommits: CommitDetail[]): TimelinePeriod[] {
  if (commitStubs.length === 0) return [];

  const sortedStubs = [...commitStubs].sort((a, b) => a.date.localeCompare(b.date));
  const startKey = monthKey(sortedStubs[0].date);
  const endKey = monthKey(sortedStubs[sortedStubs.length - 1].date);
  const monthKeys = enumerateMonthRange(startKey, endKey);

  const stubsByMonth = new Map<string, CommitStub[]>();
  for (const stub of commitStubs) {
    const key = monthKey(stub.date);
    if (!stubsByMonth.has(key)) stubsByMonth.set(key, []);
    stubsByMonth.get(key)!.push(stub);
  }

  const detailsByMonth = new Map<string, CommitDetail[]>();
  for (const detail of detailedCommits) {
    const key = monthKey(detail.date);
    if (!detailsByMonth.has(key)) detailsByMonth.set(key, []);
    detailsByMonth.get(key)!.push(detail);
  }

  const periods: TimelinePeriod[] = [];
  let previousCommitCount: number | null = null;

  for (const key of monthKeys) {
    const stubs = stubsByMonth.get(key) ?? [];
    const details = detailsByMonth.get(key) ?? [];

    const commitCount = stubs.length;
    const contributorCount = new Set(stubs.map(authorKey)).size;

    let additions = 0;
    let deletions = 0;
    const fileChangeCounts = new Map<string, number>();
    const dirChangeCounts = new Map<string, number>();

    for (const detail of details) {
      additions += detail.additions;
      deletions += detail.deletions;
      for (const file of detail.files) {
        fileChangeCounts.set(file.path, (fileChangeCounts.get(file.path) ?? 0) + 1);
        const dir = directoryOf(file.path, 2);
        dirChangeCounts.set(dir, (dirChangeCounts.get(dir) ?? 0) + 1);
      }
    }

    const topFiles: FileStat[] = topN(
      [...fileChangeCounts.entries()].map(([path, changes]) => ({ path, changes })),
      (f) => f.changes,
      5,
    );
    const topDirectories: DirectoryStat[] = topN(
      [...dirChangeCounts.entries()].map(([path, changes]) => ({ path, changes })),
      (d) => d.changes,
      5,
    );

    const activityVsPrevious =
      previousCommitCount === null || previousCommitCount === 0
        ? null
        : ((commitCount - previousCommitCount) / previousCommitCount) * 100;

    periods.push({
      key,
      label: monthLabel(key),
      commitCount,
      contributorCount,
      additions,
      deletions,
      filesChanged: fileChangeCounts.size,
      topDirectories,
      topFiles,
      activityVsPrevious,
      isSignificant: false,
      signals: [],
    });

    if (commitCount > 0) previousCommitCount = commitCount;
  }

  return detectSignificantPeriods(periods);
}

const SIGNIFICANCE_WINDOW = 3;
const SIGNIFICANCE_RATIO = 1.75;
const MIN_COMMITS_FOR_SIGNIFICANCE = 5;

/**
 * Rule-based detection of unusually active periods, compared against the
 * trailing average of the previous few active periods. This flags candidates
 * for review, not confirmed architectural events, so labels stay hedged.
 */
export function detectSignificantPeriods(periods: TimelinePeriod[]): TimelinePeriod[] {
  const result: TimelinePeriod[] = [];
  const recentCommitCounts: number[] = [];
  const recentContributorCounts: number[] = [];

  for (const period of periods) {
    const signals: PeriodSignal[] = [];

    const commitBaseline = average(recentCommitCounts);
    const contributorBaseline = average(recentContributorCounts);

    if (
      commitBaseline !== null &&
      period.commitCount >= MIN_COMMITS_FOR_SIGNIFICANCE &&
      period.commitCount >= commitBaseline * SIGNIFICANCE_RATIO
    ) {
      const pct = Math.round(((period.commitCount - commitBaseline) / commitBaseline) * 100);
      signals.push({ type: "elevated_commits", percent: pct });
    }

    if (
      contributorBaseline !== null &&
      period.contributorCount >= 3 &&
      period.contributorCount >= contributorBaseline * SIGNIFICANCE_RATIO
    ) {
      const pct = Math.round(((period.contributorCount - contributorBaseline) / contributorBaseline) * 100);
      signals.push({ type: "contributor_surge", percent: pct });
    }

    if (period.additions + period.deletions > 0) {
      const changeVolume = period.additions + period.deletions;
      const recentChangeVolumes = result
        .slice(-SIGNIFICANCE_WINDOW)
        .map((p) => p.additions + p.deletions)
        .filter((v) => v > 0);
      const changeBaseline = average(recentChangeVolumes);
      if (changeBaseline !== null && changeVolume >= changeBaseline * SIGNIFICANCE_RATIO && changeVolume >= 200) {
        const pct = Math.round(((changeVolume - changeBaseline) / changeBaseline) * 100);
        signals.push({ type: "large_churn", percent: pct });
      }
    }

    result.push({ ...period, isSignificant: signals.length > 0, signals });

    if (period.commitCount > 0) {
      recentCommitCounts.push(period.commitCount);
      if (recentCommitCounts.length > SIGNIFICANCE_WINDOW) recentCommitCounts.shift();
      recentContributorCounts.push(period.contributorCount);
      if (recentContributorCounts.length > SIGNIFICANCE_WINDOW) recentContributorCounts.shift();
    }
  }

  return result;
}

function average(values: number[]): number | null {
  if (values.length === 0) return null;
  return values.reduce((sum, v) => sum + v, 0) / values.length;
}

export function aggregateMostChangedFiles(detailedCommits: CommitDetail[], limit = 20): MostChangedFile[] {
  const byPath = new Map<
    string,
    { changeCount: number; firstObservedAt: string; lastObservedAt: string; contributors: Set<string> }
  >();

  for (const commit of detailedCommits) {
    for (const file of commit.files) {
      const existing = byPath.get(file.path);
      const contributor = commit.authorLogin ?? commit.authorName;
      if (!existing) {
        byPath.set(file.path, {
          changeCount: 1,
          firstObservedAt: commit.date,
          lastObservedAt: commit.date,
          contributors: new Set([contributor]),
        });
      } else {
        existing.changeCount += 1;
        if (commit.date < existing.firstObservedAt) existing.firstObservedAt = commit.date;
        if (commit.date > existing.lastObservedAt) existing.lastObservedAt = commit.date;
        existing.contributors.add(contributor);
      }
    }
  }

  const entries: MostChangedFile[] = [...byPath.entries()].map(([path, stats]) => ({
    path,
    changeCount: stats.changeCount,
    firstObservedAt: stats.firstObservedAt,
    lastObservedAt: stats.lastObservedAt,
    contributorCount: stats.contributors.size,
  }));

  return topN(entries, (e) => e.changeCount, limit);
}

const HEATMAP_MAX_DEPTH = 3;
const HEATMAP_MAX_CHILDREN = 8;

interface TrieNode {
  changes: number;
  children: Map<string, TrieNode>;
}

export function buildFolderHeatmap(detailedCommits: CommitDetail[]): FolderHeatmapNode {
  const root: TrieNode = { changes: 0, children: new Map() };

  for (const commit of detailedCommits) {
    for (const file of commit.files) {
      const segments = file.path.split("/").slice(0, -1);
      const dirSegments = segments.length === 0 ? ["(root)"] : segments;
      let node = root;
      root.changes += 1;
      for (let i = 0; i < Math.min(dirSegments.length, HEATMAP_MAX_DEPTH); i += 1) {
        const seg = dirSegments[i];
        if (!node.children.has(seg)) node.children.set(seg, { changes: 0, children: new Map() });
        node = node.children.get(seg)!;
        node.changes += 1;
      }
    }
  }

  return toHeatmapNode(root, "repository", "");
}

function toHeatmapNode(node: TrieNode, name: string, parentPath: string): FolderHeatmapNode {
  const selfPath = parentPath ? `${parentPath}/${name}` : name;
  const childEntries = [...node.children.entries()].sort((a, b) => b[1].changes - a[1].changes);

  if (childEntries.length === 0) {
    return { name, path: selfPath, changes: node.changes };
  }

  const kept = childEntries.slice(0, HEATMAP_MAX_CHILDREN);
  const overflow = childEntries.slice(HEATMAP_MAX_CHILDREN);

  const children = kept.map(([childName, childNode]) => toHeatmapNode(childNode, childName, selfPath));

  if (overflow.length > 0) {
    const overflowChanges = overflow.reduce((sum, [, n]) => sum + n.changes, 0);
    children.push({
      name: "",
      path: `${selfPath}/other`,
      changes: overflowChanges,
      overflowCount: overflow.length,
    });
  }

  return { name, path: selfPath, changes: node.changes, children };
}

export function aggregateContributors(commitStubs: CommitStub[], limit = 15): ContributorEvolutionEntry[] {
  const byAuthor = new Map<
    string,
    { login: string; total: number; first: string; last: string; years: Map<string, number> }
  >();

  for (const stub of commitStubs) {
    const key = authorKey(stub);
    const displayName = stub.authorLogin ?? stub.authorName;
    const year = stub.date.slice(0, 4);
    if (!byAuthor.has(key)) {
      byAuthor.set(key, { login: displayName, total: 1, first: stub.date, last: stub.date, years: new Map([[year, 1]]) });
    } else {
      const entry = byAuthor.get(key)!;
      entry.total += 1;
      if (stub.date < entry.first) entry.first = stub.date;
      if (stub.date > entry.last) entry.last = stub.date;
      entry.years.set(year, (entry.years.get(year) ?? 0) + 1);
    }
  }

  const entries: ContributorEvolutionEntry[] = [...byAuthor.values()].map((entry) => ({
    login: entry.login,
    totalCommits: entry.total,
    firstActiveAt: entry.first,
    lastActiveAt: entry.last,
    buckets: [...entry.years.entries()]
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([key, commitCount]) => ({ key, commitCount })),
  }));

  return topN(entries, (e) => e.totalCommits, limit);
}

export function formatAgeLabel(fromIso: string, toIso: string): string {
  const from = new Date(fromIso);
  const to = new Date(toIso);
  const totalMonths = (to.getUTCFullYear() - from.getUTCFullYear()) * 12 + (to.getUTCMonth() - from.getUTCMonth());
  if (totalMonths < 1) return "less than a month";
  if (totalMonths < 12) return `${totalMonths} month${totalMonths === 1 ? "" : "s"}`;
  const years = Math.floor(totalMonths / 12);
  return `${years} year${years === 1 ? "" : "s"}`;
}

export function computeFileSurvival(detailedCommits: CommitDetail[], limit = 10): FileSurvivalEntry[] {
  const mostChanged = aggregateMostChangedFiles(detailedCommits, Number.POSITIVE_INFINITY);
  const withSpan = mostChanged.map((file) => ({
    path: file.path,
    changeCount: file.changeCount,
    firstObservedAt: file.firstObservedAt,
    lastObservedAt: file.lastObservedAt,
    spanMs: new Date(file.lastObservedAt).getTime() - new Date(file.firstObservedAt).getTime(),
  }));

  const longestLived = topN(withSpan, (f) => f.spanMs, limit);

  return longestLived.map((f) => ({
    path: f.path,
    ageLabel: formatAgeLabel(f.firstObservedAt, f.lastObservedAt),
    changeCount: f.changeCount,
    firstObservedAt: f.firstObservedAt,
    lastObservedAt: f.lastObservedAt,
  }));
}
