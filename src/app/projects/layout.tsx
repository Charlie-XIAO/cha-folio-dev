import { ReactNode } from "react";
import { projectsSource } from "@/lib/source";
import { DocsLayout } from "@/components/fumadocs-ui/DocsLayout";
import config from "@/cha-folio.config";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <DocsLayout {...config.layout} tree={projectsSource.pageTree}>
      {children}
    </DocsLayout>
  );
}
