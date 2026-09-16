"use client";

import { useState } from "react";
import { format } from "date-fns";
import type { MostChangedFile } from "@/lib/types";
import { pluralize } from "@/lib/format";
import { SectionHeading } from "./EvolutionTimeline";

interface MostChangedFilesProps {
  files: MostChangedFile[];
}

export function MostChangedFiles({ files }: MostChangedFilesProps) {
  const [expandedPath, setExpandedPath] = useState<string | null>(null);
  const maxChanges = files[0]?.changeCount ?? 1;

  return (
    <section id="most-changed-files" className="animate-fade-in">
      <SectionHeading
        title="Most Changed Files"
        description="Files touched most often across the analyzed commit sample. Select a file for more detail."
      />

      {files.length === 0 ? (
        <p className="mt-6 text-sm text-muted-dim">No file-level data was available in the analyzed sample.</p>
      ) : (
        <ol className="mt-6 flex flex-col divide-y divide-border-subtle rounded-xl border border-border-subtle bg-surface">
          {files.map((file, index) => {
            const isExpanded = expandedPath === file.path;
            return (
              <li key={file.path}>
                <button
                  type="button"
                  onClick={() => setExpandedPath(isExpanded ? null : file.path)}
                  className="flex w-full cursor-pointer items-center gap-4 px-4 py-3 text-left transition-colors hover:bg-surface-hover"
                >
                  <span className="w-6 shrink-0 text-sm text-muted-dim">{index + 1}</span>
                  <span className="flex-1 truncate font-mono text-sm text-foreground">{file.path}</span>
                  <div className="hidden w-32 shrink-0 sm:block">
                    <div className="h-1.5 w-full overflow-hidden rounded-full bg-surface-hover">
                      <div
                        className="h-full rounded-full bg-accent"
                        style={{ width: `${Math.max(4, (file.changeCount / maxChanges) * 100)}%` }}
                      />
                    </div>
                  </div>
                  <span className="w-24 shrink-0 text-right text-sm text-muted">
                    {file.changeCount.toLocaleString()} {pluralize(file.changeCount, "change")}
                  </span>
                </button>
                {isExpanded && (
                  <div className="animate-fade-in grid grid-cols-2 gap-4 border-t border-border-subtle bg-background/40 px-4 py-4 sm:grid-cols-4">
                    <Detail label="Change count" value={file.changeCount.toLocaleString()} />
                    <Detail label="Contributors" value={file.contributorCount.toLocaleString()} />
                    <Detail label="First observed" value={format(new Date(file.firstObservedAt), "MMM yyyy")} />
                    <Detail label="Last observed" value={format(new Date(file.lastObservedAt), "MMM yyyy")} />
                  </div>
                )}
              </li>
            );
          })}
        </ol>
      )}
    </section>
  );
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs text-muted-dim">{label}</p>
      <p className="mt-1 text-sm text-foreground">{value}</p>
    </div>
  );
}
