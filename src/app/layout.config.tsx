import { BaseLayoutProps } from "fumadocs-ui/layouts/shared";
import Image from "next/image";
import { FaBlog } from "react-icons/fa6";

export const baseOptions: BaseLayoutProps = {
  githubUrl: "https://github.com/Charlie-XIAO/cha-folio",
  nav: {
    title: (
      <span className="inline-flex items-center gap-3">
        <Image
          src="/images/logo-light.png"
          alt="avatar"
          width={30}
          height={30}
          className="rounded-full block dark:hidden"
        />
        <Image
          src="/images/logo-dark.png"
          alt="avatar"
          width={30}
          height={30}
          className="rounded-full hidden dark:block"
        />
        <span>cha-folio</span>
      </span>
    ),
  },
  links: [
    {
      icon: <FaBlog />,
      text: "Blog",
      url: "/posts",
      active: "nested-url",
    },
  ],
  themeSwitch: {
    mode: "light-dark",
  },
};
