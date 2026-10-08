import type { TechLogo } from "@/types/model";

/** Ported from TechlogoService (Angular). Order defines the skill grid order. */
export const FRONTEND_TECH_LOGOS: TechLogo[] = [
  { name: "React/native", imgPath: "/images/skills/techlogos/react.svg", imgAltText: "React Logo" },
  { name: "Next", imgPath: "/images/skills/techlogos/nextjs.svg", imgAltText: "NextJs Logo" },
  { name: "TypeScript", imgPath: "/images/skills/techlogos/typescript.png", imgAltText: "TS Logo" },
  { name: "Tailwind", imgPath: "/images/skills/techlogos/tailwind.svg", imgAltText: "Tailwind CSS Logo" },
  { name: "SCSS", imgPath: "/images/skills/techlogos/sass.svg", imgAltText: "SCSS Logo" },
  { name: "HTML", imgPath: "/images/skills/techlogos/html.png", imgAltText: "HTML Logo" },
  { name: "CSS", imgPath: "/images/skills/techlogos/css.png", imgAltText: "CSS Logo" },
  { name: "JavaScript", imgPath: "/images/skills/techlogos/javascript.png", imgAltText: "JS Logo" },
  { name: "REST-API", imgPath: "/images/skills/techlogos/rest-api.png", imgAltText: "Rest-Api Logo" },
  { name: "Git", imgPath: "/images/skills/techlogos/git.png", imgAltText: "Git Logo" },
  { name: "Firebase", imgPath: "/images/skills/techlogos/firebase.png", imgAltText: "Firebase Logo" },
  { name: "Scrum", imgPath: "/images/skills/techlogos/scrum.png", imgAltText: "Scrum Logo" },
  { name: "Angular", imgPath: "/images/skills/techlogos/angular.png", imgAltText: "Angular Logo" },
];

export const BACKEND_TECH_LOGOS: TechLogo[] = [
  { name: "Python", imgPath: "/images/skills/techlogos/python.svg", imgAltText: "Python Logo" },
  { name: "Django", imgPath: "/images/skills/techlogos/django.svg", imgAltText: "Django Logo" },
  { name: "DRF", imgPath: "/images/skills/techlogos/drf.svg", imgAltText: "DRF Logo" },
  { name: "Hono", imgPath: "/images/skills/techlogos/hono.svg", imgAltText: "Hono Logo" },
  { name: "Railway", imgPath: "/images/skills/techlogos/railway.svg", imgAltText: "Railway Logo" },
  { name: "Vercel", imgPath: "/images/skills/techlogos/vercel.svg", imgAltText: "Vercel Logo" },
  { name: "Linux", imgPath: "/images/skills/techlogos/linux.svg", imgAltText: "Linux Logo" },
  { name: "Docker", imgPath: "/images/skills/techlogos/docker.svg", imgAltText: "Docker Logo" },
  { name: "Redis", imgPath: "/images/skills/techlogos/redis.svg", imgAltText: "Redis Logo" },
  { name: "PostgreSQL", imgPath: "/images/skills/techlogos/postgresql.svg", imgAltText: "PostgreSQL Logo" },
  { name: "Supabase", imgPath: "/images/skills/techlogos/supabase.svg", imgAltText: "Supabase Logo" },
];

/** Both skill groups in grid order: frontend first, then backend (JSON-LD, project tech matching). */
export const ALL_TECH_LOGOS: TechLogo[] = [...FRONTEND_TECH_LOGOS, ...BACKEND_TECH_LOGOS];
