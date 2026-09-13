/* eslint-disable @next/next/no-img-element -- plain <img> keeps the image sizing of the Angular templates */
import { useTranslations } from "next-intl";
import { cn } from "@/helpers/cn";
import { Link } from "@/i18n/navigation";
import Header from "@/components/shared/header/header/Header";
import Footer from "@/components/shared/footer/Footer";
import styles from "./LegalPage.module.css";

function SubHeading({ children, asParagraph }: { children: React.ReactNode; asParagraph?: boolean }) {
  return (
    <div className={styles.wrapper}>
      {asParagraph ? (
        <p className="h3-header-typo-imprint">
          <strong>{children}</strong>
        </p>
      ) : (
        <h2 className="h3-header-typo-imprint">{children}</h2>
      )}
      <img src="/images/imprint/imprint_header_line.png" alt="underline" />
    </div>
  );
}

/**
 * Angular: main/data-save (privacy policy).
 * Headings: <h1> + <h2> instead of <h3>/<h5> (same classes, same look).
 * Like Angular, `dataSave.rights.textTwo` is not rendered (its "&#64;" entity was
 * replaced by "@" in the messages anyway).
 */
export default function DataSave() {
  const t = useTranslations("dataSave");
  const serverLogList = t.raw("serverLog.list") as string[];
  const rightsList = t.raw("rights.list") as string[];

  return (
    <div className={cn(styles.page, styles.dataSaveBg)}>
      <div className={cn("max-content-width", styles.headerWrapper)}>
        <Header />
      </div>
      <main className={cn("section-padding max-content-width", styles.content)}>
        <h1 className={cn("section-header-typo", styles.title)}>{t("header")}</h1>

        <br />
        <SubHeading asParagraph>{t("privacy.header")}</SubHeading>
        <p>{t("privacy.textOne")}</p>
        <p>{t("privacy.textTwo")}</p>

        <SubHeading>{t("contactUs.header")}</SubHeading>
        <p></p>
        <p>{t("contactUs.textOne")}</p>

        <SubHeading>{t("cookies.header")}</SubHeading>
        <p>{t("cookies.textOne")}</p>

        <SubHeading>{t("serverLog.header")}</SubHeading>
        <p>{t("serverLog.textOne")}</p>
        <ul>
          {serverLogList.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <p>{t("serverLog.textTwo")}</p>
        <p>{t("serverLog.textThree")}</p>

        <SubHeading>{t("rights.header")}</SubHeading>
        <p>{t("rights.textOne")}</p>
        <ul>
          {rightsList.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <p></p>

        <SubHeading>{t("reach.header")}</SubHeading>
        <p>
          <b>{t("reach.operator")}</b>
          {/* Angular: href="#" resolved against <base href="/"> and led to the home page */}
          <Link href="/"> Joachim Pürcher</Link>
          <br />
        </p>
        <p>
          <b>{t("reach.phoneText")}</b>
          <a href="tel:+436767704199"> +43 676 770 41 99</a>
          <br />
        </p>
        <p>
          <b>Email:</b>
          <a href="mailto:contact@PuercherJoachim.com"> contact@PuercherJoachim.com</a>
        </p>

        <p>
          {t("reach.source")}{" "}
          <b>
            <a href="https://www.fairesrecht.at/kostenlos-datenschutzerklaerung-erstellen-generator.php">
              Datenschutzgenerator Österreich DSGVO
            </a>
          </b>
        </p>
      </main>
      <Footer showTop={false} />
    </div>
  );
}
