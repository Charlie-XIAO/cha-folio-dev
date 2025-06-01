import { getPosts } from "@/lib/posts.data";
import { Feed } from "feed";
import config from "@/cha-folio.config";

export const dynamic = "force-static";

export function GET() {
  const baseUrl = new URL(
    process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:3000",
  );

  const feed = new Feed({
    title: String(config.metadata.title),
    description: config.metadata.description ?? undefined,
    copyright: config.copyright ?? config.name,
    id: baseUrl.href,
    link: baseUrl.href,
    feed: new URL("/api/feed.xml", baseUrl).href,
    language: "en-US",
    updated: new Date(),
  });

  const posts = getPosts();

  for (const post of posts) {
    const imageParams = new URLSearchParams();
    imageParams.set("title", post.title);
    imageParams.set("description", post.description ?? "");

    feed.addItem({
      title: post.title,
      description: post.description,
      link: new URL(post.url, baseUrl).href,
      date: post.date,
      author: [{ name: config.name, link: baseUrl.href }],
    });
  }

  return new Response(feed.atom1(), {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}
