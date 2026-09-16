import { describe, expect, it } from "vitest";
import {
  aggregateContributors,
  aggregateMostChangedFiles,
  buildFolderHeatmap,
  buildTimeline,
  computeFileSurvival,
  formatAgeLabel,
  monthKey,
  monthLabel,
} from "./analysis";
import type { CommitDetail, CommitStub } from "./types";

function stub(date: string, authorLogin: string, sha = `sha-${date}-${authorLogin}`): CommitStub {
  return { sha, date, authorLogin, authorName: authorLogin };
}

function detail(
  date: string,
  authorLogin: string,
  files: { path: string; additions?: number; deletions?: number }[],
): CommitDetail {
  return {
    sha: `sha-${date}-${authorLogin}-${Math.random()}`,
    date,
    authorLogin,
    authorName: authorLogin,
    additions: files.reduce((sum, f) => sum + (f.additions ?? 1), 0),
    deletions: files.reduce((sum, f) => sum + (f.deletions ?? 0), 0),
    files: files.map((f) => ({
      path: f.path,
      additions: f.additions ?? 1,
      deletions: f.deletions ?? 0,
      status: "modified",
    })),
  };
}

describe("monthKey / monthLabel", () => {
  it("extracts a YYYY-MM key from an ISO date", () => {
    expect(monthKey("2024-08-15T10:00:00Z")).toBe("2024-08");
  });

  it("formats a month label", () => {
    expect(monthLabel("2024-08")).toBe("August 2024");
  });
});

describe("buildTimeline", () => {
  it("returns an empty array for no commits", () => {
    expect(buildTimeline([], [])).toEqual([]);
  });

  it("fills gap months with zero-activity periods", () => {
    const stubs = [stub("2024-01-05T00:00:00Z", "alice"), stub("2024-03-10T00:00:00Z", "bob")];
    const timeline = buildTimeline(stubs, []);
    expect(timeline.map((p) => p.key)).toEqual(["2024-01", "2024-02", "2024-03"]);
    expect(timeline[1].commitCount).toBe(0);
  });

  it("counts commits and unique contributors per month", () => {
    const stubs = [
      stub("2024-01-01T00:00:00Z", "alice"),
      stub("2024-01-05T00:00:00Z", "alice"),
      stub("2024-01-10T00:00:00Z", "bob"),
    ];
    const timeline = buildTimeline(stubs, []);
    expect(timeline[0].commitCount).toBe(3);
    expect(timeline[0].contributorCount).toBe(2);
  });

  it("aggregates additions/deletions/files from detailed commits within the period", () => {
    const stubs = [stub("2024-01-01T00:00:00Z", "alice")];
    const details = [
      detail("2024-01-01T00:00:00Z", "alice", [
        { path: "src/router.ts", additions: 10, deletions: 2 },
        { path: "src/utils.ts", additions: 5, deletions: 0 },
      ]),
    ];
    const timeline = buildTimeline(stubs, details);
    expect(timeline[0].additions).toBe(15);
    expect(timeline[0].deletions).toBe(2);
    expect(timeline[0].filesChanged).toBe(2);
  });

  it("computes activity change versus the previous non-empty period", () => {
    const stubs = [
      stub("2024-01-01T00:00:00Z", "alice"),
      stub("2024-01-02T00:00:00Z", "alice"),
      stub("2024-02-01T00:00:00Z", "alice"),
      stub("2024-02-02T00:00:00Z", "alice"),
      stub("2024-02-03T00:00:00Z", "alice"),
      stub("2024-02-04T00:00:00Z", "alice"),
    ];
    const timeline = buildTimeline(stubs, []);
    expect(timeline[0].activityVsPrevious).toBeNull();
    expect(timeline[1].activityVsPrevious).toBe(100); // 2 -> 4 commits = +100%
  });
});

describe("detectSignificantPeriods (via buildTimeline)", () => {
  it("flags a period with a commit spike far above the trailing average", () => {
    const quietStubs = Array.from({ length: 6 }, (_, i) =>
      Array.from({ length: 2 }, (_, j) => stub(`2024-0${i + 1}-0${j + 1}T00:00:00Z`, "alice")),
    ).flat();
    const spikeStubs = Array.from({ length: 20 }, (_, i) => stub(`2024-07-${String(i + 1).padStart(2, "0")}T00:00:00Z`, "alice"));

    const timeline = buildTimeline([...quietStubs, ...spikeStubs], []);
    const july = timeline.find((p) => p.key === "2024-07");
    expect(july?.isSignificant).toBe(true);
    expect(july?.signals.length).toBeGreaterThan(0);
  });

  it("does not flag steady, low-volume activity", () => {
    const stubs = Array.from({ length: 6 }, (_, i) => stub(`2024-0${i + 1}-01T00:00:00Z`, "alice"));
    const timeline = buildTimeline(stubs, []);
    expect(timeline.every((p) => !p.isSignificant)).toBe(true);
  });
});

describe("aggregateMostChangedFiles", () => {
  it("counts changes per file and tracks first/last observation", () => {
    const details = [
      detail("2024-01-01T00:00:00Z", "alice", [{ path: "router.ts" }]),
      detail("2024-02-01T00:00:00Z", "bob", [{ path: "router.ts" }]),
      detail("2024-03-01T00:00:00Z", "alice", [{ path: "utils.ts" }]),
    ];
    const result = aggregateMostChangedFiles(details);
    const router = result.find((f) => f.path === "router.ts")!;
    expect(router.changeCount).toBe(2);
    expect(router.contributorCount).toBe(2);
    expect(router.firstObservedAt).toBe("2024-01-01T00:00:00Z");
    expect(router.lastObservedAt).toBe("2024-02-01T00:00:00Z");
  });

  it("sorts descending by change count and respects the limit", () => {
    const details = [
      detail("2024-01-01T00:00:00Z", "alice", [{ path: "a.ts" }, { path: "b.ts" }]),
      detail("2024-01-02T00:00:00Z", "alice", [{ path: "a.ts" }]),
    ];
    const result = aggregateMostChangedFiles(details, 1);
    expect(result).toHaveLength(1);
    expect(result[0].path).toBe("a.ts");
  });
});

describe("buildFolderHeatmap", () => {
  it("aggregates change counts up the directory tree", () => {
    const details = [
      detail("2024-01-01T00:00:00Z", "alice", [{ path: "packages/router/index.ts" }]),
      detail("2024-01-02T00:00:00Z", "alice", [{ path: "packages/router/utils.ts" }]),
      detail("2024-01-03T00:00:00Z", "alice", [{ path: "packages/compiler/index.ts" }]),
    ];
    const root = buildFolderHeatmap(details);
    expect(root.changes).toBe(3);
    const packages = root.children?.find((c) => c.name === "packages");
    expect(packages?.changes).toBe(3);
    const router = packages?.children?.find((c) => c.name === "router");
    expect(router?.changes).toBe(2);
  });

  it("buckets root-level files under a synthetic (root) node", () => {
    const details = [detail("2024-01-01T00:00:00Z", "alice", [{ path: "README.md" }])];
    const root = buildFolderHeatmap(details);
    expect(root.children?.[0].name).toBe("(root)");
  });

  it("groups overflow children beyond the cap into an 'other' bucket", () => {
    const files = Array.from({ length: 12 }, (_, i) => ({ path: `dir${i}/file.ts` }));
    const details = [detail("2024-01-01T00:00:00Z", "alice", files)];
    const root = buildFolderHeatmap(details);
    expect(root.children!.length).toBeLessThanOrEqual(9); // 8 kept + 1 "other"
    expect(root.children!.some((c) => c.name.startsWith("other"))).toBe(true);
  });
});

describe("aggregateContributors", () => {
  it("aggregates total commits and yearly buckets per author", () => {
    const stubs = [
      stub("2019-01-01T00:00:00Z", "alice"),
      stub("2021-01-01T00:00:00Z", "alice"),
      stub("2021-06-01T00:00:00Z", "bob"),
    ];
    const result = aggregateContributors(stubs);
    const alice = result.find((c) => c.login === "alice")!;
    expect(alice.totalCommits).toBe(2);
    expect(alice.buckets).toEqual([
      { key: "2019", commitCount: 1 },
      { key: "2021", commitCount: 1 },
    ]);
  });

  it("sorts contributors by total commits descending", () => {
    const stubs = [
      stub("2021-01-01T00:00:00Z", "bob"),
      stub("2021-01-02T00:00:00Z", "alice"),
      stub("2021-01-03T00:00:00Z", "alice"),
    ];
    const result = aggregateContributors(stubs);
    expect(result[0].login).toBe("alice");
  });
});

describe("formatAgeLabel", () => {
  it("formats spans under a month", () => {
    expect(formatAgeLabel("2024-01-01T00:00:00Z", "2024-01-10T00:00:00Z")).toBe("less than a month");
  });

  it("formats spans in months", () => {
    expect(formatAgeLabel("2024-01-01T00:00:00Z", "2024-06-01T00:00:00Z")).toBe("5 months");
  });

  it("formats spans in years", () => {
    expect(formatAgeLabel("2017-01-01T00:00:00Z", "2025-01-01T00:00:00Z")).toBe("8 years");
  });
});

describe("computeFileSurvival", () => {
  it("ranks files by the span between first and last observation", () => {
    const details = [
      detail("2017-01-01T00:00:00Z", "alice", [{ path: "old.ts" }]),
      detail("2024-01-01T00:00:00Z", "alice", [{ path: "old.ts" }]),
      detail("2024-01-01T00:00:00Z", "alice", [{ path: "new.ts" }]),
      detail("2024-01-02T00:00:00Z", "alice", [{ path: "new.ts" }]),
    ];
    const result = computeFileSurvival(details);
    expect(result[0].path).toBe("old.ts");
    expect(result[0].ageLabel).toBe("7 years");
  });
});
