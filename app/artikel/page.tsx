import Link from "next/link";
import { Suspense } from "react";
import { getAllPostSummaries, getCategorySummaries } from "@/lib/posts";
import { SiteBreadcrumb } from "@/components/site-breadcrumb";
import { ArticleListExplorer } from "@/components/article-list-explorer";

export default function ArtikelPage() {
  const posts = getAllPostSummaries();
  const categories = getCategorySummaries();

  return (
    <div>
      <SiteBreadcrumb
        items={[
          { label: "Beranda", href: "/" },
          { label: "Artikel" }
        ]}
      />
      <section className="neo-shell mb-8 p-6">
        <p className="mb-2 text-xs font-black uppercase tracking-widest">Arsip</p>
        <h1 className="text-3xl font-black leading-tight md:text-5xl">Semua Artikel</h1>
        <p className="mt-3 text-zinc-700">
          Total {posts.length} artikel teknis dari berbagai kategori.
        </p>
        <Link
          href="/kategori"
          className="mt-4 inline-flex rounded-md border-2 border-black bg-(--nb-surface) px-3 py-2 text-sm font-bold shadow-[4px_4px_0_var(--nb-shadow)] transition hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none"
        >
          Lihat semua kategori
        </Link>
      </section>

      <Suspense fallback={<p className="text-sm text-zinc-600">Memuat artikel...</p>}>
        <ArticleListExplorer posts={posts} categories={categories} />
      </Suspense>
    </div>
  );
}
