import { describe, expect, it } from "vitest";
import { isValidGitHubRepoUrl, parseGitHubRepoUrl } from "./validation";
import { AppError } from "./errors";

describe("parseGitHubRepoUrl", () => {
  it("parses a standard repository URL", () => {
    expect(parseGitHubRepoUrl("https://github.com/vercel/next.js")).toEqual({
      owner: "vercel",
      repo: "next.js",
    });
  });

  it("parses a URL with a trailing slash", () => {
    expect(parseGitHubRepoUrl("https://github.com/vercel/next.js/")).toEqual({
      owner: "vercel",
      repo: "next.js",
    });
  });

  it("parses a URL with extra path segments (e.g. /tree/main)", () => {
    expect(parseGitHubRepoUrl("https://github.com/vercel/next.js/tree/canary")).toEqual({
      owner: "vercel",
      repo: "next.js",
    });
  });

  it("strips a trailing .git suffix", () => {
    expect(parseGitHubRepoUrl("https://github.com/vercel/next.js.git")).toEqual({
      owner: "vercel",
      repo: "next.js",
    });
  });

  it("accepts bare owner/repo shorthand", () => {
    expect(parseGitHubRepoUrl("vercel/next.js")).toEqual({ owner: "vercel", repo: "next.js" });
  });

  it("accepts http (not just https)", () => {
    expect(parseGitHubRepoUrl("http://github.com/vercel/next.js")).toEqual({
      owner: "vercel",
      repo: "next.js",
    });
  });

  it("is case-insensitive on the host", () => {
    expect(parseGitHubRepoUrl("https://GitHub.com/vercel/next.js")).toEqual({
      owner: "vercel",
      repo: "next.js",
    });
  });

  it("rejects non-GitHub hosts", () => {
    expect(() => parseGitHubRepoUrl("https://gitlab.com/vercel/next.js")).toThrow(AppError);
  });

  it("rejects arbitrary hosts disguised with github in the path", () => {
    expect(() => parseGitHubRepoUrl("https://evil.com/github.com/vercel/next.js")).toThrow(AppError);
  });

  it("rejects URLs missing a repository segment", () => {
    expect(() => parseGitHubRepoUrl("https://github.com/vercel")).toThrow(AppError);
  });

  it("rejects empty input", () => {
    expect(() => parseGitHubRepoUrl("   ")).toThrow(AppError);
  });

  it("rejects garbage input", () => {
    expect(() => parseGitHubRepoUrl("not a url at all")).toThrow(AppError);
  });

  it("rejects names with invalid characters", () => {
    expect(() => parseGitHubRepoUrl("https://github.com/ver cel/next.js")).toThrow(AppError);
  });
});

describe("isValidGitHubRepoUrl", () => {
  it("returns true for valid URLs", () => {
    expect(isValidGitHubRepoUrl("https://github.com/vercel/next.js")).toBe(true);
  });

  it("returns false for invalid URLs", () => {
    expect(isValidGitHubRepoUrl("https://gitlab.com/vercel/next.js")).toBe(false);
  });
});
