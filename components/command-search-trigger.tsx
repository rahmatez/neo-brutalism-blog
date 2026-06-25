"use client";

import { useEffect, useState } from "react";
import { useCommandSearch } from "@/components/command-search";

function SearchIcon() {
  return (
    <svg
      className="size-4 shrink-0 opacity-60"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      aria-hidden="true"
    >
      <circle cx="11" cy="11" r="7" />
      <path d="M20 20l-3.5-3.5" />
    </svg>
  );
}

export function CommandSearchTrigger() {
  const { openSearch } = useCommandSearch();
  const [shortcutLabel, setShortcutLabel] = useState("Ctrl+K");
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const isApple = /Mac|iPhone|iPad/.test(navigator.platform);
    setShortcutLabel(isApple ? "⌘K" : "Ctrl+K");
    setIsMobile(window.matchMedia("(max-width: 767px)").matches);

    const media = window.matchMedia("(max-width: 767px)");
    const onChange = (event: MediaQueryListEvent) => setIsMobile(event.matches);
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, []);

  return (
    <button
      type="button"
      onClick={openSearch}
      className="command-search-trigger flex min-w-[200px] flex-1 items-center gap-2 rounded-lg border-2 border-black bg-(--nb-secondary-background) px-3 py-2 text-sm font-semibold shadow-[4px_4px_0_var(--nb-shadow)] transition active:translate-x-[2px] active:translate-y-[2px] active:shadow-none sm:flex-none md:min-w-[220px] md:hover:translate-x-[2px] md:hover:translate-y-[2px] md:hover:shadow-none"
      aria-label="Buka pencarian"
    >
      <SearchIcon />
      <span className="flex-1 text-left text-zinc-600">Search...</span>
      {!isMobile ? (
        <kbd className="rounded border-2 border-black bg-(--nb-surface) px-1.5 py-0.5 text-[10px] font-black">
          {shortcutLabel}
        </kbd>
      ) : null}
    </button>
  );
}
