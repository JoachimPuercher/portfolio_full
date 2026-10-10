# SEO & GEO analysis – puercherjoachim.com

Date: 2026-10-10
Goal: win **client projects** (native apps, web apps, websites) as a software developer in Linz / Upper Austria, instead of presenting a job-seeker portfolio.

SEO = being found in Google/Bing. GEO (Generative Engine Optimization) = being named and cited by AI answer engines (Google AI Overviews, ChatGPT, Perplexity, Copilot) when someone asks "Who can build my app in Linz?".

---

## 1. Positioning

Everything on the site must tell search engines and AI the same story, in the same words:

| Element | Message |
|---|---|
| Who | Joachim Pürcher, fullstack developer, Wilhering near Linz |
| What | Native apps (iOS/Android), web apps, websites, backends/APIs |
| Where | Linz and surroundings, Upper Austria, Austria, remote in DACH |
| How | Cost-realistic ("not the cheapest hour, but what gets done in that hour"), win-win, expertise + practical knowledge, affordable without cutting quality, quality from the heart of Austria |

Keyword principle: **"Softwareentwickler Linz"** and **"App Entwickler Linz"** are the head terms. Everything else (win-win, kostenrealistisch, Praxiswissen) is positioning language that must appear in visible text so that AI engines can quote it, but it is not what people type into Google.

---

## 2. Audit before the changes

| Area | Finding | Impact |
|---|---|---|
| Title / description | "Frontend Entwickler aus Linz \| Portfolio" – signals job search, no service intent, no "App" | High |
| Hidden `<h1>` | "Joachim Pürcher – Fullstack Entwickler", no service, no location | High |
| JSON-LD | Only `Person` + `WebSite`. No business/service entity, no `areaServed`, no services, no phone | High (local SEO + GEO) |
| JSON-LD image | Pointed at `pic-hero.png`, which was deleted (404) | Medium |
| OG image | "Fullstack Entwickler · React · Next.js · TypeScript · Angular" – tech list, no service, no region; generator script read the deleted PNG and would fail | Medium |
| llms.txt | "Frontend developer portfolio … open to relocation" – tells AI engines the opposite of the goal | High (GEO) |
| Visible copy | About/skills/projects/contact texts never mention Linz, Oberösterreich, native apps, websites, pricing philosophy | High |
| Local signals | No `geo.*` meta, no telephone in structured data, no service areas | Medium |
| Technical | Static export, canonical, hreflang (de/en/x-default), sitemap, robots, 301 for legacy Angular URLs, cache headers – all good | – |
| Conflicting signals | About section still shows "Verfügbar ab Jänner 2027" and "Offen für Homeoffice" (job-seeker wording) | Medium, see §6 |

---

## 3. Keyword map

### German (primary market)

Head terms (local intent, commercial):
- Softwareentwickler Linz · Softwareentwicklung Linz · Softwareentwicklung Oberösterreich
- App Entwickler Linz · App Entwicklung Linz · App entwickeln lassen Linz
- Webentwickler Linz · Webentwicklung Linz · Webseite erstellen lassen Linz
- Individualsoftware Oberösterreich · Softwareentwickler Oberösterreich

Service terms:
- native App entwickeln lassen (iOS / Android) · React Native Entwickler Österreich
- Web-App entwickeln lassen · Next.js Entwickler Österreich · Backend / API Entwicklung
- Website erstellen lassen Oberösterreich · Freelancer Softwareentwicklung Österreich

Long tail / question keywords (ideal for GEO and future content pages):
- Was kostet eine App-Entwicklung in Österreich?
- App programmieren lassen Kosten Linz
- MVP entwickeln lassen Österreich
- Unterschied native App und Web-App
- Günstig Software entwickeln lassen ohne Qualitätsverlust

Local modifiers: Linz, Wilhering, Leonding, Traun, Wels, Steyr, Mühlviertel, Oberösterreich, Österreich, DACH (remote).

### English (secondary, remote clients)

- software developer Linz Austria · app developer Austria · React Native developer Austria
- freelance full stack developer Austria · web app development Upper Austria

### Where the keywords now live

| Page element | DE | EN |
|---|---|---|
| `<title>` home | Softwareentwickler Linz – Apps, Web-Apps & Websites \| Joachim Pürcher | App & Web Developer in Linz, Austria \| Joachim Pürcher |
| meta description | Native Apps, Web-Apps und Websites aus Linz … kostenrealistisch, Praxiswissen, Qualität aus dem Herzen Österreichs | same message |
| `<h1>` (sr-only, hero) | Fullstack-Entwickler für native Apps, Web-Apps und Websites in Linz, Oberösterreich | same |
| About text | Wilhering bei Linz, native Apps / Web-Apps / Websites, Oberösterreich + remote, kostenrealistisch, "nicht die günstigste Entwicklerstunde …", win-win | same |
| Skills intro | Fachwissen, Praxiswissen, günstig ohne Qualitätsverlust | same |
| Projects intro | native Apps, Web-Apps, Websites, Backends, entwickelt in Linz | same |
| Contact intro | lokaler Entwickler Linz und Umgebung, remote Österreich, win-win, kostenrealistisch, Qualität aus dem Herzen Österreichs | same |
| JSON-LD | `ProfessionalService` with 4 services, areaServed, phone, address | same |
| llms.txt | services, pricing philosophy, location, contact | English |

---

## 4. GEO strategy

AI engines pick sources that (a) state facts about an entity unambiguously, (b) are consistent across the web, (c) are easy to parse. What the site now provides:

1. **Entity graph in JSON-LD**: `Person` (#person) ↔ `ProfessionalService` (#business) ↔ `WebSite` (#website), linked by `@id`. The business carries `areaServed`, `hasOfferCatalog` (4 services), telephone, address, `sameAs` (LinkedIn, GitHub). The person carries `hasOccupation`, `worksFor`, `knowsAbout` with service terms, not only tech names.
2. **llms.txt** rewritten as an answer sheet: who, services, why (pricing philosophy, retail background), where, contact. This is the file AI crawlers read first.
3. **Quotable sentences** in visible copy: "Nicht die günstigste Entwicklerstunde macht den Preis, sondern was in dieser Stunde geleistet wird." AI answers like to quote a sentence like that verbatim.
4. **Snippet permissions**: `max-snippet:-1` and `max-image-preview:large` in the robots meta, so Google may use full passages in AI Overviews.
5. **Crawler access**: robots.txt allows all user agents, including GPTBot, ClaudeBot, PerplexityBot, Google-Extended.
6. **Consistent NAP** (name, address, phone) in imprint, JSON-LD and llms.txt. The same strings must be used on LinkedIn, Google Business Profile and directories (see §6).

---

## 5. Changes made (this session)

| File | Change |
|---|---|
| `messages/de.json`, `messages/en.json` | `meta`: new title, description, jobTitle, heroHeading, imprintDescription; new keys `serviceName`, `serviceDescription`, `services.*`, `ogTagline`, `ogLocation`. Visible texts: `aboutMe.text`, `skills.introduction`, `projects.text`, `contactMe.mainTextFirst` |
| `src/helpers/seo.ts` | `CONTACT` constant (phone, address), `AREA_SERVED`, `KNOWS_ABOUT_EXTRA`, per-locale OG alt text, Person JSON-LD fixed image path + telephone + occupation + worksFor, new `professionalServiceJsonLd()` |
| `src/app/[locale]/layout.tsx` | Renders the `ProfessionalService` JSON-LD, adds `robots` (googleBot snippet/preview) and `geo.region` / `geo.placename` meta |
| `scripts/generate-og.mjs` | Reads `pic-hero_2.png`, tagline and location from `messages/*.json` |
| `public/og/de.png`, `public/og/en.png` | Regenerated: "Softwareentwickler · Native Apps · Web-Apps · Websites · Linz, Oberösterreich" |
| `public/llms.txt` | Rewritten for the service positioning |

Verified: `npm run lint` clean, `npm run build` + postbuild clean, exported HTML contains the new title, description, robots, geo meta, three JSON-LD objects per page.

Nothing was committed.

---

## 6. Open items (not code, or your decision)

Ranked by expected effect on client enquiries.

1. **Google Business Profile** (free, biggest local lever). Category "Softwareunternehmen" / "Website-Designer", address Wilhering or service-area business for Linz/Oberösterreich, same phone and website. Without it you will not appear in the Google map pack for "App Entwickler Linz". Collect 3–5 reviews from Pulsify and former colleagues/clients.
2. **Job-seeker wording in the About notes**: "Verfügbar ab Jänner 2027" and "Offen für Homeoffice" contradict "contact me for your project now". Suggest e.g. "Neue Projekte ab Jänner 2027" and "Vor Ort in Linz oder remote". Design element, so I left it to you.
3. **Imprint for a commercial offer**: once you sell services, Austrian law (§5 ECG, §14 UGB, §25 MedienG) requires more than a private imprint: Gewerbe (IT-Dienstleistung, freies Gewerbe), Gewerbebehörde, WKO membership, UID if applicable. Check with WKO Oberösterreich (Gründerservice is free).
4. **Directory citations with identical NAP**: WKO Firmen A-Z, Herold, FirmenABC, Clutch/Sortlist (for app agencies), LinkedIn headline ("Softwareentwickler für Apps, Web-Apps & Websites · Linz"). Consistency across these is what AI engines use to trust the entity.
5. **Content pages** (the only way to rank for question keywords and to be cited for them): "Was kostet eine App in Österreich?", "Native App oder Web-App?", "Ablauf eines Projekts". Each needs a visible page; with it, `FAQPage`/`Article` JSON-LD becomes legitimate. This conflicts with "design identical to the Angular original", so it is a decision: new route(s) under `/[locale]/leistungen/` with the existing legal-page layout would fit without touching the home design.
6. **Case study format for Pulsify**: a client-facing problem → solution → result text (numbers if allowed) converts far better than implementation details. Keep the technical text for developers below it.
7. **Search Console + Bing Webmaster Tools**: submit the sitemap, watch which queries bring impressions, and adjust titles after 6–8 weeks of data.
8. **Performance**: `hero-bg.webp` is 912 KB; LCP on mobile suffers. A 1600 px wide version at quality 70 would land around 150–250 KB. Core Web Vitals are a ranking factor for local queries too.
9. **OG portrait**: the generator now uses `pic-hero_2.png` (same bytes as the deleted `pic-hero.png`). If you want the current `pic-hero.jpg` instead, the script needs the JPEG mime type.

---

## 7. How to measure

- Search Console: impressions/clicks for "softwareentwickler linz", "app entwickler linz", "webentwickler linz" (expect first impressions after 2–4 weeks, positions after 2–3 months).
- Google Business Profile insights: calls, website clicks, direction requests.
- GEO check once a month: ask ChatGPT, Perplexity and Google AI Mode "App Entwickler in Linz empfehlen" and note whether the site is cited.
- Contact-form enquiries that mention a project (not a job).
