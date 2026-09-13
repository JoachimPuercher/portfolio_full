/**
 * Explicit class-name maps.
 * Angular built class names by string concatenation (e.g. `color`, `buttonType + '-button'`).
 * Tailwind's scanner cannot see concatenated names, so every variant is spelled out here.
 */

/** Angular main-button / project-link-button / form-sent-info: the "physical press" pill button. */
const BUTTON_BASE =
  "flex h-10 w-fit items-center justify-center rounded-[100px] border border-solid bg-transparent px-6 py-3 font-bricolage text-[18px] font-medium " +
  "transition-all duration-200 ease-in-out " +
  "hover:translate-x-[2px] hover:translate-y-[4px] hover:bg-main-red hover:shadow-[0_0_0_0_var(--color-main-white)] hover:cursor-portfolio-hover-blue";

export const BUTTON_VARIANTS = {
  light: `${BUTTON_BASE} border-main-white text-main-white shadow-[2px_4px_0_0_var(--color-main-white)]`,
  dark: `${BUTTON_BASE} border-main-black text-main-black shadow-[2px_4px_0_0_var(--color-main-black)] hover:text-main-white`,
} as const;

export type ButtonVariant = keyof typeof BUTTON_VARIANTS;
