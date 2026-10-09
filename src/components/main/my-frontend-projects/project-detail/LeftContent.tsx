/* eslint-disable @next/next/no-img-element -- plain <img> keeps the image sizing of the Angular templates */
import { useTranslations } from "next-intl";
import type { ProjectKey, TechLogo } from "@/types/model";
import styles from "./LeftContent.module.css";

interface LeftContentProps {
  projectKey: ProjectKey;
  techLogos: TechLogo[];
}

/**
 * Angular: my-projects/project-detail/left-content.
 * Project title (now the page <h1>), description, implementation, duration, tech stack.
 */
export default function LeftContent({ projectKey, techLogos }: LeftContentProps) {
  const t = useTranslations("projects.projectDetails");
  const k = (field: string) => t(`${projectKey}.${field}`);

  return (
    <div>
      <div className={styles.headerWrapper}>
        <h1 className="section-header-typo">{k("header")}</h1>
        <img src="/images/projects/project-details/blue_line.png" alt="project underline" />
      </div>

      <div className={styles.mainTextWrapper}>
        <div className={styles.innerTextWrapper}>
          <h2 className="h4-header-typo">{k("descHeader")}</h2>
          <span className="h4-text-typo">{k("descText")}</span>
        </div>

        <div className={styles.innerTextWrapper}>
          <h2 className="h4-header-typo">{k("implementHeader")}</h2>
          <span className="h4-text-typo">{k("implementText")}</span>
        </div>

        <div className={styles.durWrapper}>
          <span className="project-detail-button">{k("durHeader")}</span>
          <span className="h4-text-typo">{k("durTime")}</span>
        </div>

        <div className={styles.techStackWrapper}>
          {techLogos.map((logo) => (
            <div key={logo.name}>
              <img src={logo.imgPath} alt={logo.imgAltText} />
              <span className="project-techlogo-font">{logo.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
