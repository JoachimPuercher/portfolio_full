import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

/** Localized 404 (unknown paths below /de or /en, unknown project slugs). */
export default function LocaleNotFound() {
  const t = useTranslations("meta");

  return (
    <main className="flex min-h-dvh flex-col items-center justify-center gap-6 bg-main-white p-4 text-center font-bricolage text-main-black">
      <h1 className="section-header-typo text-main-red">404</h1>
      <p className="section-text-typo">{t("notFoundText")}</p>
      <Link className="section-text-typo text-main-blue hover:text-main-yellow" href="/">
        {t("notFoundLink")}
      </Link>
    </main>
  );
}
