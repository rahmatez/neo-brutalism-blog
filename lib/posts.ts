import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import readingTime from "reading-time";
import { toCategorySlug } from "@/lib/category";

export { toCategorySlug };

const POSTS_ROOT = path.join(process.cwd(), "content", "posts");

export type PostMeta = {
  title: string;
  description: string;
  date: string;
  category: string;
  tags: string[];
  featured?: boolean;
};

export type Post = {
  slug: string;
  slugParts: string[];
  content: string;
  meta: PostMeta;
  readingMinutes: number;
};

export type PostSummary = Pick<Post, "slug" | "slugParts" | "meta" | "readingMinutes">;

export type CategorySummary = {
  name: string;
  slug: string;
  count: number;
};

let cachedSummaries: PostSummary[] | null = null;
const postCache = new Map<string, Post>();

function walkMdxFiles(dir: string): string[] {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const files: string[] = [];

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...walkMdxFiles(fullPath));
      continue;
    }

    if (entry.isFile() && fullPath.endsWith(".mdx")) {
      files.push(fullPath);
    }
  }

  return files;
}

function normalizeMeta(data: Record<string, unknown>): PostMeta {
  return {
    title: String(data.title ?? "Untitled"),
    description: String(data.description ?? ""),
    date: String(data.date ?? new Date().toISOString().slice(0, 10)),
    category: String(data.category ?? "general"),
    tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
    featured: Boolean(data.featured)
  };
}

function parsePostFile(filePath: string): Post {
  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);
  const meta = normalizeMeta(data as Record<string, unknown>);
  const slugPath = path.relative(POSTS_ROOT, filePath).replace(/\.mdx$/, "");
  const slugParts = slugPath.split(path.sep);
  const slug = slugParts.join("/");

  return {
    slug,
    slugParts,
    content,
    meta,
    readingMinutes: Math.max(1, Math.round(readingTime(content).minutes))
  };
}

function loadPostSummaries(): PostSummary[] {
  const summaries = walkMdxFiles(POSTS_ROOT).map((filePath) => {
    const post = parsePostFile(filePath);
    postCache.set(post.slug, post);
    return toPostSummary(post);
  });

  return summaries.sort((a, b) => b.meta.date.localeCompare(a.meta.date));
}

export function toPostSummary(post: Post | PostSummary): PostSummary {
  const { slug, slugParts, meta, readingMinutes } = post;
  return { slug, slugParts, meta, readingMinutes };
}

export function getAllPostSummaries(): PostSummary[] {
  if (!cachedSummaries) {
    cachedSummaries = loadPostSummaries();
  }

  return cachedSummaries;
}

/** Loads full post bodies for every article. Prefer getAllPostSummaries() for listings. */
export function getAllPosts(): Post[] {
  return getAllPostSummaries().map((summary) => postCache.get(summary.slug)!);
}

export function getFeaturedPosts(limit = 4): PostSummary[] {
  return getAllPostSummaries()
    .filter((post) => post.meta.featured)
    .slice(0, limit);
}

export function getPostBySlug(slugParts: string[]): Post | null {
  const slug = slugParts.join("/");
  const cached = postCache.get(slug);
  if (cached) return cached;

  const filePath = path.join(POSTS_ROOT, ...slugParts) + ".mdx";
  if (!fs.existsSync(filePath)) return null;

  const post = parsePostFile(filePath);
  postCache.set(post.slug, post);
  return post;
}

export function getAllCategories(): string[] {
  return [...new Set(getAllPostSummaries().map((post) => post.meta.category))].sort();
}

export function getCategorySummaries(): CategorySummary[] {
  const counts = new Map<string, number>();
  for (const post of getAllPostSummaries()) {
    counts.set(post.meta.category, (counts.get(post.meta.category) ?? 0) + 1);
  }

  return [...counts.entries()]
    .map(([name, count]) => ({ name, count, slug: toCategorySlug(name) }))
    .sort((a, b) => a.name.localeCompare(b.name));
}

export function getPostsByCategorySlug(categorySlug: string): PostSummary[] {
  return getAllPostSummaries().filter(
    (post) => toCategorySlug(post.meta.category) === categorySlug
  );
}

export function getCategoryNameBySlug(categorySlug: string): string | null {
  const matched = getCategorySummaries().find((category) => category.slug === categorySlug);
  return matched?.name ?? null;
}
