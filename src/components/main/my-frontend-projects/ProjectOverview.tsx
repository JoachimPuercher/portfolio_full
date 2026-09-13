"use client";

/* eslint-disable @next/next/no-img-element -- plain <img> keeps the image sizing of the Angular templates */
import { useState, type ReactNode } from "react";
import { cn } from "@/helpers/cn";
import styles from "./ProjectOverview.module.css";

interface ProjectOverviewProps {
  imgPath: string;
  imgAltText: string;
  header: string;
  text: string;
  /** Only the first project floats its image and swaps it on hover */
  animate: boolean;
  /** Angular <ng-content>: the hover button inside the image */
  children?: ReactNode;
}

/**
 * Angular: main/my-projects/project-overview.
 * Project card: image with dark gradient + button on hover, title and short text.
 * SEO: the title is an <h3> (Angular: <h4> directly under the section <h2>); same classes, same look.
 */
export default function ProjectOverview({ imgPath, imgAltText, header, text, animate, children }: ProjectOverviewProps) {
  const [hoverProject, setHoverProject] = useState(false);

  let image: ReactNode;
  if (animate && !hoverProject) {
    image = <img key="idle" className={styles.animateImg} src={imgPath} alt={imgAltText} loading="lazy" />;
  } else if (animate) {
    image = <img key="hover" className={styles.hoverEffectAnimate} src={imgPath} alt={imgAltText} />;
  } else {
    image = <img className={styles.hoverEffectNotAnimate} src={imgPath} alt={imgAltText} loading="lazy" />;
  }

  return (
    <div className={styles.card}>
      <div
        className={styles.imgWrapper}
        onMouseEnter={() => setHoverProject(true)}
        onMouseLeave={() => setHoverProject(false)}
      >
        {image}
        <div className={styles.contentWrapper}>{children}</div>
      </div>

      <h3 className={cn("h4-header-typo", styles.projectHeaderText)}>{header}</h3>
      <span className="h4-text-typo">{text}</span>
    </div>
  );
}
