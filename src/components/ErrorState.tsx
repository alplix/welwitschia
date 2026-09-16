"use client";

import Link from "next/link";
import { useTranslations } from "./LanguageProvider";

interface ErrorStateProps {
  message: string;
  onRetry?: () => void;
}

export function ErrorState({ message, onRetry }: ErrorStateProps) {
  const t = useTranslations();

  return (
    <div className="flex flex-1 flex-col items-center justify-center px-6 py-24 text-center">
      <div className="max-w-md">
        <div className="mx-auto mb-6 flex h-12 w-12 items-center justify-center rounded-full border border-danger/30 bg-danger-soft text-danger">
          !
        </div>
        <h2 className="text-lg font-medium text-foreground">{t.error.heading}</h2>
        <p className="mt-3 text-sm leading-6 text-muted">{message}</p>
        <div className="mt-8 flex items-center justify-center gap-3">
          {onRetry && (
            <button
              type="button"
              onClick={onRetry}
              className="cursor-pointer rounded-lg bg-accent px-4 py-2 text-sm font-medium text-background transition-colors hover:bg-accent-strong"
            >
              {t.error.tryAgain}
            </button>
          )}
          <Link
            href="/"
            className="rounded-lg border border-border-subtle px-4 py-2 text-sm text-muted transition-colors hover:border-border-strong hover:text-foreground"
          >
            {t.common.backToHome}
          </Link>
        </div>
      </div>
    </div>
  );
}
