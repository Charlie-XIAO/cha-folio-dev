import { projectsSource } from "@/lib/source";
import {
  DocsBody,
  DocsDescription,
  DocsPage,
  DocsTitle,
} from "fumadocs-ui/page";
import { notFound } from "next/navigation";
import { createRelativeLink } from "fumadocs-ui/mdx";
import { getMDXComponents } from "@/mdx-components";
import { ChaFooter } from "@/components/ChaFooter";
import { ChaExternalCallout } from "@/components/ChaExternalCallout";

export default async function Page(props: {
  params: Promise<{ slug: string[] }>;
}) {
  const params = await props.params;
  const page = projectsSource.getPage(params.slug);
  if (!page) notFound();

  const MDXContent = page.data.body;

  return (
    <DocsPage
      toc={page.data.toc}
      full={page.data.full}
      footer={{ component: <ChaFooter type="docs" /> }}
      lastUpdate={page.data.lastModified}
      article={{ className: "gap-2" }}
    >
      <DocsTitle>{page.data.title}</DocsTitle>
      <DocsDescription>{page.data.description}</DocsDescription>
      <DocsBody>
        {page.data.href ? (
          <ChaExternalCallout pageType="project" href={page.data.href} />
        ) : (
          <MDXContent
            components={getMDXComponents({
              a: createRelativeLink(projectsSource, page),
            })}
          />
        )}
      </DocsBody>
    </DocsPage>
  );
}

export function generateStaticParams() {
  return projectsSource.generateParams();
}

export async function generateMetadata(props: {
  params: Promise<{ slug: string[] }>;
}) {
  const params = await props.params;
  const page = projectsSource.getPage(params.slug);
  if (!page) notFound();

  return {
    title: page.data.title,
    description: page.data.description,
  };
}
