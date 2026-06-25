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

export function toPostSummary(post: Post): PostSummary {
  const { slug, slugParts, meta, readingMinutes } = post;
  return { slug, slugParts, meta, readingMinutes };
}

export type CategorySummary = {
  name: string;
  slug: string;
  count: number;
};

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

export function getAllPosts(): Post[] {
  const files = walkMdxFiles(POSTS_ROOT);

  const posts = files.map((filePath) => {
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
  });

  return posts.sort((a, b) => b.meta.date.localeCompare(a.meta.date));
}

export function getFeaturedPosts(limit = 4): Post[] {
  return getAllPosts()
    .filter((post) => post.meta.featured)
    .slice(0, limit);
}

export function getPostBySlug(slugParts: string[]): Post | null {
  const slug = slugParts.join("/");
  const post = getAllPosts().find((item) => item.slug === slug);
  return post ?? null;
}

export function getAllCategories(): string[] {
  return [...new Set(getAllPosts().map((post) => post.meta.category))].sort();
}

export function getCategorySummaries(): CategorySummary[] {
  const counts = new Map<string, number>();
  for (const post of getAllPosts()) {
    counts.set(post.meta.category, (counts.get(post.meta.category) ?? 0) + 1);
  }

  return [...counts.entries()]
    .map(([name, count]) => ({ name, count, slug: toCategorySlug(name) }))
    .sort((a, b) => a.name.localeCompare(b.name));
}

export function getPostsByCategorySlug(categorySlug: string): Post[] {
  return getAllPosts().filter((post) => toCategorySlug(post.meta.category) === categorySlug);
}

export function getCategoryNameBySlug(categorySlug: string): string | null {
  const matched = getCategorySummaries().find((category) => category.slug === categorySlug);
  return matched?.name ?? null;
}
