import { BaseLayoutProps } from "fumadocs-ui/layouts/shared";
import { FaBlog } from "react-icons/fa6";
import { ChaImage } from "@/components/ChaImage";

export const baseOptions: BaseLayoutProps = {
  githubUrl: "https://github.com/Charlie-XIAO/cha-folio",
  nav: {
    title: (
      <span className="inline-flex items-center gap-3">
        <ChaImage
          image={{
            light: "/images/logo-light.png",
            dark: "/images/logo-dark.png",
            alt: "avatar",
          }}
          width={30}
          height={30}
          className="rounded-full"
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
