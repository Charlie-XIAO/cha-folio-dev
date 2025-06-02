"use client";

import { ComponentProps, useState } from "react";
import { cva, VariantProps } from "class-variance-authority";
import Link, { LinkProps } from "fumadocs-core/link";
import { cn } from "fumadocs-ui/utils/cn";
import { BaseLinkItem } from "fumadocs-ui/layouts/links";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "fumadocs-ui/components/ui/navigation-menu";
import { useNav } from "fumadocs-ui/contexts/layout";
import { buttonVariants } from "fumadocs-ui/components/ui/button";
import { FaCaretDown } from "react-icons/fa6";

const navItemVariants = cva(
  "inline-flex items-center gap-1 px-2 py-1 text-fd-muted-foreground transition-colors hover:text-fd-accent-foreground data-[active=true]:text-fd-primary [&_svg]:size-4",
);

export function Navbar({
  className,
  children,
  ...props
}: ComponentProps<"div">) {
  const [value, setValue] = useState("");
  const { isTransparent } = useNav();

  return (
    <NavigationMenu value={value} onValueChange={setValue} asChild>
      <header
        id="nd-nav"
        {...props}
        className={cn(
          "fixed top-(--fd-banner-height) z-40 inset-x-0 backdrop-blur-lg border-b transition-colors *:mx-auto *:max-w-fd-container",
          value.length > 0 ? "shadow-lg" : "shadow-sm",
          (!isTransparent || value.length > 0) && "bg-fd-background/80",
          className,
        )}
      >
        <NavigationMenuList
          className="flex h-14 w-full items-center px-4"
          asChild
        >
          <nav>{children}</nav>
        </NavigationMenuList>
        <NavigationMenuViewport className="text-fd-popover-foreground" />
      </header>
    </NavigationMenu>
  );
}

export const NavbarMenu = NavigationMenuItem;

export function NavbarMenuContent({
  className,
  children,
  ...props
}: ComponentProps<typeof NavigationMenuContent>) {
  return (
    <NavigationMenuContent
      {...props}
      className={cn(
        "grid grid-cols-1 gap-2 p-4 md:grid-cols-2 lg:grid-cols-3",
        className,
      )}
    >
      {children}
    </NavigationMenuContent>
  );
}

export function NavbarMenuTrigger({
  className,
  children,
  ...props
}: ComponentProps<typeof NavigationMenuTrigger>) {
  return (
    <NavigationMenuTrigger
      {...props}
      className={cn(navItemVariants(), "group rounded-md", className)}
    >
      {children}
      <FaCaretDown className="ml-0.5 size-3! transition duration-300 group-data-[state=open]:rotate-180" />
    </NavigationMenuTrigger>
  );
}

export function NavbarMenuLink({ className, children, ...props }: LinkProps) {
  return (
    <NavigationMenuLink asChild>
      <Link
        {...props}
        className={cn(
          "flex flex-col gap-2 rounded-lg border bg-fd-card p-3 transition-colors hover:bg-fd-accent/80 hover:text-fd-accent-foreground",
          className,
        )}
      >
        {children}
      </Link>
    </NavigationMenuLink>
  );
}

const linkVariants = cva("", {
  variants: {
    variant: {
      main: navItemVariants(),
      button: buttonVariants({
        color: "secondary",
        className: "gap-1.5 [&_svg]:size-4",
      }),
      icon: buttonVariants({
        color: "ghost",
        size: "icon",
      }),
    },
  },
  defaultVariants: {
    variant: "main",
  },
});

export function NavbarLink({
  item,
  variant,
  className,
  children,
  ...props
}: ComponentProps<typeof BaseLinkItem> & VariantProps<typeof linkVariants>) {
  return (
    <NavigationMenuItem>
      <NavigationMenuLink asChild>
        <BaseLinkItem
          {...props}
          item={item}
          className={cn(linkVariants({ variant }), className)}
        >
          {children}
        </BaseLinkItem>
      </NavigationMenuLink>
    </NavigationMenuItem>
  );
}
