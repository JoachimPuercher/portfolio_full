import type { ProjectInfo, TechLogo } from "@/types/model";
import { TECH_LOGOS } from "./tech-logos";

/**
 * Ported from ProjectDetailsService (Angular).
 * The mutable `projectPos` state is gone: the active project is the URL slug.
 * Order equals the Angular `projectArr` order (join, elpolloloco, simplify, schoolInfos).
 */
export const PROJECTS: ProjectInfo[] = [
  {
    slug: "join",
    key: "join",
    img: "/images/projects/project-details/join/join-screen-0.png",
    sticker: "/images/projects/project-details/Sticker.png",
    usedTechs: ["html", "css", "javascript", "firebase"],
    gitButtonLink: "https://github.com/JoachimPuercher/join",
    liveTestLink: "https://www.puercherjoachim.com/join/html/index.html",
    overviewImg: "/images/projects/Laptop.png",
    overviewImgAlt: "join laptop",
    overviewAnimate: true,
  },
  {
    slug: "el-pollo-loco",
    key: "elpolloloco",
    img: "/images/projects/project-details/elpolloloco/loco-screen-0.png",
    sticker: "/images/projects/project-details/Sticker.png",
    usedTechs: ["html", "css", "javascript"],
    gitButtonLink: "https://github.com/JoachimPuercher/el_pollo_loco",
    liveTestLink: "https://www.puercherjoachim.com/elpolloloco/index.html",
    overviewImg: "/images/projects/Pollo.png",
    overviewImgAlt: "el pollo loco pepe",
    overviewAnimate: false,
  },
  {
    slug: "simplify",
    key: "simplify",
    img: "/images/projects/project-details/simplify/simplify-details-screen.webp",
    sticker: "/images/projects/project-details/Sticker.png",
    usedTechs: ["html", "scss", "typescript", "react", "next", "firebase", "tailwind css"],
    gitButtonLink: "https://github.com/JoachimPuercher/simplifythislife",
    liveTestLink: "https://www.puercherjoachim.com/simplify/",
    overviewImg: "/images/projects/simplify-main-screen.webp",
    overviewImgAlt: "simplify this life screen",
    overviewAnimate: false,
  },
  {
    slug: "school-infos",
    key: "schoolInfos",
    img: "/images/projects/project-details/schoolinfos/school-infos-details.webp",
    sticker: "/images/projects/project-details/Sticker.png",
    usedTechs: ["html", "scss", "typescript", "react", "vite"],
    gitButtonLink: "https://github.com/JoachimPuercher/school_open_house",
    liveTestLink: "https://www.puercherjoachim.com/schoolinfos/",
    overviewImg: "/images/projects/school-infos.webp",
    overviewImgAlt: "school infos image",
    overviewAnimate: false,
  },
];

export const PROJECT_SLUGS = PROJECTS.map((p) => p.slug);

export function getProjectBySlug(slug: string): ProjectInfo | undefined {
  return PROJECTS.find((p) => p.slug === slug);
}

export function getProjectIndex(slug: string): number {
  return PROJECTS.findIndex((p) => p.slug === slug);
}

/** Angular nextProject(): (pos + 1) % length */
export function getNextProject(slug: string): ProjectInfo {
  const i = getProjectIndex(slug);
  return PROJECTS[(i + 1) % PROJECTS.length];
}

/** Angular prevProject(): (pos - 1 + length) % length */
export function getPrevProject(slug: string): ProjectInfo {
  const i = getProjectIndex(slug);
  return PROJECTS[(i - 1 + PROJECTS.length) % PROJECTS.length];
}

/**
 * Angular getTechLogos(): keeps TECH_LOGOS order, filters by lower-cased name.
 * "vite" has no logo in TECH_LOGOS and is therefore dropped, same as in Angular.
 */
export function getTechLogos(project: ProjectInfo): TechLogo[] {
  return TECH_LOGOS.filter((logo) => project.usedTechs.includes(logo.name.toLocaleLowerCase()));
}
