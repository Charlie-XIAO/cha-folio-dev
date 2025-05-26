import { RootProvider } from "fumadocs-ui/provider";
import { Metadata } from "next";
import { Inter } from "next/font/google";
import { ReactNode } from "react";
import "./global.css";
import "katex/dist/katex.css";

const inter = Inter({ subsets: ["latin"] });

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={inter.className} suppressHydrationWarning>
      <body className="flex flex-col min-h-screen">
        <RootProvider>{children}</RootProvider>
      </body>
    </html>
  );
}

export const metadata: Metadata = {
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
};
