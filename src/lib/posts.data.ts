import readingTime from "reading-time";
import { postsSource } from "./source";

export type PostPageData = NonNullable<ReturnType<typeof postsSource.getPage>>;

export interface PostComputedData {
  date: Date;
  wordCount: number;
  readingTime: string;
}

export type PostData = PostPageData & PostComputedData;

const posts = postsSource.getPages().reduce((acc, page) => {
  const computedData = computePost(page);
  if (computedData !== undefined) {
    acc.push({ ...page, ...computedData });
  }
  return acc;
}, [] as PostData[]);

export function computePost(page: PostPageData): PostComputedData | undefined {
  if (page?.slugs.length !== 1) {
    return;
  }
  const fullSlug = page.slugs[0];
  const match = fullSlug.match(/^(\d{4})-(\d{2})-(\d{2})-(.+)$/);
  if (!match) {
    return;
  }

  const [, YYYY, MM, DD] = match;
  const date = new Date(Number(YYYY), Number(MM) - 1, Number(DD));
  const readingTimeStats = readingTime(page.data.content);

  return {
    date,
    wordCount: readingTimeStats.words,
    readingTime: readingTimeStats.text,
  };
}

export interface GetPostsParams {
  tag?: string;
  year?: number;
  order?: "desc" | "asc";
  featuredFirst?: boolean;
}

export function getPosts({
  tag,
  year,
  order = "desc",
  featuredFirst = true,
}: GetPostsParams = {}) {
  let finalPosts = posts;

  if (tag !== undefined) {
    finalPosts = finalPosts.filter((post) => post.data.tags.includes(tag));
  }
  if (year !== undefined) {
    finalPosts = finalPosts.filter((post) => post.date.getFullYear() === year);
  }

  const sortMultiplier = order === "desc" ? 1 : -1;
  finalPosts.sort((a, b) => {
    if (featuredFirst && a.data.featured !== b.data.featured) {
      return b.data.featured ? 1 : -1;
    }
    return sortMultiplier * (b.date.getTime() - a.date.getTime());
  });

  return finalPosts;
}

export function getPostsMeta() {
  const tags: Record<string, number> = {};
  const years: Record<number, number> = {};

  for (const post of posts) {
    for (const tag of post.data.tags) {
      tags[tag] = (tags[tag] || 0) + 1;
    }
    const fullYear = post.date.getFullYear();
    years[fullYear] = (years[fullYear] || 0) + 1;
  }

  return { tags, years, numPosts: posts.length };
}
