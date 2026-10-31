"use client";

import { useState } from "react";
import { ArrowDown, ArrowUp, Combine, FileText, Scissors, X } from "lucide-react";
import PdfDropzone from "@/components/PdfDropzone";
import {
  downloadPdf,
  extractPages,
  formatSize,
  mergePdfs,
  parseRanges,
  type PdfItem,
} from "@/lib/pdf";

type Mode = "merge" | "split";

export default function OlahPdfPage() {
  const [mode, setMode] = useState<Mode>("merge");
  const [files, setFiles] = useState<PdfItem[]>([]);
  const [single, setSingle] = useState<PdfItem | null>(null);
  const [range, setRange] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  function move(index: number, dir: -1 | 1) {
    setFiles((prev) => {
      const next = [...prev];
      const target = index + dir;
      if (target < 0 || target >= next.length) return prev;
      [next[index], next[target]] = [next[target], next[index]];
      return next;
    });
  }

  async function handleMerge() {
    setError("");
    setBusy(true);
    try {
      const bytes = await mergePdfs(files);
      downloadPdf(bytes, "gabungan.pdf");
    } catch {
      setError("Gagal menggabungkan PDF.");
    } finally {
      setBusy(false);
    }
  }

  async function handleSplit() {
    if (!single) return;
    setError("");
    setBusy(true);
    try {
      const indices = parseRanges(range, single.pages);
      const bytes = await extractPages(single, indices);
      downloadPdf(bytes, `${single.name.replace(/\.pdf$/i, "")}-halaman.pdf`);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Gagal mengekstrak halaman.");
    } finally {
      setBusy(false);
    }
  }

  const tabClass = (active: boolean) =>
    `flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium ${
      active
        ? "bg-brand text-white"
        : "border border-gray-200 bg-white text-gray-600 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300"
    }`;

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Olah PDF</h1>
        <p className="text-gray-500 dark:text-gray-400">Gabung atau pisah PDF, 100% di browser.</p>
      </div>

      <div className="flex gap-2">
        <button
          className={tabClass(mode === "merge")}
          onClick={() => {
            setMode("merge");
            setError("");
          }}
        >
          <Combine size={16} /> Gabung
        </button>
        <button
          className={tabClass(mode === "split")}
          onClick={() => {
            setMode("split");
            setError("");
          }}
        >
          <Scissors size={16} /> Pisah
        </button>
      </div>

      {mode === "merge" ? (
        <div className="space-y-4">
          <PdfDropzone multiple onFiles={(items) => setFiles((p) => [...p, ...items])} />

          {files.length > 0 && (
            <ul className="divide-y divide-gray-100 rounded-xl border border-gray-200 bg-white dark:divide-gray-800 dark:border-gray-800 dark:bg-gray-900">
              {files.map((f, i) => (
                <li key={f.id} className="flex items-center gap-3 p-3">
                  <FileText className="shrink-0 text-brand" size={20} />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium">{f.name}</p>
                    <p className="text-xs text-gray-500">
                      {f.pages} halaman • {formatSize(f.size)}
                    </p>
                  </div>
                  <button onClick={() => move(i, -1)} disabled={i === 0} className="rounded p-1 hover:bg-gray-100 disabled:opacity-30 dark:hover:bg-gray-800" aria-label="Naik">
                    <ArrowUp size={16} />
                  </button>
                  <button onClick={() => move(i, 1)} disabled={i === files.length - 1} className="rounded p-1 hover:bg-gray-100 disabled:opacity-30 dark:hover:bg-gray-800" aria-label="Turun">
                    <ArrowDown size={16} />
                  </button>
                  <button onClick={() => setFiles((p) => p.filter((x) => x.id !== f.id))} className="rounded p-1 text-red-600 hover:bg-red-50 dark:hover:bg-red-950/40" aria-label="Hapus">
                    <X size={16} />
                  </button>
                </li>
              ))}
            </ul>
          )}

          <button
            onClick={handleMerge}
            disabled={files.length < 2 || busy}
            className="rounded-xl bg-brand px-5 py-3 font-medium text-white hover:bg-brand-dark disabled:cursor-not-allowed disabled:opacity-50"
          >
            {busy ? "Memproses..." : `Gabungkan ${files.length >= 2 ? files.length + " file" : ""}`}
          </button>
          {files.length === 1 && <p className="text-sm text-gray-500">Tambahkan minimal 2 file.</p>}
        </div>
      ) : (
        <div className="space-y-4">
          <PdfDropzone multiple={false} onFiles={(items) => setSingle(items[0])} />

          {single && (
            <div className="space-y-3 rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-gray-900">
              <div className="flex items-center gap-3">
                <FileText className="text-brand" size={20} />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium">{single.name}</p>
                  <p className="text-xs text-gray-500">
                    {single.pages} halaman • {formatSize(single.size)}
                  </p>
                </div>
                <button onClick={() => setSingle(null)} className="rounded p-1 text-red-600 hover:bg-red-50 dark:hover:bg-red-950/40" aria-label="Hapus">
                  <X size={16} />
                </button>
              </div>
              <label className="block text-sm font-medium">
                Range halaman
                <input
                  value={range}
                  onChange={(e) => setRange(e.target.value)}
                  placeholder="contoh: 1-3, 5"
                  className="mt-1 w-full rounded-lg border border-gray-200 bg-white px-3 py-2 outline-none focus:border-brand dark:border-gray-700 dark:bg-gray-950"
                />
              </label>
            </div>
          )}

          <button
            onClick={handleSplit}
            disabled={!single || !range.trim() || busy}
            className="rounded-xl bg-brand px-5 py-3 font-medium text-white hover:bg-brand-dark disabled:cursor-not-allowed disabled:opacity-50"
          >
            {busy ? "Memproses..." : "Ekstrak"}
          </button>
        </div>
      )}

      {error && (
        <p className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700 dark:border-red-900 dark:bg-red-950/40 dark:text-red-300">
          {error}
        </p>
      )}
    </div>
  );
}
