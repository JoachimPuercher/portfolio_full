import Link from "next/link";
import "@/styles/globals.css";
import { bricolage } from "./fonts";

/**
 * Exported as out/404.html and served by Apache via `ErrorDocument 404 /404.html`
 * (public/.htaccess) for every unknown path, in both languages.
 */
export default function GlobalNotFound() {
  return (
    <html lang="de" className={bricolage.variable}>
      <body className="bg-main-white font-bricolage text-main-black">
        <main className="flex min-h-dvh flex-col items-center justify-center gap-6 p-4 text-center">
          <h1 className="section-header-typo text-main-red">404</h1>
          <p className="section-text-typo">Diese Seite existiert nicht. / This page does not exist.</p>
          <p className="section-text-typo flex gap-6">
            <Link className="text-main-blue hover:text-main-yellow" href="/de/" hrefLang="de">
              Zur Startseite
            </Link>
            <Link className="text-main-blue hover:text-main-yellow" href="/en/" hrefLang="en">
              Go to home page
            </Link>
          </p>
        </main>
      </body>
    </html>
  );
}
