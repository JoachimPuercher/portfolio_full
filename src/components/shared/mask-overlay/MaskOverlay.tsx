/* eslint-disable @next/next/no-img-element -- plain <img> keeps the image sizing of the Angular templates */
import LogoSvg from "@/components/shared/ui/my-logo/LogoSvg";
import styles from "./MaskOverlay.module.css";

/**
 * Angular: shared/components/mask-overlay.
 * Full-screen "turn your device" gate for small landscape screens (pure CSS media query).
 */
export default function MaskOverlay() {
  return (
    <section className={styles.overlay} aria-hidden="true">
      <img className={styles.rotateLogo} src="/images/misc/rotate-device.png" alt="rotate phone logo" />
      <div>Turn your device</div>
      <LogoSvg className={styles.myLogo} pathClassName="fill-main-blue" />
    </section>
  );
}
