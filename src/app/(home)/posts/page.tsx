import { ChaPagination } from "@/components/ChaPagination";
import { ChaPostCard } from "@/components/ChaPostCard";
import { ChaPostFilters } from "@/components/ChaPostFilters";
import { getPosts, getPostsMeta } from "@/lib/posts.data";
import config from "@/cha-folio.config";
import { nodeInnerText } from "@/lib/utils";

const { title = "Blog", description } = config.pages?.posts ?? {};

const { tags, years, numPosts } = getPostsMeta();

export default async function Page(props: {
  searchParams?: Promise<{
    page?: string;
    tag?: string;
    year?: string;
    order?: "desc" | "asc";
  }>;
}) {
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
      <h1 className="text-4xl font-bold text-fd-primary mb-2">{title}</h1>
      <p className="text-lg text-fd-muted-foreground mb-8">{description}</p>

      <ChaPostFilters tags={tags} years={years} />

      <div className="text-fd-muted-foreground text-sm mt-10 mb-4">
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

      <ul className="flex flex-col gap-4">
        {posts.slice(start, end).map((post) => (
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

      {posts.length > pageSize && (
        <ChaPagination count={totalPages} className="mt-8" />
      )}
    </div>
  );
}

export async function generateMetadata() {
  return {
    title: nodeInnerText(title),
    description: nodeInnerText(description),
  };
}
