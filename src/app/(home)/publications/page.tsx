import { ChaPublicationItem } from "@/components/ChaPublicationItem";
import { getPublications, getPublicationsMeta } from "@/lib/publications.data";
import { homeSource } from "@/lib/source";
import Link from "fumadocs-core/link";
import { notFound } from "next/navigation";
import { LuLink } from "react-icons/lu";

export default async function Page() {
  const page = homeSource.getPage(["publications"]);
  if (!page) notFound();

  if (page.data.page !== "publications") {
    throw new Error(
      `Expected "page: publications" in frontmatter, got "${page.data.page}" instead`,
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

      {page.data.years === undefined ? (
        <ul className="border-b">
          {getPublications().map((pub) => (
            <li key={pub.citationKey} className="w-full py-6 px-2 border-t">
              <ChaPublicationItem {...pub} />
            </li>
          ))}
        </ul>
      ) : (
        Object.keys(getPublicationsMeta().years)
          .sort((a, b) => Number(b) - Number(a))
          .map((year) => (
            <div key={year}>
              <h2 className="flex flex-row-reverse items-center gap-3 text-2xl text-fd-muted-foreground mt-8 mb-1">
                <Link id={year} href={`#${year}`} className="peer">
                  {year}
                </Link>
                <LuLink
                  size={14}
                  className="shrink-0 opacity-0 transition-opacity duration-300 peer-hover:opacity-100"
                />
              </h2>
              <ul>
                {getPublications({ year: Number(year) }).map((pub) => (
                  <li
                    key={pub.citationKey}
                    className="w-full py-6 px-2 border-t"
                  >
                    <ChaPublicationItem {...pub} />
                  </li>
                ))}
              </ul>
            </div>
          ))
      )}
    </div>
  );
}

export async function generateMetadata() {
  const page = homeSource.getPage(["publications"]);
  if (!page) notFound();

  if (page.data.page !== "publications") {
    throw new Error(
      `Expected "page: publications" in frontmatter, got "${page.data.page}" instead`,
    );
  }

  return {
    title: page.data.title,
    description: page.data.description,
  };
}
