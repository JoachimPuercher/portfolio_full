import { defineRouting } from "next-intl/routing";

/**
 * Locale routing. Angular used a client toggle + localStorage("usedLang");
 * now the locale is part of the URL (/de/..., /en/...) for SEO (hreflang, indexable
 * pages per language). The choice is persisted in the NEXT_LOCALE cookie.
 */
export const routing = defineRouting({
  locales: ["de", "en"],
  defaultLocale: "de",
  localePrefix: "always",
  // Angular kept the choice permanently (localStorage); keep the cookie for a year.
  localeCookie: { maxAge: 60 * 60 * 24 * 365 },
});

export type Locale = (typeof routing.locales)[number];

/** Narrow an URL param to a supported locale (falls back to the default locale). */
export function asLocale(value: string): Locale {
  return (routing.locales as readonly string[]).includes(value) ? (value as Locale) : routing.defaultLocale;
}
