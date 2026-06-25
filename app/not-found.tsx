import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto mt-10 max-w-xl text-center">
      <div className="neo-shell p-8">
        <h1 className="text-3xl font-black">404 - Artikel tidak ditemukan</h1>
        <p className="mt-2 text-zinc-700">
          Halaman yang Anda cari tidak tersedia atau slug post tidak valid.
        </p>
        <Link
          href="/"
          className="mt-6 inline-flex rounded-lg border-2 border-black bg-white px-4 py-2 font-bold shadow-[4px_4px_0_#111] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none"
        >
          Kembali ke Beranda
        </Link>
      </div>
    </div>
  );
}
