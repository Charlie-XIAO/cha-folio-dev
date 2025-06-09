import { PageTree } from "fumadocs-core/server";
import { BaseLayoutProps, getLinks } from "fumadocs-ui/layouts/shared";
import { TreeContextProvider } from "fumadocs-ui/provider";
import { cn } from "fumadocs-ui/utils/cn";
import { HTMLAttributes, useMemo } from "react";
import { Header } from "@/components/fumadocs-ui/Header";

export interface DocsLayoutProps extends BaseLayoutProps {
  tree: PageTree.Root;
  containerProps?: HTMLAttributes<HTMLDivElement>;
}

export function DocsLayout({
  nav = {},
  links,
  githubUrl,
  tree,
  containerProps,
  children,
}: DocsLayoutProps) {
  const finalLinks = useMemo(
    () => getLinks(links ?? [], githubUrl),
    [links, githubUrl],
  );

  return (
    <TreeContextProvider tree={tree}>
      <main
        id="nd-docs-layout"
        {...containerProps}
        className={cn(
          "flex flex-1 flex-row pe-(--fd-layout-offset) [--fd-nav-height:3.5rem] xl:[--fd-toc-width:286px]",
          containerProps?.className,
        )}
      >
        <Header nav={nav} links={finalLinks} />
        {children}
      </main>
    </TreeContextProvider>
  );
}
