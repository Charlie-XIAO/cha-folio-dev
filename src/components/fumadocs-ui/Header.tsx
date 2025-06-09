import { Fragment, HTMLAttributes, useMemo } from "react";
import {
  BaseLayoutProps,
  getLinks,
  NavOptions,
  slot,
  slots,
} from "fumadocs-ui/layouts/shared";
import { cn } from "fumadocs-ui/utils/cn";
import { NavProvider } from "fumadocs-ui/contexts/layout";
import {
  Navbar,
  NavbarLink,
  NavbarMenu,
  NavbarMenuContent,
  NavbarMenuLink,
  NavbarMenuTrigger,
} from "./Navbar";
import { LinkItemType } from "fumadocs-ui/layouts/links";
import {
  LargeSearchToggle,
  SearchToggle,
} from "fumadocs-ui/components/layout/search-toggle";
import { ThemeToggle } from "fumadocs-ui/components/layout/theme-toggle";
import {
  LanguageToggle,
  LanguageToggleText,
} from "fumadocs-ui/components/layout/language-toggle";
import { LuChevronDown, LuLanguages } from "react-icons/lu";
import Link from "fumadocs-core/link";
import { Menu, MenuContent, MenuLinkItem, MenuTrigger } from "./Menu";
import { buttonVariants } from "fumadocs-ui/components/ui/button";

export interface HomeLayoutProps extends BaseLayoutProps {
  nav?: Partial<NavOptions & { enableHoverToOpen?: boolean }>;
}

export function HomeLayout({
  nav,
  links,
  githubUrl,
  i18n,
  disableThemeSwitch = false,
  themeSwitch = { enabled: !disableThemeSwitch },
  searchToggle,
  className,
  children,
  ...props
}: HomeLayoutProps & HTMLAttributes<HTMLElement>) {
  return (
    <NavProvider transparentMode={nav?.transparentMode}>
      <main
        id="nd-home-layout"
        {...props}
        className={cn("flex flex-1 flex-col pt-14", className)}
      >
        {slot(
          nav,
          <Header
            links={links}
            nav={nav}
            themeSwitch={themeSwitch}
            searchToggle={searchToggle}
            i18n={i18n}
            githubUrl={githubUrl}
          />,
        )}
        {children}
      </main>
    </NavProvider>
  );
}

export function Header({
  nav = {},
  i18n = false,
  links,
  githubUrl,
  themeSwitch,
  searchToggle,
}: HomeLayoutProps) {
  const finalLinks = useMemo(
    () => getLinks(links, githubUrl),
    [links, githubUrl],
  );

  const navItems = finalLinks.filter((item) =>
    ["nav", "all"].includes(item.on ?? "all"),
  );
  const menuItems = finalLinks.filter((item) =>
    ["menu", "all"].includes(item.on ?? "all"),
  );

  return (
    <Navbar>
      <Link
        href={nav.url ?? "/"}
        className="inline-flex items-center gap-2.5 font-semibold"
      >
        {nav.title}
      </Link>
      {nav.children}
      <ul className="flex flex-row items-center gap-2 px-6 max-sm:hidden">
        {navItems
          .filter((item) => !isSecondary(item))
          .map((item, i) => (
            <NavbarLinkItem key={i} item={item} />
          ))}
      </ul>
      <div className="flex flex-row items-center justify-end gap-1.5 flex-1">
        {slots(
          "sm",
          searchToggle,
          <SearchToggle className="p-2 lg:hidden" hideIfDisabled />,
        )}
        {slots(
          "lg",
          searchToggle,
          <LargeSearchToggle
            className="w-full rounded-full ps-2.5 max-w-[240px] max-lg:hidden"
            hideIfDisabled
          />,
        )}
        {slot(
          themeSwitch,
          <ThemeToggle className="max-lg:hidden" mode={themeSwitch?.mode} />,
        )}
        {i18n ? (
          <LanguageToggle className="max-lg:hidden">
            <LuLanguages className="size-5" />
          </LanguageToggle>
        ) : null}
      </div>
      <ul className="flex flex-row items-center lg:gap-1.5 lg:ml-1.5">
        {navItems.filter(isSecondary).map((item, i) => (
          <NavbarLinkItem
            key={i}
            item={item}
            className="-me-1.5 max-lg:hidden"
          />
        ))}
        <Menu className="lg:hidden">
          <MenuTrigger
            aria-label="Toggle Menu"
            className={cn(
              buttonVariants({
                size: "icon",
                color: "ghost",
                className: "group -me-1.5",
              }),
            )}
            enableHover={nav.enableHoverToOpen}
          >
            <LuChevronDown className="!size-5.5 transition-transform duration-300 group-data-[state=open]:rotate-180" />
          </MenuTrigger>
          <MenuContent className="sm:flex-row sm:items-center sm:justify-end">
            {menuItems
              .filter((item) => !isSecondary(item))
              .map((item, i) => (
                <MenuLinkItem key={i} item={item} className="sm:hidden" />
              ))}
            <div className="-ms-1.5 flex flex-row items-center gap-1.5 max-sm:mt-2">
              {menuItems.filter(isSecondary).map((item, i) => (
                <MenuLinkItem key={i} item={item} className="-me-1.5" />
              ))}
              <div role="separator" className="flex-1" />
              {i18n ? (
                <LanguageToggle>
                  <LuLanguages className="size-5" />
                  <LanguageToggleText />
                  <LuChevronDown className="size-3 text-fd-muted-foreground" />
                </LanguageToggle>
              ) : null}
              {slot(themeSwitch, <ThemeToggle mode={themeSwitch?.mode} />)}
            </div>
          </MenuContent>
        </Menu>
      </ul>
    </Navbar>
  );
}

function NavbarLinkItem({
  item,
  ...props
}: {
  item: LinkItemType;
  className?: string;
}) {
  if (item.type === "custom") return <div {...props}>{item.children}</div>;

  if (item.type === "menu") {
    const children = item.items.map((child, j) => {
      if (child.type === "custom")
        return <Fragment key={j}>{child.children}</Fragment>;

      const {
        banner = child.icon ? (
          <div className="[&_svg]:size-4">{child.icon}</div>
        ) : null,
        ...rest
      } = child.menu ?? {};

      return (
        <NavbarMenuLink
          key={j}
          href={child.url}
          external={child.external}
          {...rest}
        >
          {rest.children ?? (
            <>
              {banner}
              <p className="text-[15px]">{child.text}</p>
              <p className="text-sm text-fd-muted-foreground empty:hidden">
                {child.description}
              </p>
            </>
          )}
        </NavbarMenuLink>
      );
    });

    return (
      <NavbarMenu modal={false}>
        <NavbarMenuTrigger {...props}>
          {item.url ? <Link href={item.url}>{item.text}</Link> : item.text}
        </NavbarMenuTrigger>
        <NavbarMenuContent>{children}</NavbarMenuContent>
      </NavbarMenu>
    );
  }

  return (
    <NavbarLink
      {...props}
      item={item}
      variant={item.type}
      aria-label={item.type === "icon" ? item.label : undefined}
    >
      {item.type === "icon" ? item.icon : item.text}
    </NavbarLink>
  );
}

function isSecondary(item: LinkItemType): boolean {
  return (
    ("secondary" in item && item.secondary === true) || item.type === "icon"
  );
}
