import { defineConfig, defineCollections } from "fumadocs-mdx/config";
import rehypeKatex from "rehype-katex";
import remarkMath from "remark-math";
import { z } from "zod";

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
      news: z.union([z.boolean(), z.number().positive()]).default(3),
      posts: z.union([z.boolean(), z.number().positive()]).default(3),
    }),
    z.object({
      ...baseSchema,
      page: z.literal("news"),
    }),
    z.object({
      ...baseSchema,
      page: z.literal("posts"),
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

export default defineConfig({
  lastModifiedTime: "git",
  mdxOptions: {
    remarkPlugins: [remarkMath],
    rehypePlugins: (v) => [rehypeKatex, ...v],
  },
});
