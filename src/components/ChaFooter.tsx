import { cn } from "fumadocs-ui/utils/cn";
import config from "@/cha-folio.config";
import { LuDot } from "react-icons/lu";

export interface ChaFooterProps {
  type: "home" | "docs";
}

export function ChaFooter({ type }: ChaFooterProps) {
  return (
    <div
      className={cn(
        "prose space-x-1 text-sm py-8 text-fd-muted-foreground [--color-fd-primary:var(--color-fd-muted-foreground)]",
        type === "home" && "mt-auto border-t text-center",
      )}
    >
      {config.footer === undefined ? (
        <>
          {config.copyright && (
            <>
              <span>{config.copyright}</span>
              <LuDot className="inline" />
            </>
          )}
          <span>
            Powered by <a href="https://fumadocs.dev/">Fumadocs</a> with{" "}
            <a href="https://github.com/Charlie-XIAO/cha-folio">cha-folio</a>{" "}
            theme.
          </span>
        </>
      ) : (
        config.footer
      )}
    </div>
  );
}
