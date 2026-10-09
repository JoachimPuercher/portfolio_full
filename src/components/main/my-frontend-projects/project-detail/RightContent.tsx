/* eslint-disable @next/next/no-img-element -- plain <img> keeps the image sizing of the Angular templates */
import type { ProjectInfo } from "@/types/model";
import { PROJECTS } from "@/data/projects";
import MainButton from "@/components/shared/ui/main-button/MainButton";
import MyLogoSticker from "@/components/shared/ui/my-logo-sticker/MyLogoSticker";
import styles from "./RightContent.module.css";

interface RightContentProps {
  project: ProjectInfo;
  /** Project title, used for the screenshot alt text (Angular had none) */
  title: string;
}

/**
 * Angular: my-projects/project-detail/right-content.
 * Screenshot with a sticker (the "featured" sticker for the first project, the gold logo
 * sticker for every other one) and the GitHub / live test buttons. Each button only exists
 * when the project has that link (private repository, no deployment).
 */
export default function RightContent({ project, title }: RightContentProps) {
  return (
    <div>
      <div className={styles.imgWrapper}>
        <img className={styles.screenshot} src={project.img} alt={`${title} screenshot`} fetchPriority="high" />
        {project.slug === PROJECTS[0].slug ? (
          <img className={styles.sticker} src={project.sticker} alt="" data-aos="fade" data-aos-delay="300" />
        ) : (
          <div className={styles.stickerWrapper} data-aos="fade" data-aos-delay="300">
            <MyLogoSticker
              stickerImgPath="/images/projects/project-details/elpolloloco/gold_sticker.png"
              logoImgPath="/images/contact-me/meinlogo_black.png"
            />
          </div>
        )}
      </div>
      <div className={styles.buttonWrapper}>
        {project.gitButtonLink && (
          <MainButton variant="light" href={project.gitButtonLink} target="_blank">
            Git Hub
          </MainButton>
        )}
        {project.liveTestLink && (
          <MainButton variant="light" href={project.liveTestLink} target="_blank">
            Live Test
          </MainButton>
        )}
      </div>
    </div>
  );
}
