"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  Combine,
  FileText,
  Scissors,
  Search,
  ShieldCheck,
  Sparkles,
  UserX,
  Wrench,
  Minimize2,
} from "lucide-react";
import ToolCard, { type Tool } from "@/components/ToolCard";

const tools: Tool[] = [
  {
    title: "AI PDF Generator",
    description: "Minta surat, notulen, atau laporan. AI menulis, kamu unduh PDF-nya.",
    href: "/buat-pdf",
    category: "Buat",
    badge: "AI",
    icon: Sparkles,
  },
  {
    title: "Kompres PDF",
    description: "Perkecil ukuran file PDF langsung di browser.",
    href: "/kompres",
    category: "Optimasi",
    badge: "Lokal",
    icon: Minimize2,
  },
  {
    title: "Gabung PDF",
    description: "Satukan beberapa file PDF jadi satu dokumen.",
    href: "/olah-pdf",
    category: "Atur halaman",
    badge: "Lokal",
    icon: Combine,
  },
  {
    title: "Pisah PDF",
    description: "Ambil halaman tertentu, contoh: 1-3, 5.",
    href: "/olah-pdf",
    category: "Atur halaman",
    badge: "Lokal",
    icon: Scissors,
  },
];

const filters = ["Semua", "Buat", "Atur halaman", "Optimasi"] as const;

export default function HomePage() {
  const [filter, setFilter] = useState<(typeof filters)[number]>("Semua");
  const [query, setQuery] = useState("");

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return tools.filter(
      (t) =>
        (filter === "Semua" || t.category === filter) &&
        (!q || t.title.toLowerCase().includes(q) || t.description.toLowerCase().includes(q))
    );
  }, [filter, query]);

  return (
    <div className="space-y-10">
      {/* Hero */}
      <section className="grid items-center gap-8 md:grid-cols-2">
        <div>
          <h1 className="text-4xl font-bold leading-tight tracking-tight sm:text-5xl">
            Minta dokumennya, <span className="text-brand">PDF langsung jadi.</span>
          </h1>
          <p className="mt-4 text-gray-600 dark:text-gray-400">
            Buat dokumen dengan AI, gabung, pisah, dan kompres PDF. Semua proses file
            terjadi di browser kamu sendiri.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/buat-pdf"
              className="inline-flex items-center gap-2 rounded-xl bg-brand px-5 py-3 font-medium text-white hover:bg-brand-dark"
            >
              <Sparkles size={18} /> Buat PDF dengan AI
            </Link>
            <Link
              href="/kompres"
              className="inline-flex items-center gap-2 rounded-xl border border-gray-300 bg-white px-5 py-3 font-medium hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-900 dark:hover:bg-gray-800"
            >
              <Minimize2 size={18} /> Kompres PDF
            </Link>
          </div>
        </div>

        <div className="space-y-3 rounded-xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-gray-900">
          {[
            { icon: Wrench, title: "Alat lokal", desc: "Diproses di perangkatmu" },
            { icon: ShieldCheck, title: "File tidak diunggah", desc: "Tidak ada PDF yang dikirim ke server" },
            { icon: UserX, title: "Tidak perlu akun", desc: "Langsung pakai tanpa daftar" },
          ].map(({ icon: Icon, title, desc }) => (
            <div key={title} className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand/10 text-brand">
                <Icon size={20} />
              </span>
              <div>
                <p className="font-medium">{title}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Filter & search */}
      <section className="space-y-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap gap-2">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`rounded-lg px-3 py-1.5 text-sm font-medium ${
                  filter === f
                    ? "bg-brand text-white"
                    : "border border-gray-200 bg-white text-gray-600 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
          <div className="relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Cari alat..."
              className="w-full rounded-lg border border-gray-200 bg-white py-2 pl-9 pr-3 text-sm outline-none focus:border-brand sm:w-64 dark:border-gray-700 dark:bg-gray-900"
            />
          </div>
        </div>

        {visible.length === 0 ? (
          <p className="py-10 text-center text-gray-500">
            <FileText className="mx-auto mb-2" /> Alat tidak ditemukan.
          </p>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {visible.map((t) => (
              <ToolCard key={t.title} tool={t} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
