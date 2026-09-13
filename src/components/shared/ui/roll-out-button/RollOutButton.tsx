"use client";

/* eslint-disable @next/next/no-img-element -- plain <img> keeps the image sizing of the Angular templates */
import { useEffect, useRef, useState } from "react";
import { cn } from "@/helpers/cn";
import styles from "./RollOutButton.module.css";

type RollOutType = "hero" | "link";

/**
 * Angular built these class names by concatenation (animateType + '-hover', ...).
 * Explicit maps keep every class visible to tooling.
 */
const ANIMATE_CLASSES: Record<RollOutType, { hover: string; back: string; wrapper: string; logo: string; logoAnimate: string }> = {
  hero: {
    hover: styles.heroHover,
    back: styles.heroHoverBack,
    wrapper: styles.heroWrapper,
    logo: styles.heroLogo,
    logoAnimate: styles.heroLogoAnimate,
  },
  link: {
    hover: styles.linkHover,
    back: styles.linkHoverBack,
    wrapper: styles.linkWrapper,
    logo: styles.linkLogo,
    logoAnimate: styles.linkLogoAnimate,
  },
};

const BUTTON_CLASSES: Record<RollOutType, string> = {
  hero: styles.heroButton,
  link: styles.linkButton,
};

interface RollOutButtonProps {
  linkHref: string;
  imgPath: string;
  /** Alt text of the icon (Angular always used "waving hand logo") */
  imgAlt?: string;
  /** Already translated texts (Angular passed translation keys) */
  textNormal: string;
  textHover: string;
  buttonType: RollOutType;
  animateType: RollOutType;
  externalLink: boolean;
}

/**
 * Angular: shared/components/ui/roll-out-button.
 * Pill button that rolls out on hover: blue fill grows, text swaps, the icon spins in.
 * Used in the hero ("Hallo Welt" -> name) and in the footer (social links).
 */
export default function RollOutButton({
  linkHref,
  imgPath,
  imgAlt = "waving hand logo",
  textNormal,
  textHover,
  buttonType,
  animateType,
  externalLink,
}: RollOutButtonProps) {
  const [helloEnterAnimate, setHelloEnterAnimate] = useState(false);
  const [helloEnterText, setHelloEnterText] = useState(false);
  const timers = useRef<number[]>([]);

  useEffect(() => {
    const pending = timers.current;
    return () => pending.forEach((id) => window.clearTimeout(id));
  }, []);

  const later = (fn: () => void, ms: number) => {
    timers.current.push(window.setTimeout(fn, ms));
  };

  const a = ANIMATE_CLASSES[animateType];
  const rollClass = helloEnterAnimate ? a.hover : a.back;

  const onEnter = () => {
    later(() => setHelloEnterText(true), 150);
    setHelloEnterAnimate(true);
  };
  const onLeave = () => {
    later(() => setHelloEnterText(false), 150);
    setHelloEnterAnimate(false);
  };

  /** Touch devices: play the animation first, open the link after 1 s. */
  const visitExternLink = () => {
    later(() => window.open(linkHref, "_blank", "noopener,noreferrer"), 1000);
    later(() => setHelloEnterAnimate(false), 1000);
  };

  const button = (withMouseOut: boolean) => (
    <div
      onMouseOver={onEnter}
      onMouseOut={withMouseOut ? onLeave : undefined}
      className={cn(styles.standardButton, BUTTON_CLASSES[buttonType], styles.helloButton, rollClass)}
    >
      <span className={cn(styles.hideName, helloEnterText && styles.showName)}>{textHover}</span>
      <span className={cn(styles.hideName, !helloEnterText && styles.showName)}>{textNormal}</span>
      <div className={cn(styles.mask, helloEnterAnimate && styles.maskHover)} />
    </div>
  );

  return (
    <>
      <div className={rollClass}>
        <div className={a.wrapper}>
          <img className={helloEnterAnimate ? a.logoAnimate : a.logo} src={imgPath} alt={imgAlt} />
        </div>
      </div>

      {externalLink ? (
        <>
          <a href={linkHref} target="_blank" rel="noopener noreferrer" className="display-none-touch-device">
            {button(true)}
          </a>
          <div onClick={visitExternLink} className="display-block-touch-device">
            {button(false)}
          </div>
        </>
      ) : (
        <div>{button(true)}</div>
      )}
    </>
  );
}
