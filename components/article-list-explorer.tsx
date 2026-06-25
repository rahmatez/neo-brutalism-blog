"use client";

import { useEffect, useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Input, Select, SelectOption, Separator } from "neobrutalism-ui-react";
import type { CategorySummary, PostSummary } from "@/lib/posts";
import { filterAndSortPosts, type SortOrder } from "@/lib/post-filters";
import {
  clampPage,
  getTotalPages,
  paginateItems,
  parsePageParam,
  POSTS_PER_PAGE
} from "@/lib/pagination";
import { PostCard } from "@/components/post-card";
import { PaginationNav } from "@/components/pagination-nav";

type Props = {
  posts: PostSummary[];
  categories: CategorySummary[];
};

function capitalize(value: string) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

export function ArticleListExplorer({ posts, categories }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const query = searchParams.get("q") ?? "";
  const category = searchParams.get("kategori") ?? "all";
  const sort = (searchParams.get("urut") ?? "terbaru") as SortOrder;
  const page = parsePageParam(searchParams.get("page") ?? undefined);

  const [searchDraft, setSearchDraft] = useState(query);

  useEffect(() => {
    setSearchDraft(query);
  }, [query]);

  const updateParams = (updates: Record<string, string | null>) => {
    const params = new URLSearchParams(searchParams.toString());

    for (const [key, value] of Object.entries(updates)) {
      const shouldDelete =
        value === null ||
        value === "" ||
        (key === "kategori" && value === "all") ||
        (key === "urut" && value === "terbaru") ||
        (key === "page" && value === "1");

      if (shouldDelete) params.delete(key);
      else params.set(key, value);
    }

    const next = params.toString();
    router.push(next ? `${pathname}?${next}` : pathname, { scroll: false });
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchDraft === query) return;
      updateParams({ q: searchDraft || null, page: null });
    }, 300);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchDraft]);

  const filteredPosts = useMemo(
    () => filterAndSortPosts(posts, { query, categorySlug: category, sort }),
    [posts, query, category, sort]
  );

  const totalPages = getTotalPages(filteredPosts.length);
  const currentPage = clampPage(page, totalPages);
  const paginatedPosts = paginateItems(filteredPosts, currentPage);
  const start = filteredPosts.length === 0 ? 0 : (currentPage - 1) * POSTS_PER_PAGE + 1;
  const end = Math.min(currentPage * POSTS_PER_PAGE, filteredPosts.length);

  return (
    <section>
      <div className="mb-6">
        <h2 className="text-sm font-black uppercase tracking-[0.2em]">Semua Artikel</h2>
        <Separator className="mt-3" variant="thick" />
      </div>

      <div className="article-filter-bar mb-4 grid gap-3 md:grid-cols-[1fr_220px_160px] md:items-stretch">
        <Input
          type="search"
          placeholder="Cari artikel..."
          value={searchDraft}
          onChange={(e) => setSearchDraft(e.target.value)}
          aria-label="Cari artikel"
          size="lg"
          className="h-14 px-5 text-base"
        />
        <Select
          value={category}
          onValueChange={(value) =>
            updateParams({ kategori: value ? String(value) : "all", page: null })
          }
          placeholder="Semua kategori"
          aria-label="Filter kategori"
          className="h-14 w-full"
        >
          <SelectOption value="all" label="Semua kategori" />
          {categories.map((item) => (
            <SelectOption
              key={item.slug}
              value={item.slug}
              label={capitalize(item.name)}
            />
          ))}
        </Select>
        <Select
          value={sort}
          onValueChange={(value) =>
            updateParams({ urut: value ? String(value) : "terbaru", page: null })
          }
          placeholder="Terbaru"
          aria-label="Urutkan artikel"
          className="h-14 w-full"
        >
          <SelectOption value="terbaru" label="Terbaru" />
          <SelectOption value="terlama" label="Terlama" />
        </Select>
      </div>

      <p className="mb-5 text-sm text-zinc-600">
        {filteredPosts.length === 0
          ? "Tidak ada artikel yang cocok."
          : `Menampilkan ${start}-${end} dari ${filteredPosts.length} artikel`}
      </p>

      {paginatedPosts.length > 0 ? (
        <>
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {paginatedPosts.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
          <PaginationNav page={currentPage} totalPages={totalPages} />
        </>
      ) : null}
    </section>
  );
}
