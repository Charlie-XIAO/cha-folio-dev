import { cn } from "fumadocs-ui/utils/cn";
import { Fragment, HTMLAttributes } from "react";
import { LuCalendar, LuDot, LuFileText, LuTag } from "react-icons/lu";
import Link from "fumadocs-core/link";

export interface ChaPostFrontmatterProps
  extends HTMLAttributes<HTMLDivElement> {
  date: Date;
  tags: string[];
  wordCount: number;
  readingTime: string;
}

export function ChaPostFrontmatter({
  date,
  tags,
  wordCount,
  readingTime,
  className,
  ...props
}: ChaPostFrontmatterProps) {
  return (
    <div
      className={cn("text-fd-muted-foreground text-sm", className)}
      {...props}
    >
      <p className="flex flex-wrap items-center gap-4 mb-1">
        <LuCalendar />
        <Link
          href={`/posts?year=${date.getFullYear()}`}
          className="hover:text-fd-primary hover:underline hover:underline-offset-4"
        >
          {date.toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </Link>
      </p>
      <p className="flex flex-wrap items-center gap-4 mb-1">
        <LuFileText />
        <span className="inline-flex flex-wrap items-center gap-1">
          <span>{wordCount} words</span>
          <LuDot />
          <span>{readingTime}</span>
        </span>
      </p>
      <p className="flex flex-wrap items-center gap-4 mb-1">
        <LuTag />
        <span className="inline-flex flex-wrap items-center gap-1">
          {tags.length > 0 && (
            <Link
              href={`/posts?tag=${tags[0]}`}
              className="hover:text-fd-primary hover:underline hover:underline-offset-4"
            >
              {tags[0]}
            </Link>
          )}
          {tags.slice(1).map((tag) => (
            <Fragment key={tag}>
              <LuDot />
              <Link
                href={`/posts?tag=${tag}`}
                className="hover:text-fd-primary hover:underline hover:underline-offset-4"
              >
                {tag}
              </Link>
            </Fragment>
          ))}
        </span>
      </p>
    </div>
  );
}
