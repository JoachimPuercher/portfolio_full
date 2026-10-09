/**
 * Shared domain types. Ported from the Angular app
 * (src/app/shared/interfaces/model.ts). `ProjectInfo` gained `slug`/`key`
 * because project details now live on their own URL.
 */
export interface SocialLink {
  name: string;
  imgPath: string;
  linkHref: string;
  imgAltText: string;
}

export interface TechLogo {
  name: string;
  imgPath: string;
  imgAltText: string;
}

/** i18n key under `projects.projectDetails.*` */
export type ProjectKey = "pulsify" | "join" | "elpolloloco" | "videoflix" | "coderr";

export interface ProjectInfo {
  /** URL segment: /[locale]/projects/[slug] */
  slug: string;
  /** Translation key under projects.projectDetails */
  key: ProjectKey;
  img: string;
  sticker: string;
  usedTechs: string[];
  /** Optional: a project with a private repository shows no "Git Hub" button */
  gitButtonLink?: string;
  /** Optional: a project without a deployment shows no "Live Test" button */
  liveTestLink?: string;
  /** Overview card image (my-frontend-projects section) */
  overviewImg: string;
  overviewImgAlt: string;
  /** Only Join animates its overview image (floating laptop) */
  overviewAnimate: boolean;
}

export interface UserContactInfo {
  name: string;
  email: string;
  message: string;
  privacy: boolean;
}
