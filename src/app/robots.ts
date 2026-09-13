import type { MetadataRoute } from "next";
import { SITE_URL } from "@/helpers/seo";

/** Static export: rendered once at build time into out/. */
export const dynamic = "force-static";

/** Allow all crawlers, including AI/answer-engine crawlers (GEO). */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
