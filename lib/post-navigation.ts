import type { PostSummary } from "@/lib/posts";
import { getAllPostSummaries, toPostSummary } from "@/lib/posts";

export type AdjacentPosts = {
  prev: PostSummary | null;
  next: PostSummary | null;
};

export function getAdjacentPosts(slug: string): AdjacentPosts {
  const posts = getAllPostSummaries();
  const index = posts.findIndex((post) => post.slug === slug);

  if (index === -1) {
    return { prev: null, next: null };
  }

  return {
    prev: posts[index + 1] ? toPostSummary(posts[index + 1]) : null,
    next: posts[index - 1] ? toPostSummary(posts[index - 1]) : null
  };
}

function scoreRelatedPost(current: PostSummary, candidate: PostSummary): number {
  let score = 0;

  if (candidate.meta.category === current.meta.category) {
    score += 10;
  }

  for (const tag of candidate.meta.tags) {
    if (current.meta.tags.includes(tag)) {
      score += 3;
    }
  }

  return score;
}

export function getRelatedPosts(slug: string, limit = 4): PostSummary[] {
  const posts = getAllPostSummaries();
  const current = posts.find((post) => post.slug === slug);

  if (!current) return [];

  const ranked = posts
    .filter((post) => post.slug !== slug)
    .map((post) => ({ post, score: scoreRelatedPost(current, post) }))
    .sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score;
      return b.post.meta.date.localeCompare(a.post.meta.date);
    });

  const related = ranked.filter((item) => item.score > 0).map((item) => toPostSummary(item.post));

  if (related.length >= limit) {
    return related.slice(0, limit);
  }

  const fallback = posts
    .filter((post) => post.slug !== slug && !related.some((item) => item.slug === post.slug))
    .map(toPostSummary);

  return [...related, ...fallback].slice(0, limit);
}
