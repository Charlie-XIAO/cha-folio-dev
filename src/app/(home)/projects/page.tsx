import { ChaGalleryCard } from "@/components/ChaGalleryCard";
import { getProjects, getProjectsMeta } from "@/lib/projects.data";
import Link from "fumadocs-core/link";
import { LuLink } from "react-icons/lu";
import config from "@/cha-folio.config";
import { nodeInnerText } from "@/lib/utils";
import { ChaHomePage } from "@/components/ChaHomePage";

const {
  title = "Projects",
  description,
  groupByCategories = true,
} = config.pages?.projects ?? {};

export default function Page() {
  let categories: string[] | undefined;
  if (typeof groupByCategories === "boolean") {
    categories = groupByCategories ? getProjectsMeta().categories : undefined;
  } else {
    categories = groupByCategories;
  }

  return (
    <ChaHomePage title={title} description={description}>
      {categories === undefined ? (
        <ul className="flex flex-wrap">
          {getProjects().map((project) => (
            <li key={project.url} className="w-full sm:w-1/2 md:w-1/3">
              <ChaGalleryCard {...project} />
            </li>
          ))}
        </ul>
      ) : (
        categories.map((category) => {
          const categoryId = encodeURIComponent(category);
          return (
            <div key={category} className="mb-8">
              <h2 className="flex flex-row-reverse items-center gap-3 text-2xl text-fd-muted-foreground border-b mb-2 pb-0.5">
                <Link id={categoryId} href={`#${categoryId}`} className="peer">
                  {category}
                </Link>
                <LuLink
                  size={14}
                  className="shrink-0 opacity-0 transition-opacity duration-300 peer-hover:opacity-100"
                />
              </h2>
              <ul className="flex flex-wrap">
                {getProjects({ category }).map((project) => (
                  <li key={project.url} className="w-full sm:w-1/2 md:w-1/3">
                    <ChaGalleryCard {...project} />
                  </li>
                ))}
              </ul>
            </div>
          );
        })
      )}
    </ChaHomePage>
  );
}

export function generateMetadata() {
  return {
    title: nodeInnerText(title),
    description: nodeInnerText(description),
  };
}
