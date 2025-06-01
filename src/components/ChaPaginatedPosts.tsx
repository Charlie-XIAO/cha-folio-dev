"use client";

import { PostData } from "@/lib/posts.data";
import { useSearchParams } from "next/navigation";
import { HTMLAttributes } from "react";
import { ChaPostCard } from "./ChaPostCard";
import { ChaPagination } from "./ChaPagination";

export interface ChaPaginatedPostsProps extends HTMLAttributes<HTMLDivElement> {
  posts: PostData[];
}

export function ChaPaginatedPosts({ posts, ...props }: ChaPaginatedPostsProps) {
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;

  const pageSize = 5;
  const start = (currentPage - 1) * pageSize;
  const end = start + pageSize;
  const count = Math.max(Math.ceil(posts.length / pageSize), 1);

  return (
    <div {...props}>
      <div className="text-fd-muted-foreground text-sm mb-4">
        {posts.length === 0
          ? "No posts"
          : `Showing ${start + 1}~${Math.min(end, posts.length)} of ${posts.length} posts`}
      </div>

      <ul className="flex flex-col gap-4">
        {posts.slice(start, end).map((post) => (
          <li key={post.url} className="w-full">
            <ChaPostCard {...post} />
          </li>
        ))}
      </ul>

      <ChaPagination count={count} className="mt-8" />
    </div>
  );
}
