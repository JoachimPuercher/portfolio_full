/* eslint-disable @next/next/no-img-element -- plain <img> keeps the image sizing of the Angular templates */
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { cn } from "@/helpers/cn";
import { getNextProject, getPrevProject, getTechLogos } from "@/data/projects";
import type { ProjectInfo } from "@/types/model";
import Header from "@/components/shared/header/header/Header";
import LeftContent from "./LeftContent";
import RightContent from "./RightContent";
import styles from "./ProjectDetail.module.css";

/**
 * Angular: my-projects/project-detail.
 * Angular kept the active project in a service (projectPos) on one URL; each project
 * now has its own page. Back/next are real links to the neighbour projects and keep
 * the scroll position, like Angular's in-place switch.
 */
export default function ProjectDetail({ project }: { project: ProjectInfo }) {
  const t = useTranslations("projects.projectDetails");
  const prev = getPrevProject(project.slug);
  const next = getNextProject(project.slug);
  const title = t(`${project.key}.header`);

  const backLink = (className: string) => (
    <Link href={`/projects/${prev.slug}`} scroll={false} className={cn(styles.backWrapper, className)}>
      <img src="/images/projects/project-details/back-arrow.png" alt="back arrow" />
      <span className="project-detail-button">{t("backButton")}</span>
    </Link>
  );

  return (
    <>
      <div className={styles.backgroundWorkaround} />
      <div className={styles.background}>
        <section className={cn("max-content-width", styles.section)}>
          <div className={cn(styles.desktopHeaderWrapper, "display-hide-1250px-width")}>
            <Header linkColor={["black", "black", "white", "white"]} />
          </div>
          <div className={cn(styles.mobileHeaderWrapper, "display-hide-over-1250px-width")}>
            <Header linkColor={["black", "black", "black", "black"]} langSwitchTextColor="#0E1013" />
          </div>

          <main className={styles.main}>
            {backLink("display-hide-1250px-width")}

            <div className={styles.middle}>
              <div className={styles.leftContent} data-aos="fade-right">
                <LeftContent projectKey={project.key} techLogos={getTechLogos(project)} />
              </div>
              <div className={styles.rightContent} data-aos="fade-left">
                <RightContent project={project} title={title} />
              </div>
            </div>

            <nav aria-label="Projects" className={styles.mobileBackNextWrapper}>
              {backLink("display-hide-over-1250px-width")}
              <Link href={`/projects/${next.slug}`} scroll={false} className={styles.nextWrapper}>
                <span className="project-detail-button">{t("nextButton")}</span>
                <img src="/images/projects/project-details/next-arrow.png" alt="nex arrow" />
              </Link>
            </nav>
          </main>
        </section>
      </div>
    </>
  );
}
