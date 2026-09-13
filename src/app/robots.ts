import type { MetadataRoute } from "next";
import { SITE_URL } from "@/helpers/seo";

/** Allow all crawlers, including AI/answer-engine crawlers (GEO). */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: ["/api/"] }],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
