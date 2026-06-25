import Link from "next/link";
import { absoluteUrl, siteConfig } from "@/lib/site";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="neo-shell mt-8 p-4 md:mt-12 md:p-6">
      <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
        <div className="max-w-xl">
          <p className="text-xl font-black">{siteConfig.name}</p>
          <p className="mt-2 text-sm leading-relaxed text-zinc-700">{siteConfig.description}</p>
          <p className="mt-3 text-sm font-semibold text-zinc-700">
            Blog teknis berbasis MDX dengan desain neo-brutalism — dibuat untuk membaca artikel
            command line, tutorial, dan catatan developer dengan nyaman.
          </p>
        </div>

        <div className="flex flex-col gap-2 text-sm font-bold">
          <p className="text-xs font-black uppercase tracking-widest text-zinc-500">Tautan</p>
          <Link href="/artikel" className="hover:underline">
            Semua Artikel
          </Link>
          <Link href="/kategori" className="hover:underline">
            Kategori
          </Link>
          <Link href="/feed.xml" className="hover:underline">
            RSS Feed
          </Link>
          <a
            href={siteConfig.githubUrl}
            target="_blank"
            rel="noreferrer"
            className="hover:underline"
          >
            GitHub
          </a>
        </div>
      </div>

      <p className="mt-6 break-all border-t-2 border-black pt-4 text-xs font-semibold text-zinc-600">
        © {year} {siteConfig.name}. Dibangun dengan Next.js &amp; MDX.
        <span className="mt-1 block text-zinc-500 md:mt-0 md:inline md:before:content-['_']">
          {absoluteUrl("/")}
        </span>
      </p>
    </footer>
  );
}
