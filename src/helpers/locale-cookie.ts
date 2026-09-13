import { LOCALE_COOKIE, LOCALE_COOKIE_MAX_AGE, type Locale } from "@/i18n/routing";

/**
 * Persist the chosen language for the "/" redirect in public/.htaccess
 * (Angular: localStorage "usedLang"). Static export has no middleware to do this.
 */
export function setLocaleCookie(locale: Locale): void {
  document.cookie = `${LOCALE_COOKIE}=${locale}; path=/; max-age=${LOCALE_COOKIE_MAX_AGE}; SameSite=Lax`;
}
