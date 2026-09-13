import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { asLocale } from "@/i18n/routing";
import { buildPageMetadata } from "@/helpers/seo";
import DataSave from "@/components/main/legal/DataSave";

export async function generateMetadata({ params }: PageProps<"/[locale]/data-save">): Promise<Metadata> {
  const locale = asLocale((await params).locale);
  const t = await getTranslations({ locale, namespace: "meta" });
  return buildPageMetadata({ locale, path: "/data-save", title: t("dataSaveTitle"), description: t("dataSaveDescription") });
}

export default async function DataSavePage({ params }: PageProps<"/[locale]/data-save">) {
  setRequestLocale(asLocale((await params).locale));
  return <DataSave />;
}
