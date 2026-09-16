"use client";

import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { parseGitHubRepoUrl } from "@/lib/validation";

const EXAMPLE_REPOS = ["vercel/next.js", "facebook/react", "microsoft/vscode"];

export function RepoUrlForm() {
  const router = useRouter();
  const [value, setValue] = useState("");
  const [error, setError] = useState<string | null>(null);

  function navigateToRepo(raw: string) {
    try {
      const { owner, repo } = parseGitHubRepoUrl(raw);
      setError(null);
      router.push(`/r/${owner}/${repo}`);
    } catch {
      setError("Enter a valid public GitHub repository URL, e.g. https://github.com/vercel/next.js");
    }
  }

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    navigateToRepo(value);
  }

  return (
    <div className="w-full max-w-2xl">
      <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <input
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="https://github.com/vercel/next.js"
            spellCheck={false}
            autoComplete="off"
            className="w-full rounded-xl border border-border-strong bg-surface px-5 py-4 text-base text-foreground placeholder:text-muted-dim outline-none transition-colors focus:border-accent focus:ring-1 focus:ring-accent"
          />
        </div>
        <button
          type="submit"
          className="cursor-pointer whitespace-nowrap rounded-xl bg-accent px-6 py-4 text-base font-medium text-background transition-colors hover:bg-accent-strong"
        >
          Analyze Repository
        </button>
      </form>

      {error && <p className="mt-3 text-sm text-danger">{error}</p>}

      <div className="mt-5 flex flex-wrap items-center gap-2 text-sm text-muted-dim">
        <span>Try:</span>
        {EXAMPLE_REPOS.map((repo) => (
          <button
            key={repo}
            type="button"
            onClick={() => navigateToRepo(repo)}
            className="cursor-pointer rounded-full border border-border-subtle px-3 py-1 text-muted transition-colors hover:border-border-strong hover:text-foreground"
          >
            {repo}
          </button>
        ))}
      </div>

      <p className="mt-6 text-sm text-muted-dim">Currently supports public GitHub repositories.</p>
    </div>
  );
}
