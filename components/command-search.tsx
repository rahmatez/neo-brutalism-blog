"use client";

import dynamic from "next/dynamic";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode
} from "react";
import type { SearchablePost } from "@/lib/search";

const CommandSearchDialog = dynamic(
  () =>
    import("@/components/command-search-dialog").then((mod) => mod.CommandSearchDialog),
  { ssr: false }
);

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

type Props = {
  posts: SearchablePost[];
  children: ReactNode;
};

export function CommandSearchProvider({ posts, children }: Props) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [dialogReady, setDialogReady] = useState(false);

  const openSearch = useCallback(() => {
    setDialogReady(true);
    setOpen(true);
  }, []);

  const handleOpenChange = (nextOpen: boolean) => {
    setOpen(nextOpen);
    if (!nextOpen) setQuery("");
  };

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setDialogReady(true);
        setOpen((value) => {
          if (value) setQuery("");
          return !value;
        });
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <CommandSearchContext.Provider value={{ openSearch }}>
      {children}
      {dialogReady ? (
        <CommandSearchDialog
          open={open}
          query={query}
          posts={posts}
          onOpenChange={handleOpenChange}
          onQueryChange={setQuery}
        />
      ) : null}
    </CommandSearchContext.Provider>
  );
}
