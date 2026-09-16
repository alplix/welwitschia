import { format } from "date-fns";
import {
  cs,
  da,
  de,
  el,
  enUS,
  es,
  fi,
  fr,
  hu,
  it,
  nl,
  pl,
  pt,
  ro,
  ru,
  sv,
  tr,
  uk,
  vi,
  zhCN,
  type Locale as DateFnsLocale,
} from "date-fns/locale";
import type { Locale } from "./types";

export const DATE_FNS_LOCALES: Record<Locale, DateFnsLocale> = {
  en: enUS,
  de,
  fr,
  es,
  it,
  pt,
  nl,
  pl,
  ru,
  uk,
  sv,
  da,
  fi,
  el,
  cs,
  ro,
  hu,
  tr,
  zh: zhCN,
  vi,
};

/** Formats a "YYYY-MM" period key (e.g. "2024-08") as a localized "Month Year" label. */
export function formatMonthYear(periodKey: string, locale: Locale): string {
  const [year, month] = periodKey.split("-").map(Number);
  return format(new Date(Date.UTC(year, month - 1, 1)), "MMMM yyyy", { locale: DATE_FNS_LOCALES[locale] });
}
