export type AppErrorCode =
  | "INVALID_URL"
  | "NOT_FOUND"
  | "PRIVATE_REPOSITORY"
  | "RATE_LIMITED"
  | "NO_COMMIT_DATA"
  | "UPSTREAM_ERROR"
  | "TIMEOUT"
  | "NETWORK_ERROR";

const FRIENDLY_MESSAGES: Record<AppErrorCode, string> = {
  INVALID_URL:
    "That doesn't look like a valid public GitHub repository URL. Try something like https://github.com/vercel/next.js",
  NOT_FOUND: "We couldn't find that repository. Check the owner and repository name and try again.",
  PRIVATE_REPOSITORY:
    "This repository appears to be private or inaccessible. Welwitschia only supports public repositories.",
  RATE_LIMITED: "GitHub's API rate limit was reached while analyzing this repository. Please try again in a few minutes.",
  NO_COMMIT_DATA: "This repository doesn't have any commit history to analyze yet.",
  UPSTREAM_ERROR: "GitHub returned an unexpected error while we were gathering data. Please try again shortly.",
  TIMEOUT: "The analysis took too long to complete. Please try again, or try a smaller repository.",
  NETWORK_ERROR: "We couldn't reach GitHub. Check your connection and try again.",
};

export class AppError extends Error {
  code: AppErrorCode;

  constructor(code: AppErrorCode, message?: string) {
    super(message ?? FRIENDLY_MESSAGES[code]);
    this.code = code;
    this.name = "AppError";
  }

  get friendlyMessage(): string {
    return FRIENDLY_MESSAGES[this.code];
  }
}

export function toAppError(error: unknown): AppError {
  if (error instanceof AppError) return error;
  if (error instanceof Error && error.name === "AbortError") {
    return new AppError("TIMEOUT");
  }
  return new AppError("UPSTREAM_ERROR", error instanceof Error ? error.message : String(error));
}
