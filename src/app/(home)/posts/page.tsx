import { homeSource } from "@/lib/source";
import { notFound } from "next/navigation";
import { ChaPagination } from "@/components/ChaPagination";
import { ChaPostCard } from "@/components/ChaPostCard";
import { ChaPostFilters } from "@/components/ChaPostFilters";
import { getPosts, getPostsMeta } from "@/lib/posts.data";

const { tags, years, numPosts } = getPostsMeta();

export default async function Page(props: {
  searchParams?: Promise<{
    page?: string;
    tag?: string;
    year?: string;
    order?: "desc" | "asc";
  }>;
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
  const currentTag = searchParams?.tag;
  const currentYear = Number(searchParams?.year) || undefined;
  const currentOrder = searchParams?.order || "desc";

  const posts = getPosts({
    tag: currentTag,
    year: currentYear,
    order: currentOrder,
  });

  const pageSize = 5;
  const totalPages = Math.ceil(posts.length / pageSize);
  const start = (currentPage - 1) * pageSize;
  const end = start + pageSize;

  return (
    <div className="w-full max-w-[960px] mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-fd-primary mb-2">
        {page.data.title}
      </h1>
      <p className="text-lg text-fd-muted-foreground mb-8">
        {page.data.description}
      </p>

      <ChaPostFilters tags={tags} years={years} />

      <div className="flex flex-col gap-4 mt-8">
        <div className="text-fd-muted-foreground text-sm mb-2">
          {posts.length === 0 ? (
            <>No posts</>
          ) : (
            <>
              Showing {start + 1}~{Math.min(end, posts.length)} of{" "}
              {currentTag === undefined && currentYear === undefined
                ? `all ${numPosts} posts`
                : `${posts.length}/${numPosts} filtered posts`}
            </>
          )}
        </div>

        {posts.slice(start, end).map((post) => (
          <ChaPostCard
            key={post.url}
            url={post.url}
            date={post.date}
            readingTime={post.readingTime}
            {...post.data}
          />
        ))}
      </div>

      {posts.length > pageSize && (
        <ChaPagination count={totalPages} className="mt-8" />
      )}
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
