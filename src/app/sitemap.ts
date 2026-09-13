import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { PROJECT_SLUGS } from "@/data/projects";
import { localizedUrl } from "@/helpers/seo";

/** Static export: rendered once at build time into out/. */
export const dynamic = "force-static";

/** Every page in every locale, each with its hreflang alternates. */
const PAGES: { path: string; priority: number; changeFrequency: "monthly" | "yearly" }[] = [
  { path: "", priority: 1, changeFrequency: "monthly" },
  ...PROJECT_SLUGS.map((slug) => ({ path: `/projects/${slug}`, priority: 0.8, changeFrequency: "monthly" as const })),
  { path: "/imprint", priority: 0.2, changeFrequency: "yearly" },
  { path: "/data-save", priority: 0.2, changeFrequency: "yearly" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return PAGES.flatMap(({ path, priority, changeFrequency }) =>
    routing.locales.map((locale) => ({
      url: localizedUrl(locale, path),
      lastModified,
      changeFrequency,
      priority,
      alternates: {
        languages: Object.fromEntries(routing.locales.map((l) => [l, localizedUrl(l, path)])),
      },
    })),
  );
}
