import { PageTree } from "fumadocs-core/server";
import { layoutVariables } from "fumadocs-ui/layouts/docs/shared";
import { BaseLayoutProps, getLinks } from "fumadocs-ui/layouts/shared";
import {
  PageStyles,
  StylesProvider,
  TreeContextProvider,
} from "fumadocs-ui/provider";
import { cn } from "fumadocs-ui/utils/cn";
import { HTMLAttributes, useMemo } from "react";
import { Header } from "@/components/fumadocs-ui/Header";

export interface ChaDocsLayoutProps extends BaseLayoutProps {
  tree: PageTree.Root;
  containerProps?: HTMLAttributes<HTMLDivElement>;
}

export function ChaDocsLayout({
  nav = {},
  links,
  githubUrl,
  tree,
  containerProps,
  children,
}: ChaDocsLayoutProps) {
  const finalLinks = useMemo(
    () => getLinks(links ?? [], githubUrl),
    [links, githubUrl],
  );

  const pageStyles: PageStyles = {
    tocNav: cn("xl:hidden"),
    toc: cn("max-xl:hidden"),
    page: cn("mt-(--fd-nav-height)"),
    article: cn("mx-auto"),
  };

  return (
    <TreeContextProvider tree={tree}>
      <main
        id="nd-docs-layout"
        {...containerProps}
        className={cn(
          "flex flex-1 flex-row pe-(--fd-layout-offset) [--fd-nav-height:3.5rem] [--fd-tocnav-height:36px] xl:[--fd-toc-width:286px] xl:[--fd-tocnav-height:0px]",
          containerProps?.className,
        )}
        style={{
          ...layoutVariables,
          ...containerProps?.style,
        }}
      >
        <Header nav={nav} links={finalLinks} />
        <StylesProvider {...pageStyles}>{children}</StylesProvider>
      </main>
    </TreeContextProvider>
  );
}
