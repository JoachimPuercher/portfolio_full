import type { ProjectInfo, TechLogo } from "@/types/model";
import { ALL_TECH_LOGOS } from "./tech-logos";

/**
 * Ported from ProjectDetailsService (Angular).
 * The mutable `projectPos` state is gone: the active project is the URL slug.
 * Pulsify leads; then the Angular `projectArr` order (join, elpolloloco); videoflix and coderr
 * replaced simplify and schoolInfos. The first project gets the "featured" sticker.
 */
export const PROJECTS: ProjectInfo[] = [
  {
    slug: "pulsify",
    key: "pulsify",
    img: "/images/projects/project-details/pulsify/pulsify3.webp",
    sticker: "/images/projects/project-details/Sticker.png",
    usedTechs: ["typescript", "react/native", "next", "tailwind", "hono", "supabase", "postgresql", "railway", "vercel"],
    liveTestLink: "https://pulsify-app.com/",
    overviewImg: "/images/projects/project-details/pulsify/pulsify.webp",
    overviewImgAlt: "pulsify landing page",
    overviewAnimate: false,
  },
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
    slug: "videoflix",
    key: "videoflix",
    img: "/images/projects/project-details/videoflix/videoflix.webp",
    sticker: "/images/projects/project-details/Sticker.png",
    usedTechs: ["python", "django", "drf", "rest-api", "postgresql", "redis", "docker", "linux"],
    gitButtonLink: "https://github.com/JoachimPuercher/videoflix_backend",
    overviewImg: "/images/projects/project-details/videoflix/videoflix.webp",
    overviewImgAlt: "videoflix landing page",
    overviewAnimate: false,
  },
  {
    slug: "coderr",
    key: "coderr",
    img: "/images/projects/project-details/coderr/coderr.webp",
    sticker: "/images/projects/project-details/Sticker.png",
    usedTechs: ["python", "django", "drf", "rest-api", "docker", "linux", "javascript", "html", "css"],
    gitButtonLink: "https://github.com/JoachimPuercher/coderr_backend",
    liveTestLink: "https://www.puercherjoachim.com/coderr/",
    overviewImg: "/images/projects/project-details/coderr/coderr3.webp",
    overviewImgAlt: "coderr landing page",
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
 * Angular getTechLogos(): keeps the skill grid order (frontend, then backend) and
 * filters by lower-cased name. A tech without a logo is dropped, same as in Angular.
 */
export function getTechLogos(project: ProjectInfo): TechLogo[] {
  return ALL_TECH_LOGOS.filter((logo) => project.usedTechs.includes(logo.name.toLocaleLowerCase()));
}
