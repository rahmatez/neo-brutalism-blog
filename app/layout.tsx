import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import type { ReactNode } from "react";
import { NeoProvider } from "@/components/neo-provider";
import { CommandSearchProvider } from "@/components/command-search";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { getAllPosts } from "@/lib/posts";
import { toSearchablePost } from "@/lib/search";
import { siteConfig } from "@/lib/site";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#fef08a"
};

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`
  },
  description: siteConfig.description,
  openGraph: {
    type: "website",
    locale: "id_ID",
    siteName: siteConfig.name,
    title: siteConfig.name,
    description: siteConfig.description
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description
  },
  alternates: {
    types: {
      "application/rss+xml": [{ url: "/feed.xml", title: `${siteConfig.name} RSS` }]
    }
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: ReactNode;
}>) {
  const searchPosts = getAllPosts().map(toSearchablePost);

  return (
    <html lang="id" suppressHydrationWarning>
      <body className={inter.className} suppressHydrationWarning>
        <NeoProvider>
          <CommandSearchProvider posts={searchPosts}>
            <main className="mx-auto w-full min-w-0 max-w-6xl px-3 py-6 sm:px-4 md:px-8 md:py-8">
              <SiteHeader />
              {children}
              <SiteFooter />
            </main>
          </CommandSearchProvider>
        </NeoProvider>
      </body>
    </html>
  );
}
