/* eslint-disable @next/next/no-img-element -- plain <img> keeps the image sizing of the Angular templates */
import { useTranslations } from "next-intl";
import { cn } from "@/helpers/cn";
import { STICKER_LINKS } from "@/data/social-links";
import CommentSticker from "./CommentSticker";
import styles from "./ColleaguesThoughts.module.css";

const COLLEAGUES = [
  { key: "first", bg: "/images/thoughts/sticker_bg.png", hover: "/images/thoughts/sticker_lines.png", link: undefined, delay: "100" },
  { key: "second", bg: "/images/thoughts/sticker_bg_2.png", hover: "/images/thoughts/sticker_lines_2.png", link: STICKER_LINKS.dominic, delay: "200" },
  { key: "third", bg: "/images/thoughts/sticker_bg_3.png", hover: "/images/thoughts/sticker_lines.png", link: STICKER_LINKS.eduard, delay: "300" },
] as const;

/**
 * Angular: main/colleagues-thoughts.
 * Heading with the animated arrow and three fanned testimonial stickers.
 */
export default function ColleaguesThoughts({ id }: { id?: string }) {
  const t = useTranslations("thoughts");

  return (
    <div id={id} className={styles.background}>
      <div className="max-content-width">
        <section className={cn("section-padding inner-section-two-col", styles.sectionPadding)}>
          <div />
          <div className={styles.headerWrapper} data-aos="fade-left">
            <div className={styles.imgWrapper}>
              <img src="/images/thoughts/blue_arrow.png" alt="underline" loading="lazy" />
              <span className="section-header-small-text-typo">{t("words")}</span>
            </div>
            <h2 className="section-header-typo">{t("header")}</h2>
          </div>
        </section>

        <section className={cn("section-padding inner-section-two-col", styles.sectionPadding, styles.stickerContainer)}>
          {COLLEAGUES.map((c) => (
            <div key={c.key} data-aos="fade" data-aos-delay={c.delay} data-aos-anchor-placement="top-bottom">
              <CommentSticker
                bgImgPath={c.bg}
                hoverImgPath={c.hover}
                comment={t(`colleagues.${c.key}.comment`)}
                name={t(`colleagues.${c.key}.name`)}
                role={t(`colleagues.${c.key}.role`)}
                profileLink={c.link}
                profileLabel={t("profile")}
              />
            </div>
          ))}
        </section>
      </div>
    </div>
  );
}
