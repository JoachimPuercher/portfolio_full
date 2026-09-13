# Joachim Pürcher – Portfolio (Next.js, static export)

Personal portfolio, migrated from Angular 19 to **Next.js 16 (App Router), React 19, Tailwind CSS 4 and next-intl 4**.
Focus: the same design as the Angular original, plus SEO and GEO (language URLs, metadata, structured data).

The site is built as a **static export** (`out/`) and uploaded via FTP to world4you (Apache + PHP, no Node).
There is no Next server: the language redirect, legacy URLs and 404 are handled by `public/.htaccess`,
the contact form sends through `public/sendMail.php`.

## Getting started

```bash
npm install
cp .env.example .env.local   # set NEXT_PUBLIC_SITE_URL to the target address
npm run dev                  # http://localhost:3000/de/ (development, no export)
```

| Script | Purpose |
|---|---|
| `npm run dev` | Development server (Turbopack) |
| `npm run build` | Static export to `out/`, followed by `postbuild` (completeness check, `.htaccess`) |
| `npm run serve` | Serve `out/` locally at http://localhost:3000 (like a static host) |
| `npm run og` | Regenerate the Open Graph images `public/og/{de,en}.png` (after text changes in `messages/*.json` → `meta`) |
| `npm run lint` | ESLint |
| `npm run compare` | Screenshot comparison of Angular (`:4200`) against the export (`:3000`), report in `compare/report-de.html` |

`npm run compare -- --lang=en --only=1920x1080,390x844` compares only selected viewports or English.
The comparison uses the installed Google Chrome; no browser is downloaded.

## Environment variables

| Variable | Purpose |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | Base URL, baked in at build time: canonical, hreflang, sitemap, Open Graph, JSON-LD |

## Structure

```
messages/            Translations de/en (taken from Angular + namespace "meta")
public/.htaccess     Apache rules: "/" -> language (cookie, browser, else /de/), legacy URLs, 404, caching
public/sendMail.php  Contact form mailer (validation, honeypot, JSON responses)
public/og/           Static Open Graph images (npm run og)
public/images/       Images (without unused files and without design_material)
public/llms.txt      Short description for AI/answer engines (GEO)
src/app/             Routes: page.tsx (root redirect), not-found.tsx (404.html), sitemap.ts, robots.ts,
                     [locale]/ with home page, imprint, data-save, projects/[slug]
src/components/      main/ (sections) · shared/ (header, footer, UI) · providers/ (AOS, cursor)
src/data/            Projects, tech logos, social links (replaces the Angular services)
src/helpers/         cn, scroll, seo, class-maps, contact-validation, locale-cookie
src/i18n/            next-intl routing (prefix always), navigation, request config
src/styles/          globals.css: design tokens, breakpoint variants, global classes, keyframes
scripts/             compare.mjs (comparison), generate-og.mjs (OG images), postbuild.mjs (export check)
```

## Styling rules

- Tailwind 4 **without Preflight**, because the original relies on browser defaults.
- Breakpoints as in the SCSS as `max-width`: `mw-850:`, `mw-1250:` …, `from-850:` (min-width), `mh-750:` (max-height), `touch:` (pointer: coarse).
- Complex components (keyframes, sibling hover, combined media queries) use CSS modules.
- Elements with `data-aos` get their offset/rotation via `translate`/`rotate` or `!important`, because AOS overwrites `transform` after the animation. Exception: the contact sticker, where AOS already overrides it in the original.
- Angular components had an extra host element. Where the layout depended on it (e.g. tech logos in the grid), the React component compensates.

## Static export: things to keep in mind

- No `proxy.ts`, no API routes, no `redirects()`/`headers()` in `next.config.ts`, no dynamic routes without `generateStaticParams`. Metadata routes (`sitemap.ts`, `robots.ts`) need `dynamic = "force-static"`.
- URLs end with `/` (`trailingSlash: true`); every page is a folder with an `index.html`.
- Windows quirk: Next 16 writes the client router's prefetch files into nested folders instead of dotted file names during export. `scripts/postbuild.mjs` renames them; without this step every prefetch returns a 404 in the browser.
- Server Components only run at build time. Anything that needs browser APIs is `'use client'`.
- The language is stored as the `NEXT_LOCALE` cookie when switching; `.htaccess` reads it on requests to `/`.
- The PHP cannot run locally; `npm run serve` delivers `sendMail.php` as a file (the form then shows the success card). Real testing only on the web space.
