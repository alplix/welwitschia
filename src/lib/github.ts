import { AppError } from "./errors";
import type { CommitDetail, CommitStub, ContributorSummary, RepoOverview } from "./types";

const API_ROOT = "https://api.github.com";
const REQUEST_TIMEOUT_MS = 15_000;
const DETAIL_CONCURRENCY = 8;
const LIST_CONCURRENCY = 6;

const hasToken = Boolean(process.env.GITHUB_TOKEN);

// Keep GitHub API usage bounded. With an authenticated token we get a much
// higher rate limit (5000/hr) so we can sample more of the repository's
// history; without one we stay well under the unauthenticated 60/hr limit.
export const SAMPLING_LIMITS = {
  maxListPages: hasToken ? 30 : 5,
  maxDetailCommits: hasToken ? 120 : 20,
};

function authHeaders(): HeadersInit {
  const headers: HeadersInit = {
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
    "User-Agent": "welwitschia-app",
  };
  if (process.env.GITHUB_TOKEN) {
    headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  }
  return headers;
}

async function githubFetch(path: string): Promise<Response> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);
  try {
    const response = await fetch(`${API_ROOT}${path}`, {
      headers: authHeaders(),
      signal: controller.signal,
      cache: "no-store",
    });
    return response;
  } catch (error) {
    if (error instanceof Error && error.name === "AbortError") {
      throw new AppError("TIMEOUT");
    }
    throw new AppError("NETWORK_ERROR");
  } finally {
    clearTimeout(timeout);
  }
}

async function githubJson<T>(path: string): Promise<T> {
  const response = await githubFetch(path);

  if (response.status === 404) {
    throw new AppError("NOT_FOUND");
  }
  if (response.status === 403 || response.status === 429) {
    const remaining = response.headers.get("x-ratelimit-remaining");
    if (remaining === "0") {
      throw new AppError("RATE_LIMITED");
    }
    throw new AppError("PRIVATE_REPOSITORY");
  }
  if (response.status === 401) {
    throw new AppError("PRIVATE_REPOSITORY");
  }
  if (!response.ok) {
    throw new AppError("UPSTREAM_ERROR", `GitHub API returned ${response.status}`);
  }

  return (await response.json()) as T;
}

interface GitHubRepoResponse {
  name: string;
  full_name: string;
  description: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  open_issues_count: number;
  default_branch: string;
  created_at: string;
  updated_at: string;
  html_url: string;
  owner: { login: string };
}

export async function fetchRepoOverview(owner: string, repo: string): Promise<RepoOverview> {
  const data = await githubJson<GitHubRepoResponse>(`/repos/${owner}/${repo}`);
  return {
    name: data.name,
    owner: data.owner.login,
    fullName: data.full_name,
    description: data.description,
    primaryLanguage: data.language,
    stars: data.stargazers_count,
    forks: data.forks_count,
    openIssues: data.open_issues_count,
    defaultBranch: data.default_branch,
    createdAt: data.created_at,
    updatedAt: data.updated_at,
    htmlUrl: data.html_url,
  };
}

interface GitHubCommitListItem {
  sha: string;
  commit: {
    author: { name: string; date: string } | null;
    message: string;
  };
  author: { login: string } | null;
}

function parseLastPage(linkHeader: string | null): number {
  if (!linkHeader) return 1;
  const match = linkHeader.match(/[?&]page=(\d+)[^>]*>;\s*rel="last"/);
  return match ? Number.parseInt(match[1], 10) : 1;
}

function toCommitStub(item: GitHubCommitListItem): CommitStub | null {
  if (!item.commit.author) return null;
  return {
    sha: item.sha,
    date: item.commit.author.date,
    authorLogin: item.author?.login ?? null,
    authorName: item.commit.author.name,
  };
}

async function mapWithConcurrency<T, R>(
  items: T[],
  concurrency: number,
  mapper: (item: T) => Promise<R | null>,
): Promise<R[]> {
  const results: R[] = [];
  let index = 0;

  async function worker() {
    while (index < items.length) {
      const current = items[index];
      index += 1;
      const result = await mapper(current);
      if (result !== null) results.push(result);
    }
  }

  await Promise.all(Array.from({ length: Math.min(concurrency, items.length) }, worker));
  return results;
}

/**
 * Fetches commit stubs (sha, author, date) spread evenly across the repository's
 * full history, rather than only the most recent commits. Discovers the total
 * page count from GitHub's `Link` header, then samples up to `maxPages` pages
 * evenly across that range so both old and recent activity are represented.
 */
export async function fetchStratifiedCommitStubs(
  owner: string,
  repo: string,
  maxPages: number,
): Promise<{ commits: CommitStub[]; totalPageCount: number; sampledPageCount: number }> {
  const firstPageResponse = await githubFetch(`/repos/${owner}/${repo}/commits?per_page=100&page=1`);
  if (firstPageResponse.status === 404) throw new AppError("NOT_FOUND");
  if (firstPageResponse.status === 409) throw new AppError("NO_COMMIT_DATA");
  if (firstPageResponse.status === 403 || firstPageResponse.status === 429) {
    const remaining = firstPageResponse.headers.get("x-ratelimit-remaining");
    throw new AppError(remaining === "0" ? "RATE_LIMITED" : "PRIVATE_REPOSITORY");
  }
  if (!firstPageResponse.ok) throw new AppError("UPSTREAM_ERROR");

  const firstPageItems = (await firstPageResponse.json()) as GitHubCommitListItem[];
  if (firstPageItems.length === 0) {
    throw new AppError("NO_COMMIT_DATA");
  }

  const totalPageCount = parseLastPage(firstPageResponse.headers.get("link"));
  const pageNumbers = new Set<number>([1]);

  if (totalPageCount > 1) {
    const pagesToSample = Math.min(maxPages, totalPageCount);
    for (let i = 0; i < pagesToSample; i += 1) {
      const page = 1 + Math.round((i * (totalPageCount - 1)) / Math.max(pagesToSample - 1, 1));
      pageNumbers.add(page);
    }
  }

  const remainingPages = [...pageNumbers].filter((p) => p !== 1);
  const remainingResults = await mapWithConcurrency(remainingPages, LIST_CONCURRENCY, async (page) => {
    const response = await githubFetch(`/repos/${owner}/${repo}/commits?per_page=100&page=${page}`);
    if (!response.ok) return null;
    return (await response.json()) as GitHubCommitListItem[];
  });

  const allItems = [firstPageItems, ...remainingResults].flat();
  const commits = allItems.map(toCommitStub).filter((c): c is CommitStub => c !== null);

  return { commits, totalPageCount, sampledPageCount: pageNumbers.size };
}

interface GitHubCommitDetailResponse {
  sha: string;
  commit: { author: { name: string; date: string } | null };
  author: { login: string } | null;
  stats?: { additions: number; deletions: number };
  files?: { filename: string; additions: number; deletions: number; status: string }[];
}

/**
 * Fetches full file-level detail (additions/deletions/paths) for a bounded
 * subset of commits, evenly spaced across the given stub list. This is the
 * expensive per-commit endpoint, so callers must keep `maxCommits` bounded.
 */
export async function fetchCommitDetails(
  owner: string,
  repo: string,
  commits: CommitStub[],
  maxCommits: number,
): Promise<CommitDetail[]> {
  if (commits.length === 0) return [];

  const sorted = [...commits].sort((a, b) => a.date.localeCompare(b.date));
  const sampleCount = Math.min(maxCommits, sorted.length);
  const sampled: CommitStub[] = [];
  for (let i = 0; i < sampleCount; i += 1) {
    const idx = Math.round((i * (sorted.length - 1)) / Math.max(sampleCount - 1, 1));
    sampled.push(sorted[idx]);
  }

  const uniqueBySha = [...new Map(sampled.map((c) => [c.sha, c])).values()];

  const details = await mapWithConcurrency(uniqueBySha, DETAIL_CONCURRENCY, async (stub) => {
    const response = await githubFetch(`/repos/${owner}/${repo}/commits/${stub.sha}`);
    if (!response.ok) return null;
    const data = (await response.json()) as GitHubCommitDetailResponse;
    const detail: CommitDetail = {
      sha: stub.sha,
      date: stub.date,
      authorLogin: stub.authorLogin,
      authorName: stub.authorName,
      additions: data.stats?.additions ?? 0,
      deletions: data.stats?.deletions ?? 0,
      files: (data.files ?? []).map((f) => ({
        path: f.filename,
        additions: f.additions,
        deletions: f.deletions,
        status: f.status,
      })),
    };
    return detail;
  });

  return details;
}

interface GitHubContributorResponse {
  login?: string;
  avatar_url?: string;
  contributions: number;
  type: string;
}

export async function fetchContributorTotals(owner: string, repo: string): Promise<ContributorSummary[]> {
  const response = await githubFetch(`/repos/${owner}/${repo}/contributors?per_page=100&anon=false`);
  if (response.status === 404) throw new AppError("NOT_FOUND");
  if (response.status === 204) return [];
  if (!response.ok) return [];

  const data = (await response.json()) as GitHubContributorResponse[];
  return data
    .filter((c) => c.login)
    .map((c) => ({
      login: c.login as string,
      avatarUrl: c.avatar_url ?? "",
      contributions: c.contributions,
    }));
}
