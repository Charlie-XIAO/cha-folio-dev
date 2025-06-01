import { projectsSource } from "./source";

export type ProjectPageData = NonNullable<
  ReturnType<typeof projectsSource.getPage>
>;

export interface ProjectData {
  url: ProjectPageData["url"];
  title: ProjectPageData["data"]["title"];
  description: ProjectPageData["data"]["description"];
  image: ProjectPageData["data"]["image"];
  category: ProjectPageData["data"]["category"];
  importance: ProjectPageData["data"]["importance"];
  href: ProjectPageData["data"]["href"];
}

const projects = projectsSource.getPages().map<ProjectData>((page) => ({
  url: page.url,
  title: page.data.title,
  description: page.data.description,
  image: page.data.image,
  category: page.data.category,
  importance: page.data.importance,
  href: page.data.href,
}));

export interface GetProjectsParams {
  category?: string;
}

export function getProjects({ category }: GetProjectsParams = {}) {
  let finalProjects = [...projects];
  if (category !== undefined) {
    finalProjects = finalProjects.filter(
      (project) => project.category === category,
    );
  }
  return finalProjects.sort((a, b) => a.importance - b.importance);
}

export function getProjectsMeta() {
  const allCategories = projects.map((project) => project.category);
  const categories = Array.from(new Set(allCategories)).sort();
  return { categories };
}
