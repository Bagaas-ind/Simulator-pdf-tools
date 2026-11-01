"use client";

export default function Error({ reset }: { error: Error; reset: () => void }) {
  return (
    <div className="mx-auto max-w-md px-4 py-24 text-center">
      <h1 className="text-2xl font-bold">Ups, ada yang tidak beres</h1>
      <p className="mt-2 text-gray-500">Halaman gagal dimuat. Coba lagi sebentar.</p>
      <button
        onClick={reset}
        className="mt-6 rounded-xl bg-brand px-5 py-3 font-medium text-white hover:bg-brand-dark"
      >
        Muat ulang
      </button>
    </div>
  );
}
