/* eslint-disable @next/next/no-img-element -- plain <img> keeps the image sizing of the Angular templates */
import { useTranslations } from "next-intl";
import { cn } from "@/helpers/cn";
import MainButton from "@/components/shared/ui/main-button/MainButton";
import styles from "./AboutMe.module.css";

const PAPERS = [
  { paper: "/images/about-me/Ripped-paper-yellow.png", paperAlt: "yellow paper background", icon: "/images/about-me/location-icon.png", iconAlt: "loaction logo", key: "basedIn" },
  { paper: "/images/about-me/Ripped-paper-blue.png", paperAlt: "blue paper background", icon: "/images/about-me/relocate-icon.png", iconAlt: "relocate logo", key: "relocate" },
  { paper: "/images/about-me/Ripped-paper-orange.png", paperAlt: "orange paper background", icon: "/images/about-me/remote-icon.png", iconAlt: "remote logo", key: "remote" },
] as const;

/**
 * Angular: main/about-me.
 * Three stacked ripped-paper notes (location, relocation, remote) and the about text.
 * Fix: Angular had the typo `data-aoss`, so this section never animated; now `data-aos`.
 */
export default function AboutMe({ id }: { id?: string }) {
  const t = useTranslations("aboutMe");

  return (
    <div id={id} className={styles.background}>
      <section className={cn("section-padding inner-section-two-col max-content-width", styles.section)}>
        <div className={styles.left} data-aos="fade-up">
          {PAPERS.map((p) => (
            <div key={p.key} className={styles.wrapper}>
              <img src={p.paper} alt={p.paperAlt} loading="lazy" />
              <div className={styles.innerWrapper}>
                <img src={p.icon} alt={p.iconAlt} loading="lazy" />
                <span>{t(p.key)}</span>
              </div>
            </div>
          ))}
        </div>

        <div className={styles.right} data-aos="fade-down">
          <span className="section-header-small-text-typo">{t("who")}</span>
          <div className={styles.headerWrapper}>
            <h2 className="section-header-typo">{t("header")}</h2>
            <img src="/images/about-me/header_underline.png" alt="underline" loading="lazy" />
          </div>
          <span className="section-text-typo">{t("text")}</span>
          <p className="section-text-typo">{t("collaborate")}</p>

          <MainButton variant="dark" href="#contact-me-section" className="ml-auto">
            {t("button")}
          </MainButton>
        </div>
      </section>
    </div>
  );
}
