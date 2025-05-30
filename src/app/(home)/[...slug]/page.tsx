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

  if (page.data.page !== "common") {
    throw new Error(
      `Expected "page: common" in frontmatter, got "${page.data.page}" instead`,
    );
  }

  const MDXContent = page.data.body;

  return (
    <div className="w-full max-w-[960px] mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-fd-primary mb-2">
        {page.data.title}
      </h1>
      <p className="text-lg text-fd-muted-foreground mb-8">
        {page.data.description}
      </p>

      <div className="prose">
        <MDXContent
          components={getMDXComponents({
            a: createRelativeLink(homeSource, page),
          })}
        />
      </div>
    </div>
  );
}

// export async function generateStaticParams() {
//   return homeSource.generateParams();
// }

export async function generateMetadata(props: {
  params: Promise<{ slug: string[] }>;
}) {
  const params = await props.params;
  const page = homeSource.getPage(params.slug);
  if (!page) notFound();

  if (page.data.page !== "common") {
    throw new Error(
      `Expected "page: common" in frontmatter, got "${page.data.page}" instead`,
    );
  }

  return {
    title: page.data.title,
    description: page.data.description,
  };
}
