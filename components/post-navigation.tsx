import Link from "next/link";
import type { PostSummary } from "@/lib/posts";

type Props = {
  prev: PostSummary | null;
  next: PostSummary | null;
};

function NavCard({
  label,
  post,
  align
}: {
  label: string;
  post: PostSummary;
  align: "left" | "right";
}) {
  return (
    <Link
      href={`/posts/${post.slug}`}
      className={`neo-shell flex flex-col gap-2 p-4 transition hover:-translate-y-0.5 ${
        align === "right" ? "md:text-right" : "text-left"
      }`}
    >
      <span className="text-xs font-black uppercase tracking-widest text-zinc-500">{label}</span>
      <span className="text-base font-black leading-snug">{post.meta.title}</span>
      <span className="text-xs font-semibold text-zinc-600">{post.meta.category}</span>
    </Link>
  );
}

export function PostNavigation({ prev, next }: Props) {
  if (!prev && !next) return null;

  return (
    <nav
      aria-label="Navigasi artikel"
      className="grid gap-4 md:grid-cols-2"
    >
      {prev ? (
        <NavCard label="Artikel Sebelumnya" post={prev} align="left" />
      ) : (
        <div aria-hidden="true" className="hidden md:block" />
      )}
      {next ? (
        <NavCard label="Artikel Berikutnya" post={next} align="right" />
      ) : null}
    </nav>
  );
}
