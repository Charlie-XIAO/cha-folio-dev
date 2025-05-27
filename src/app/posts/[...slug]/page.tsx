import { postsSource } from "@/lib/source";
import {
  DocsPage,
  DocsBody,
  DocsDescription,
  DocsTitle,
} from "fumadocs-ui/page";
import { notFound } from "next/navigation";
import { createRelativeLink } from "fumadocs-ui/mdx";
import { getMDXComponents } from "@/mdx-components";
import { ChaFooter } from "@/components/ChaFooter";
import { Callout } from "fumadocs-ui/components/callout";
import { Link } from "fumadocs-core/framework";
import { ChaGiscus } from "@/components/ChaGiscus";
import { ChaPostFrontmatter } from "@/components/ChaPostFrontmatter";
import { computePost } from "@/lib/posts.data";

export default async function Page(props: {
  params: Promise<{ slug: string[] }>;
}) {
  const params = await props.params;
  const page = postsSource.getPage(params.slug);
  if (!page) notFound();

  const MDXContent = page.data.body;
  const computedData = computePost(page);

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

      {page.data.href === undefined && computedData !== undefined && (
        <ChaPostFrontmatter
          className="mb-8"
          date={computedData.date}
          tags={page.data.tags}
          wordCount={computedData.wordCount}
          readingTime={computedData.readingTime}
        />
      )}

      <DocsBody>
        {page.data.href ? (
          <Callout>
            <p>Please visit the following link for the post:</p>
            <p>
              <Link
                href={page.data.href}
                target="_blank"
                rel="noopener noreferrer"
              >
                {page.data.href}
              </Link>
            </p>
          </Callout>
        ) : (
          <MDXContent
            components={getMDXComponents({
              a: createRelativeLink(postsSource, page),
            })}
          />
        )}
      </DocsBody>
      <div className="mt-10">
        <ChaGiscus />
      </div>
    </DocsPage>
  );
}

export async function generateStaticParams() {
  return postsSource.generateParams();
}

export async function generateMetadata(props: {
  params: Promise<{ slug: string[] }>;
}) {
  const params = await props.params;
  const page = postsSource.getPage(params.slug);
  if (!page) notFound();

  return {
    title: page.data.title,
    description: page.data.description,
  };
}
