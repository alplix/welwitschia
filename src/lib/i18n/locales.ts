import type { Locale } from "./types";

// Native display name (used in the language switcher) and the English name
// (used to instruct the AI explanation endpoint which language to reply in).
export const LOCALE_INFO: Record<Locale, { nativeName: string; englishName: string }> = {
  en: { nativeName: "English", englishName: "English" },
  de: { nativeName: "Deutsch", englishName: "German" },
  fr: { nativeName: "Français", englishName: "French" },
  es: { nativeName: "Español", englishName: "Spanish" },
  it: { nativeName: "Italiano", englishName: "Italian" },
  pt: { nativeName: "Português", englishName: "Portuguese" },
  nl: { nativeName: "Nederlands", englishName: "Dutch" },
  pl: { nativeName: "Polski", englishName: "Polish" },
  ru: { nativeName: "Русский", englishName: "Russian" },
  uk: { nativeName: "Українська", englishName: "Ukrainian" },
  sv: { nativeName: "Svenska", englishName: "Swedish" },
  da: { nativeName: "Dansk", englishName: "Danish" },
  fi: { nativeName: "Suomi", englishName: "Finnish" },
  el: { nativeName: "Ελληνικά", englishName: "Greek" },
  cs: { nativeName: "Čeština", englishName: "Czech" },
  ro: { nativeName: "Română", englishName: "Romanian" },
  hu: { nativeName: "Magyar", englishName: "Hungarian" },
  tr: { nativeName: "Türkçe", englishName: "Turkish" },
  zh: { nativeName: "中文", englishName: "Chinese" },
  vi: { nativeName: "Tiếng Việt", englishName: "Vietnamese" },
};

export const DEFAULT_LOCALE: Locale = "en";
