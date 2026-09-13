import type { ReactNode } from "react";

/**
 * Root layout is a pass-through. <html>/<body> are rendered in app/[locale]/layout.tsx
 * so the `lang` attribute follows the URL locale (next-intl App Router pattern).
 * A root layout is still required because app/not-found.tsx lives at the root.
 */
export default function RootLayout({ children }: { children: ReactNode }) {
  return children;
}
