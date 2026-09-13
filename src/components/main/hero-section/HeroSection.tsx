"use client";

/* eslint-disable @next/next/no-img-element -- plain <img> keeps the image sizing of the Angular templates */
import { useState } from "react";
import { useTranslations } from "next-intl";
import { cn } from "@/helpers/cn";
import { SOCIAL_LINKS } from "@/data/social-links";
import Header from "@/components/shared/header/header/Header";
import RollOutButton from "@/components/shared/ui/roll-out-button/RollOutButton";
import MainButton from "@/components/shared/ui/main-button/MainButton";
import CircleLink from "@/components/shared/ui/circle-link/CircleLink";
import LetterStack, { type LetterAnimation } from "./LetterStack";
import { useHeroIntroAnimation } from "./useHeroIntroAnimation";
import styles from "./HeroSection.module.css";

interface HeroSectionProps {
  id?: string;
}

function ProfilePicture({ className }: { className: string }) {
  const [profilHovered, setProfilHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setProfilHovered(true)}
      onMouseLeave={() => setProfilHovered(false)}
      className={cn(styles.picWrapper, className)}
    >
      <img src="/images/hero-section/pic-hero.png" alt="profil picture" fetchPriority="high" />
      <span>
        Joachim <span>{profilHovered ? ":D" : ":)"}</span>
      </span>
    </div>
  );
}

/**
 * Angular: main/hero-section.
 * Full-screen hero: header, "Hello world" roll-out button, the animated
 * "Frontend Developer" letters, polaroid picture, contact button and social links.
 * SEO: the letters are decorative (aria-hidden); a visually hidden <h1> carries the text.
 */
export default function HeroSection({ id }: HeroSectionProps) {
  const t = useTranslations("hero");
  const tMeta = useTranslations("meta");
  const frontendLast = t.raw("mainSingle.frontendLast") as string[];
  const developer = t.raw("mainSingle.developer") as string[];

  const {
    fLetterHovered,
    setFLetterHovered,
    frontLetterHovered,
    setFrontLetterHovered,
    devLetterHovered,
    setDevLetterHovered,
    showAllLetters,
    startAnimation,
  } = useHeroIntroAnimation(frontendLast.length, developer.length);

  const anim = (...list: (LetterAnimation | false)[]) => list.filter(Boolean) as LetterAnimation[];

  return (
    <div id={id} className={styles.background}>
      <section id="hero-normal-link" className={cn("max-content-width", styles.section)}>
        <h1 className="sr-only">{tMeta("heroHeading")}</h1>
        <div className={styles.headerWrapper}>
          <Header onLogoClick={startAnimation} />
        </div>

        <div className={styles.mainWrapper}>
          <div className={styles.rollOutWrapper}>
            <RollOutButton
              textNormal={t("hello")}
              textHover={t("helloHover")}
              imgPath="/images/hero-section/waving_hand.svg"
              linkHref="about-me-section"
              buttonType="hero"
              animateType="hero"
              externalLink={false}
            />
          </div>

          <div className={styles.mainTextWrapper} aria-hidden="true" data-nosnippet>
            <div className={styles.frontendWrapper} onMouseLeave={() => setFrontLetterHovered(null)}>
              <div>
                <LetterStack
                  letter={t("mainSingle.frontendFirst")}
                  animations={anim(fLetterHovered && "upper", showAllLetters && "upper")}
                  onEnter={() => {
                    setFLetterHovered(true);
                    setFrontLetterHovered(null);
                  }}
                  onLeave={() => setFLetterHovered(false)}
                />
                {frontendLast.map((letter, i) => (
                  <LetterStack
                    key={`front-${i}`}
                    letter={letter}
                    animations={anim(frontLetterHovered === i && "lower", showAllLetters && "upper")}
                    onEnter={() => setFrontLetterHovered(i)}
                  />
                ))}
              </div>
              <ProfilePicture className="display-hide-550-width" />
            </div>

            <div className={styles.devWrapper} onMouseLeave={() => setDevLetterHovered(null)}>
              {developer.map((letter, i) => (
                <LetterStack
                  key={`dev-${i}`}
                  letter={letter}
                  animations={anim(devLetterHovered === i && "upper", showAllLetters && "upper")}
                  onEnter={() => setDevLetterHovered(i)}
                />
              ))}
            </div>
          </div>

          <MainButton variant="light" href="#contact-me-section" className="ml-auto">
            {t("touch")}
          </MainButton>
        </div>

        <ProfilePicture className="display-flex-mobile550-width" />

        <div className={styles.socialLinks}>
          {SOCIAL_LINKS.map((link) => (
            <CircleLink key={link.name} linkHref={link.linkHref} imgPath={link.imgPath} imgAltText={link.imgAltText} />
          ))}
        </div>
      </section>
    </div>
  );
}
