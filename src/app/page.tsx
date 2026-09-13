import type { Metadata } from "next";
import Link from "next/link";
import { routing } from "@/i18n/routing";
import { languageAlternates, SITE_NAME } from "@/helpers/seo";
import { bricolage } from "./fonts";
import "@/styles/globals.css";

const target = `/${routing.defaultLocale}/`;

export const metadata: Metadata = {
  title: { absolute: SITE_NAME },
  robots: { index: false, follow: true },
  alternates: { languages: languageAlternates("") },
};

/**
 * Exported as out/index.html: the fallback for "/" when the Apache rules in
 * public/.htaccess are not active (e.g. a plain static preview). On the real host
 * Apache redirects "/" by cookie / browser language before this file is served.
 * React hoists the <meta http-equiv="refresh"> into <head>.
 */
export default function RootRedirectPage() {
  return (
    <html lang={routing.defaultLocale} className={bricolage.variable}>
      <body className="bg-main-white font-bricolage text-main-black">
        <meta httpEquiv="refresh" content={`0; url=${target}`} />
        <main className="flex min-h-dvh flex-col items-center justify-center gap-6 p-4 text-center">
          <p className="section-text-typo">Weiterleitung … / Redirecting …</p>
          <p className="section-text-typo flex gap-6">
            <Link className="text-main-blue hover:text-main-yellow" href="/de/" hrefLang="de">
              Deutsch
            </Link>
            <Link className="text-main-blue hover:text-main-yellow" href="/en/" hrefLang="en">
              English
            </Link>
          </p>
        </main>
      </body>
    </html>
  );
}
