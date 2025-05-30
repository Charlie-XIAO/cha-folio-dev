import { ChaPublicationItem } from "@/components/ChaPublicationItem";
import { getPublications } from "@/lib/publications.data";
import { homeSource } from "@/lib/source";
import { notFound } from "next/navigation";

export default async function Page() {
  const page = homeSource.getPage(["publications"]);
  if (!page) notFound();

  if (page.data.page !== "publications") {
    throw new Error(
      `Expected "page: publications" in frontmatter, got "${page.data.page}" instead`,
    );
  }

  const publications = await getPublications();

  return (
    <div className="w-full max-w-[960px] mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-fd-primary mb-2">
        {page.data.title}
      </h1>
      <p className="text-lg text-fd-muted-foreground mb-8">
        {page.data.description}
      </p>

      <ul className="border-t">
        {publications.map((pub) => (
          <li key={pub.url} className="w-full py-6 px-2 border-b">
            <ChaPublicationItem {...pub} />
          </li>
        ))}
      </ul>
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
