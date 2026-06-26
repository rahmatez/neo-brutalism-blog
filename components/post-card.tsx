import Link from "next/link";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { toCategorySlug } from "@/lib/category";
import type { PostSummary } from "@/lib/posts";

export function PostCard({ post }: { post: PostSummary }) {
  const href = `/posts/${post.slug}`;

  return (
    <article className="neo-shell flex h-full flex-col p-5 transition-transform hover:-translate-y-1">
      <div className="mb-4 flex flex-wrap items-center gap-2 text-xs font-bold">
        <Link
          href={`/kategori/${toCategorySlug(post.meta.category)}`}
          className="rounded-full border-2 border-black px-2 py-1 uppercase transition hover:translate-x-px hover:translate-y-px"
          style={{ background: "var(--nb-main)" }}
        >
          {post.meta.category}
        </Link>
        <span>{format(new Date(post.meta.date), "dd MMM yyyy", { locale: id })}</span>
        <span>· {post.readingMinutes} min baca</span>
      </div>

      <h2 className="line-clamp-3 text-xl font-black leading-tight">{post.meta.title}</h2>
      <p className="mt-2 line-clamp-3 text-sm text-zinc-700">{post.meta.description}</p>

      <div className="mt-4 flex min-h-9 flex-wrap content-start gap-2">
        {post.meta.tags.slice(0, 3).map((tag) => (
          <span
            key={tag}
            className="rounded-md border-2 border-black px-2 py-1 text-xs font-bold"
            style={{ background: "var(--nb-secondary)" }}
          >
            #{tag}
          </span>
        ))}
      </div>

      <div className="mt-auto pt-5">
        <Link
          href={href}
          className="inline-flex w-fit rounded-lg border-2 border-black px-3 py-2 text-sm font-bold transition hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none"
          style={{
            background: "var(--nb-surface)",
            boxShadow: "4px 4px 0 var(--nb-shadow)"
          }}
        >
          Baca artikel
        </Link>
      </div>
    </article>
  );
}
