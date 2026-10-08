/* eslint-disable @next/next/no-img-element -- plain <img> keeps the image sizing of the Angular templates */
import { useTranslations } from "next-intl";
import { cn } from "@/helpers/cn";
import { BACKEND_TECH_LOGOS, FRONTEND_TECH_LOGOS } from "@/data/tech-logos";
import TechStackLogo from "@/components/shared/ui/tech-stack-logo/TechStackLogo";
import PeelSticker from "./PeelSticker";
import styles from "./SkillSet.module.css";

/**
 * Angular: main/skill-set.
 * Heading with the rotating pen stroke, intro text on a paper hole and the tech logo
 * grids, split into a frontend and a backend group. The peel-off sticker sits opposite
 * the heading; it is the only interactive part.
 */
export default function SkillSet({ id }: { id?: string }) {
  const t = useTranslations("skills");

  return (
    <div id={id} className={styles.background}>
      <section className={cn("section-padding max-content-width", styles.section)}>
        <div className={styles.topWrapper}>
          <div className={styles.left} data-aos="fade-right">
            <span className="section-header-small-text-typo">{t("myStack")}</span>
            <div className={styles.headerWrapper}>
              <h2 className="section-header-typo">{t("header")}</h2>
              <img src="/images/skills/header-animation.png" alt="" loading="lazy" />
            </div>
          </div>

          <div className={styles.middle} data-aos="fade">
            <p className="section-text-typo">{t("introduction")}</p>
            <img src="/images/skills/skill-hole.png" alt="" loading="lazy" />
          </div>

          <div className={styles.right} data-aos="fade-left">
            <PeelSticker />
          </div>
        </div>

        <div className={styles.bottomWrapper}>
          <div className={styles.skillGroup} data-aos="fade">
            <h3 className={cn("section-header-small-text-typo", styles.groupHeader)}>{t("frontend")}</h3>
            <div className={styles.logoWrapper}>
              {FRONTEND_TECH_LOGOS.map((logo) => (
                <TechStackLogo key={logo.name} {...logo} />
              ))}
            </div>
          </div>

          <div className={styles.skillGroup} data-aos="fade">
            <h3 className={cn("section-header-small-text-typo", styles.groupHeader)}>{t("backend")}</h3>
            <div className={styles.logoWrapper}>
              {BACKEND_TECH_LOGOS.map((logo) => (
                <TechStackLogo key={logo.name} {...logo} />
              ))}
            </div>
          </div>
                    <div className={styles.bottompeel} data-aos="fade-left">
            <PeelSticker />
          </div>
        </div>
      </section>
    </div>
  );
}
