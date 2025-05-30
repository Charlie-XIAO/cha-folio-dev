import { getPosts } from "@/lib/posts.data";
import { Feed } from "feed";

export const dynamic = "force-static";

export function GET() {
  const baseUrl = new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  );

  const feed = new Feed({
    title: "cha-folio",
    description: "A Fumadocs theme for portfolio websites",
    copyright: "Yao Xiao",
    id: baseUrl.href,
    link: baseUrl.href,
    feed: new URL("/api/feed.xml", baseUrl).href,
    language: "en-US",
    updated: new Date(),
    favicon: new URL("/images/logo-light.png", baseUrl).href,
  });

  const posts = getPosts();

  for (const post of posts) {
    const imageParams = new URLSearchParams();
    imageParams.set("title", post.data.title);
    imageParams.set("description", post.data.description ?? "");

    feed.addItem({
      title: post.data.title,
      description: post.data.description,
      link: new URL(post.url, baseUrl).href,
      date: post.date,
      author: [
        {
          name: "Yao Xiao",
          link: "https://charlie-xiao.github.io/",
        },
      ],
    });
  }

  return new Response(feed.atom1(), {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}
