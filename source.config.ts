import { defineCollections, defineConfig } from "fumadocs-mdx/config";
import { z } from "zod";
import rehypeKatex from "rehype-katex";
import remarkMath from "remark-math";

function z_image() {
  return z.union([
    z.string(),
    z.object({ src: z.string(), alt: z.string().default("") }),
    z.object({
      light: z.string(),
      dark: z.string(),
      alt: z.string().default(""),
    }),
  ]);
}

const baseDocSchema = {
  title: z.string(),
  description: z.string().optional(),
  full: z.boolean().optional(),
};

export const home = defineCollections({
  type: "doc",
  dir: "content/home",
  schema: z.object({
    title: z.string().optional(),
    description: z.string().optional(),
  }),
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
