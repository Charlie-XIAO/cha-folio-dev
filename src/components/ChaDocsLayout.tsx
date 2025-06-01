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
import { ChaHeader } from "./ChaHeader";

export interface ChaDocsLayoutProps extends BaseLayoutProps {
  tree: PageTree.Root;
  containerProps?: HTMLAttributes<HTMLDivElement>;
}

export function ChaDocsLayout({
  nav = {},
  links,
  githubUrl,
  ...props
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
    <TreeContextProvider tree={props.tree}>
      <main
        id="nd-docs-layout"
        {...props.containerProps}
        className={cn(
          "flex flex-1 flex-row pe-(--fd-layout-offset) [--fd-nav-height:3.5rem] [--fd-tocnav-height:36px] xl:[--fd-toc-width:286px] xl:[--fd-tocnav-height:0px]",
          props.containerProps?.className,
        )}
        style={{
          ...layoutVariables,
          ...props.containerProps?.style,
        }}
      >
        <ChaHeader nav={nav} links={finalLinks} />
        <StylesProvider {...pageStyles}>{props.children}</StylesProvider>
      </main>
    </TreeContextProvider>
  );
}
