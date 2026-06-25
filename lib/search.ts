export type SearchablePost = {
  slug: string;
  title: string;
  description: string;
  category: string;
  tags: string[];
};

export function toSearchablePost(post: {
  slug: string;
  meta: {
    title: string;
    description: string;
    category: string;
    tags: string[];
  };
}): SearchablePost {
  return {
    slug: post.slug,
    title: post.meta.title,
    description: post.meta.description,
    category: post.meta.category,
    tags: post.meta.tags
  };
}
