import type { PostSummary } from "@/lib/posts";
import { toCategorySlug } from "@/lib/category";

export type SortOrder = "terbaru" | "terlama";

export type PostFilterState = {
  query?: string;
  categorySlug?: string;
  sort?: SortOrder;
};

export function filterAndSortPosts(
  posts: PostSummary[],
  { query, categorySlug, sort = "terbaru" }: PostFilterState
): PostSummary[] {
  let result = [...posts];

  if (categorySlug && categorySlug !== "all") {
    result = result.filter((post) => toCategorySlug(post.meta.category) === categorySlug);
  }

  const normalizedQuery = query?.trim().toLowerCase();
  if (normalizedQuery) {
    result = result.filter(
      (post) =>
        post.meta.title.toLowerCase().includes(normalizedQuery) ||
        post.meta.description.toLowerCase().includes(normalizedQuery) ||
        post.meta.category.toLowerCase().includes(normalizedQuery) ||
        post.meta.tags.some((tag) => tag.toLowerCase().includes(normalizedQuery))
    );
  }

  result.sort((a, b) => {
    const cmp = b.meta.date.localeCompare(a.meta.date);
    return sort === "terlama" ? -cmp : cmp;
  });

  return result;
}
