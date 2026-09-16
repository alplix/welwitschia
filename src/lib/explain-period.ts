import { z } from "zod";

export const ExplainPeriodRequestSchema = z.object({
  repoName: z.string().min(1).max(200),
  periodLabel: z.string().min(1).max(60),
  commitCount: z.number().int().min(0),
  contributorCount: z.number().int().min(0),
  additions: z.number().int().min(0),
  deletions: z.number().int().min(0),
  filesChanged: z.number().int().min(0),
  activityVsPrevious: z.number().nullable(),
  topDirectories: z.array(z.string().max(200)).max(5),
  topFiles: z.array(z.string().max(200)).max(5),
  signals: z.array(z.string().max(200)).max(5),
});

export type ExplainPeriodRequest = z.infer<typeof ExplainPeriodRequestSchema>;

const ANTHROPIC_MODEL = "claude-haiku-4-5-20251001";

export async function explainPeriod(input: ExplainPeriodRequest): Promise<string> {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    throw new Error("ANTHROPIC_API_KEY is not configured");
  }

  const summary = {
    repository: input.repoName,
    period: input.periodLabel,
    commits: input.commitCount,
    active_contributors: input.contributorCount,
    lines_added: input.additions,
    lines_removed: input.deletions,
    files_changed: input.filesChanged,
    activity_change_vs_previous_period_percent: input.activityVsPrevious,
    most_changed_directories: input.topDirectories,
    most_changed_files: input.topFiles,
    detected_signals: input.signals,
  };

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 20_000);

  try {
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      signal: controller.signal,
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: ANTHROPIC_MODEL,
        max_tokens: 300,
        system:
          "You explain software repository activity data to developers. You will be given a small JSON summary of statistics for one time period of a GitHub repository. Write a short, plain-English explanation (2-4 sentences) of what the data shows about that period. Only describe what is present in the data. Do not invent events, causes, or details that are not in the JSON. Do not claim certainty about *why* something happened, only describe *what* the numbers show. Respond in English only, with no preamble.",
        messages: [
          {
            role: "user",
            content: `Here is the period data:\n\n${JSON.stringify(summary, null, 2)}`,
          },
        ],
      }),
    });

    if (!response.ok) {
      throw new Error(`Anthropic API returned ${response.status}`);
    }

    const data = (await response.json()) as { content?: { type: string; text?: string }[] };
    const text = data.content?.find((block) => block.type === "text")?.text;
    if (!text) {
      throw new Error("Anthropic API returned no text content");
    }
    return text.trim();
  } finally {
    clearTimeout(timeout);
  }
}
