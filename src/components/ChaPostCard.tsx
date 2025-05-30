import { ChaImage, ChaImageDef } from "./ChaImage";
import { LuDot, LuTag, LuExternalLink } from "react-icons/lu";
import { Fragment } from "react";
import Link from "fumadocs-core/link";

interface ChaPostCardProps {
  title: string;
  description?: string;
  image?: ChaImageDef;
  tags: string[];
  featured: boolean;
  href?: string;
  url: string;
  date: Date;
  readingTime: string;
}

export const ChaPostCard = ({
  title,
  description,
  image,
  tags,
  featured,
  href,
  url,
  date,
  readingTime,
}: ChaPostCardProps) => {
  const formattedDate = date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <article className="relative flex w-full overflow-hidden rounded-md border bg-fd-background/80 shadow-md transition-colors hover:bg-fd-accent/80">
      <Link href={href ?? url} className="block w-full relative">
        {featured && (
          <div
            className="absolute top-0 left-0 w-4 h-4 bg-fd-primary"
            style={{ clipPath: "polygon(0 0, 100% 0, 0 100%)" }}
          />
        )}

        <div className="flex flex-col-reverse w-full px-6 py-4 gap-4 sm:flex-row sm:items-start sm:gap-6">
          <div className="flex flex-col flex-grow">
            <h2 className="text-lg font-semibold mb-1">{title}</h2>
            {description && (
              <p className="text-fd-muted-foreground flex-grow">
                {description}
              </p>
            )}

            <div className="text-sm text-fd-muted-foreground mt-4 inline-flex items-center flex-wrap gap-x-2">
              <span>{formattedDate}</span>
              <LuDot />
              {tags.map((tag) => (
                <Fragment key={tag}>
                  <LuTag />
                  {tag}
                </Fragment>
              ))}
              <LuDot />
              {href !== undefined ? <LuExternalLink /> : readingTime}
            </div>
          </div>

          {image && (
            <ChaImage
              image={image}
              width={600}
              height={600}
              className="w-full max-h-36 object-cover rounded-md sm:hidden!"
            />
          )}
        </div>

        {image && (
          <div className="hidden sm:absolute sm:top-4 sm:bottom-4 sm:right-6 sm:flex sm:w-1/5 sm:items-center sm:justify-center">
            <ChaImage
              image={image}
              width={600}
              height={600}
              className="max-h-full max-w-full object-cover rounded-md"
            />
          </div>
        )}
      </Link>
    </article>
  );
};
