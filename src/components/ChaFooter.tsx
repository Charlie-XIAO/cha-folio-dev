import { cn } from "fumadocs-ui/utils/cn";
import config from "@/cha-folio.config";
import { LuDot } from "react-icons/lu";

export interface ChaFooterProps {
  type: "home" | "docs";
}

export function ChaFooter(props: ChaFooterProps) {
  return (
    <div
      className={cn(
        "prose flex flex-wrap items-center gap-x-2 text-sm py-8 text-fd-muted-foreground [--color-fd-primary:var(--color-fd-muted-foreground)]",
        props.type === "home" && "mt-auto border-t justify-center",
      )}
    >
      {config.copyright && <span>{config.copyright}</span>}
      <LuDot />
      <span>
        Powered by <a href="https://fumadocs.dev/">Fumadocs</a> with{" "}
        <a href="https://github.com/Charlie-XIAO/cha-folio">cha-folio</a> theme.
      </span>
    </div>
  );
}
