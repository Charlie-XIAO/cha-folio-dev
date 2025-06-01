import { Link } from "fumadocs-core/framework";
import { defineChaFolioConfig } from "./types";

export default defineChaFolioConfig({
  name: "cha-folio",
  metadata: {
    title: "cha-folio",
    description: "A Fumadocs theme for portfolio websites",
    icons: {
      icon: [
        {
          media: "(perfer-color-scheme: light)",
          type: "image/png",
          url: "/images/logo-light.png",
        },
        {
          media: "(prefers-color-scheme: dark)",
          type: "image/png",
          url: "/images/logo-dark.png",
        },
      ],
    },
  },
  avatar: {
    light: "/images/logo-light.png",
    dark: "/images/logo-dark.png",
  },
  copyright: "© Copyright 2025 Yao Xiao",
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
  pages: {
    home: {
      description: "A Fumadocs theme for portfolio websites",
      image: "/images/profile.jpg",
    },
    news: {},
    posts: {
      title: "cha-folio",
      description: "A Fumadocs theme for portfolio websites",
    },
    projects: {},
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
