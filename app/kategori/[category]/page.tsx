import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PostCard } from "@/components/post-card";
import { SiteBreadcrumb } from "@/components/site-breadcrumb";
import {
  getCategoryNameBySlug,
  getCategorySummaries,
  getPostsByCategorySlug
} from "@/lib/posts";
import { absoluteUrl } from "@/lib/site";
import {
  clampPage,
  getTotalPages,
  paginateItems,
  parsePageParam
} from "@/lib/pagination";
import { PaginationNav } from "@/components/pagination-nav";

type Props = {
  params: Promise<{ category: string }>;
  searchParams: Promise<{ page?: string }>;
};

export function generateStaticParams() {
  return getCategorySummaries().map((category) => ({
    category: category.slug
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category } = await params;
  const categoryName = getCategoryNameBySlug(category);

  if (!categoryName) {
    return { title: "Kategori tidak ditemukan" };
  }

  const title = `Kategori ${categoryName}`;
  const description = `Artikel dalam kategori ${categoryName}.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: absoluteUrl(`/kategori/${category}`)
    },
    alternates: {
      canonical: absoluteUrl(`/kategori/${category}`)
    }
  };
}

export default async function CategoryPage({ params, searchParams }: Props) {
  const { category } = await params;
  const sp = await searchParams;
  const posts = getPostsByCategorySlug(category);
  const categoryName = getCategoryNameBySlug(category);

  if (!categoryName) notFound();
  const totalPages = getTotalPages(posts.length);
  const currentPage = clampPage(parsePageParam(sp.page), totalPages);
  const paginatedPosts = paginateItems(posts, currentPage);

  return (
    <section>
      <SiteBreadcrumb
        items={[
          { label: "Beranda", href: "/" },
          { label: "Kategori", href: "/kategori" },
          { label: categoryName }
        ]}
      />
      <div className="neo-shell mb-8 p-6">
        <p className="mb-2 text-xs font-black uppercase tracking-widest">Kategori</p>
        <h1 className="text-3xl font-black md:text-5xl">{categoryName}</h1>
        <p className="mt-3 text-zinc-700">
          Ditemukan {posts.length} artikel dalam kategori ini.
        </p>
        <Link
          href="/kategori"
          className="mt-4 inline-flex rounded-md border-2 border-black bg-(--nb-surface) px-3 py-2 text-sm font-bold shadow-[4px_4px_0_var(--nb-shadow)] transition hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none"
        >
          Kembali ke semua kategori
        </Link>
      </div>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {paginatedPosts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>
      <PaginationNav page={currentPage} totalPages={totalPages} />
    </section>
  );
}

