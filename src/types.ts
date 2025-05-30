import { GiscusProps } from "@giscus/react";
import { Metadata } from "next";
import { ReactNode } from "react";

export type ChaImageDef =
  | string
  | { src: string; alt?: string }
  | { light: string; dark: string; alt?: string };

export type ChaSocialLink = { type: "github"; link: string };

export interface ChaFolioConfig {
  name: string;
  metadata: Metadata;
  avatar?: ChaImageDef;
  copyright?: string;
  giscus?: GiscusProps;

  pages?: {
    home?: {
      title?: ReactNode;
      description?: ReactNode;
      image?: ChaImageDef;
      showNews?: boolean | number;
      showPosts?: boolean | number;
      showPublications?: boolean;
    };
    news?: {
      title?: ReactNode;
      description?: ReactNode;
    };
    posts?: {
      title?: ReactNode;
      description?: ReactNode;
    };
    projects?: {
      title?: ReactNode;
      description?: ReactNode;
      groupByCategories?: boolean | string[];
    };
    publications?: {
      title?: ReactNode;
      description?: ReactNode;
      groupByYears?: boolean;
    };
    repositories?: {
      title?: ReactNode;
      description?: ReactNode;
      username?: string | string[];
      repositories?: string[];
    };
  };
}

export function defineChaFolioConfig(config: ChaFolioConfig): ChaFolioConfig {
  return config;
}
