"use client";

import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { DEFAULT_LOCALE, LOCALE_CODES, TRANSLATIONS, type Dictionary, type Locale } from "@/lib/i18n";

const STORAGE_KEY = "welwitschia-locale";

interface LanguageContextValue {
  locale: Locale;
  setLocale: (locale: Locale) => void;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

function isLocale(value: string): value is Locale {
  return (LOCALE_CODES as readonly string[]).includes(value);
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(DEFAULT_LOCALE);

  useEffect(() => {
    // Reads the persisted/browser locale once on mount, syncing state from
    // these external sources (localStorage, navigator.language).
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored && isLocale(stored)) {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setLocaleState(stored);
        return;
      }
    } catch {
      // localStorage may be unavailable (private browsing, blocked storage) — fall through.
    }

    const browserLanguage = navigator.language?.slice(0, 2).toLowerCase();
    if (browserLanguage && isLocale(browserLanguage)) {
      setLocaleState(browserLanguage);
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  const setLocale = (next: Locale) => {
    setLocaleState(next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // Ignore persistence failures; the selection still applies for this session.
    }
  };

  const value = useMemo(() => ({ locale, setLocale }), [locale]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLocale(): LanguageContextValue {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLocale must be used within a LanguageProvider");
  return ctx;
}

export function useTranslations(): Dictionary {
  const { locale } = useLocale();
  return TRANSLATIONS[locale];
}
