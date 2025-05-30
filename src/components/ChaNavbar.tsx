/**
 * Customization of the Fumadocs navbar component.
 *
 * References:
 * https://github.com/fuma-nama/fumadocs/blob/a60920c13855844352e90abafaa1b7b55c946105/packages/ui/src/layouts/home/navbar.tsx
 * https://github.com/RUNFUNRUN/blog/blob/7b3ebde07c97a17780db8888b2aafe8a26c2b7e5/src/components/navbar.tsx
 */

"use client";

import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuViewport,
} from "fumadocs-ui/components/ui/navigation-menu";
import { useNav } from "fumadocs-ui/provider";
import { cn } from "fumadocs-ui/utils/cn";
import { HTMLAttributes, useState } from "react";

export const ChaNavbar = (props: HTMLAttributes<HTMLElement>) => {
  const [value, setValue] = useState("");
  const { isTransparent } = useNav();

  return (
    <NavigationMenu value={value} onValueChange={setValue} asChild>
      <header
        id="nd-nav"
        {...props}
        className={cn(
          "fixed top-(--fd-banner-height) z-40 box-content backdrop-blur-lg -translate-x-1/2 border-b transition-colors",
          value.length > 0 ? "shadow-lg" : "shadow-sm",
          (!isTransparent || value.length > 0) && "bg-fd-background/80",
          props.className,
        )}
        style={{
          width: "calc(100% - var(--removed-body-scroll-bar-size, 0px))",
          left: "calc(50% - var(--removed-body-scroll-bar-size, 0px) / 2)",
          ...props.style,
        }}
      >
        <NavigationMenuList
          className="flex h-14 w-full items-center px-4 md:px-6"
          asChild
        >
          <nav>{props.children}</nav>
        </NavigationMenuList>
        <NavigationMenuViewport />
      </header>
    </NavigationMenu>
  );
};
