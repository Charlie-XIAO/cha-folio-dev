"use client";

import { usePathname } from "next/navigation";
import { buttonVariants } from "./shadcn-ui/Button";
import { LuCalendar, LuTag } from "react-icons/lu";
import { cn } from "fumadocs-ui/utils/cn";
import Link from "fumadocs-core/link";

export interface ChaPostFiltersProps {
  tags: Record<string, number>;
  years: Record<number, number>;
}

export function ChaPostFilters({ tags, years }: ChaPostFiltersProps) {
  const pathname = usePathname();

  return (
    <div className="inline-flex items-center flex-wrap gap-2">
      {Object.entries(tags)
        .sort(([a], [b]) => a.localeCompare(b))
        .map(([tag, count]) => {
          const targetPathname = `/blog/tag/${tag}`;
          return (
            <Link
              key={tag}
              href={pathname === targetPathname ? "/blog" : targetPathname}
              title={
                pathname === targetPathname
                  ? "Deselect tag"
                  : `Select tag: ${tag}`
              }
              className={cn(
                buttonVariants({ variant: "outline" }),
                pathname === targetPathname && "border-fd-primary",
              )}
            >
              <LuTag /> {tag} ({count})
            </Link>
          );
        })}

      {Object.entries(years)
        .sort(([a], [b]) => Number(b) - Number(a))
        .map(([year, count]) => {
          let targetPathname = `/blog/year/${year}`;
          return (
            <Link
              key={year}
              href={pathname === targetPathname ? "/blog" : targetPathname}
              title={
                targetPathname === pathname
                  ? "Deselect year"
                  : `Select year: ${year}`
              }
              className={cn(
                buttonVariants({ variant: "outline" }),
                targetPathname === pathname && "border-fd-primary",
              )}
            >
              <LuCalendar /> {year} ({count})
            </Link>
          );
        })}
    </div>
  );
}
