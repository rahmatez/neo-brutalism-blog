export const POSTS_PER_PAGE = 9;

export function parsePageParam(value?: string): number {
  const num = Number(value);
  if (!Number.isFinite(num) || num < 1) return 1;
  return Math.floor(num);
}

export function getTotalPages(totalItems: number, perPage = POSTS_PER_PAGE): number {
  return Math.max(1, Math.ceil(totalItems / perPage));
}

export function clampPage(page: number, totalPages: number): number {
  return Math.min(Math.max(1, page), totalPages);
}

export function paginateItems<T>(items: T[], page: number, perPage = POSTS_PER_PAGE): T[] {
  const start = (page - 1) * perPage;
  return items.slice(start, start + perPage);
}

