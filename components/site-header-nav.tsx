"use client";

import Link from "next/link";
import { useRef } from "react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerTitle,
  type DrawerHandle
} from "neobrutalism-ui-react";
import { NeoButton } from "@/components/neo-button";

const NAV_LINKS = [
  { href: "/artikel", label: "Artikel" },
  { href: "/kategori", label: "Kategori" },
  { href: "/#featured", label: "Featured" }
] as const;

function MenuIcon() {
  return (
    <svg
      className="size-5"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      aria-hidden="true"
    >
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  );
}

export function SiteHeaderNav() {
  const drawerRef = useRef<DrawerHandle>(null);

  const openMenu = () => drawerRef.current?.open();
  const closeMenu = () => drawerRef.current?.close();

  return (
    <>
      <nav className="hidden flex-wrap items-center gap-3 md:flex">
        {NAV_LINKS.map((link) => (
          <Link key={link.href} href={link.href}>
            <NeoButton size="sm" tone={link.label === "Artikel" ? undefined : "surface"}>
              {link.label}
            </NeoButton>
          </Link>
        ))}
      </nav>

      <button
        type="button"
        className="inline-flex size-11 shrink-0 items-center justify-center rounded-lg border-2 border-black bg-(--nb-surface) shadow-[3px_3px_0_var(--nb-shadow)] transition active:translate-x-px active:translate-y-px active:shadow-none md:hidden"
        onClick={openMenu}
        aria-label="Buka menu navigasi"
      >
        <MenuIcon />
      </button>

      <div className="mobile-nav-drawer md:hidden">
        <Drawer ref={drawerRef} side="right">
          <DrawerContent>
            <DrawerTitle>Menu</DrawerTitle>
            <nav className="mt-6 flex flex-col gap-3">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={closeMenu}
                  className="rounded-lg border-2 border-black bg-(--nb-secondary-background) px-4 py-3 text-base font-black shadow-[3px_3px_0_var(--nb-shadow)] transition active:translate-x-px active:translate-y-px active:shadow-none"
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/feed.xml"
                onClick={closeMenu}
                className="rounded-lg border-2 border-black bg-(--nb-surface) px-4 py-3 text-sm font-bold"
              >
                RSS Feed
              </Link>
            </nav>
            <DrawerClose className="mt-auto">Tutup</DrawerClose>
          </DrawerContent>
        </Drawer>
      </div>
    </>
  );
}
