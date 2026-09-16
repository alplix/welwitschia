import type { Dictionary, Locale, PluralForms } from "./types";
import en from "./translations/en";
import de from "./translations/de";
import fr from "./translations/fr";
import es from "./translations/es";
import it from "./translations/it";
import pt from "./translations/pt";
import nl from "./translations/nl";
import pl from "./translations/pl";
import ru from "./translations/ru";
import uk from "./translations/uk";
import sv from "./translations/sv";
import da from "./translations/da";
import fi from "./translations/fi";
import el from "./translations/el";
import cs from "./translations/cs";
import ro from "./translations/ro";
import hu from "./translations/hu";
import tr from "./translations/tr";
import zh from "./translations/zh";
import vi from "./translations/vi";

export const TRANSLATIONS: Record<Locale, Dictionary> = {
  en,
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
  zh,
  vi,
};

export { LOCALE_CODES, type Locale, type Dictionary } from "./types";
export { LOCALE_INFO, DEFAULT_LOCALE } from "./locales";

/** Replaces `{placeholder}` tokens in a template string with the given values. */
export function interpolate(template: string, params: Record<string, string | number>): string {
  return template.replace(/\{(\w+)\}/g, (match, key: string) => {
    const value = params[key];
    return value === undefined ? match : String(value);
  });
}

/**
 * Picks the correct plural form for `count` in `locale`, using the CLDR
 * plural category (one/few/many/other) rather than a naive singular/plural
 * split — needed for languages like Russian, Polish, and Czech that have
 * more than two plural forms.
 */
export function pluralizeUnit(locale: Locale, count: number, forms: PluralForms): string {
  let category: Intl.LDMLPluralRule = "other";
  try {
    category = new Intl.PluralRules(locale).select(count);
  } catch {
    category = count === 1 ? "one" : "other";
  }
  return forms[category as keyof PluralForms] ?? forms.other;
}

export function formatCount(locale: Locale, count: number, forms: PluralForms): string {
  return `${count.toLocaleString(locale)} ${pluralizeUnit(locale, count, forms)}`;
}
