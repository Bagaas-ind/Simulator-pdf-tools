import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-md px-4 py-24 text-center">
      <p className="text-5xl font-bold text-brand">404</p>
      <h1 className="mt-3 text-2xl font-bold">Halaman tidak ditemukan</h1>
      <Link
        href="/"
        className="mt-6 inline-block rounded-xl bg-brand px-5 py-3 font-medium text-white hover:bg-brand-dark"
      >
        Kembali ke beranda
      </Link>
    </div>
  );
}
