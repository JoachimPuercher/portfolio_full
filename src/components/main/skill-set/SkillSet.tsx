/* eslint-disable @next/next/no-img-element -- plain <img> keeps the image sizing of the Angular templates */
import { useTranslations } from "next-intl";
import { cn } from "@/helpers/cn";
import { TECH_LOGOS } from "@/data/tech-logos";
import TechStackLogo from "@/components/shared/ui/tech-stack-logo/TechStackLogo";
import PeelSticker from "./PeelSticker";
import styles from "./SkillSet.module.css";

/**
 * Angular: main/skill-set.
 * Heading with the rotating pen stroke, intro text on a paper hole, the tech logo grid
 * and a peel-off sticker. Server component; only the sticker is interactive.
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

          <div className={styles.right} />
        </div>

        <div className={styles.bottomWrapper}>
          <div className={styles.outer} />
          <div className={styles.logoWrapper} data-aos="fade">
            {TECH_LOGOS.map((logo) => (
              <TechStackLogo key={logo.name} {...logo} />
            ))}
          </div>
          <div data-aos="fade-left">
            <PeelSticker />
          </div>
        </div>
      </section>
    </div>
  );
}
