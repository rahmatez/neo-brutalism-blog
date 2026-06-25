import Link from "next/link";
import { CommandSearchTrigger } from "@/components/command-search-trigger";
import { SiteHeaderNav } from "@/components/site-header-nav";
import { siteConfig } from "@/lib/site";

export function SiteHeader() {
  return (
    <header className="neo-shell mb-6 p-4 md:mb-8 md:p-5">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="min-w-0">
          <Link href="/" className="text-xl font-black tracking-tight md:text-2xl">
            {siteConfig.name}
          </Link>
          <p className="mt-1 text-sm font-medium text-zinc-700">
            Artikel teknis MDX dengan nuansa neo-brutalism.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <CommandSearchTrigger />
          <SiteHeaderNav />
        </div>
      </div>
    </header>
  );
}
