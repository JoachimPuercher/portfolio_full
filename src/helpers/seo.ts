import type { Metadata } from "next";
import { routing, type Locale } from "@/i18n/routing";
import { PROFILE_URLS } from "@/data/social-links";
import { TECH_LOGOS } from "@/data/tech-logos";
import { getTechLogos } from "@/data/projects";
import type { ProjectInfo } from "@/types/model";

export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.puercherjoachim.com").replace(/\/$/, "");
export const SITE_NAME = "Joachim Pürcher";

const OG_LOCALE: Record<Locale, string> = { de: "de_AT", en: "en_US" };

/**
 * Absolute URL for a locale and a locale-less path ("" | "/imprint" | "/projects/join").
 * Always ends with "/" (trailingSlash export: /de/imprint/ -> out/de/imprint/index.html).
 */
export function localizedUrl(locale: Locale, path = ""): string {
  return `${SITE_URL}/${locale}${path}/`;
}

/** Static Open Graph image per locale (public/og/<locale>.png, built by scripts/generate-og.mjs). */
export function ogImageUrl(locale: Locale): string {
  return `${SITE_URL}/og/${locale}.png`;
}

/** hreflang map for all locales plus x-default (default locale). */
export function languageAlternates(path = ""): Record<string, string> {
  return {
    ...Object.fromEntries(routing.locales.map((l) => [l, localizedUrl(l, path)])),
    "x-default": localizedUrl(routing.defaultLocale, path),
  };
}

interface PageMetaInput {
  locale: Locale;
  /** locale-less path, e.g. "" or "/imprint" */
  path: string;
  title?: string;
  description: string;
  /** use the title as-is instead of the layout title template */
  absoluteTitle?: boolean;
  noIndex?: boolean;
}

/**
 * Per-page metadata: canonical, hreflang alternates, Open Graph and Twitter.
 * `openGraph`/`twitter` are not deep-merged with the layout, so the image is set here too.
 */
export function buildPageMetadata({ locale, path, title, description, absoluteTitle, noIndex }: PageMetaInput): Metadata {
  const url = localizedUrl(locale, path);
  const image = { url: ogImageUrl(locale), width: 1200, height: 630, alt: `${SITE_NAME} – Frontend Developer` };
  return {
    ...(title ? { title: absoluteTitle ? { absolute: title } : title } : {}),
    description,
    alternates: { canonical: url, languages: languageAlternates(path) },
    openGraph: {
      type: "website",
      url,
      siteName: SITE_NAME,
      locale: OG_LOCALE[locale],
      alternateLocale: routing.locales.filter((l) => l !== locale).map((l) => OG_LOCALE[l]),
      ...(title ? { title } : {}),
      description,
      images: [image],
    },
    twitter: { card: "summary_large_image", ...(title ? { title } : {}), description, images: [image.url] },
    ...(noIndex ? { robots: { index: false, follow: true } } : {}),
  };
}

/* ------------------------------------------------------------------ */
/* JSON-LD (schema.org) for search engines and generative engines (GEO) */
/* ------------------------------------------------------------------ */

export function personJsonLd(locale: Locale, jobTitle: string, description: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${SITE_URL}/#person`,
    name: SITE_NAME,
    givenName: "Joachim",
    familyName: "Pürcher",
    url: localizedUrl(locale),
    image: `${SITE_URL}/images/hero-section/pic-hero.png`,
    jobTitle,
    description,
    email: "mailto:contact@puercherjoachim.com",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Wilhering",
      addressRegion: "Oberösterreich",
      postalCode: "4073",
      addressCountry: "AT",
    },
    homeLocation: { "@type": "Place", name: "Linz, Austria" },
    knowsAbout: TECH_LOGOS.map((t) => t.name),
    knowsLanguage: ["de", "en"],
    sameAs: [PROFILE_URLS.linkedin, PROFILE_URLS.github],
  };
}

export function websiteJsonLd(locale: Locale, description: string) {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    url: `${SITE_URL}/`,
    name: `${SITE_NAME} Portfolio`,
    description,
    inLanguage: locale,
    publisher: { "@id": `${SITE_URL}/#person` },
  };
}

export function projectJsonLd(project: ProjectInfo, locale: Locale, name: string, description: string) {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareSourceCode",
    name,
    description,
    url: localizedUrl(locale, `/projects/${project.slug}`),
    codeRepository: project.gitButtonLink,
    targetProduct: { "@type": "WebApplication", name, url: project.liveTestLink, applicationCategory: "WebApplication", operatingSystem: "Web" },
    programmingLanguage: getTechLogos(project).map((t) => t.name),
    image: `${SITE_URL}${project.img}`,
    inLanguage: locale,
    author: { "@id": `${SITE_URL}/#person` },
  };
}

export function breadcrumbJsonLd(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({ "@type": "ListItem", position: i + 1, name: item.name, item: item.url })),
  };
}
