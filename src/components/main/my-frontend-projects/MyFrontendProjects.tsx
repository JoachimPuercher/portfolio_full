/* eslint-disable @next/next/no-img-element -- plain <img> keeps the image sizing of the Angular templates */
import { useTranslations } from "next-intl";
import { cn } from "@/helpers/cn";
import { PROJECTS } from "@/data/projects";
import ProjectLinkButton from "@/components/shared/ui/project-link-button/ProjectLinkButton";
import ProjectOverview from "./ProjectOverview";
import styles from "./MyFrontendProjects.module.css";

/** Angular AOS direction per project card (join, el pollo loco, simplify, school infos). */
const AOS_DIRECTION = ["fade-right", "fade-left", "fade-right", "fade-right"] as const;

/**
 * Angular: main/my-projects (renamed to my-frontend-projects).
 * Section header and one overview card per project. Desktop: the light button appears
 * inside the image on hover. Touch / <= 768px: a dark button below the card.
 */
export default function MyFrontendProjects({ id }: { id?: string }) {
  const t = useTranslations("projects");

  return (
    <div id={id} className={styles.background}>
      <section className={cn("section-padding inner-section-two-col max-content-width", styles.section)}>
        <div className={styles.headerWrapper} data-aos="fade-right">
          <span className="section-header-small-text-typo">{t("craft")}</span>
          <div className={styles.headerInnerWrapper}>
            <h2 className="section-header-typo">{t("header")}</h2>
            <img src="/images/projects/header_line.png" alt="underline" loading="lazy" />
          </div>
          <span className={cn("section-text-typo", styles.headerText)}>{t("text")}</span>
        </div>

        <div className={styles.placeholder} />

        {PROJECTS.map((project, i) => (
          <div key={project.slug} className={styles.projectWrapper} data-aos={AOS_DIRECTION[i]}>
            <ProjectOverview
              imgPath={project.overviewImg}
              imgAltText={project.overviewImgAlt}
              header={t(`projectDetails.${project.key}.header`)}
              text={t(`projectDetails.${project.key}.descText`)}
              animate={project.overviewAnimate}
            >
              <div className="display-none-touch-device display-hide-768px-width">
                <ProjectLinkButton variant="light" slug={project.slug}>
                  {t("buttonText")}
                </ProjectLinkButton>
              </div>
            </ProjectOverview>
            <div className={cn("display-block-touch-device display-block-768px-width", styles.touchButton)}>
              <ProjectLinkButton variant="dark" slug={project.slug}>
                {t("buttonText")}
              </ProjectLinkButton>
            </div>
            {i === 0 && (
              <img
                className={styles.sticker}
                src="/images/projects/Sticker.png"
                alt="featured project sticker"
                loading="lazy"
                data-aos="fade"
                data-aos-delay="400"
              />
            )}
          </div>
        ))}
      </section>
    </div>
  );
}
