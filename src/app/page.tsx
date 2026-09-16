import { RepoUrlForm } from "@/components/RepoUrlForm";

export default function Home() {
  return (
    <main className="relative flex flex-1 flex-col items-center justify-center overflow-hidden px-6 py-24">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          backgroundImage:
            "radial-gradient(ellipse 60% 50% at 50% 0%, var(--accent-soft), transparent), radial-gradient(ellipse 50% 40% at 85% 90%, var(--leaf-soft), transparent)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      <div className="flex flex-col items-center text-center">
        <span className="mb-6 rounded-full border border-border-subtle bg-surface px-3 py-1 text-xs tracking-wide text-muted">
          Developer tool
        </span>

        <h1 className="text-5xl font-semibold tracking-tight text-foreground sm:text-6xl">
          WELWITSCHIA
        </h1>
        <p className="mt-4 text-lg text-accent-strong sm:text-xl">See how a codebase evolves.</p>
        <p className="mt-6 max-w-xl text-balance text-base leading-7 text-muted sm:text-lg">
          Explore the history, activity, contributors, and structural changes of any public GitHub
          repository.
        </p>

        <div className="mt-10 w-full">
          <RepoUrlForm />
        </div>
      </div>
    </main>
  );
}
