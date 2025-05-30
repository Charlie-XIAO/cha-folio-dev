import { ChaImage } from "@/components/ChaImage";
import { ChaPostCard } from "@/components/ChaPostCard";
import { getPosts } from "@/lib/posts.data";
import { homeSource } from "@/lib/source";
import { getMDXComponents } from "@/mdx-components";
import { notFound } from "next/navigation";
import { LuLink } from "react-icons/lu";
import Link from "fumadocs-core/link";
import { getPublications } from "@/lib/publications.data";
import { ChaPublicationItem } from "@/components/ChaPublicationItem";

const posts = getPosts({ featuredFirst: false });

export default async function HomePage() {
  const page = homeSource.getPage([]);
  if (!page) notFound();

  if (page.data.page !== "home") {
    throw new Error(
      `Expected "page: home" in frontmatter, got "${page.data.page}" instead`,
    );
  }

  const MDXContent = page.data.body;
  const publications = await getPublications({ selectedOnly: true });

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
          <ChaImage
            image={page.data.image}
            width={600}
            height={600}
            className="block w-[60%] max-w-[300px] mx-auto mb-6 rounded-md md:float-right md:w-[30%] md:ml-6 md:mb-4 object-cover"
          />
        )}

        <div className="prose">
          <div></div>
          <MDXContent components={getMDXComponents()} />
          <div></div>
        </div>
      </div>

      {page.data.news && (
        <div>
          <div className="prose">
            <div></div>
            <h2 className="inline-flex items-center gap-3">
              News
              <Link href="/news" title="View all news">
                <LuLink />
              </Link>
            </h2>
            <div></div>
          </div>
        </div>
      )}

      {page.data.posts && posts.length > 0 && (
        <div>
          <div className="prose">
            <div></div>
            <h2 className="inline-flex items-center gap-3">
              Latest Posts
              <Link href="/posts" title="View all posts">
                <LuLink />
              </Link>
            </h2>
            <div></div>
          </div>

          <ul className="flex flex-col gap-4">
            {posts.slice(0, 3).map((post) => (
              <li key={post.url} className="w-full">
                <ChaPostCard
                  url={post.url}
                  date={post.date}
                  readingTime={post.readingTime}
                  {...post.data}
                />
              </li>
            ))}
          </ul>
        </div>
      )}

      {page.data.publications && (
        <div>
          <div className="prose">
            <div></div>
            <h2 className="inline-flex items-center gap-3">
              Selected Publications
              <Link href="/publications" title="View all publications">
                <LuLink />
              </Link>
            </h2>
            <div></div>
          </div>

          <ul className="border-t">
            {publications.map((pub) => (
              <li key={pub.url} className="w-full py-6 px-2 border-b">
                <ChaPublicationItem {...pub} />
              </li>
            ))}
          </ul>
        </div>
      )}
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
