/* eslint-disable @next/next/no-img-element -- plain <img> keeps the image sizing of the Angular templates */
import { useTranslations } from "next-intl";
import { cn } from "@/helpers/cn";
import { PROFILE_URLS } from "@/data/social-links";
import Header from "@/components/shared/header/header/Header";
import Footer from "@/components/shared/footer/Footer";
import styles from "./LegalPage.module.css";

function SubHeading({ children }: { children: React.ReactNode }) {
  return (
    <div className={styles.wrapper}>
      <h2 className="h3-header-typo-imprint">{children}</h2>
      <img src="/images/imprint/imprint_header_line.png" alt="underline" />
    </div>
  );
}

/**
 * Angular: main/imprint.
 * Headings: <h1> + <h2> instead of <h3>/<h5> (same classes, same look).
 * Fix: the e-mail link was "mailto:contact.PuercherJoachim.com" (missing "@").
 */
export default function Imprint() {
  const t = useTranslations("imprint");

  return (
    <div className={cn(styles.page, styles.imprintBg)}>
      <div className={cn("max-content-width", styles.headerWrapper)}>
        <Header />
      </div>
      <main className={cn("section-padding max-content-width", styles.content)}>
        <h1 className={cn("section-header-typo", styles.title)}>{t("header")}</h1>

        <br />
        <div className={styles.wrapper}>
          <p className="h3-header-typo-imprint">
            <strong>{t("info")}</strong>
          </p>
          <img src="/images/imprint/imprint_header_line.png" alt="underline" />
        </div>
        <p>
          <strong>
            Joachim Pürcher <br />
            Schöneringer Straße 12e <br />
            4073 Wilhering <br />
          </strong>
        </p>

        <p>
          {t("phoneText")} +43 676 770 41 99 <br />
          E-Mail: <a href="mailto:contact@PuercherJoachim.com"> contact@PuercherJoachim.com</a>
        </p>
        <br />
        <SubHeading>{t("liabilityHeader")}</SubHeading>
        <p></p>
        <p>{t("liabilityText")}</p>
        <br />
        <SubHeading>{t("linksHeader")}</SubHeading>
        <p>{t("linksText")}</p>
        <br />

        <SubHeading>{t("copyrightHeader")}</SubHeading>
        <p>{t("copyrightText")}</p>
        <br />

        <SubHeading>{t("onlineLinksHeader")}</SubHeading>
        <p>{t("onlineLinksSubText")}</p>
        <a href={PROFILE_URLS.linkedin}>https://www.linkedin.com/in/joachim-pürcher-92b249345</a>
        <br />
        <a href={PROFILE_URLS.github}>{PROFILE_URLS.github}</a>
        <p>{t("onlineLinksText")}</p>
        <br />
      </main>
      <Footer showTop={false} />
    </div>
  );
}
