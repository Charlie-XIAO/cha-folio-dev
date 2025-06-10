import { Link } from "fumadocs-core/framework";
import { defineChaFolioConfig } from "./types";
import { ChaImage } from "./components/ChaImage";
import { LuBookOpen, LuFileText, LuFolderOpen, LuRss } from "react-icons/lu";
import { RiGitRepositoryLine } from "react-icons/ri";
import { FaBlog } from "react-icons/fa6";
import { BASE_PATH } from "./consts";

export default defineChaFolioConfig({
  name: "cha-folio",
  socialLinks: [
    { type: "email", email: "yx2436@nyu.edu" },
    { type: "github", username: "Charlie-XIAO" },
    { type: "wechat", qr: "/images/wechat-qr.jpg" },
    { type: "rss" },
    {
      type: "custom",
      icon: (
        <ChaImage
          image={{
            light: "/images/logo-light.png",
            dark: "/images/logo-dark.png",
          }}
          width={30}
          height={30}
        />
      ),
      url: "/",
      title: "Home",
    },
  ],
  copyright: "© Copyright 2025 Yao Xiao",
  metadata: {
    title: "cha-folio",
    description: "A Fumadocs theme for portfolio websites",
    icons: {
      icon: [
        {
          media: "(perfer-color-scheme: light)",
          type: "image/png",
          url: `${BASE_PATH}/images/logo-light.png`,
        },
        {
          media: "(prefers-color-scheme: dark)",
          type: "image/png",
          url: `${BASE_PATH}/images/logo-dark.png`,
        },
      ],
    },
  },
  giscus: {
    repo: "Charlie-XIAO/cha-folio",
    repoId: "R_kgDOOw-AuQ",
    category: "Comments",
    categoryId: "DIC_kwDOOw-Auc4CqnKk",
    mapping: "title",
    strict: "1",
    reactionsEnabled: "1",
    emitMetadata: "0",
    inputPosition: "top",
    theme: "preferred_color_scheme",
    lang: "en",
    loading: "lazy",
  },
  layout: {
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
        text: "More",
        type: "menu",
        items: [
          {
            icon: <RiGitRepositoryLine />,
            text: "Repositories",
            url: "/repositories",
            active: "nested-url",
          },
          {
            icon: <LuFileText />,
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
  },
  pages: {
    home: {
      description: "A Fumadocs theme for portfolio websites",
      image: "/images/profile.jpg",
    },
    news: {},
    blog: {
      title: "cha-folio",
      description: "A Fumadocs theme for portfolio websites",
    },
    projects: {
      groupByCategories: ["Documentation", "Tests"],
    },
    publications: {
      description: (
        <>
          Dummy entries and examples taken from{" "}
          <Link href="https://www.bibtex.com/e/entry-types/">
            this BibTeX guide
          </Link>{" "}
          for testing and demo purposes.
        </>
      ),
      matchedNames: {
        family: ["Xiao"],
        given: ["Yao", /^Y\.?$/],
      },
    },
    repositories: {
      username: "Charlie-XIAO",
      repositories: [
        "Charlie-XIAO/cha-folio",
        "Charlie-XIAO/Charlie-XIAO.github.io",
        "fuma-nama/fumadocs",
        "alshedivat/al-folio",
      ],
    },
  },
});
