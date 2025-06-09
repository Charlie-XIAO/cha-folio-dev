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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../shadcn-ui/DropdownMenu";
import { ScrollArea } from "../shadcn-ui/ScrollArea";

const navItemVariants = cva(
  "inline-flex items-center gap-1 px-2 py-1 text-fd-muted-foreground transition-colors hover:text-fd-accent-foreground data-[active=true]:text-fd-primary [&_svg]:size-4",
);

export function Navbar({
  className,
  style,
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
          "fixed top-(--fd-banner-height) z-40 box-content backdrop-blur-lg -translate-x-1/2 border-b transition-colors *:mx-auto *:max-w-fd-container",
          value.length > 0 ? "shadow-lg" : "shadow-sm",
          (!isTransparent || value.length > 0) && "bg-fd-background/80",
          className,
        )}
        style={{
          width: "calc(100% - var(--removed-body-scroll-bar-size, 0px))",
          left: "calc(50% - var(--removed-body-scroll-bar-size, 0px) / 2)",
          ...style,
        }}
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

export const NavbarMenu = DropdownMenu;

export function NavbarMenuContent({
  className,
  children,
  ...props
}: ComponentProps<typeof NavigationMenuContent>) {
  return (
    <DropdownMenuContent
      align="start"
      onCloseAutoFocus={(e) => e.preventDefault()}
      {...props}
      className={cn("hidden sm:flex flex-col p-2 bg-fd-background", className)}
      asChild
    >
      <ScrollArea className="max-h-[60vh] max-w-[30vw]">{children}</ScrollArea>
    </DropdownMenuContent>
  );
}

export function NavbarMenuTrigger({
  className,
  children,
  ...props
}: ComponentProps<typeof NavigationMenuTrigger>) {
  return (
    <DropdownMenuTrigger
      {...props}
      className={cn(
        navItemVariants(),
        "group rounded-md cursor-pointer data-[state=open]:text-fd-accent-foreground",
        className,
      )}
    >
      {children}
      <FaCaretDown className="ml-0.5 size-3! transition duration-300 group-data-[state=open]:rotate-180" />
    </DropdownMenuTrigger>
  );
}

export function NavbarMenuLink({ className, children, ...props }: LinkProps) {
  return (
    <DropdownMenuItem asChild>
      <Link
        {...props}
        className={cn(
          "flex flex-wrap px-3! cursor-pointer bg-fd-card text-fd-muted-foreground transition-colors hover:bg-fd-accent/80 hover:text-fd-accent-foreground",
          className,
        )}
      >
        {children}
      </Link>
    </DropdownMenuItem>
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
