# Joachim Pürcher – Portfolio (Next.js)

Personal portfolio, migrated from Angular 19 to **Next.js 16 (App Router), React 19, Tailwind CSS 4 and next-intl 4**.
Focus: the same design as the Angular original, plus SEO and GEO (language URLs, metadata, structured data).

## Getting started

```bash
npm install
cp .env.example .env.local   # adjust the values
npm run dev                  # http://localhost:3000 -> redirects to /de or /en
```

| Script | Purpose |
|---|---|
| `npm run dev` | Development server (Turbopack) |
| `npm run build` / `npm run start` | Production build / server |
| `npm run lint` | ESLint |
| `npm run compare` | Screenshot comparison of Angular (`:4200`) against Next (`:3000`), report in `compare/report-de.html` |

`npm run compare -- --lang=en --only=1920x1080,390x844` compares only selected viewports or English.
The comparison uses the installed Google Chrome; no browser is downloaded.

## Environment variables

| Variable | Purpose |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | Base URL for canonical, hreflang, sitemap, Open Graph, JSON-LD |
| `CONTACT_FORWARD_URL` | Target of the contact form (currently the existing `sendMail.php`) |

## Structure

```
messages/            Translations de/en (taken from Angular + namespace "meta")
public/images/       Images (without unused files and without design_material)
public/llms.txt      Short description for AI/answer engines (GEO)
src/app/             Routes: [locale]/, imprint, data-save, projects/[slug], api/contact,
                     sitemap.ts, robots.ts, [locale]/opengraph-image.tsx
src/assets/og/       Static TTF fonts only for the OG image (Satori cannot handle variable fonts)
src/components/      main/ (sections) · shared/ (header, footer, UI) · providers/ (AOS, cursor)
src/data/            Projects, tech logos, social links (replaces the Angular services)
src/helpers/         cn, scroll, seo, class-maps, contact-validation
src/i18n/            next-intl routing, navigation, request config
src/styles/          globals.css: design tokens, breakpoint variants, global classes, keyframes
src/proxy.ts         Language detection and prefix redirects (Next 16 "Proxy")
scripts/compare.mjs  Visual comparison with the Angular original
```

## Styling rules

- Tailwind 4 **without Preflight**, because the original relies on browser defaults.
- Breakpoints as in the SCSS as `max-width`: `mw-850:`, `mw-1250:` …, `from-850:` (min-width), `mh-750:` (max-height), `touch:` (pointer: coarse).
- Complex components (keyframes, sibling hover, combined media queries) use CSS modules.
- Elements with `data-aos` get their offset/rotation via `translate`/`rotate`, because AOS overwrites `transform` after the animation. Exception: the contact sticker, where AOS already overrides it in the original.
- Angular components had an extra host element. Where the layout depended on it (e.g. tech logos in the grid), the React component compensates.

## Deployment

Built for Vercel (SSG + proxy + route handlers + OG images). Legacy Angular URLs (`/imprint`, `/data-save`, `/project-details`) redirect permanently (308) to the new language URLs.
