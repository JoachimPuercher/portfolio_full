import { defineRouting } from "next-intl/routing";

/**
 * Locale routing for the static export. Every page lives under /de/... or /en/...
 * (a locale prefix is mandatory without middleware). The bare "/" is redirected by
 * public/.htaccess: NEXT_LOCALE cookie -> Accept-Language -> /de/. The cookie is
 * written by LangSwitch. Angular used a client toggle + localStorage("usedLang").
 */
export const routing = defineRouting({
  locales: ["de", "en"],
  defaultLocale: "de",
  localePrefix: "always",
  // next-intl re-writes the cookie on every client-side locale change; without
  // maxAge that would turn it into a session cookie. Keep it for a year.
  localeCookie: { maxAge: 60 * 60 * 24 * 365 },
});

export type Locale = (typeof routing.locales)[number];

/** Narrow an URL param to a supported locale (falls back to the default locale). */
export function asLocale(value: string): Locale {
  return (routing.locales as readonly string[]).includes(value) ? (value as Locale) : routing.defaultLocale;
}

/** Cookie read by .htaccess when "/" is requested (one year, like the old localStorage entry). */
export const LOCALE_COOKIE = "NEXT_LOCALE";
export const LOCALE_COOKIE_MAX_AGE = 60 * 60 * 24 * 365;
