import { ChaGalleryCard } from "@/components/ChaGalleryCard";
import { getProjects, getProjectsMeta } from "@/lib/projects.data";
import Link from "fumadocs-core/link";
import { LuLink } from "react-icons/lu";
import config from "@/cha-folio.config";
import { nodeInnerText } from "@/lib/utils";

const {
  title = "Projects",
  description,
  groupByCategories = true,
} = config.pages?.projects ?? {};

export default async function Page() {
  let categories: string[] | undefined;
  if (typeof groupByCategories === "boolean") {
    categories = groupByCategories ? getProjectsMeta().categories : undefined;
  } else {
    categories = groupByCategories;
  }

  return (
    <div className="w-full max-w-[960px] mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-fd-primary mb-2">{title}</h1>
      <p className="text-lg text-fd-muted-foreground mb-8">{description}</p>

      {categories === undefined ? (
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {getProjects().map((project) => (
            <li key={project.url}>
              <ChaGalleryCard url={project.url} {...project.data} />
            </li>
          ))}
        </ul>
      ) : (
        categories.map((category) => {
          const categoryId = encodeURIComponent(category);
          return (
            <div key={category} className="mb-8">
              <h2 className="flex flex-row-reverse items-center gap-3 text-2xl text-fd-muted-foreground border-b mb-4 pb-1">
                <Link id={categoryId} href={`#${categoryId}`} className="peer">
                  {category}
                </Link>
                <LuLink
                  size={14}
                  className="shrink-0 opacity-0 transition-opacity duration-300 peer-hover:opacity-100"
                />
              </h2>
              <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {getProjects({ category }).map((project) => (
                  <li key={project.url}>
                    <ChaGalleryCard url={project.url} {...project.data} />
                  </li>
                ))}
              </ul>
            </div>
          );
        })
      )}
    </div>
  );
}

export async function generateMetadata() {
  return {
    title: nodeInnerText(title),
    description: nodeInnerText(description),
  };
}
