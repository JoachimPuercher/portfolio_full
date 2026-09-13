/**
 * Generates the static Open Graph images public/og/de.png and public/og/en.png
 * (1200x630). Run once and commit the result:  npm run og
 *
 * Static export cannot serve Next's dynamic opengraph-image route with a proper
 * content type on Apache, so the same layout is rendered here with next/og at
 * development time. Re-run after changing meta.jobTitle in messages/*.json.
 */
// `next/og` is not resolvable from plain Node ESM; use the compiled Node build it wraps.
import { ImageResponse } from "next/dist/compiled/@vercel/og/index.node.js";
import { createElement as h } from "react";
import { readFile, writeFile, mkdir } from "node:fs/promises";
import { join } from "node:path";

const ROOT = process.cwd();
const FONTS = join(ROOT, "scripts", "og", "fonts");
const OUT_DIR = join(ROOT, "public", "og");
const GREETING = { de: "Hallo Welt, ich bin", en: "Hello world, I am" };

const [regular, bold, kalam, portrait] = await Promise.all([
  readFile(join(FONTS, "BricolageGrotesque-Regular.ttf")),
  readFile(join(FONTS, "BricolageGrotesque-Bold.ttf")),
  readFile(join(FONTS, "Kalam-Bold.ttf")),
  readFile(join(ROOT, "public", "images", "hero-section", "pic-hero.png")),
]);
const portraitSrc = `data:image/png;base64,${portrait.toString("base64")}`;

await mkdir(OUT_DIR, { recursive: true });

for (const locale of ["de", "en"]) {
  const messages = JSON.parse(await readFile(join(ROOT, "messages", `${locale}.json`), "utf8"));
  const jobTitle = messages.meta.jobTitle;

  const element = h(
    "div",
    {
      style: {
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 90px",
        background: "linear-gradient(135deg, #0e1013 0%, #1b2a8f 60%, #3355ff 100%)",
        color: "#f8f9fa",
        fontFamily: "Bricolage",
      },
    },
    h(
      "div",
      { style: { display: "flex", flexDirection: "column", maxWidth: 700 } },
      h("div", { style: { fontSize: 34, color: "#f87a55" } }, GREETING[locale]),
      h("div", { style: { fontSize: 88, fontWeight: 700, lineHeight: 1.05, marginTop: 10 } }, "Joachim Pürcher"),
      h("div", { style: { fontSize: 58, fontWeight: 700, color: "#f7c518", marginTop: 14 } }, jobTitle),
      h("div", { style: { fontSize: 28, marginTop: 36, opacity: 0.9 } }, "React · Next.js · TypeScript · Angular"),
      h("div", { style: { fontSize: 26, marginTop: 10, opacity: 0.75 } }, "Wilhering / Linz, Austria · puercherjoachim.com"),
    ),
    h(
      "div",
      {
        style: {
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          background: "#f8f9fa",
          padding: "14px 14px 8px",
          transform: "rotate(8deg)",
          boxShadow: "0 20px 50px rgba(0,0,0,0.35)",
        },
      },
      h("img", { src: portraitSrc, width: 260, height: 260, style: { objectFit: "cover" } }),
      h("div", { style: { fontFamily: "Kalam", fontSize: 34, color: "#0e1013", marginTop: 6 } }, "Joachim :)"),
    ),
  );

  const response = new ImageResponse(element, {
    width: 1200,
    height: 630,
    fonts: [
      { name: "Bricolage", data: regular, style: "normal", weight: 400 },
      { name: "Bricolage", data: bold, style: "normal", weight: 700 },
      { name: "Kalam", data: kalam, style: "normal", weight: 700 },
    ],
  });

  const png = Buffer.from(await response.arrayBuffer());
  const file = join(OUT_DIR, `${locale}.png`);
  await writeFile(file, png);
  console.log(`og: wrote ${file} (${png.length} bytes)`);
}
