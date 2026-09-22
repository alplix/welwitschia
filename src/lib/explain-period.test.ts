import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { explainPeriod, type ExplainPeriodRequest } from "./explain-period";

function mockResponse(status: number, body: unknown, headers: Record<string, string> = {}) {
  return {
    status,
    ok: status >= 200 && status < 300,
    headers: { get: (key: string) => headers[key.toLowerCase()] ?? null },
    json: async () => body,
  } as Response;
}

const validInput: ExplainPeriodRequest = {
  repoName: "vercel/next.js",
  locale: "en",
  periodLabel: "August 2024",
  commitCount: 42,
  contributorCount: 5,
  additions: 1000,
  deletions: 200,
  filesChanged: 30,
  activityVsPrevious: 12.5,
  topDirectories: ["src/lib"],
  topFiles: ["src/lib/github.ts"],
  signals: ["elevated_commits"],
};

describe("explainPeriod", () => {
  beforeEach(() => {
    vi.stubGlobal("fetch", vi.fn());
    process.env.WELWITSCHIA_TILVAR_API_KEY = "test-tilvar-key";
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    delete process.env.WELWITSCHIA_TILVAR_API_KEY;
  });

  it("returns the trimmed reply text from a successful Tilvar response", async () => {
    vi.mocked(fetch).mockResolvedValue(
      mockResponse(200, { reply: "  Commit activity rose in August 2024.  ", kind: "chat" }),
    );

    const result = await explainPeriod(validInput);

    expect(result).toBe("Commit activity rose in August 2024.");
    expect(fetch).toHaveBeenCalledTimes(1);
    const [url, init] = vi.mocked(fetch).mock.calls[0];
    expect(url).toBe("https://tilvar.athena.org.tr/api/chat");
    expect(init?.headers).toMatchObject({
      "Content-Type": "application/json",
      Authorization: "Bearer test-tilvar-key",
    });
    const body = JSON.parse(init?.body as string);
    expect(body).toMatchObject({ web: false, think: false });
    expect(body.messages).toHaveLength(1);
    expect(body.messages[0].role).toBe("user");
    // The system instructions and the JSON summary are merged into one message.
    expect(body.messages[0].content).toContain("English");
    expect(body.messages[0].content).toContain("vercel/next.js");
  });

  it("throws when WELWITSCHIA_TILVAR_API_KEY is not configured", async () => {
    delete process.env.WELWITSCHIA_TILVAR_API_KEY;

    await expect(explainPeriod(validInput)).rejects.toThrow("WELWITSCHIA_TILVAR_API_KEY is not configured");
    expect(fetch).not.toHaveBeenCalled();
  });

  it("retries once after a 429 with Retry-After and returns the result on success", async () => {
    vi.mocked(fetch)
      .mockResolvedValueOnce(mockResponse(429, { detail: "rate limited" }, { "retry-after": "0" }))
      .mockResolvedValueOnce(mockResponse(200, { reply: "Activity was steady.", kind: "chat" }));

    const result = await explainPeriod(validInput);

    expect(result).toBe("Activity was steady.");
    expect(fetch).toHaveBeenCalledTimes(2);
  });

  it("throws if the retry after a 429 also returns 429", async () => {
    vi.mocked(fetch)
      .mockResolvedValueOnce(mockResponse(429, { detail: "rate limited" }, { "retry-after": "0" }))
      .mockResolvedValueOnce(mockResponse(429, { detail: "still rate limited" }, { "retry-after": "0" }));

    await expect(explainPeriod(validInput)).rejects.toThrow(/429/);
    expect(fetch).toHaveBeenCalledTimes(2);
  });

  it("throws when the request times out (AbortController fires)", async () => {
    vi.mocked(fetch).mockImplementation((_url, init) => {
      return new Promise((_resolve, reject) => {
        const signal = (init as RequestInit)?.signal;
        signal?.addEventListener("abort", () => {
          const err = new Error("The operation was aborted");
          err.name = "AbortError";
          reject(err);
        });
      });
    });

    vi.useFakeTimers();
    try {
      const promise = explainPeriod(validInput);
      const expectation = expect(promise).rejects.toThrow(/aborted/i);
      await vi.advanceTimersByTimeAsync(20_000);
      await expectation;
    } finally {
      vi.useRealTimers();
    }
  });
});
