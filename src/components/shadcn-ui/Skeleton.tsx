import { cn } from "fumadocs-ui/utils/cn";
import { ComponentProps } from "react";

function Skeleton({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      data-slot="skeleton"
      className={cn("bg-fd-accent animate-pulse rounded-md", className)}
      {...props}
    />
  );
}

export { Skeleton };
