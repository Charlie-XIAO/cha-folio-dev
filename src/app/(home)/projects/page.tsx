import { ChaGalleryCard } from "@/components/ChaGalleryCard";
import { homeSource } from "@/lib/source";
import { notFound } from "next/navigation";
import { getProjects } from "@/lib/projects.data";
import { Link } from "fumadocs-core/framework";

export default async function Page() {
  const page = homeSource.getPage(["projects"]);
  if (!page) notFound();

  if (page.data.page !== "projects") {
    throw new Error(
      `Expected "page: projects" in frontmatter, got "${page.data.page}" instead`,
    );
  }

  return (
    <div className="w-full max-w-[960px] mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-fd-primary mb-2">
        {page.data.title}
      </h1>
      <p className="text-lg text-fd-muted-foreground mb-8">
        {page.data.description}
      </p>

      {page.data.categories === undefined ? (
        <div className="grid grid-cols-3 gap-4">
          {getProjects().map((project) => (
            <ChaGalleryCard
              key={project.data.title}
              url={project.url}
              {...project.data}
            />
          ))}
        </div>
      ) : (
        page.data.categories.map((category) => {
          const categoryId = encodeURIComponent(category);
          return (
            <div key={category} className="mb-8">
              <h2 className="text-2xl text-fd-muted-foreground text-right border-b mb-4 pb-1">
                <Link id={categoryId} href={`#${categoryId}`}>
                  {category}
                </Link>
              </h2>
              <div className="grid grid-cols-3 gap-4">
                {getProjects({ category }).map((project) => (
                  <ChaGalleryCard
                    key={project.data.title}
                    url={project.url}
                    {...project.data}
                  />
                ))}
              </div>
            </div>
          );
        })
      )}
    </div>
  );
}

export async function generateMetadata() {
  const page = homeSource.getPage(["projects"]);
  if (!page) notFound();

  if (page.data.page !== "projects") {
    throw new Error(
      `Expected "page: projects" in frontmatter, got "${page.data.page}" instead`,
    );
  }

  return {
    title: page.data.title,
    description: page.data.description,
  };
}
