import { defineConfig, defineCollections } from "fumadocs-mdx/config";
import { z } from "zod";
import rehypeKatex from "rehype-katex";
import remarkMath from "remark-math";

const z_image = () =>
  z.union([
    z.string(),
    z.object({ src: z.string(), alt: z.string().default("") }),
    z.object({
      light: z.string(),
      dark: z.string(),
      alt: z.string().default(""),
    }),
  ]);

const baseSchema = {
  title: z.string(),
  description: z.string().optional(),
};

const baseDocSchema = {
  ...baseSchema,
  full: z.boolean().optional(),
};

export const home = defineCollections({
  type: "doc",
  dir: "content/_pages",
  schema: z.discriminatedUnion("page", [
    z.object({
      ...baseSchema,
      page: z.literal("home"),
      image: z_image().optional(),
      news: z.union([z.boolean(), z.number().int().positive()]).default(3),
      posts: z.union([z.boolean(), z.number().int().positive()]).default(3),
    }),
    z.object({
      ...baseSchema,
      page: z.literal("news"),
    }),
    z.object({
      ...baseSchema,
      page: z.literal("posts"),
    }),
    z.object({
      ...baseSchema,
      page: z.literal("projects"),
      categories: z.array(z.string()).optional(),
    }),
  ]),
});

export const news = defineCollections({
  type: "doc",
  dir: "content/news",
  schema: z.object({ ...baseDocSchema }),
});

export const posts = defineCollections({
  type: "doc",
  dir: "content/posts",
  schema: z.object({
    ...baseDocSchema,
    image: z_image().optional(),
    tags: z.array(z.string()),
    featured: z.boolean().default(false),
    href: z.string().url().optional(),
    giscus: z.boolean().default(false),
  }),
});

export const projects = defineCollections({
  type: "doc",
  dir: "content/projects",
  schema: z.object({
    ...baseDocSchema,
    image: z_image().optional(),
    category: z.string(),
    importance: z.number().int().default(Number.MAX_SAFE_INTEGER),
    href: z.string().url().optional(),
  }),
});

export default defineConfig({
  lastModifiedTime: "git",
  mdxOptions: {
    remarkPlugins: [remarkMath],
    rehypePlugins: (v) => [rehypeKatex, ...v],
  },
});
