import { homeSource } from "@/lib/source";
import { notFound } from "next/navigation";

export default async function Page() {
  const page = homeSource.getPage(["news"]);
  if (!page) notFound();

  if (page.data.page !== "news") {
    throw new Error(
      `Expected "page: news" in frontmatter, got "${page.data.page}" instead`,
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
    </div>
  );
}

export async function generateMetadata() {
  const page = homeSource.getPage(["news"]);
  if (!page) notFound();

  if (page.data.page !== "news") {
    throw new Error(
      `Expected "page: news" in frontmatter, got "${page.data.page}" instead`,
    );
  }

  return {
    title: page.data.title,
    description: page.data.description,
  };
}
