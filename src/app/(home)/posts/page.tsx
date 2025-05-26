import { homeSource, postsSource } from "@/lib/source";
import { notFound } from "next/navigation";
import { Card } from "fumadocs-ui/components/card";
import { ChaPagination } from "@/components/ChaPagination";

type PostData = ReturnType<typeof postsSource.getPages>[number] & {
  date: Date;
};

const posts = postsSource.getPages().reduce((acc, page) => {
  if (page.slugs.length !== 1) {
    return acc;
  }
  const fullSlug = page.slugs[0];
  const match = fullSlug.match(/^(\d{4})-(\d{2})-(\d{2})-(.+)$/);
  if (!match) {
    return acc;
  }

  const [, YYYY, MM, DD, slug] = match;
  acc.push({
    date: new Date(Number(YYYY), Number(MM) - 1, Number(DD)),
    ...page,
  });

  return acc;
}, [] as PostData[]);

export default async function Page(props: {
  searchParams?: Promise<{ page?: string }>;
}) {
  const page = homeSource.getPage(["posts"]);
  if (!page) notFound();

  if (page.data.page !== "posts") {
    throw new Error(
      `Expected "page: posts" in frontmatter, got "${page.data.page}" instead`,
    );
  }

  const searchParams = await props.searchParams;
  const currentPage = Number(searchParams?.page) || 1;
  const pageSize = 2;
  const totalPages = Math.ceil(posts.length / pageSize);

  const start = (currentPage - 1) * pageSize;
  const end = start + pageSize;
  const paginatedPosts = posts.slice(start, end);

  return (
    <div className="w-full max-w-[960px] mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-fd-primary mb-2">
        {page.data.title}
      </h1>
      <p className="text-lg text-fd-muted-foreground mb-8">
        {page.data.description}
      </p>

      <div className="flex flex-col gap-4">
        <div className="text-fd-muted-foreground text-sm mb-2">
          Showing {start + 1}~{Math.min(end, posts.length)} of all{" "}
          {posts.length} posts
        </div>
        {paginatedPosts.map((post) => (
          <Card title={post.data.title} href={post.url} key={post.url}>
            <div className="flex flex-col gap-1 w-full sm:flex-row sm:gap-4 sm:justify-between">
              <span>{post.data.description}</span>
              <span>
                {post.date.toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "2-digit",
                  day: "2-digit",
                })}
              </span>
            </div>
          </Card>
        ))}
      </div>

      <ChaPagination count={totalPages} className="mt-8" />
    </div>
  );
}

export async function generateMetadata() {
  const page = homeSource.getPage(["posts"]);
  if (!page) notFound();

  if (page.data.page !== "posts") {
    throw new Error(
      `Expected "page: posts" in frontmatter, got "${page.data.page}" instead`,
    );
  }

  return {
    title: page.data.title,
    description: page.data.description,
  };
}
