"use client";

import { LOCALE_CODES, LOCALE_INFO } from "@/lib/i18n";
import { useLocale, useTranslations } from "./LanguageProvider";

export function LanguageSwitcher({ className = "" }: { className?: string }) {
  const { locale, setLocale } = useLocale();
  const t = useTranslations();

  return (
    <select
      value={locale}
      onChange={(e) => setLocale(e.target.value as typeof locale)}
      aria-label={t.common.language}
      className={`cursor-pointer rounded-lg border border-border-subtle bg-surface px-2.5 py-1.5 text-xs text-muted outline-none transition-colors hover:border-border-strong hover:text-foreground ${className}`}
    >
      {LOCALE_CODES.map((code) => (
        <option key={code} value={code} className="bg-surface text-foreground">
          {LOCALE_INFO[code].nativeName}
        </option>
      ))}
    </select>
  );
}
