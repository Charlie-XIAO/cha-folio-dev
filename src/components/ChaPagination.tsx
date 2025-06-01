/**
 * References:
 * https://nextjs.org/learn/dashboard-app/adding-search-and-pagination#adding-pagination
 * https://github.com/mui/material-ui/blob/661b217a137e03177d46ace14b2c108b41d176c0/packages/mui-material/src/usePagination/usePagination.js
 */

"use client";

import { ComponentProps } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "./ui/Pagination";
import { usePathname, useSearchParams } from "next/navigation";

function range(start: number, end: number) {
  const length = end - start + 1;
  return Array.from({ length }, (_, i) => i + start);
}

function useChaPagination(
  currentPage: number,
  count: number,
  boundaryCount: number = 1,
  siblingCount: number = 1,
) {
  const startPages = range(1, Math.min(boundaryCount, count));
  const endPages = range(
    Math.max(count - boundaryCount + 1, boundaryCount + 1),
    count,
  );

  const siblingsStart = Math.max(
    Math.min(
      currentPage - siblingCount,
      count - boundaryCount - siblingCount * 2 - 1,
    ),
    boundaryCount + 2,
  );
  const siblingsEnd = Math.min(
    Math.max(currentPage + siblingCount, boundaryCount + siblingCount * 2 + 2),
    count - boundaryCount - 1,
  );

  return [
    ...startPages,
    ...(siblingsStart > boundaryCount + 2
      ? [-1]
      : boundaryCount + 1 < count - boundaryCount
        ? [boundaryCount + 1]
        : []),
    ...range(siblingsStart, siblingsEnd),
    ...(siblingsEnd < count - boundaryCount - 1
      ? [-1]
      : count - boundaryCount > boundaryCount
        ? [count - boundaryCount]
        : []),
    ...endPages,
  ];
}

export type ChaPaginationProps = ComponentProps<typeof Pagination> & {
  count: number;
  boundaryCount?: number;
  siblingCount?: number;
};

export function ChaPagination({
  count,
  boundaryCount,
  siblingCount,
  ...props
}: ChaPaginationProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;

  const createPageUrl = (page: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", page.toString());
    return `${pathname}?${params.toString()}`;
  };

  const pages = useChaPagination(
    currentPage,
    count,
    boundaryCount,
    siblingCount,
  );

  const prevPage = Math.max(currentPage - 1, 1);
  const nextPage = Math.min(currentPage + 1, count);

  return (
    <Pagination {...props}>
      <PaginationPrevious
        href={createPageUrl(prevPage)}
        disabled={currentPage === 1}
      />
      <PaginationContent>
        {pages.map((page, index) =>
          page === -1 ? (
            <PaginationItem key={`ellipsis-${index}`}>
              <PaginationEllipsis />
            </PaginationItem>
          ) : (
            <PaginationItem key={page}>
              <PaginationLink
                href={createPageUrl(page)}
                isActive={page === currentPage}
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          ),
        )}
      </PaginationContent>
      <PaginationNext
        href={createPageUrl(nextPage)}
        disabled={currentPage === count}
      />
    </Pagination>
  );
}
