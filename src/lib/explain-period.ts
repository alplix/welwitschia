import { z } from "zod";
import { LOCALE_CODES } from "./i18n/types";
import { LOCALE_INFO } from "./i18n/locales";

export const ExplainPeriodRequestSchema = z.object({
  repoName: z.string().min(1).max(200),
  locale: z.enum(LOCALE_CODES).default("en"),
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

const TILVAR_API_URL = "https://tilvar.athena.org.tr/api/chat";
const REQUEST_TIMEOUT_MS = 20_000;

interface TilvarChatResponse {
  reply: string;
  kind: string;
}

interface TilvarErrorBody {
  detail?: string;
}

async function callTilvar(content: string, apiKey: string): Promise<Response> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  try {
    return await fetch(TILVAR_API_URL, {
      method: "POST",
      signal: controller.signal,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        messages: [{ role: "user", content }],
        web: false,
        think: false,
      }),
    });
  } finally {
    clearTimeout(timeout);
  }
}

export async function explainPeriod(input: ExplainPeriodRequest): Promise<string> {
  const apiKey = process.env.WELWITSCHIA_TILVAR_API_KEY;
  if (!apiKey) {
    throw new Error("WELWITSCHIA_TILVAR_API_KEY is not configured");
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

  const targetLanguage = LOCALE_INFO[input.locale].englishName;

  const systemPrompt = `You explain software repository activity data to developers. You will be given a small JSON summary of statistics for one time period of a GitHub repository. Write a short, plain-language explanation (2-4 sentences) of what the data shows about that period. Only describe what is present in the data. Do not invent events, causes, or details that are not in the JSON. Do not claim certainty about *why* something happened, only describe *what* the numbers show. Respond in ${targetLanguage} only, with no preamble.`;
  const userContent = `Here is the period data:\n\n${JSON.stringify(summary, null, 2)}`;

  // Tilvar's /api/chat endpoint has no separate `system` field, so the system
  // instructions and the user content are combined into a single message.
  const content = `${systemPrompt}\n\n${userContent}`;

  let response = await callTilvar(content, apiKey);

  if (response.status === 429) {
    const retryAfterSeconds = Number(response.headers.get("Retry-After"));
    const waitMs = Number.isFinite(retryAfterSeconds) && retryAfterSeconds > 0 ? retryAfterSeconds * 1000 : 0;
    await new Promise((resolve) => setTimeout(resolve, waitMs));
    response = await callTilvar(content, apiKey);
  }

  if (!response.ok) {
    let detail: string | undefined;
    try {
      const errorBody = (await response.json()) as TilvarErrorBody;
      detail = errorBody.detail;
    } catch {
      // Response body wasn't JSON (or was empty) — fall back to a status-only message.
    }
    throw new Error(detail ? `Tilvar API returned ${response.status}: ${detail}` : `Tilvar API returned ${response.status}`);
  }

  const data = (await response.json()) as TilvarChatResponse;
  if (!data.reply) {
    throw new Error("Tilvar API returned no reply content");
  }
  return data.reply.trim();
}
