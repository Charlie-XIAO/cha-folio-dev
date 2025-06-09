import { newsSource } from "@/lib/source";
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

export default async function Page(props: {
  params: Promise<{ slug: string[] }>;
}) {
  const params = await props.params;
  const page = newsSource.getPage(params.slug);
  if (!page) notFound();

  const MDXContent = page.data.body;

  return (
    <DocsPage
      toc={page.data.toc}
      full={page.data.full}
      breadcrumb={{ enabled: false }}
      footer={{ component: <ChaFooter type="docs" /> }}
      lastUpdate={page.data.lastModified}
      article={{ className: "gap-2" }}
    >
      <DocsTitle>{page.data.title}</DocsTitle>
      <DocsDescription>{page.data.description}</DocsDescription>
      <DocsBody>
        <MDXContent
          components={getMDXComponents({
            a: createRelativeLink(newsSource, page),
          })}
        />
      </DocsBody>
    </DocsPage>
  );
}

export function generateStaticParams() {
  return newsSource.generateParams();
}

export async function generateMetadata(props: {
  params: Promise<{ slug: string[] }>;
}) {
  const params = await props.params;
  const page = newsSource.getPage(params.slug);
  if (!page) notFound();

  return {
    title: page.data.title,
    description: page.data.description,
  };
}
