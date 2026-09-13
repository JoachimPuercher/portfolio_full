"use client";

/* eslint-disable @next/next/no-img-element -- plain <img> keeps the image sizing of the Angular templates */
import { useTranslations } from "next-intl";
import { Link, usePathname, useRouter } from "@/i18n/navigation";
import { SOCIAL_LINKS } from "@/data/social-links";
import { scrollToTop } from "@/helpers/scroll";
import MyLogo from "@/components/shared/ui/my-logo/MyLogo";
import RollOutButton from "@/components/shared/ui/roll-out-button/RollOutButton";

interface FooterProps {
  /** Angular @Input showTop: show the "TOP" icon next to the logo */
  showTop: boolean;
}

/**
 * Angular: shared/components/footer/footer.
 * Logo (+ TOP icon), copyright, legal link and the social roll-out links
 * (desktop row, and a separate row below 768px).
 */
export default function Footer({ showTop }: FooterProps) {
  const t = useTranslations("footer");
  const pathname = usePathname();
  const router = useRouter();

  /** Angular router.navigate(['/']): back to the plain home URL (drops the #fragment) and top. */
  const navigateToTop = () => {
    if (pathname === "/") {
      window.history.replaceState(null, "", window.location.pathname);
      scrollToTop();
    } else {
      router.push("/");
    }
  };

  const socialButton = (link: (typeof SOCIAL_LINKS)[number]) => (
    <RollOutButton
      textNormal={link.name}
      textHover={link.name}
      imgPath={link.imgPath}
      imgAlt={link.imgAltText}
      buttonType="link"
      animateType="link"
      linkHref={link.linkHref}
      externalLink
    />
  );

  return (
    <footer className="max-content-width flex w-full items-end justify-between px-[160px] pb-14 text-main-white mw-1350:px-[30px] mw-1250:w-[95dvw] mw-768:flex-col mw-768:items-center mw-768:justify-center mw-600:px-0 mw-420:px-2 mw-420:pt-2">
      <div className="mb-3 flex flex-col items-start justify-center gap-3 mw-768:mb-6 mw-768:w-full">
        <div className="flex flex-col items-start justify-center gap-3 mw-768:w-full mw-768:flex-row mw-768:items-center mw-768:justify-between mw-360:text-end">
          <div className="group/top relative block w-[60px] hover:cursor-portfolio-hover">
            <MyLogo />
            {showTop && (
              <svg
                onClick={navigateToTop}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    navigateToTop();
                  }
                }}
                role="button"
                tabIndex={0}
                aria-label="Top"
                width="800px"
                height="800px"
                viewBox="0 0 36 36"
                preserveAspectRatio="xMidYMid meet"
                xmlns="http://www.w3.org/2000/svg"
                className="absolute right-0 bottom-0 h-auto w-[45%]"
              >
                <path
                  className="fill-main-red transition-[fill] duration-[225ms] ease-in-out group-hover/top:fill-main-yellow"
                  d="M25.711 10.867L18.779.652c-.602-.885-1.558-.867-2.127.037l-6.39 10.141c-.569.904-.181 1.644.865 1.644H13V16a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2v-3.525h1.898c1.047 0 1.414-.723.813-1.608zM3.651 23.575H1.438c-.975 0-1.381-.712-1.381-1.401c0-.71.508-1.399 1.381-1.399h7.469c.874 0 1.381.689 1.381 1.399c0 .69-.406 1.401-1.381 1.401H6.696v10.189c0 1.016-.649 1.584-1.522 1.584s-1.522-.568-1.522-1.584V23.575zM10.396 28c0-4.222 2.841-7.471 6.982-7.471c4.079 0 6.983 3.351 6.983 7.471c0 4.201-2.821 7.471-6.983 7.471c-4.121 0-6.982-3.27-6.982-7.471zm10.798 0c0-2.456-1.279-4.67-3.816-4.67s-3.816 2.214-3.816 4.67c0 2.476 1.239 4.668 3.816 4.668c2.578 0 3.816-2.192 3.816-4.668zm4.433-5.644c0-.954.569-1.582 1.585-1.582h3.591c2.985 0 5.197 1.947 5.197 4.851c0 2.963-2.293 4.811-5.074 4.811h-2.253v3.329c0 1.016-.649 1.584-1.521 1.584c-.874 0-1.524-.568-1.524-1.584V22.356zm3.046 5.4h2.071c1.277 0 2.089-.934 2.089-2.151c0-1.219-.812-2.152-2.089-2.152h-2.071v4.303z"
                />
              </svg>
            )}
          </div>
          <span className="footer-font-bold">&#169; Joachim Pürcher 2025</span>
        </div>
        <Link href="/imprint" className="group relative mw-768:self-end">
          <span className="footer-font-bold text-main-white">{t("legal")}</span>
          <img
            src="/images/footer/footer_legal_underline.png"
            alt=""
            className="absolute top-1/2 left-1/2 w-[110px] -translate-x-1/2 -translate-y-1/2 transition-[clip-path] duration-150 ease-in [clip-path:inset(0_110px_0_0)] group-hover:[clip-path:inset(0_0_0_0)]"
          />
        </Link>
      </div>

      {SOCIAL_LINKS.map((link) => (
        <div key={link.name} className="display-hide-768px-width">
          {socialButton(link)}
        </div>
      ))}

      <div className="display-flex-mobile768-width mw-768:w-full mw-768:items-center mw-768:justify-between mw-390:flex-col">
        {SOCIAL_LINKS.map((link) => (
          <div key={link.name}>{socialButton(link)}</div>
        ))}
      </div>
    </footer>
  );
}
