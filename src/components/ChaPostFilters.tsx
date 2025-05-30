"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { buttonVariants } from "./ui/Button";
import {
  LuArrowDownWideNarrow,
  LuArrowUpNarrowWide,
  LuCalendar,
  LuTag,
} from "react-icons/lu";
import { cn } from "fumadocs-ui/utils/cn";
import { FaGripLinesVertical } from "react-icons/fa6";
import Link from "fumadocs-core/link";

export interface ChaPostFiltersProps {
  tags: Record<string, number>;
  years: Record<number, number>;
}

export function ChaPostFilters({ tags, years }: ChaPostFiltersProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentTag = searchParams.get("tag");
  const currentYear = searchParams.get("year");
  const currentOrder = searchParams.get("order") ?? "desc";

  const createUrl = (param: string, value: string | null) => {
    const params = new URLSearchParams(searchParams);
    if (value === null) {
      params.delete(param);
    } else {
      params.set(param, value);
    }
    params.delete("page"); // Reset page when changing filters
    return `${pathname}?${params.toString()}`;
  };

  return (
    <div className="inline-flex items-center flex-wrap gap-2">
      {Object.entries(tags)
        .sort(([a], [b]) => a.localeCompare(b))
        .map(([tag, count]) => (
          <Link
            key={tag}
            href={createUrl("tag", currentTag === tag ? null : tag)}
            title={
              currentTag === tag ? "Remove tag filter" : `Filter by tag: ${tag}`
            }
            className={cn(
              buttonVariants({ variant: "outline" }),
              currentTag === tag && "border-fd-primary",
            )}
          >
            <LuTag /> {tag} ({count})
          </Link>
        ))}

      <FaGripLinesVertical className="text-fd-muted-foreground" />

      {Object.entries(years)
        .sort(([a], [b]) => Number(b) - Number(a))
        .map(([year, count]) => (
          <Link
            key={year}
            href={createUrl("year", currentYear === year ? null : year)}
            title={
              currentYear === year
                ? "Remove year filter"
                : `Filter by year: ${year}`
            }
            className={cn(
              buttonVariants({ variant: "outline" }),
              currentYear === year && "border-fd-primary",
            )}
          >
            <LuCalendar /> {year} ({count})
          </Link>
        ))}

      <FaGripLinesVertical className="text-fd-muted-foreground" />

      <Link
        href={createUrl("order", currentOrder === "desc" ? "asc" : "desc")}
        title={
          currentOrder === "desc"
            ? "Switch to oldest first"
            : "Switch to newest first"
        }
        className={buttonVariants({ variant: "outline" })}
      >
        {currentOrder === "desc" ? (
          <>
            <LuArrowDownWideNarrow /> Newest
          </>
        ) : (
          <>
            <LuArrowUpNarrowWide /> Oldest
          </>
        )}
      </Link>
    </div>
  );
}
