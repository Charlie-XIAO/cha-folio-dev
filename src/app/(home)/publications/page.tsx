import { ChaPublicationItem } from "@/components/ChaPublicationItem";
import { getPublications, getPublicationsMeta } from "@/lib/publications.data";
import Link from "fumadocs-core/link";
import { LuLink } from "react-icons/lu";
import config from "@/cha-folio.config";
import { nodeInnerText } from "@/lib/utils";

const {
  title = "Publications",
  description,
  groupByYears = true,
} = config.pages?.publications ?? {};

export default async function Page() {
  return (
    <div className="w-full max-w-[960px] mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-fd-primary mb-2">{title}</h1>
      <p className="text-lg text-fd-muted-foreground mb-8">{description}</p>

      {groupByYears ? (
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
      ) : (
        <ul className="border-b">
          {getPublications().map((pub) => (
            <li key={pub.citationKey} className="w-full py-6 px-2 border-t">
              <ChaPublicationItem {...pub} />
            </li>
          ))}
        </ul>
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
