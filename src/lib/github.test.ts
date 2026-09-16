import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { fetchCommitDetails, fetchRepoOverview, fetchStratifiedCommitStubs } from "./github";
import type { CommitStub } from "./types";

function mockResponse(status: number, body: unknown, headers: Record<string, string> = {}) {
  return {
    status,
    ok: status >= 200 && status < 300,
    headers: { get: (key: string) => headers[key.toLowerCase()] ?? null },
    json: async () => body,
  } as Response;
}

describe("fetchRepoOverview", () => {
  beforeEach(() => {
    vi.stubGlobal("fetch", vi.fn());
  });
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("maps the GitHub repo payload to a RepoOverview", async () => {
    vi.mocked(fetch).mockResolvedValue(
      mockResponse(200, {
        name: "next.js",
        full_name: "vercel/next.js",
        description: "The React framework",
        language: "JavaScript",
        stargazers_count: 100,
        forks_count: 20,
        open_issues_count: 5,
        default_branch: "canary",
        created_at: "2016-10-05T00:00:00Z",
        updated_at: "2024-01-01T00:00:00Z",
        html_url: "https://github.com/vercel/next.js",
        owner: { login: "vercel" },
      }),
    );

    const overview = await fetchRepoOverview("vercel", "next.js");
    expect(overview).toMatchObject({
      name: "next.js",
      owner: "vercel",
      fullName: "vercel/next.js",
      primaryLanguage: "JavaScript",
      stars: 100,
      defaultBranch: "canary",
    });
  });

  it("throws NOT_FOUND on a 404", async () => {
    vi.mocked(fetch).mockResolvedValue(mockResponse(404, {}));
    await expect(fetchRepoOverview("owner", "missing")).rejects.toMatchObject({ code: "NOT_FOUND" });
  });

  it("throws RATE_LIMITED when the rate limit is exhausted", async () => {
    vi.mocked(fetch).mockResolvedValue(mockResponse(403, {}, { "x-ratelimit-remaining": "0" }));
    await expect(fetchRepoOverview("owner", "repo")).rejects.toMatchObject({ code: "RATE_LIMITED" });
  });

  it("throws PRIVATE_REPOSITORY on a 403 without rate-limit exhaustion", async () => {
    vi.mocked(fetch).mockResolvedValue(mockResponse(403, {}, { "x-ratelimit-remaining": "10" }));
    await expect(fetchRepoOverview("owner", "repo")).rejects.toMatchObject({ code: "PRIVATE_REPOSITORY" });
  });

  it("wraps network failures as NETWORK_ERROR", async () => {
    vi.mocked(fetch).mockRejectedValue(new Error("fetch failed"));
    await expect(fetchRepoOverview("owner", "repo")).rejects.toMatchObject({ code: "NETWORK_ERROR" });
  });
});

describe("fetchStratifiedCommitStubs", () => {
  beforeEach(() => {
    vi.stubGlobal("fetch", vi.fn());
  });
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  const commitItem = (sha: string, dateIso: string) => ({
    sha,
    commit: { author: { name: "Alice", date: dateIso }, message: "msg" },
    author: { login: "alice" },
  });

  it("throws NO_COMMIT_DATA when the repository has no commits", async () => {
    vi.mocked(fetch).mockResolvedValue(mockResponse(200, []));
    await expect(fetchStratifiedCommitStubs("owner", "empty-repo", 5)).rejects.toMatchObject({
      code: "NO_COMMIT_DATA",
    });
  });

  it("returns all commits without extra requests when history fits on one page", async () => {
    vi.mocked(fetch).mockResolvedValue(mockResponse(200, [commitItem("a", "2024-01-01T00:00:00Z")]));
    const result = await fetchStratifiedCommitStubs("owner", "small-repo", 10);
    expect(result.commits).toHaveLength(1);
    expect(result.totalPageCount).toBe(1);
    expect(fetch).toHaveBeenCalledTimes(1);
  });

  it("samples additional pages when history spans more pages than the cap", async () => {
    const linkHeader = '<https://api.github.com/repos/o/r/commits?page=50>; rel="last"';
    vi.mocked(fetch).mockImplementation(async (input) => {
      const url = String(input);
      if (url.includes("page=1") && !url.includes("page=1&")) {
        // first call
      }
      return mockResponse(200, [commitItem("sha", "2024-01-01T00:00:00Z")], { link: linkHeader });
    });

    const result = await fetchStratifiedCommitStubs("owner", "big-repo", 5);
    expect(result.totalPageCount).toBe(50);
    expect(result.sampledPageCount).toBeLessThanOrEqual(5);
    expect(fetch).toHaveBeenCalledTimes(result.sampledPageCount);
  });

  it("throws NOT_FOUND when the repository does not exist", async () => {
    vi.mocked(fetch).mockResolvedValue(mockResponse(404, {}));
    await expect(fetchStratifiedCommitStubs("owner", "missing", 5)).rejects.toMatchObject({ code: "NOT_FOUND" });
  });
});

describe("fetchCommitDetails", () => {
  beforeEach(() => {
    vi.stubGlobal("fetch", vi.fn());
  });
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("returns an empty array for no commits", async () => {
    const result = await fetchCommitDetails("owner", "repo", [], 10);
    expect(result).toEqual([]);
  });

  it("fetches details for at most maxCommits commits, evenly spread", async () => {
    const stubs: CommitStub[] = Array.from({ length: 20 }, (_, i) => ({
      sha: `sha-${i}`,
      date: `2024-01-${String(i + 1).padStart(2, "0")}T00:00:00Z`,
      authorLogin: "alice",
      authorName: "Alice",
    }));

    vi.mocked(fetch).mockImplementation(async () =>
      mockResponse(200, {
        sha: "sha-x",
        commit: { author: { name: "Alice", date: "2024-01-01T00:00:00Z" } },
        author: { login: "alice" },
        stats: { additions: 3, deletions: 1 },
        files: [{ filename: "a.ts", additions: 3, deletions: 1, status: "modified" }],
      }),
    );

    const result = await fetchCommitDetails("owner", "repo", stubs, 5);
    expect(result).toHaveLength(5);
    expect(result[0].files[0].path).toBe("a.ts");
  });

  it("de-duplicates commits by sha before fetching", async () => {
    const stubs: CommitStub[] = [
      { sha: "sha-1", date: "2024-01-01T00:00:00Z", authorLogin: "alice", authorName: "Alice" },
      { sha: "sha-1", date: "2024-01-01T00:00:00Z", authorLogin: "alice", authorName: "Alice" },
    ];
    vi.mocked(fetch).mockResolvedValue(
      mockResponse(200, {
        sha: "sha-1",
        commit: { author: { name: "Alice", date: "2024-01-01T00:00:00Z" } },
        author: { login: "alice" },
        stats: { additions: 1, deletions: 0 },
        files: [],
      }),
    );

    const result = await fetchCommitDetails("owner", "repo", stubs, 10);
    expect(result).toHaveLength(1);
  });
});
