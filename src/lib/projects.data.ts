import { projectsSource } from "./source";

export interface GetProjectsParams {
  category?: string;
}

export function getProjects({ category }: GetProjectsParams = {}) {
  let projects = projectsSource.getPages();
  if (category !== undefined) {
    projects = projects.filter((project) => project.data.category === category);
  }
  return projects.sort((a, b) => a.data.importance - b.data.importance);
}

export function getProjectsMeta() {
  const allCategories = projectsSource
    .getPages()
    .map((project) => project.data.category);
  const categories = Array.from(new Set(allCategories)).sort();
  return { categories };
}
