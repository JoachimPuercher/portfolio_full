import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { getTranslations } from "next-intl/server";
import { asLocale } from "@/i18n/routing";

export const alt = "Joachim Pürcher – Frontend Developer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Open Graph / Twitter image per locale (the Angular site had none).
 * Satori needs TTF/OTF, so the original TTF fonts live in src/assets/og.
 */
export default async function OpengraphImage({ params }: { params: Promise<{ locale: string }> }) {
  const locale = asLocale((await params).locale);
  const t = await getTranslations({ locale, namespace: "meta" });

  const [bricolage, bricolageBold, kalam, portrait] = await Promise.all([
    readFile(join(process.cwd(), "src/assets/og/BricolageGrotesque-Regular.ttf")),
    readFile(join(process.cwd(), "src/assets/og/BricolageGrotesque-Bold.ttf")),
    readFile(join(process.cwd(), "src/assets/og/Kalam-Bold.ttf")),
    readFile(join(process.cwd(), "public/images/hero-section/pic-hero.png")),
  ]);
  const portraitSrc = `data:image/png;base64,${portrait.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 90px",
          background: "linear-gradient(135deg, #0e1013 0%, #1b2a8f 60%, #3355ff 100%)",
          color: "#f8f9fa",
          fontFamily: "Bricolage",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", maxWidth: 700 }}>
          <div style={{ fontSize: 34, color: "#f87a55" }}>{locale === "de" ? "Hallo Welt, ich bin" : "Hello world, I am"}</div>
          <div style={{ fontSize: 88, fontWeight: 700, lineHeight: 1.05, marginTop: 10 }}>Joachim Pürcher</div>
          <div style={{ fontSize: 58, fontWeight: 700, color: "#f7c518", marginTop: 14 }}>{t("jobTitle")}</div>
          <div style={{ fontSize: 28, marginTop: 36, opacity: 0.9 }}>React · Next.js · TypeScript · Angular</div>
          <div style={{ fontSize: 26, marginTop: 10, opacity: 0.75 }}>Wilhering / Linz, Austria · puercherjoachim.com</div>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            background: "#f8f9fa",
            padding: "14px 14px 8px",
            transform: "rotate(8deg)",
            boxShadow: "0 20px 50px rgba(0,0,0,0.35)",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element -- rendered by Satori, not the browser */}
          <img src={portraitSrc} width={260} height={260} alt="" style={{ objectFit: "cover" }} />
          <div style={{ fontFamily: "Kalam", fontSize: 34, color: "#0e1013", marginTop: 6 }}>Joachim :)</div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Bricolage", data: bricolage, style: "normal", weight: 400 },
        { name: "Bricolage", data: bricolageBold, style: "normal", weight: 700 },
        { name: "Kalam", data: kalam, style: "normal", weight: 700 },
      ],
    },
  );
}
