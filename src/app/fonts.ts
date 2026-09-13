import localFont from "next/font/local";

/*
 * Self-hosted fonts (converted from the Angular TTFs to WOFF2).
 *
 * The Angular @font-face rules had no font-weight descriptor. For a variable font
 * that means "auto" = the font's full wght axis, so the browser rendered real
 * weights (500, 600, 700). Bricolage therefore gets its full range "200 800".
 * Kalam is a static bold face; "auto" resolved to its own weight (700).
 */
export const bricolage = localFont({
  src: "./fonts/BricolageGrotesque-Variable.woff2",
  variable: "--font-bricolage-local",
  weight: "200 800",
  display: "swap",
});

export const kalam = localFont({
  src: "./fonts/Kalam-Bold.woff2",
  variable: "--font-kalam-local",
  weight: "700",
  display: "swap",
});
