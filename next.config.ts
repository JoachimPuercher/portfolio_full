import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

/**
 * Static export for world4you (Apache + PHP, no Node): `next build` writes the whole
 * site as HTML/CSS/JS into `out/`. Everything a Next server would do at runtime
 * (locale redirect on "/", legacy URL redirects, 404) is handled by public/.htaccess.
 */
const nextConfig: NextConfig = {
  output: "export",
  // /de/imprint/ -> out/de/imprint/index.html: Apache serves it without rewrite rules.
  trailingSlash: true,
  // No image optimizer without a server; the site uses plain <img>.
  images: { unoptimized: true },
  poweredByHeader: false,
};

export default withNextIntl(nextConfig);
