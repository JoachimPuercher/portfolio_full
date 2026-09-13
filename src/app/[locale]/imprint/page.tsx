import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { asLocale } from "@/i18n/routing";
import { buildPageMetadata } from "@/helpers/seo";
import Imprint from "@/components/main/legal/Imprint";

export async function generateMetadata({ params }: PageProps<"/[locale]/imprint">): Promise<Metadata> {
  const locale = asLocale((await params).locale);
  const t = await getTranslations({ locale, namespace: "meta" });
  return buildPageMetadata({ locale, path: "/imprint", title: t("imprintTitle"), description: t("imprintDescription") });
}

export default async function ImprintPage({ params }: PageProps<"/[locale]/imprint">) {
  setRequestLocale(asLocale((await params).locale));
  return <Imprint />;
}
