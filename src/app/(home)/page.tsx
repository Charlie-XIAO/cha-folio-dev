import { homeSource } from "@/lib/source";
import { getMDXComponents } from "@/mdx-components";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

export default function HomePage() {
  const page = homeSource.getPage([]);
  if (!page) notFound();

  if (page.data.page !== "home") {
    throw new Error(
      `Expected "page: home" in frontmatter, got "${page.data.page}" instead`,
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

      <div>
        {page.data.image && (
          <Image
            src={page.data.image}
            alt="profile"
            width={300}
            height={300}
            className="block w-[60%] max-w-[300px] mx-auto mb-6 rounded-md md:float-right md:w-[30%] md:ml-6 md:mb-4 object-cover"
          />
        )}

        <div className="prose">
          <div></div>
          <MDXContent components={getMDXComponents()} />
          <div></div>
        </div>
      </div>

      <div className="prose">
        <div></div>
        <h2>
          <Link href="/news">News</Link>
        </h2>
        <h2>
          <Link href="/posts">Latest Posts</Link>
        </h2>
        <div></div>
      </div>
    </div>
  );
}

export async function generateMetadata() {
  const page = homeSource.getPage([]);
  if (!page) notFound();

  if (page.data.page !== "home") {
    throw new Error(
      `Expected "page: home" in frontmatter, got "${page.data.page}" instead`,
    );
  }

  return {
    title: page.data.title,
    description: page.data.description,
  };
}
