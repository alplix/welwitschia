import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import type { RepositoryAnalysis } from "./types";

// A deliberately simple cache: one JSON file per repository on disk, with a
// TTL check on read. No database needed for the MVP. Suitable for local
// development and single-instance deployments; a production deployment on
// serverless infrastructure should swap this for a small KV store.
const CACHE_DIR = path.join(process.cwd(), ".cache", "repositories");
const CACHE_TTL_MS = 6 * 60 * 60 * 1000; // 6 hours

interface CacheEnvelope {
  cachedAt: string;
  analysis: RepositoryAnalysis;
}

function cacheKey(owner: string, repo: string): string {
  return `${owner.toLowerCase()}__${repo.toLowerCase()}`;
}

function cacheFilePath(owner: string, repo: string): string {
  return path.join(CACHE_DIR, `${cacheKey(owner, repo)}.json`);
}

export async function readCachedAnalysis(owner: string, repo: string): Promise<RepositoryAnalysis | null> {
  try {
    const raw = await readFile(cacheFilePath(owner, repo), "utf-8");
    const envelope = JSON.parse(raw) as CacheEnvelope;
    const age = Date.now() - new Date(envelope.cachedAt).getTime();
    if (age > CACHE_TTL_MS) return null;
    return envelope.analysis;
  } catch {
    return null;
  }
}

export async function writeCachedAnalysis(owner: string, repo: string, analysis: RepositoryAnalysis): Promise<void> {
  try {
    await mkdir(CACHE_DIR, { recursive: true });
    const envelope: CacheEnvelope = { cachedAt: new Date().toISOString(), analysis };
    await writeFile(cacheFilePath(owner, repo), JSON.stringify(envelope), "utf-8");
  } catch {
    // Caching is a best-effort optimization; failures shouldn't break analysis.
  }
}
