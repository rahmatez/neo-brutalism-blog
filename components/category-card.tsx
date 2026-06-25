import Link from "next/link";
import type { CategorySummary } from "@/lib/posts";

export function CategoryCard({ category }: { category: CategorySummary }) {
  return (
    <Link
      href={`/kategori/${category.slug}`}
      className="neo-shell flex h-full flex-col p-5 transition-transform hover:-translate-y-1"
    >
      <span
        className="mb-3 inline-flex w-fit rounded-full border-2 border-black px-3 py-1 text-xs font-black uppercase"
        style={{ background: "var(--nb-main)" }}
      >
        {category.count} artikel
      </span>
      <h2 className="text-2xl font-black capitalize leading-tight">{category.name}</h2>
      <p className="mt-2 text-sm text-zinc-700">
        Jelajahi semua artikel dalam kategori {category.name}.
      </p>
      <span
        className="mt-5 inline-flex w-fit rounded-lg border-2 border-black px-3 py-2 text-sm font-bold"
        style={{
          background: "var(--nb-surface)",
          boxShadow: "4px 4px 0 var(--nb-shadow)"
        }}
      >
        Buka kategori
      </span>
    </Link>
  );
}
