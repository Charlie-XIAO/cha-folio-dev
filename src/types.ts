import { GiscusProps } from "@giscus/react";
import { BaseLayoutProps } from "fumadocs-ui/layouts/shared";
import { Metadata } from "next";
import { ReactNode } from "react";

export type ChaRegexPattern = string | RegExp | (string | RegExp)[];

export type ChaImageDef =
  | string
  | { src: string; alt?: string }
  | { light: string; dark: string; alt?: string };

export type ChaSocialLink =
  | { type: "acm"; id: string }
  | { type: "bilibili"; id: string }
  | { type: "blogger"; url: string }
  | { type: "bluesky"; url: string }
  | { type: "dblp"; url: string }
  | { type: "discord"; id: string }
  | { type: "email"; email: string }
  | { type: "facebook"; id: string }
  | { type: "flickr"; id: string }
  | { type: "github"; username: string }
  | { type: "gitlab"; username: string }
  | { type: "ieee"; id: string }
  | { type: "inspirehep"; id: string }
  | { type: "instagram"; id: string }
  | { type: "kaggle"; id: string }
  | { type: "keybase"; username: string }
  | { type: "lastfm"; id: string }
  | { type: "leetcode"; id: string }
  | { type: "linkedin"; username: string }
  | { type: "mastodon"; username: string }
  | { type: "medium"; username: string }
  | { type: "orcid"; id: string }
  | { type: "osf"; id: string }
  | { type: "pinterest"; id: string }
  | { type: "publons"; id: string }
  | { type: "quora"; username: string }
  | { type: "researchgate"; id: string }
  | { type: "rss" }
  | { type: "scholar"; id: string }
  | { type: "scopus"; id: string }
  | { type: "semanticscholar"; id: string }
  | { type: "spotify"; id: string }
  | { type: "stackoverflow"; id: string }
  | { type: "strava"; id: string }
  | { type: "telegram"; username: string }
  | { type: "unsplash"; id: string }
  | { type: "wechat"; qr: ChaImageDef }
  | { type: "weibo"; qr: ChaImageDef }
  | { type: "whatsapp"; number: string }
  | { type: "wikidata"; id: string }
  | { type: "wikipedia"; id: string }
  | { type: "work"; url: string }
  | { type: "x"; username: string }
  | { type: "xiaohongshu"; qr: ChaImageDef }
  | { type: "youtube"; id: string }
  | { type: "zhihu"; id: string }
  | { type: "zotero"; username: string }
  | { type: "custom"; icon: ReactNode; url: string; title: string };

export interface ChaPagesBaseProps {
  title?: ReactNode;
  description?: ReactNode;
}

export interface ChaPagesHomeProps extends ChaPagesBaseProps {
  image?: ChaImageDef;
  showNews?: boolean | number;
  showPosts?: boolean | number;
  showPublications?: boolean;
}

export interface ChaPagesNewsProps extends ChaPagesBaseProps {}

export interface ChaPagesBlogProps extends ChaPagesBaseProps {}

export interface ChaPagesProjectsProps extends ChaPagesBaseProps {
  groupByCategories?: boolean | string[];
}

export interface ChaPagesPublicationsProps extends ChaPagesBaseProps {
  groupByYears?: boolean;
  matchedNames?: {
    family?: ChaRegexPattern;
    given?: ChaRegexPattern;
    full?: ChaRegexPattern;
  };
}

export interface ChaPagesRepositoriesProps extends ChaPagesBaseProps {
  username?: string | string[];
  repositories?: string[];
}

export interface ChaPagesProps {
  home?: ChaPagesHomeProps;
  news?: ChaPagesNewsProps;
  blog?: ChaPagesBlogProps;
  projects?: ChaPagesProjectsProps;
  publications?: ChaPagesPublicationsProps;
  repositories?: ChaPagesRepositoriesProps;
}

export interface ChaFolioConfig {
  name: string;
  socialLinks?: ChaSocialLink[];
  copyright?: ReactNode;
  footer?: ReactNode;
  giscus?: GiscusProps;
  layout: BaseLayoutProps;
  metadata: Metadata;
  pages?: ChaPagesProps;
}

export function defineChaFolioConfig(config: ChaFolioConfig): ChaFolioConfig {
  return config;
}
