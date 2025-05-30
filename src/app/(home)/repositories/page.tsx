import { ChaImage } from "@/components/ChaImage";
import { homeSource } from "@/lib/source";
import { notFound } from "next/navigation";
import Link from "fumadocs-core/link";

export default async function Page() {
  const page = homeSource.getPage(["repositories"]);
  if (!page) notFound();

  if (page.data.page !== "repositories") {
    throw new Error(
      `Expected "page: repositories" in frontmatter, got "${page.data.page}" instead`,
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

      <h2 className="text-2xl font-semibold mb-6 mt-12">GitHub Statistics</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
        <Link href={`https://github.com/${page.data.username}`}>
          <ChaImage
            image={{
              light: `https://github-readme-stats.vercel.app/api/?username=${page.data.username}&include_all_commits=true&show_icons=true&rank_icon=github&theme=light&locale=en`,
              dark: `https://github-readme-stats.vercel.app/api/?username=${page.data.username}&include_all_commits=true&show_icons=true&rank_icon=github&theme=dark&locale=en`,
              alt: "GitHub Stats",
            }}
            width={500}
            height={300}
            unoptimized
            className="w-full h-auto max-w-[500px]"
          />
        </Link>
      </div>

      <h2 className="text-2xl font-semibold mb-6 mt-12">Top Repositories</h2>
      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
        {page.data.repositories.map((repo) => {
          const [username, name] = repo.split("/");
          return (
            <li key={repo} className="w-full">
              <Link href={`https://github.com/${username}/${name}`}>
                <ChaImage
                  image={{
                    light: `https://github-readme-stats.vercel.app/api/pin/?username=${username}&repo=${name}&show_owner=true&description_lines_count=2&theme=light&locale=en`,
                    dark: `https://github-readme-stats.vercel.app/api/pin/?username=${username}&repo=${name}&show_owner=true&description_lines_count=2&theme=dark&locale=en`,
                    alt: "GitHub Stats",
                  }}
                  width={500}
                  height={300}
                  unoptimized
                  className="w-full h-auto max-w-[500px]"
                />
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export async function generateMetadata() {
  const page = homeSource.getPage(["repositories"]);
  if (!page) notFound();

  if (page.data.page !== "repositories") {
    throw new Error(
      `Expected "page: repositories" in frontmatter, got "${page.data.page}" instead`,
    );
  }

  return {
    title: page.data.title,
    description: page.data.description,
  };
}
