import { ReactNode } from "react";
import { HomeLayout } from "fumadocs-ui/layouts/home";
import { baseOptions } from "@/app/layout.config";
import { ChaFooter } from "@/components/ChaFooter";
import { ChaHeader } from "@/components/ChaHeader";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <HomeLayout
      {...baseOptions}
      nav={{ component: <ChaHeader {...baseOptions} /> }}
    >
      {children}
      <ChaFooter type="home" />
    </HomeLayout>
  );
}
