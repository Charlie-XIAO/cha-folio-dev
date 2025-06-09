import { ReactNode } from "react";
import { HomeLayout } from "fumadocs-ui/layouts/home";
import { ChaFooter } from "@/components/ChaFooter";
import { Header } from "@/components/fumadocs-ui/Header";
import config from "@/cha-folio.config";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <HomeLayout
      {...config.layout}
      nav={{ component: <Header {...config.layout} /> }}
    >
      {children}
      <ChaFooter type="home" />
    </HomeLayout>
  );
}
