import { ChaHomePage } from "@/components/ChaHomePage";
import { homeSource } from "@/lib/source";
import { getMDXComponents } from "@/mdx-components";
import { createRelativeLink } from "fumadocs-ui/mdx";
import { notFound } from "next/navigation";

export default async function Page(props: {
  params: Promise<{ slug: string[] }>;
}) {
  const params = await props.params;
  const page = homeSource.getPage(params.slug);
  if (!page) notFound();

  const MDXContent = page.data.body;

  return (
    <ChaHomePage title={page.data.title} description={page.data.description}>
      <div className="prose">
        <MDXContent
          components={getMDXComponents({
            a: createRelativeLink(homeSource, page),
          })}
        />
      </div>
    </ChaHomePage>
  );
}

export function generateStaticParams() {
  return homeSource.generateParams();
}

export async function generateMetadata(props: {
  params: Promise<{ slug: string[] }>;
}) {
  const params = await props.params;
  const page = homeSource.getPage(params.slug);
  if (!page) notFound();

  return {
    title: page.data.title,
    description: page.data.description,
  };
}
