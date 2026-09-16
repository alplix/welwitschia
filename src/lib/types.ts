// Shared domain types for repository analysis.

export interface RepoIdentity {
  owner: string;
  repo: string;
}

export interface RepoOverview {
  name: string;
  owner: string;
  fullName: string;
  description: string | null;
  primaryLanguage: string | null;
  stars: number;
  forks: number;
  openIssues: number;
  defaultBranch: string;
  createdAt: string;
  updatedAt: string;
  htmlUrl: string;
}

export interface CommitStub {
  sha: string;
  date: string;
  authorLogin: string | null;
  authorName: string;
}

export interface CommitDetail extends CommitStub {
  additions: number;
  deletions: number;
  files: CommitFileChange[];
}

export interface CommitFileChange {
  path: string;
  additions: number;
  deletions: number;
  status: string;
}

export interface ContributorSummary {
  login: string;
  avatarUrl: string;
  contributions: number;
}

export interface PeriodSignal {
  label: string;
  detail: string;
}

export interface TimelinePeriod {
  key: string; // e.g. "2024-08"
  label: string; // e.g. "August 2024"
  commitCount: number;
  contributorCount: number;
  additions: number;
  deletions: number;
  filesChanged: number;
  topDirectories: DirectoryStat[];
  topFiles: FileStat[];
  activityVsPrevious: number | null; // percentage change, null if no previous period
  isSignificant: boolean;
  signals: PeriodSignal[];
}

export interface DirectoryStat {
  path: string;
  changes: number;
}

export interface FileStat {
  path: string;
  changes: number;
}

export interface MostChangedFile {
  path: string;
  changeCount: number;
  firstObservedAt: string;
  lastObservedAt: string;
  contributorCount: number;
}

export interface FileSurvivalEntry {
  path: string;
  ageLabel: string;
  changeCount: number;
  firstObservedAt: string;
  lastObservedAt: string;
}

export interface FolderHeatmapNode {
  name: string;
  path: string;
  changes: number;
  children?: FolderHeatmapNode[];
}

export interface ContributorActivityBucket {
  key: string;
  commitCount: number;
}

export interface ContributorEvolutionEntry {
  login: string;
  totalCommits: number;
  firstActiveAt: string;
  lastActiveAt: string;
  buckets: ContributorActivityBucket[];
}

export interface AnalysisMeta {
  analyzedCommitCount: number;
  detailedCommitCount: number;
  analyzedFileCount: number;
  sampledPageCount: number;
  totalPageCount: number;
  isPartialHistory: boolean;
  analyzedAt: string;
  fromCache: boolean;
}

export interface RepositoryAnalysis {
  overview: RepoOverview;
  meta: AnalysisMeta;
  timeline: TimelinePeriod[];
  mostChangedFiles: MostChangedFile[];
  folderHeatmap: FolderHeatmapNode;
  contributors: ContributorEvolutionEntry[];
  contributorTotals: ContributorSummary[];
  fileSurvival: FileSurvivalEntry[];
  significantPeriods: TimelinePeriod[];
}

export type ProgressStep =
  | "fetching_repo"
  | "analyzing_commits"
  | "analyzing_contributors"
  | "building_timeline"
  | "preparing_visualization";

export interface ProgressEvent {
  type: "progress";
  step: ProgressStep;
  label: string;
}

export interface DoneEvent {
  type: "done";
  data: RepositoryAnalysis;
}

export interface ErrorEvent {
  type: "error";
  code: string;
  message: string;
}

export type StreamEvent = ProgressEvent | DoneEvent | ErrorEvent;
