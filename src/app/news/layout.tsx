import { ReactNode } from "react";
import { newsSource } from "@/lib/source";
import { DocsLayout } from "@/components/fumadocs-ui/DocsLayout";
import config from "@/cha-folio.config";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <DocsLayout {...config.layout} tree={newsSource.pageTree}>
      {children}
    </DocsLayout>
  );
}
