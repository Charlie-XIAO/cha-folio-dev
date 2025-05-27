import { Link } from "fumadocs-core/framework";
import { ChaImage, ChaImageDef } from "./ChaImage";
import { LuDot, LuTag, LuExternalLink } from "react-icons/lu";
import { Fragment } from "react";

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
    day: "2-digit",
  });

  const linkProps =
    href === undefined
      ? { href: url }
      : { href, target: "_blank", rel: "noopener noreferrer" };

  return (
    <article className="relative flex w-full overflow-hidden rounded-md border bg-fd-card text-fd-card-foreground shadow-md transition-colors hover:bg-fd-accent/80">
      <Link {...linkProps} className="block w-full">
        {featured && (
          <div
            className="absolute top-0 left-0 w-4 h-4 bg-fd-primary"
            style={{ clipPath: "polygon(0 0, 100% 0, 0 100%)" }}
          />
        )}

        <div className="flex flex-col-reverse w-full px-6 py-4 gap-4 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
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
              width={300}
              height={300}
              className="w-[100%] sm:w-[20%] max-h-32 h-auto object-cover rounded-md"
            />
          )}
        </div>
      </Link>
    </article>
  );
};
