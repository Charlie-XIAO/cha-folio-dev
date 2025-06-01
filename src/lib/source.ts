import { posts, news, home, projects } from "@/.source";
import { loader } from "fumadocs-core/source";
import { createMDXSource } from "fumadocs-mdx";

export const homeSource = loader({
  baseUrl: "/",
  source: createMDXSource(home),
});

export const newsSource = loader({
  baseUrl: "/news",
  source: createMDXSource(news),
});

export const postsSource = loader({
  baseUrl: "/blog",
  source: createMDXSource(posts),
});

export const projectsSource = loader({
  baseUrl: "/projects",
  source: createMDXSource(projects),
});
