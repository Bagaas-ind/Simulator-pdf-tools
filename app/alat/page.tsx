"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import ToolCard from "@/components/ToolCard";
import { tools } from "@/lib/tools";

const filters = ["Semua", "Buat", "Atur halaman", "Optimasi"] as const;

export default function AlatPage() {
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
    <div className="mx-auto max-w-6xl px-4 pb-20 pt-14">
      <p className="eyebrow">Alat</p>
      <h1 className="mt-3 font-display text-5xl leading-tight sm:text-6xl">Semua alat</h1>
      <p className="mt-3 max-w-xl text-gray-600 dark:text-gray-400">
        Gratis, tanpa akun, dan diproses di browser kamu.
      </p>

      <div className="mt-10 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="-mx-4 flex gap-6 overflow-x-auto px-4 sm:mx-0 sm:px-0">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`shrink-0 border-b-2 pb-2 text-sm transition ${
                filter === f
                  ? "border-accent font-medium text-gray-900 dark:text-white"
                  : "border-transparent text-gray-500 hover:text-gray-900 dark:hover:text-white"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
        <div className="relative">
          <Search size={16} strokeWidth={1.75} className="absolute left-0 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Cari alat"
            className="w-full border-b border-gray-300 bg-transparent py-2 pl-7 pr-2 text-sm outline-none focus:border-accent sm:w-64 dark:border-gray-700"
          />
        </div>
      </div>

      <div className="mt-8 border-b border-gray-200 dark:border-gray-800">
        {visible.length === 0 ? (
          <p className="border-t border-gray-200 py-16 text-center text-gray-500 dark:border-gray-800">
            Alat tidak ditemukan. Coba kata kunci lain.
          </p>
        ) : (
          visible.map((t, i) => <ToolCard key={t.title} tool={t} index={i} />)
        )}
      </div>
    </div>
  );
}
