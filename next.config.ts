import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  poweredByHeader: false,

  /**
   * Permanent (308) redirects for the URLs of the former Angular site, so existing
   * links and search rankings carry over. The old site defaulted to German.
   * "/project-details" had no project parameter and always showed the first project.
   */
  async redirects() {
    return [
      { source: "/imprint", destination: "/de/imprint", permanent: true },
      { source: "/data-save", destination: "/de/data-save", permanent: true },
      { source: "/project-details", destination: "/de/projects/join", permanent: true },
    ];
  },
};

export default withNextIntl(nextConfig);
