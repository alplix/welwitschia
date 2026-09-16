import type { Dictionary } from "../types";

const en: Dictionary = {
  common: {
    tagline: "See how a codebase evolves.",
    viewOnGithub: "View on GitHub",
    backToHome: "Back to home",
    close: "Close",
    refresh: "Refresh",
    loadedFromCache: "Loaded from cache",
    codedBy: "Coded by Alperen Yavuz",
    language: "Language",
  },
  landing: {
    badge: "Developer tool",
    description:
      "Explore the history, activity, contributors, and structural changes of any public GitHub repository.",
    inputPlaceholder: "https://github.com/vercel/next.js",
    analyzeButton: "Analyze Repository",
    tryLabel: "Try:",
    supportNote: "Currently supports public GitHub repositories.",
    invalidUrl: "Enter a valid public GitHub repository URL, e.g. https://github.com/vercel/next.js",
  },
  loading: {
    heading: "Analyzing repository",
    steps: {
      fetching_repo: "Fetching repository...",
      analyzing_commits: "Analyzing commit history...",
      analyzing_contributors: "Analyzing contributors...",
      building_timeline: "Building timeline...",
      preparing_visualization: "Preparing visualization...",
    },
  },
  error: {
    heading: "Couldn't analyze this repository",
    tryAgain: "Try again",
    connectionError: "We couldn't reach the analysis service. Check your connection and try again.",
    streamingUnsupported: "Streaming is not supported in this environment.",
    codes: {
      INVALID_URL:
        "That doesn't look like a valid public GitHub repository URL. Try something like https://github.com/vercel/next.js",
      NOT_FOUND: "We couldn't find that repository. Check the owner and repository name and try again.",
      PRIVATE_REPOSITORY:
        "This repository appears to be private or inaccessible. Welwitschia only supports public repositories.",
      RATE_LIMITED:
        "GitHub's API rate limit was reached while analyzing this repository. Please try again in a few minutes.",
      NO_COMMIT_DATA: "This repository doesn't have any commit history to analyze yet.",
      UPSTREAM_ERROR: "GitHub returned an unexpected error while we were gathering data. Please try again shortly.",
      TIMEOUT: "The analysis took too long to complete. Please try again, or try a smaller repository.",
      NETWORK_ERROR: "We couldn't reach GitHub. Check your connection and try again.",
    },
  },
  overview: {
    stars: "Stars",
    forks: "Forks",
    contributors: "Contributors",
    analyzedCommits: "Analyzed commits",
    analyzedFiles: "Analyzed files",
    created: "Created",
    defaultBranch: "Default branch: {branch}",
    lastUpdated: "Last updated {date}",
  },
  timeline: {
    title: "Evolution Timeline",
    description:
      "Commit activity across the repository's history. Click any period for details — bars marked in amber were flagged as unusually active.",
    noData: "No commit history was available to build a timeline for this repository.",
    tooltipSignificant: "Significant activity detected",
  },
  periodDetail: {
    significantBadge: "Significant repository activity detected",
    commits: "Commits",
    contributors: "Contributors",
    filesChanged: "Files changed",
    linesChanged: "Lines changed",
    activityCompared: "Activity {percent} compared with {period}",
    mostChangedDirectories: "Most changed directories",
    mostChangedFiles: "Most changed files",
    noSampledChanges: "No sampled changes in this period.",
    explainButton: "Explain This Period",
    thinking: "Thinking...",
    explainUnavailable: "The AI explanation is unavailable right now.",
  },
  heatmap: {
    title: "Activity Heatmap",
    description: "A month-by-month view of development intensity — quiet stretches versus development bursts.",
    hoverHint: "Hover a cell for details",
    quiet: "Quiet",
    intense: "Intense",
  },
  architectureMoments: {
    title: "Architecture Moments",
    description:
      "Periods where activity was unusually high compared to the surrounding history, based on a simple rule-based comparison — not a confirmed record of what changed.",
    noneDetected: "No unusually active periods were detected in the analyzed sample.",
  },
  signalLabels: {
    elevated_commits: "Elevated commit volume",
    contributor_surge: "Contributor surge",
    large_churn: "Large code churn",
  },
  signals: {
    elevated_commits: "Commit activity was about {percent}% above the recent average.",
    contributor_surge: "The number of active contributors rose about {percent}% versus the recent average.",
    large_churn: "Lines added and removed were about {percent}% above the recent average.",
  },
  mostChangedFiles: {
    title: "Most Changed Files",
    description: "Files touched most often across the analyzed commit sample. Select a file for more detail.",
    noData: "No file-level data was available in the analyzed sample.",
    contributors: "Contributors",
    firstObserved: "First observed",
    lastObserved: "Last observed",
  },
  codebaseHeatmap: {
    title: "Codebase Heatmap",
    description:
      "Which parts of this codebase receive the most development activity? Larger, brighter blocks changed more often.",
    noData: "No directory-level data was available in the analyzed sample.",
    hoverHint: "Hover a block for details",
    otherCount: "Other ({count})",
  },
  contributorEvolution: {
    title: "Contributor Evolution",
    description:
      "How contributor activity has shifted across the repository's history, based on the analyzed commit sample. Sorted by sampled commit volume, not a ranking of contribution quality.",
    noData: "No contributor activity was available to analyze.",
  },
  fileSurvival: {
    title: "File Survival",
    description:
      "Files observed as active across the longest stretch of the analyzed commit sample — a proxy for long-lived, foundational code.",
    noData: "No file-level data was available in the analyzed sample.",
    age: "Age",
    changes: "Changes",
    firstObserved: "First observed",
    lastChanged: "Last changed",
  },
  footer: {
    summary: "{count} were analyzed{partial}. Data reflects a representative sample of repository history, not a complete scan.",
    partialSuffix: " across {sampled} of {total} history pages",
  },
  units: {
    commit: { one: "commit", other: "commits" },
    change: { one: "change", other: "changes" },
    contributor: { one: "contributor", other: "contributors" },
  },
};

export default en;
