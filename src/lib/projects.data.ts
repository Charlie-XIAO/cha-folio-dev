import { projectsSource } from "./source";

type ProjectData = NonNullable<ReturnType<typeof projectsSource.getPage>>;

let projectsByCategory: Record<string, ProjectData[]> = {};

for (const page of projectsSource.getPages()) {
  if (!(page.data.category in projectsByCategory)) {
    projectsByCategory[page.data.category] = [];
  }
  projectsByCategory[page.data.category].push(page);
}

for (const category in projectsByCategory) {
  projectsByCategory[category].sort(
    (a, b) => a.data.importance - b.data.importance,
  );
}

const projects = Object.values(projectsByCategory)
  .flat()
  .sort((a, b) => a.data.importance - b.data.importance);

export interface GetProjectsParams {
  category?: string;
}

export const getProjects = ({ category }: GetProjectsParams = {}) => {
  if (category === undefined) {
    return projects;
  }
  return projectsByCategory[category] ?? [];
};
