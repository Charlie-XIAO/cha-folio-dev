import { ChaPostFilters } from "@/components/ChaPostFilters";
import { getPosts, getPostsMeta, GetPostsParams } from "@/lib/posts.data";
import { nodeInnerText } from "@/lib/utils";
import { notFound } from "next/navigation";
import { ChaPaginatedPosts } from "@/components/ChaPaginatedPosts";
import config from "@/cha-folio.config";
import { Suspense } from "react";
import { Skeleton } from "@/components/shadcn-ui/Skeleton";

const { title = "Blog", description } = config.pages?.posts ?? {};

const { tags, years } = getPostsMeta();

export default async function Page(props: {
  params: Promise<{ slug?: string[] }>;
}) {
  const params = await props.params;
  let currentTag: GetPostsParams["tag"] = undefined;
  let currentYear: GetPostsParams["year"] = undefined;

  const slug = params.slug ?? [];
  if (slug.length === 0) {
  } else if (slug.length === 2) {
    const [type, value] = slug;
    if (type === "tag") {
      currentTag = value;
      if (tags[currentTag] === undefined) {
        notFound();
      }
    } else if (type === "year") {
      currentYear = Number(value);
      if (years[currentYear] === undefined) {
        notFound();
      }
    }
  } else {
    notFound();
  }

  const posts = getPosts({ tag: currentTag, year: currentYear });

  return (
    <div className="w-full max-w-[960px] mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-fd-primary mb-2">{title}</h1>
      <p className="text-lg text-fd-muted-foreground mb-8">{description}</p>

      <ChaPostFilters tags={tags} years={years} />

      <Suspense fallback={<LoadingSkeleton />}>
        <ChaPaginatedPosts posts={posts} className="mt-10" />
      </Suspense>
    </div>
  );
}

export function generateStaticParams() {
  return [
    { slug: [] },
    ...Object.keys(tags).map((tag) => ({ slug: ["tag", tag] })),
    ...Object.keys(years).map((year) => ({ slug: ["year", year] })),
  ];
}

export function generateMetadata() {
  return {
    title: nodeInnerText(title),
    description: nodeInnerText(description),
  };
}

function LoadingSkeleton() {
  return (
    <div className="flex flex-col gap-4 mt-10">
      <Skeleton className="h-[125px] w-full" />
      <Skeleton className="h-[125px] w-full" />
    </div>
  );
}
