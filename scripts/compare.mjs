/**
 * Visual comparison: Angular original vs. Next.js port.
 *
 *   Angular:  cd <angular project> && npx ng serve --port 4200
 *   Next:     npm run build && npx next start -p 3000
 *   Compare:  npm run compare            (all viewports, German)
 *             npm run compare -- --only=390x844,1920x1080 --lang=en
 *
 * Takes viewport screenshots per section (full-page shots would break the 100dvh
 * layouts), with CSS animations fast-forwarded, then writes pixel diffs and
 * compare/report.html. Uses the installed Google Chrome (no browser download).
 */
import { chromium } from "playwright";
import fs from "node:fs/promises";
import path from "node:path";
import { PNG } from "pngjs";
import pixelmatch from "pixelmatch";

const ANGULAR = process.env.ANGULAR_URL ?? "http://localhost:4200";
const NEXT = process.env.NEXT_URL ?? "http://localhost:3000";
const OUT = path.resolve("compare");

const args = Object.fromEntries(
  process.argv.slice(2).map((a) => {
    const [k, v] = a.replace(/^--/, "").split("=");
    return [k, v ?? "true"];
  }),
);
const LANG = args.lang === "en" ? "en" : "de";

const VIEWPORTS = [
  { name: "1920x1080", width: 1920, height: 1080 },
  { name: "1366x768", width: 1366, height: 768 },
  { name: "1100x900", width: 1100, height: 900 },
  { name: "800x1000", width: 800, height: 1000 },
  { name: "500x900", width: 500, height: 900 },
  { name: "390x844", width: 390, height: 844, isMobile: true, hasTouch: true },
  { name: "900x500-landscape", width: 900, height: 500, isMobile: true, hasTouch: true },
].filter((v) => !args.only || args.only.split(",").includes(v.name));

/** A scene = page + optional scroll target. `first` = first child of the section root. */
const SCENES = [
  { name: "home-1-hero", page: "home", angular: "#hero-section", next: "#hero-section" },
  { name: "home-2-about", page: "home", angular: "#about-me-section", next: "#about-me-section" },
  { name: "home-3-skills", page: "home", angular: "#skills-section", next: "#skills-section" },
  { name: "home-4-projects", page: "home", angular: "#projects-section", next: "#projects-section" },
  { name: "home-5-thoughts", page: "home", angular: "app-colleagues-thoughts", next: "#thoughts-section" },
  { name: "home-6-contact", page: "home", angular: "#contact-me-section", next: "#contact-me-section" },
  { name: "home-7-bottom", page: "home", bottom: true },
  { name: "imprint-1-top", page: "imprint" },
  { name: "imprint-2-bottom", page: "imprint", bottom: true },
  { name: "datasave-1-top", page: "data-save" },
  { name: "datasave-2-bottom", page: "data-save", bottom: true },
  { name: "project-join", page: "project", nextClicks: 0, slug: "join" },
  { name: "project-simplify", page: "project", nextClicks: 2, slug: "simplify" },
];

const URLS = {
  home: { angular: "/", next: `/${LANG}` },
  imprint: { angular: "/imprint", next: `/${LANG}/imprint` },
  "data-save": { angular: "/data-save", next: `/${LANG}/data-save` },
  project: { angular: "/project-details", next: (slug) => `/${LANG}/projects/${slug}` },
};

const FREEZE_CSS = "*{scroll-behavior:auto !important;caret-color:transparent !important}";
const wait = (ms) => new Promise((r) => setTimeout(r, ms));

async function openPage(browser, viewport, app) {
  const context = await browser.newContext({
    viewport: { width: viewport.width, height: viewport.height },
    isMobile: viewport.isMobile ?? false,
    hasTouch: viewport.hasTouch ?? false,
    deviceScaleFactor: 1,
    reducedMotion: "no-preference",
  });
  if (app === "angular") {
    await context.addInitScript((lang) => localStorage.setItem("usedLang", lang), LANG);
  }
  return { context, page: await context.newPage() };
}

async function goto(page, url) {
  await page.goto(url, { waitUntil: "networkidle" });
  await page.addStyleTag({ content: FREEZE_CSS });
  await wait(5500); // hero intro wave (~4.4 s) + roll-out button settle
}

async function scrollTo(page, scene, app) {
  if (scene.bottom) {
    await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight));
  } else if (scene[app]) {
    await page.evaluate((sel) => {
      const el = document.querySelector(sel);
      (el?.firstElementChild ?? el)?.scrollIntoView({ block: "start" });
    }, scene[app]);
  } else {
    await page.evaluate(() => window.scrollTo(0, 0));
  }
  await wait(1800); // AOS: 1000 ms duration + up to 400 ms delay
}

function diff(aPath, bPath, outPath) {
  return Promise.all([fs.readFile(aPath), fs.readFile(bPath)]).then(async ([a, b]) => {
    const A = PNG.sync.read(a);
    const B = PNG.sync.read(b);
    const width = Math.min(A.width, B.width);
    const height = Math.min(A.height, B.height);
    const crop = (img) => {
      if (img.width === width && img.height === height) return img.data;
      const out = new PNG({ width, height });
      PNG.bitblt(img, out, 0, 0, width, height, 0, 0);
      return out.data;
    };
    const D = new PNG({ width, height });
    const changed = pixelmatch(crop(A), crop(B), D.data, width, height, { threshold: 0.12 });
    await fs.writeFile(outPath, PNG.sync.write(D));
    return +((changed / (width * height)) * 100).toFixed(2);
  });
}

async function run() {
  await fs.mkdir(OUT, { recursive: true });
  const browser = await chromium.launch({ channel: "chrome" });
  const results = [];

  for (const viewport of VIEWPORTS) {
    const dir = path.join(OUT, LANG, viewport.name);
    await fs.mkdir(dir, { recursive: true });

    for (const app of ["angular", "next"]) {
      const { context, page } = await openPage(browser, viewport, app);
      const base = app === "angular" ? ANGULAR : NEXT;
      let current = "";

      for (const scene of SCENES) {
        const route = URLS[scene.page][app];
        const url = base + (typeof route === "function" ? route(scene.slug) : route);
        const key = `${url}#${scene.nextClicks ?? ""}`;
        if (key !== current) {
          await goto(page, url);
          if (app === "angular" && scene.nextClicks) {
            for (let i = 0; i < scene.nextClicks; i++) {
              await page.locator(".next-wrapper").first().click();
              await wait(600);
            }
          }
          current = key;
        }
        await scrollTo(page, scene, app);
        await page.screenshot({ path: path.join(dir, `${scene.name}.${app}.png`), animations: "disabled" });
      }
      await context.close();
    }

    for (const scene of SCENES) {
      const a = path.join(dir, `${scene.name}.angular.png`);
      const b = path.join(dir, `${scene.name}.next.png`);
      const mismatch = await diff(a, b, path.join(dir, `${scene.name}.diff.png`));
      results.push({ lang: LANG, viewport: viewport.name, scene: scene.name, mismatch });
      console.log(`${LANG} ${viewport.name.padEnd(18)} ${scene.name.padEnd(18)} ${String(mismatch).padStart(6)} %`);
    }
  }

  await browser.close();
  await fs.writeFile(path.join(OUT, `results-${LANG}.json`), JSON.stringify(results, null, 2));
  await writeReport(results);
}

async function writeReport(results) {
  const rows = results
    .map((r) => {
      const rel = `${r.lang}/${r.viewport}/${r.scene}`;
      const tone = r.mismatch < 1 ? "#2e7d32" : r.mismatch < 5 ? "#b26a00" : "#c62828";
      return `<tr><td>${r.viewport}</td><td>${r.scene}</td><td style="color:${tone};font-weight:700">${r.mismatch}%</td>
<td><img loading="lazy" src="${rel}.angular.png"></td><td><img loading="lazy" src="${rel}.next.png"></td><td><img loading="lazy" src="${rel}.diff.png"></td></tr>`;
    })
    .join("\n");
  const html = `<!doctype html><meta charset="utf-8"><title>Angular vs Next – ${LANG}</title>
<style>body{font:14px system-ui;margin:16px}table{border-collapse:collapse}td,th{border:1px solid #ddd;padding:4px;vertical-align:top}img{width:320px}</style>
<h1>Angular (links) vs. Next.js (Mitte) – Pixel-Diff (rechts), Sprache ${LANG}</h1>
<table><tr><th>Viewport</th><th>Szene</th><th>Abweichung</th><th>Angular</th><th>Next</th><th>Diff</th></tr>${rows}</table>`;
  await fs.writeFile(path.join(OUT, `report-${LANG}.html`), html);
  console.log(`report: ${path.join(OUT, `report-${LANG}.html`)}`);
}

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
