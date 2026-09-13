import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

/**
 * Next.js 16 proxy (formerly middleware): locale detection and prefix redirects,
 * e.g. "/" -> "/de" or "/en" based on the NEXT_LOCALE cookie or Accept-Language.
 */
export default createMiddleware(routing);

export const config = {
  // Skip API routes, Next internals, Vercel internals and any file with an extension.
  matcher: "/((?!api|_next|_vercel|.*\\..*).*)",
};
