import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing, type Locale } from "@/i18n/routing";
import { bricolage, kalam } from "../fonts";
import AosProvider from "@/components/providers/AosProvider";
import CursorTrail from "@/components/providers/CursorTrail";
import MaskOverlay from "@/components/shared/mask-overlay/MaskOverlay";
import JsonLd from "@/components/shared/seo/JsonLd";
import { ogImageUrl, personJsonLd, SITE_NAME, SITE_URL, websiteJsonLd } from "@/helpers/seo";
import "aos/dist/aos.css";
import "@/styles/globals.css";

/** Static export: only the locales from generateStaticParams exist. */
export const dynamicParams = false;

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: LayoutProps<"/[locale]">): Promise<Metadata> {
  const { locale: requested } = await params;
  const locale: Locale = hasLocale(routing.locales, requested) ? requested : routing.defaultLocale;
  const t = await getTranslations({ locale, namespace: "meta" });
  const image = { url: ogImageUrl(locale), width: 1200, height: 630, alt: `${SITE_NAME} – ${t("jobTitle")}` };

  return {
    metadataBase: new URL(SITE_URL),
    title: { default: t("title"), template: `%s | ${SITE_NAME}` },
    description: t("description"),
    applicationName: SITE_NAME,
    authors: [{ name: SITE_NAME, url: SITE_URL }],
    creator: SITE_NAME,
    formatDetection: { telephone: false },
    openGraph: { siteName: SITE_NAME, images: [image] },
    twitter: { card: "summary_large_image", images: [image.url] },
    // Kept from the Angular index.html
    other: { google: "notranslate" },
  };
}

/**
 * Locale root layout (replaces Angular index.html + AppComponent).
 * AppComponent responsibilities: translation setup -> NextIntlClientProvider,
 * AOS.init -> AosProvider, mousemove trail -> CursorTrail, <app-mask-overlay> -> MaskOverlay.
 * Rendered at build time only (static export).
 */
export default async function LocaleLayout({ children, params }: LayoutProps<"/[locale]">) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "meta" });

  return (
    <html lang={locale} className={`${bricolage.variable} ${kalam.variable}`}>
      <body>
        <NextIntlClientProvider>
          {children}
          <MaskOverlay />
          <AosProvider />
          <CursorTrail />
        </NextIntlClientProvider>
        <JsonLd data={[personJsonLd(locale, t("jobTitle"), t("description")), websiteJsonLd(locale, t("description"))]} />
      </body>
    </html>
  );
}
