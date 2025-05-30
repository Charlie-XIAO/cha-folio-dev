import { BaseLayoutProps } from "fumadocs-ui/layouts/shared";
import { FaBlog } from "react-icons/fa6";
import { ChaImage } from "@/components/ChaImage";
import { LuBookOpen, LuFolderOpen, LuRss } from "react-icons/lu";
import { RiGitRepositoryLine } from "react-icons/ri";
import config from "@/cha-folio.config";

export const baseOptions: BaseLayoutProps = {
  githubUrl: "https://github.com/Charlie-XIAO/cha-folio",
  nav: {
    title: (
      <>
        {config.avatar && (
          <ChaImage
            image={config.avatar}
            width={30}
            height={30}
            className="rounded-full"
          />
        )}
        <span>{config.name}</span>
      </>
    ),
  },
  links: [
    {
      icon: <FaBlog />,
      text: "Blog",
      url: "/posts",
      active: "nested-url",
    },
    {
      icon: <LuFolderOpen />,
      text: "Projects",
      url: "/projects",
      active: "nested-url",
    },
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
      type: "menu",
      text: "CV",
      items: [
        {
          text: "English",
          url: "/pdf/blank.pdf",
        },
        {
          text: "中文",
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
