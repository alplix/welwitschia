export const LOCALE_CODES = [
  "en",
  "de",
  "fr",
  "es",
  "it",
  "pt",
  "nl",
  "pl",
  "ru",
  "uk",
  "sv",
  "da",
  "fi",
  "el",
  "cs",
  "ro",
  "hu",
  "tr",
  "zh",
  "vi",
] as const;

export type Locale = (typeof LOCALE_CODES)[number];

export interface PluralForms {
  one: string;
  few?: string;
  many?: string;
  other: string;
}

export interface Dictionary {
  common: {
    tagline: string;
    viewOnGithub: string;
    backToHome: string;
    close: string;
    refresh: string;
    loadedFromCache: string;
    codedBy: string;
    language: string;
  };
  landing: {
    badge: string;
    description: string;
    inputPlaceholder: string;
    analyzeButton: string;
    tryLabel: string;
    supportNote: string;
    invalidUrl: string;
  };
  loading: {
    heading: string;
    steps: {
      fetching_repo: string;
      analyzing_commits: string;
      analyzing_contributors: string;
      building_timeline: string;
      preparing_visualization: string;
    };
  };
  error: {
    heading: string;
    tryAgain: string;
    connectionError: string;
    streamingUnsupported: string;
    codes: {
      INVALID_URL: string;
      NOT_FOUND: string;
      PRIVATE_REPOSITORY: string;
      RATE_LIMITED: string;
      NO_COMMIT_DATA: string;
      UPSTREAM_ERROR: string;
      TIMEOUT: string;
      NETWORK_ERROR: string;
    };
  };
  overview: {
    stars: string;
    forks: string;
    contributors: string;
    analyzedCommits: string;
    analyzedFiles: string;
    created: string;
    defaultBranch: string;
    lastUpdated: string;
  };
  timeline: {
    title: string;
    description: string;
    noData: string;
    tooltipSignificant: string;
  };
  periodDetail: {
    significantBadge: string;
    commits: string;
    contributors: string;
    filesChanged: string;
    linesChanged: string;
    activityCompared: string;
    mostChangedDirectories: string;
    mostChangedFiles: string;
    noSampledChanges: string;
    explainButton: string;
    thinking: string;
    explainUnavailable: string;
  };
  heatmap: {
    title: string;
    description: string;
    hoverHint: string;
    quiet: string;
    intense: string;
  };
  architectureMoments: {
    title: string;
    description: string;
    noneDetected: string;
  };
  signalLabels: {
    elevated_commits: string;
    contributor_surge: string;
    large_churn: string;
  };
  signals: {
    elevated_commits: string;
    contributor_surge: string;
    large_churn: string;
  };
  mostChangedFiles: {
    title: string;
    description: string;
    noData: string;
    contributors: string;
    firstObserved: string;
    lastObserved: string;
  };
  codebaseHeatmap: {
    title: string;
    description: string;
    noData: string;
    hoverHint: string;
    otherCount: string;
  };
  contributorEvolution: {
    title: string;
    description: string;
    noData: string;
  };
  fileSurvival: {
    title: string;
    description: string;
    noData: string;
    age: string;
    changes: string;
    firstObserved: string;
    lastChanged: string;
  };
  footer: {
    summary: string;
    partialSuffix: string;
  };
  units: {
    commit: PluralForms;
    change: PluralForms;
    contributor: PluralForms;
  };
}
