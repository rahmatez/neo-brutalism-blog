import { PostCard } from "@/components/post-card";
import type { PostSummary } from "@/lib/posts";

export function RelatedPosts({ posts }: { posts: PostSummary[] }) {
  if (posts.length === 0) return null;

  return (
    <section className="mt-8">
      <h2 className="mb-4 text-2xl font-black">Artikel Terkait</h2>
      <div className="grid gap-5 md:grid-cols-2">
        {posts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>
    </section>
  );
}
