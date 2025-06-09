import { ReactNode } from "react";
import { postsSource } from "@/lib/source";
import { DocsLayout } from "@/components/fumadocs-ui/DocsLayout";
import config from "@/cha-folio.config";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <DocsLayout {...config.layout} tree={postsSource.pageTree}>
      {children}
    </DocsLayout>
  );
}
