import Link from "next/link";
import { getAllPostSummaries, getFeaturedPosts, getCategorySummaries } from "@/lib/posts";
import { PostCard } from "@/components/post-card";
import {
  clampPage,
  getTotalPages,
  paginateItems,
  parsePageParam
} from "@/lib/pagination";
import { PaginationNav } from "@/components/pagination-nav";

type HomeProps = {
  searchParams: Promise<{ page?: string }>;
};

export const revalidate = 3600;

export default async function HomePage({ searchParams }: HomeProps) {
  const sp = await searchParams;
  const posts = getAllPostSummaries();
  const featuredPosts = getFeaturedPosts();
  const categorySummaries = getCategorySummaries();
  const heroCategories = [...categorySummaries]
    .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name))
    .slice(0, 9);
  const totalPages = getTotalPages(posts.length);
  const currentPage = clampPage(parsePageParam(sp.page), totalPages);
  const paginatedPosts = paginateItems(posts, currentPage);

  return (
    <div>
      <section className="neo-shell mb-8 p-6">
        <h1 className="text-3xl font-black leading-tight md:text-5xl">
          Website Blog MDX dengan UI Neo-Brutalism yang modern dan cepat.
        </h1>
        <p className="mt-3 max-w-3xl text-base text-zinc-700 md:text-lg">
          Konten berasal dari file MDX di root project, dengan pengalaman baca yang jelas, navigasi
          sederhana, dan tampilan visual yang berani tapi tetap nyaman.
        </p>
        <div className="mt-5 flex flex-nowrap items-center gap-2 overflow-x-auto pb-1">
          {heroCategories.map((category) => (
            <Link
              key={category.slug}
              href={`/kategori/${category.slug}`}
              className="shrink-0 rounded-md border-2 border-black px-3 py-1 text-sm font-bold whitespace-nowrap transition hover:translate-x-[2px] hover:translate-y-[2px]"
              style={{ background: "var(--nb-success)" }}
            >
              {category.name} ({category.count})
            </Link>
          ))}
          <Link
            href="/kategori"
            className="shrink-0 rounded-md border-2 border-black px-3 py-1 text-sm font-bold whitespace-nowrap transition hover:translate-x-[2px] hover:translate-y-[2px]"
            style={{ background: "var(--nb-secondary)" }}
          >
            Semua kategori →
          </Link>
        </div>
      </section>

      <section id="featured" className="mb-8">
        <h2 className="mb-4 text-2xl font-black">Pilihan Utama</h2>
        <div className="grid gap-5 md:grid-cols-2">
          {featuredPosts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      </section>

      <section>
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-2xl font-black">Artikel Terbaru</h2>
          <Link
            href="/artikel"
            className="rounded-md border-2 border-black px-3 py-1.5 text-sm font-bold transition hover:translate-x-[2px] hover:translate-y-[2px]"
            style={{ background: "var(--nb-main)" }}
          >
            Lihat semua ({posts.length})
          </Link>
        </div>
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {paginatedPosts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
        <PaginationNav page={currentPage} totalPages={totalPages} />
      </section>
    </div>
  );
}
