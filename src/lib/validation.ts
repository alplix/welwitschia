import { AppError } from "./errors";
import type { RepoIdentity } from "./types";

const GITHUB_HOSTS = new Set(["github.com", "www.github.com"]);

// GitHub owner/repo names: alphanumeric plus hyphen (owner) or hyphen/underscore/dot (repo).
const NAME_PATTERN = /^[A-Za-z0-9._-]+$/;

/**
 * Parses and validates a public GitHub repository URL, extracting owner/repo.
 * Rejects anything that isn't github.com to prevent arbitrary URL fetching.
 */
export function parseGitHubRepoUrl(input: string): RepoIdentity {
  const trimmed = input.trim();
  if (!trimmed) {
    throw new AppError("INVALID_URL");
  }

  let url: URL;
  try {
    // Allow bare "owner/repo" shorthand as well as full URLs.
    const candidate = /^https?:\/\//i.test(trimmed) ? trimmed : `https://github.com/${trimmed}`;
    url = new URL(candidate);
  } catch {
    throw new AppError("INVALID_URL");
  }

  if (!GITHUB_HOSTS.has(url.hostname.toLowerCase())) {
    throw new AppError("INVALID_URL");
  }

  const segments = url.pathname.split("/").filter(Boolean);
  if (segments.length < 2) {
    throw new AppError("INVALID_URL");
  }

  const [owner, repoRaw] = segments;
  const repo = repoRaw.replace(/\.git$/i, "");

  if (!NAME_PATTERN.test(owner) || !NAME_PATTERN.test(repo)) {
    throw new AppError("INVALID_URL");
  }

  return { owner, repo };
}

export function isValidGitHubRepoUrl(input: string): boolean {
  try {
    parseGitHubRepoUrl(input);
    return true;
  } catch {
    return false;
  }
}
