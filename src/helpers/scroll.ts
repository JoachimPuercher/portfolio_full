/**
 * Scroll helpers replacing Angular DOM calls. Client-only: call from effects or handlers.
 * - scrollToSection: HeaderLinks on the home page, ContactMeForm.scrollToForm.
 * - scrollToTop: MyLogo / footer TOP icon on the page they link to.
 * Direct loads with a hash use the browser's native anchor jump; Next.js scrolls to the
 * hash after client navigations and to the top on page changes (Angular:
 * MainComponent.jumpToSection, ProjectDetailComponent.ngAfterViewInit).
 */
export function scrollToSection(id: string, block: ScrollLogicalPosition = "start") {
  const el = document.getElementById(id);
  if (!el) return;
  el.scrollIntoView({ block, behavior: "smooth" });
  keepAligned(el, block);
}

/**
 * Lazy-loaded images below the fold grow the document while a smooth scroll runs, and
 * `scrollIntoView` resolves its target only once: the longer the way, the further the
 * page lands above the section (the contact link missed it by 1000px on a phone).
 * Re-aim whenever the document height changes, until it settles.
 */
export function keepAligned(el: Element, block: ScrollLogicalPosition = "start", timeoutMs = 3000) {
  let lastHeight = document.documentElement.scrollHeight;
  const started = Date.now();

  const tick = () => {
    const height = document.documentElement.scrollHeight;
    if (height !== lastHeight) {
      lastHeight = height;
      el.scrollIntoView({ block, behavior: "smooth" });
    }
    if (Date.now() - started < timeoutMs) window.setTimeout(tick, 150);
  };

  window.setTimeout(tick, 150);
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
