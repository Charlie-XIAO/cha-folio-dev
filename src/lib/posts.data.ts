import readingTime from "reading-time";
import { postsSource } from "./source";

export type PostPageData = NonNullable<ReturnType<typeof postsSource.getPage>>;

export interface PostComputedData {
  date: Date;
  wordCount: number;
  readingTime: string;
}

export interface PostData extends PostComputedData {
  url: PostPageData["url"];
  title: PostPageData["data"]["title"];
  description: PostPageData["data"]["description"];
  full: PostPageData["data"]["full"];
  image: PostPageData["data"]["image"];
  tags: PostPageData["data"]["tags"];
  featured: PostPageData["data"]["featured"];
  href: PostPageData["data"]["href"];
  giscus: PostPageData["data"]["giscus"];
}

const posts = postsSource.getPages().reduce((acc, page) => {
  const computedData = computePost(page);
  if (computedData !== undefined) {
    acc.push({
      url: page.url,
      title: page.data.title,
      description: page.data.description,
      full: page.data.full,
      image: page.data.image,
      tags: page.data.tags,
      featured: page.data.featured,
      href: page.data.href,
      giscus: page.data.giscus,
      ...computedData,
    });
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
  featuredFirst?: boolean;
}

export function getPosts({
  tag,
  year,
  featuredFirst = true,
}: GetPostsParams = {}) {
  let finalPosts = [...posts];

  if (tag !== undefined) {
    finalPosts = finalPosts.filter((post) => post.tags.includes(tag));
  }
  if (year !== undefined) {
    finalPosts = finalPosts.filter((post) => post.date.getFullYear() === year);
  }

  return finalPosts.sort((a, b) => {
    if (featuredFirst && a.featured !== b.featured) {
      return b.featured ? 1 : -1;
    }
    return b.date.getTime() - a.date.getTime();
  });
}

export function getPostsMeta() {
  const tags: Record<string, number> = {};
  const years: Record<number, number> = {};

  for (const post of posts) {
    for (const tag of post.tags) {
      tags[tag] = (tags[tag] || 0) + 1;
    }
    const fullYear = post.date.getFullYear();
    years[fullYear] = (years[fullYear] || 0) + 1;
  }

  return { tags, years };
}
