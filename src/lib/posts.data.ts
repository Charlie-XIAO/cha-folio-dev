import readingTime from "reading-time";
import { postsSource } from "./source";

type PostData = ReturnType<typeof postsSource.getPages>[number] & {
  date: Date;
  readingTime: string;
};

const posts: PostData[] = [];

for (const page of postsSource.getPages()) {
  if (page.slugs.length !== 1) {
    continue;
  }
  const fullSlug = page.slugs[0];
  const match = fullSlug.match(/^(\d{4})-(\d{2})-(\d{2})-(.+)$/);
  if (!match) {
    continue;
  }

  const [, YYYY, MM, DD] = match;
  const date = new Date(Number(YYYY), Number(MM) - 1, Number(DD));
  const readingTimeStats = readingTime(page.data.content);
  posts.push({
    ...page,
    date,
    readingTime: readingTimeStats.text,
  });
}

interface GetPostsParams {
  tag?: string;
  year?: number;
  order?: "desc" | "asc";
  featuredFirst?: boolean;
}

export const getPosts = ({
  tag,
  year,
  order = "desc",
  featuredFirst = true,
}: GetPostsParams = {}) => {
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
};

export const getPostsMeta = () => {
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
};
