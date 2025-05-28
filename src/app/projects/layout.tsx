import { ReactNode } from "react";
import { baseOptions } from "@/app/layout.config";
import { projectsSource } from "@/lib/source";
import { ChaDocsLayout } from "@/components/ChaDocsLayout";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <ChaDocsLayout {...baseOptions} tree={projectsSource.pageTree}>
      {children}
    </ChaDocsLayout>
  );
}
