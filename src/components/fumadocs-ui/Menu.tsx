"use client";

import { BaseLinkItem, LinkItemType } from "fumadocs-ui/layouts/links";
import { cn } from "fumadocs-ui/utils/cn";
import {
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuTrigger,
} from "fumadocs-ui/components/ui/navigation-menu";
import Link from "fumadocs-core/link";
import { cva } from "class-variance-authority";
import { buttonVariants } from "fumadocs-ui/components/ui/button";
import { ComponentPropsWithoutRef } from "react";

const menuItemVariants = cva("", {
  variants: {
    variant: {
      main: "inline-flex items-center gap-2 py-1 transition-colors hover:text-fd-popover-foreground/50 data-[active=true]:font-medium data-[active=true]:text-fd-primary [&_svg]:size-4",
      icon: buttonVariants({
        size: "icon",
        color: "ghost",
      }),
      button: buttonVariants({
        color: "secondary",
        className: "gap-1.5 [&_svg]:size-4",
      }),
    },
  },
  defaultVariants: {
    variant: "main",
  },
});

export function MenuLinkItem({
  item,
  className,
}: {
  item: LinkItemType;
  className?: string;
}) {
  if (item.type === "custom")
    return <div className={cn("grid", className)}>{item.children}</div>;

  if (item.type === "menu") {
    const header = (
      <>
        {item.icon}
        {item.text}
      </>
    );

    return (
      <div className={cn("mb-4 flex flex-col", className)}>
        <p className="my-2 text-fd-muted-foreground underline underline-offset-4">
          {item.url ? (
            <NavigationMenuLink asChild>
              <Link href={item.url}>{header}</Link>
            </NavigationMenuLink>
          ) : (
            header
          )}
        </p>
        {item.items.map((child, i) => (
          <MenuLinkItem key={i} item={child} />
        ))}
      </div>
    );
  }

  return (
    <NavigationMenuLink asChild>
      <BaseLinkItem
        item={item}
        className={cn(menuItemVariants({ variant: item.type }), className)}
        aria-label={item.type === "icon" ? item.label : undefined}
      >
        {item.icon}
        {item.type === "icon" ? undefined : item.text}
      </BaseLinkItem>
    </NavigationMenuLink>
  );
}

export const Menu = NavigationMenuItem;

export function MenuTrigger({
  enableHover = false,
  children,
  ...props
}: ComponentPropsWithoutRef<typeof NavigationMenuTrigger> & {
  enableHover?: boolean;
}) {
  return (
    <NavigationMenuTrigger
      {...props}
      onPointerMove={enableHover ? undefined : (e) => e.preventDefault()}
    >
      {children}
    </NavigationMenuTrigger>
  );
}

export function MenuContent({
  className,
  children,
  ...props
}: ComponentPropsWithoutRef<typeof NavigationMenuContent>) {
  return (
    <NavigationMenuContent
      {...props}
      className={cn("flex flex-col p-4 pt-2", className)}
    >
      {children}
    </NavigationMenuContent>
  );
}
