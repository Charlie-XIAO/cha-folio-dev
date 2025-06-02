import { BaseLayoutProps } from "fumadocs-ui/layouts/shared";
import { FaBlog } from "react-icons/fa6";
import { ChaImage } from "@/components/ChaImage";
import { LuBookOpen, LuFolderOpen, LuRss } from "react-icons/lu";
import { RiGitRepositoryLine } from "react-icons/ri";

export const baseOptions: BaseLayoutProps = {
  githubUrl: "https://github.com/Charlie-XIAO/cha-folio",
  nav: {
    title: (
      <>
        <ChaImage
          image={{
            light: "/images/logo-light.png",
            dark: "/images/logo-dark.png",
          }}
          width={30}
          height={30}
          className="rounded-full"
        />
        <span>cha-folio</span>
      </>
    ),
  },
  links: [
    {
      icon: <FaBlog />,
      text: "Blog",
      url: "/blog",
      active: "nested-url",
    },
    {
      icon: <LuFolderOpen />,
      text: "Projects",
      url: "/projects",
      active: "nested-url",
    },
    {
      text: "More",
      type: "menu",
      items: [
        {
          icon: <LuBookOpen />,
          text: "Publications",
          url: "/publications",
          active: "nested-url",
        },
        {
          icon: <RiGitRepositoryLine />,
          text: "Repositories",
          url: "/repositories",
          active: "nested-url",
        },
        {
          text: "CV",
          url: "/pdf/blank.pdf",
        },
      ],
    },
    {
      type: "icon",
      icon: <LuRss />,
      text: "RSS",
      url: "/api/feed.xml",
      active: "url",
    },
  ],
  themeSwitch: {
    mode: "light-dark",
  },
};
