import { cn } from "fumadocs-ui/utils/cn";

interface ChaFooterProps {
  type: "home" | "docs";
}

export const ChaFooter = (props: ChaFooterProps) => {
  return (
    <div
      className={cn(
        "prose text-sm py-8 text-fd-muted-foreground [--color-fd-primary:var(--color-fd-muted-foreground)]",
        props.type === "home" && "mt-auto text-center border-t",
      )}
    >
      &copy; Copyright 2025 Yao Xiao. Powered by{" "}
      <a href="https://fumadocs.dev/">Fumadocs</a> with{" "}
      <a href="https://github.com/Charlie-XIAO/cha-folio">cha-folio</a> theme.
    </div>
  );
};
