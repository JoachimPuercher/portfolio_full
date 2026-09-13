"use client";

/* eslint-disable @next/next/no-img-element -- plain <img> keeps the image sizing of the Angular templates */
import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { cn } from "@/helpers/cn";
import Footer from "@/components/shared/footer/Footer";
import FormSentInfo from "@/components/shared/ui/form-sent-info/FormSentInfo";
import MyLogoSticker from "@/components/shared/ui/my-logo-sticker/MyLogoSticker";
import ContactMeForm from "./ContactMeForm";
import styles from "./ContactMe.module.css";

/**
 * Angular: main/contact-me.
 * Contact text + form, footer, and the result card that slides up over a dark mask.
 * Timings: card shown at once, slides in after 100 ms, hand waves after 350 ms;
 * closing reverses and removes the card after 350 ms. Page scroll is locked meanwhile.
 */
export default function ContactMe({ id }: { id?: string }) {
  const t = useTranslations("contactMe");
  const [messageMenuOpen, setMessageMenuOpen] = useState(false);
  const [showMessageMenu, setShowMessageMenu] = useState(false);
  const [waveMessageHand, setWaveMessageHand] = useState(false);
  const [overlayOpen, setOverlayOpen] = useState(false);
  const [sentMessage, setSentMessage] = useState(false);
  const timers = useRef<number[]>([]);

  useEffect(() => {
    const pending = timers.current;
    return () => {
      pending.forEach((id) => window.clearTimeout(id));
      document.documentElement.classList.remove("no-scroll");
    };
  }, []);

  const later = (fn: () => void, ms: number) => timers.current.push(window.setTimeout(fn, ms));

  const openMessageMenu = () => {
    setOverlayOpen(true);
    document.documentElement.classList.add("no-scroll");
    setMessageMenuOpen(true);
    later(() => setShowMessageMenu(true), 100);
    later(() => setWaveMessageHand(true), 350);
  };

  const closeMessageMenu = () => {
    setWaveMessageHand(false);
    setShowMessageMenu(false);
    later(() => {
      setMessageMenuOpen(false);
      setOverlayOpen(false);
      document.documentElement.classList.remove("no-scroll");
    }, 350);
  };

  return (
    <div id={id} className={styles.overlayWrapper}>
      <div className={styles.sectionWrapper}>
        <section className={cn("section-padding inner-section-two-col max-content-width", styles.section)}>
          <div className={styles.left}>
            <div className={cn(styles.stickerWrapperSmall, "display-hide-over-1250px-width")}>
              <MyLogoSticker
                stickerImgPath="/images/contact-me/contact_sticker.webp"
                logoImgPath="/images/meinlogo.svg"
                textPathId="textCircle-contact-small"
              />
            </div>
            <div className={styles.headerWrapper} data-aos="fade-right" data-aos-anchor-placement="top-bottom">
              <div>
                <span className="section-header-small-text-typo">{t("headerWords")}</span>
                <div>
                  <h2 className="section-header-typo">{t("header")}</h2>
                </div>
              </div>
              <div>
                <p className="section-text-typo">{t("mainTextFirst")}</p>
                <p className="section-text-typo">{t("mainTextSecond")}</p>
              </div>
              <img
                className="contact-arrow display-hide-1250px-width"
                src="/images/contact-me/contact_arrow.png"
                alt="contact arrow"
                loading="lazy"
              />
            </div>
          </div>

          <div data-aos="fade-left" data-aos-anchor-placement="top-bottom">
            <div className={cn(styles.stickerWrapper, "display-hide-1250px-width")} data-aos="fade" data-aos-delay="400">
              <MyLogoSticker
                stickerImgPath="/images/contact-me/contact_sticker.webp"
                logoImgPath="/images/meinlogo.svg"
                textPathId="textCircle-contact"
              />
            </div>
            <ContactMeForm
              onSuccess={() => {
                setSentMessage(true);
                openMessageMenu();
              }}
              onError={() => {
                setSentMessage(false);
                openMessageMenu();
              }}
            />
          </div>
        </section>
        <Footer showTop />
      </div>

      <div className={cn(styles.sentWrapper, messageMenuOpen && styles.showMenu, showMessageMenu && styles.openMenu)}>
        <FormSentInfo sentSuccess={sentMessage} showHand={waveMessageHand} onClose={closeMessageMenu} />
      </div>

      {overlayOpen && <div className={styles.overlayMask} onClick={closeMessageMenu} />}
    </div>
  );
}
