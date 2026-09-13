import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { asLocale } from "@/i18n/routing";
import { buildPageMetadata } from "@/helpers/seo";
import { SECTION_IDS } from "@/helpers/scroll";
import HeroSection from "@/components/main/hero-section/HeroSection";
import AboutMe from "@/components/main/about-me/AboutMe";
import SkillSet from "@/components/main/skill-set/SkillSet";
import MyFrontendProjects from "@/components/main/my-frontend-projects/MyFrontendProjects";
import ColleaguesThoughts from "@/components/main/colleagues-thoughts/ColleaguesThoughts";
import ContactMe from "@/components/main/contact-me/ContactMe";

export async function generateMetadata({ params }: PageProps<"/[locale]">): Promise<Metadata> {
  const locale = asLocale((await params).locale);
  const t = await getTranslations({ locale, namespace: "meta" });
  return buildPageMetadata({ locale, path: "", title: t("title"), absoluteTitle: true, description: t("description") });
}

/** Angular: main/main (the one-page home with all sections and their anchor ids). */
export default async function HomePage({ params }: PageProps<"/[locale]">) {
  setRequestLocale(asLocale((await params).locale));

  return (
    <main>
      <HeroSection id={SECTION_IDS.hero} />
      <AboutMe id={SECTION_IDS.aboutMe} />
      <SkillSet id={SECTION_IDS.skills} />
      <MyFrontendProjects id={SECTION_IDS.projects} />
      <ColleaguesThoughts id="thoughts-section" />
      <ContactMe id={SECTION_IDS.contact} />
    </main>
  );
}
