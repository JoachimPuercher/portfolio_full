import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { asLocale } from "@/i18n/routing";
import { getProjectBySlug, PROJECT_SLUGS } from "@/data/projects";
import { breadcrumbJsonLd, buildPageMetadata, localizedUrl, projectJsonLd, SITE_NAME } from "@/helpers/seo";
import JsonLd from "@/components/shared/seo/JsonLd";
import ProjectDetail from "@/components/main/my-frontend-projects/project-detail/ProjectDetail";

/** Only the known projects exist; everything else is a 404. */
export const dynamicParams = false;

export function generateStaticParams() {
  return PROJECT_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps<"/[locale]/projects/[slug]">): Promise<Metadata> {
  const { locale: rawLocale, slug } = await params;
  const locale = asLocale(rawLocale);
  const project = getProjectBySlug(slug);
  if (!project) return {};

  const t = await getTranslations({ locale, namespace: "projects.projectDetails" });
  const tMeta = await getTranslations({ locale, namespace: "meta" });
  const name = t(`${project.key}.header`);

  return buildPageMetadata({
    locale,
    path: `/projects/${slug}`,
    title: tMeta("projectTitle", { name }),
    description: t(`${project.key}.descText`),
  });
}

/** Angular route "/project-details" (project chosen via service state) -> one page per project. */
export default async function ProjectPage({ params }: PageProps<"/[locale]/projects/[slug]">) {
  const { locale: rawLocale, slug } = await params;
  const locale = asLocale(rawLocale);
  setRequestLocale(locale);

  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const t = await getTranslations({ locale, namespace: "projects" });
  const name = t(`projectDetails.${project.key}.header`);

  return (
    <>
      <ProjectDetail project={project} />
      <JsonLd
        data={[
          projectJsonLd(project, locale, name, t(`projectDetails.${project.key}.descText`)),
          breadcrumbJsonLd([
            { name: SITE_NAME, url: localizedUrl(locale) },
            { name: t("header"), url: `${localizedUrl(locale)}#projects-section` },
            { name, url: localizedUrl(locale, `/projects/${slug}`) },
          ]),
        ]}
      />
    </>
  );
}
