import { mkdir, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { readCachedAnalysis, writeCachedAnalysis } from "./cache";
import type { RepositoryAnalysis } from "./types";

const CACHE_DIR = path.join(process.cwd(), ".cache", "repositories");
const TEST_OWNER = "vitest-owner";
const TEST_REPO = "vitest-repo";
const cacheFile = path.join(CACHE_DIR, `${TEST_OWNER}__${TEST_REPO}.json`);

function fakeAnalysis(): RepositoryAnalysis {
  return {
    overview: {
      name: TEST_REPO,
      owner: TEST_OWNER,
      fullName: `${TEST_OWNER}/${TEST_REPO}`,
      description: null,
      primaryLanguage: "TypeScript",
      stars: 1,
      forks: 0,
      openIssues: 0,
      defaultBranch: "main",
      createdAt: "2020-01-01T00:00:00Z",
      updatedAt: "2024-01-01T00:00:00Z",
      htmlUrl: `https://github.com/${TEST_OWNER}/${TEST_REPO}`,
    },
    meta: {
      analyzedCommitCount: 1,
      detailedCommitCount: 1,
      analyzedFileCount: 1,
      sampledPageCount: 1,
      totalPageCount: 1,
      isPartialHistory: false,
      analyzedAt: new Date().toISOString(),
      fromCache: false,
    },
    timeline: [],
    mostChangedFiles: [],
    folderHeatmap: { name: "repository", path: "", changes: 0 },
    contributors: [],
    contributorTotals: [],
    fileSurvival: [],
    significantPeriods: [],
  };
}

describe("cache", () => {
  beforeEach(async () => {
    await rm(cacheFile, { force: true });
  });

  afterEach(async () => {
    await rm(cacheFile, { force: true });
  });

  it("returns null when nothing is cached", async () => {
    const result = await readCachedAnalysis(TEST_OWNER, TEST_REPO);
    expect(result).toBeNull();
  });

  it("returns what was written", async () => {
    const analysis = fakeAnalysis();
    await writeCachedAnalysis(TEST_OWNER, TEST_REPO, analysis);
    const result = await readCachedAnalysis(TEST_OWNER, TEST_REPO);
    expect(result?.overview.fullName).toBe(analysis.overview.fullName);
  });

  it("treats stale cache entries as a miss", async () => {
    await mkdir(CACHE_DIR, { recursive: true });
    const staleEnvelope = {
      cachedAt: new Date(Date.now() - 7 * 60 * 60 * 1000).toISOString(), // 7h ago, TTL is 6h
      analysis: fakeAnalysis(),
    };
    await writeFile(cacheFile, JSON.stringify(staleEnvelope), "utf-8");

    const result = await readCachedAnalysis(TEST_OWNER, TEST_REPO);
    expect(result).toBeNull();
  });

  it("is keyed case-insensitively", async () => {
    const analysis = fakeAnalysis();
    await writeCachedAnalysis(TEST_OWNER, TEST_REPO, analysis);
    const result = await readCachedAnalysis(TEST_OWNER.toUpperCase(), TEST_REPO.toUpperCase());
    expect(result?.overview.fullName).toBe(analysis.overview.fullName);
  });
});
