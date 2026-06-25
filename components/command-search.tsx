"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode
} from "react";
import { useRouter } from "next/navigation";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator
} from "neobrutalism-ui-react";
import type { SearchablePost } from "@/lib/search";
import { toCategorySlug } from "@/lib/category";

type CommandSearchContextValue = {
  openSearch: () => void;
};

const CommandSearchContext = createContext<CommandSearchContextValue | null>(null);

export function useCommandSearch() {
  const ctx = useContext(CommandSearchContext);
  if (!ctx) {
    throw new Error("useCommandSearch must be used within CommandSearchProvider");
  }
  return ctx;
}

const NAV_ITEMS = [
  { label: "Beranda", href: "/" },
  { label: "Semua Artikel", href: "/artikel" },
  { label: "Kategori", href: "/kategori" }
] as const;

type Props = {
  posts: SearchablePost[];
  children: ReactNode;
};

export function CommandSearchProvider({ posts, children }: Props) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");

  const openSearch = useCallback(() => setOpen(true), []);

  const handleOpenChange = (nextOpen: boolean) => {
    setOpen(nextOpen);
    if (!nextOpen) setQuery("");
  };

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setOpen((value) => {
          if (value) setQuery("");
          return !value;
        });
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const navigate = (href: string) => {
    setOpen(false);
    setQuery("");
    router.push(href);
  };

  const postItems = useMemo(
    () =>
      posts.map((post) => ({
        ...post,
        value: [post.title, post.description, post.category, ...post.tags].join(" ")
      })),
    [posts]
  );

  const categories = useMemo(
    () => [...new Set(posts.map((post) => post.category))].sort(),
    [posts]
  );

  return (
    <CommandSearchContext.Provider value={{ openSearch }}>
      {children}
      <CommandDialog
        open={open}
        onOpenChange={handleOpenChange}
        className="command-search-dialog"
        contentClassName="command-search-dialog-content overflow-visible"
      >
        <div className="command-search-header">
          <CommandInput
            placeholder="Cari artikel..."
            value={query}
            onValueChange={setQuery}
          />
          <kbd className="command-search-esc">ESC</kbd>
        </div>
        <CommandList>
          {!query.trim() ? (
            <p className="command-search-idle">Ketik judul, tag, atau topik artikel.</p>
          ) : (
            <>
              <CommandEmpty>Tidak ada hasil ditemukan.</CommandEmpty>

              <CommandGroup heading="Navigasi">
                {NAV_ITEMS.map((item) => (
                  <CommandItem
                    key={item.href}
                    value={item.label}
                    onSelect={() => navigate(item.href)}
                    className="command-search-item"
                  >
                    {item.label}
                  </CommandItem>
                ))}
              </CommandGroup>

              <CommandSeparator />

              <CommandGroup heading="Artikel">
                {postItems.map((post) => (
                  <CommandItem
                    key={post.slug}
                    value={post.value}
                    keywords={post.tags}
                    onSelect={() => navigate(`/posts/${post.slug}`)}
                    className="command-search-item"
                  >
                    <div className="flex min-w-0 flex-col gap-0.5">
                      <span className="truncate font-bold">{post.title}</span>
                      <span className="truncate text-xs opacity-70">
                        {post.category} · {post.description}
                      </span>
                    </div>
                  </CommandItem>
                ))}
              </CommandGroup>

              <CommandSeparator />

              <CommandGroup heading="Kategori">
                {categories.map((category) => (
                  <CommandItem
                    key={category}
                    value={category}
                    onSelect={() => navigate(`/kategori/${toCategorySlug(category)}`)}
                    className="command-search-item"
                  >
                    {category}
                  </CommandItem>
                ))}
              </CommandGroup>
            </>
          )}
        </CommandList>
      </CommandDialog>
    </CommandSearchContext.Provider>
  );
}
