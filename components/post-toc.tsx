import type { TocItem } from "@/lib/toc";

function TocList({ items }: { items: TocItem[] }) {
  return (
    <ul className="space-y-2">
      {items.map((item) => (
        <li key={item.id}>
          <a
            href={`#${item.id}`}
            className={`block rounded-md px-2 py-1.5 text-sm font-semibold hover:bg-(--nb-secondary-background) active:bg-(--nb-secondary-background) ${
              item.level === 3 ? "ml-4 text-zinc-700" : "text-zinc-900"
            }`}
          >
            {item.text}
          </a>
        </li>
      ))}
    </ul>
  );
}

export function PostToc({ items }: { items: TocItem[] }) {
  const hasItems = items.length > 0;

  return (
    <>
      {hasItems ? (
        <details className="article-page-toc-mobile neo-shell p-4 md:hidden" open>
          <summary className="cursor-pointer list-none text-sm font-black uppercase tracking-wider [&::-webkit-details-marker]:hidden">
            <span className="flex items-center justify-between gap-2">
              Daftar Isi
              <span className="text-xs font-bold text-zinc-500">{items.length} bagian</span>
            </span>
          </summary>
          <nav
            aria-label="Table of contents"
            className="article-page-toc-nav mt-3 max-h-64 overflow-y-auto overscroll-contain pr-1"
          >
            <TocList items={items} />
          </nav>
        </details>
      ) : null}

      <aside className="article-page-toc neo-shell hidden flex-col p-4 md:flex">
        <p className="mb-3 shrink-0 text-sm font-black uppercase tracking-wider">Daftar Isi</p>
        {hasItems ? (
          <nav
            aria-label="Table of contents"
            className="article-page-toc-nav min-h-0 flex-1 overflow-y-auto overscroll-contain pr-1"
          >
            <TocList items={items} />
          </nav>
        ) : (
          <p className="text-sm font-medium text-zinc-500">Tidak ada sub-bagian.</p>
        )}
      </aside>
    </>
  );
}
