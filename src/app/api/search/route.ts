import { homeSource, newsSource, postsSource } from "@/lib/source";
import { createSearchAPI } from "fumadocs-core/search/server";

const pages = [
  ...homeSource.getPages(),
  ...newsSource.getPages(),
  ...postsSource.getPages(),
];

export const { GET } = createSearchAPI("advanced", {
  indexes: pages.map((page) => ({
    id: page.url,
    title: page.data.title,
    description: page.data.description,
    url: page.url,
    structuredData: page.data.structuredData,
  })),
});
