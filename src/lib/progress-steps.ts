import type { ProgressStep } from "./types";

export const PROGRESS_STEPS: { step: ProgressStep; label: string }[] = [
  { step: "fetching_repo", label: "Fetching repository..." },
  { step: "analyzing_commits", label: "Analyzing commit history..." },
  { step: "analyzing_contributors", label: "Analyzing contributors..." },
  { step: "building_timeline", label: "Building timeline..." },
  { step: "preparing_visualization", label: "Preparing visualization..." },
];
