import type { SocialLink } from "@/types/model";

/** Ported from SocialLinksService (Angular). Paths are root-relative now. */
export const SOCIAL_LINKS: SocialLink[] = [
  {
    name: "LinkedIn",
    imgPath: "/images/hero-section/linkedin.png",
    linkHref: "https://www.linkedin.com/in/joachim-pürcher-92b249345/",
    imgAltText: "linkedin logo",
  },
  {
    name: "Github",
    imgPath: "/images/hero-section/github.png",
    linkHref: "https://github.com/JoachimPuercher",
    imgAltText: "github logo",
  },
  {
    name: "Email",
    imgPath: "/images/hero-section/mail.png",
    linkHref: "mailto:contact@PuercherJoachim.com",
    imgAltText: "email logo",
  },
];

/** LinkedIn profiles of colleagues (ColleaguesThoughtsComponent.stickerLinks). */
export const STICKER_LINKS = {
  dominic: "https://www.linkedin.com/in/dominic-duchaczek-397b641b6/",
  eduard: "https://www.linkedin.com/in/eduard-fray-696ba81a9/",
} as const;

/** Public profile URLs, used for JSON-LD `sameAs`. */
export const PROFILE_URLS = {
  linkedin: "https://www.linkedin.com/in/joachim-pürcher-92b249345/",
  github: "https://github.com/JoachimPuercher",
} as const;
