"use client";

import { useState } from "react";
import { Download, Loader2, Sparkles } from "lucide-react";
import MarkdownView from "@/components/MarkdownView";

const COLORS = [
  { name: "Teal", value: "#0f766e" },
  { name: "Biru", value: "#1d4ed8" },
  { name: "Merah", value: "#b91c1c" },
];

const field =
  "w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm outline-none focus:border-brand dark:border-gray-700 dark:bg-gray-900";

export default function BuatPdfPage() {
  const [prompt, setPrompt] = useState("");
  const [language, setLanguage] = useState("id");
  const [length, setLength] = useState("short");
  const [content, setContent] = useState("");
  const [color, setColor] = useState(COLORS[0].value);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function generate() {
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt, language, length }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Gagal membuat dokumen");
      setContent(data.text);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Terjadi kesalahan");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">AI PDF Generator</h1>
        <p className="text-gray-500 dark:text-gray-400">
          Minta dibuatkan dokumen, edit kalau perlu, lalu unduh sebagai PDF A4.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Kiri: input */}
        <div className="space-y-4">
          <label className="block text-sm font-medium">
            Minta dibuatkan
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              rows={4}
              placeholder="Contoh: Surat izin tidak masuk kerja karena sakit selama 2 hari"
              className={`${field} mt-1`}
            />
          </label>

          <div className="grid grid-cols-2 gap-3">
            <label className="block text-sm font-medium">
              Bahasa
              <select value={language} onChange={(e) => setLanguage(e.target.value)} className={`${field} mt-1`}>
                <option value="id">Indonesia</option>
                <option value="en">English</option>
              </select>
            </label>
            <label className="block text-sm font-medium">
              Panjang dokumen
              <select value={length} onChange={(e) => setLength(e.target.value)} className={`${field} mt-1`}>
                <option value="short">Pendek</option>
                <option value="long">Panjang</option>
              </select>
            </label>
          </div>

          <button
            onClick={generate}
            disabled={loading || !prompt.trim()}
            className="inline-flex items-center gap-2 rounded-xl bg-brand px-5 py-3 font-medium text-white hover:bg-brand-dark disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? <Loader2 size={18} className="animate-spin" /> : <Sparkles size={18} />}
            {loading ? "Menulis..." : "Buatkan dokumen"}
          </button>

          {error && (
            <p className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700 dark:border-red-900 dark:bg-red-950/40 dark:text-red-300">
              {error}
            </p>
          )}

          <label className="block text-sm font-medium">
            Isi dokumen (bisa diedit)
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={14}
              placeholder="Hasil AI (format Markdown) muncul di sini. Kamu juga boleh mengetik sendiri."
              className={`${field} mt-1 font-mono`}
            />
          </label>

          <div>
            <p className="mb-2 text-sm font-medium">Warna judul</p>
            <div className="flex gap-3">
              {COLORS.map((c) => (
                <button
                  key={c.value}
                  onClick={() => setColor(c.value)}
                  aria-label={c.name}
                  title={c.name}
                  className={`h-8 w-8 rounded-full border-2 ${
                    color === c.value ? "border-gray-900 ring-2 ring-offset-2 dark:border-white" : "border-transparent"
                  }`}
                  style={{ backgroundColor: c.value }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Kanan: preview */}
        <div className="min-w-0">
          <div className="mb-3 flex items-center justify-between">
            <p className="text-sm font-medium">Preview A4</p>
            <button
              onClick={() => window.print()}
              disabled={!content.trim()}
              className="inline-flex items-center gap-2 rounded-lg bg-brand px-4 py-2 text-sm font-medium text-white hover:bg-brand-dark disabled:cursor-not-allowed disabled:opacity-50"
            >
              <Download size={16} /> Unduh PDF
            </button>
          </div>

          <div className="overflow-auto rounded-xl bg-gray-200 p-3 dark:bg-gray-800">
            {/* Dibungkus agar kertas A4 mengecil di layar, tapi tetap 210mm saat print */}
            <div className="origin-top-left [zoom:0.55] sm:[zoom:0.7]">
              <div id="print-area" className="a4-paper shadow-xl">
                {content.trim() ? (
                  <MarkdownView source={content} titleColor={color} />
                ) : (
                  <p className="text-gray-400">Dokumen akan tampil di sini...</p>
                )}
              </div>
            </div>
          </div>
          <p className="mt-2 text-xs text-gray-500">
            Di dialog cetak, pilih tujuan “Simpan sebagai PDF”, ukuran A4, dan matikan “Header dan footer”.
          </p>
        </div>
      </div>
    </div>
  );
}
