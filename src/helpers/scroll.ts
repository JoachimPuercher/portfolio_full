/**
 * Scroll helpers replacing Angular DOM calls. Client-only: call from effects or handlers.
 * - scrollToSection: HeaderLinks on the home page, ContactMeForm.scrollToForm.
 * - scrollToTop: MyLogo / footer TOP icon on the page they link to.
 * Direct loads with a hash use the browser's native anchor jump; Next.js scrolls to the
 * hash after client navigations and to the top on page changes (Angular:
 * MainComponent.jumpToSection, ProjectDetailComponent.ngAfterViewInit).
 */
export function scrollToSection(id: string, block: ScrollLogicalPosition = "start") {
  document.getElementById(id)?.scrollIntoView({ block, behavior: "smooth" });
}

export function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}

/** Section anchor ids on the home page (same ids as in Angular main.component.html). */
export const SECTION_IDS = {
  hero: "hero-section",
  aboutMe: "about-me-section",
  skills: "skills-section",
  projects: "projects-section",
  contact: "contact-me-section",
} as const;

export type SectionId = (typeof SECTION_IDS)[keyof typeof SECTION_IDS];
