import Link from "next/link";
import { getCategorySummaries } from "@/lib/posts";
import { SiteBreadcrumb } from "@/components/site-breadcrumb";
import { CategoryCard } from "@/components/category-card";

export default function KategoriPage() {
  const categories = getCategorySummaries();
  const totalArticles = categories.reduce((sum, c) => sum + c.count, 0);

  return (
    <div>
      <SiteBreadcrumb
        items={[
          { label: "Beranda", href: "/" },
          { label: "Kategori" }
        ]}
      />
      <section className="neo-shell mb-8 p-6">
        <p className="mb-2 text-xs font-black uppercase tracking-widest">Navigasi</p>
        <h1 className="text-3xl font-black leading-tight md:text-5xl">Semua Kategori</h1>
        <p className="mt-3 text-zinc-700">
          {categories.length} kategori dengan total {totalArticles} artikel.
        </p>
        <Link
          href="/artikel"
          className="mt-4 inline-flex rounded-md border-2 border-black bg-(--nb-surface) px-3 py-2 text-sm font-bold shadow-[4px_4px_0_var(--nb-shadow)] transition hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none"
        >
          Lihat semua artikel
        </Link>
      </section>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {categories.map((category) => (
          <CategoryCard key={category.slug} category={category} />
        ))}
      </div>
    </div>
  );
}
