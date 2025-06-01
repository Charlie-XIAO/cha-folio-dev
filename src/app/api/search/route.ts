import {
  homeSource,
  newsSource,
  postsSource,
  projectsSource,
} from "@/lib/source";
import { createSearchAPI } from "fumadocs-core/search/server";

export const revalidate = false;

const pages = [
  ...homeSource.getPages(),
  ...newsSource.getPages(),
  ...postsSource.getPages(),
  ...projectsSource.getPages(),
];

export const { staticGET: GET } = createSearchAPI("advanced", {
  indexes: pages.map((page) => ({
    id: page.url,
    title: page.data.title ?? "",
    description: page.data.description,
    url: page.url,
    structuredData: page.data.structuredData,
  })),
});
