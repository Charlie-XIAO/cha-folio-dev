import { RootProvider } from "fumadocs-ui/provider";
import { Inter } from "next/font/google";
import { ChaScrollToTop } from "@/components/ChaScrollToTop";
import { ReactNode } from "react";
import config from "@/cha-folio.config";
import "./global.css";
import "katex/dist/katex.css";

const inter = Inter({ subsets: ["latin"] });

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={inter.className} suppressHydrationWarning>
      <body className="flex flex-col min-h-screen">
        <RootProvider search={{ options: { type: "static" } }}>
          {children}
          <ChaScrollToTop />
        </RootProvider>
      </body>
    </html>
  );
}

export const metadata = config.metadata;
