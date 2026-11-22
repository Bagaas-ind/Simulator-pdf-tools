"use client";

import { useState } from "react";
import { FileText, RotateCw, Download, Loader2 } from "lucide-react";
import PdfDropzone from "@/components/PdfDropzone";
import ToolHeader from "@/components/ToolHeader";
import { downloadPdf, formatSize, rotatePdf, type PdfItem } from "@/lib/pdf";

const angles = [90, 180, 270] as const;

export default function RotatePdfPage() {
  const [file, setFile] = useState<PdfItem | null>(null);
  const [angle, setAngle] = useState<90 | 180 | 270>(90);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  async function handleRotate() {
    if (!file) return;
    setBusy(true);
    setError("");
    try {
      const output = await rotatePdf(file, angle);
      downloadPdf(output, `${file.name.replace(/\\.pdf$/i, "")}-rotated.pdf`);
    } catch {
      setError("PDF tidak dapat diputar. Pastikan file tidak rusak atau terkunci.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="mx-auto max-w-3xl space-y-6 px-4 py-8">
      <ToolHeader icon={RotateCw} title="Putar Halaman PDF" description="Putar orientasi semua halaman PDF langsung di browser. File tidak diunggah." />
      <PdfDropzone multiple={false} onFiles={(items) => { setFile(items[0] ?? null); setError(""); }} />
      {file && (
        <section className="space-y-5 rounded-xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-gray-900">
          <div className="flex items-center gap-3">
            <FileText className="text-brand" size={22} />
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold">{file.name}</p>
              <p className="text-xs text-gray-500">{file.pages} halaman · {formatSize(file.size)}</p>
            </div>
          </div>
          <fieldset>
            <legend className="mb-3 text-sm font-medium">Sudut rotasi</legend>
            <div className="grid grid-cols-3 gap-2">
              {angles.map((value) => (
                <button key={value} type="button" onClick={() => setAngle(value)} aria-pressed={angle === value}
                  className={`rounded-lg border px-3 py-3 text-sm font-medium transition ${angle === value ? "border-brand bg-brand/10 text-brand" : "border-gray-200 hover:border-brand dark:border-gray-700"}`}>
                  {value}°
                </button>
              ))}
            </div>
          </fieldset>
          <button type="button" onClick={handleRotate} disabled={busy}
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-brand px-5 py-3 font-medium text-white hover:bg-brand-dark disabled:opacity-50">
            {busy ? <Loader2 size={18} className="animate-spin" /> : <Download size={18} />}
            {busy ? "Memproses PDF..." : "Putar dan unduh"}
          </button>
        </section>
      )}
      {error && <p role="alert" className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">{error}</p>}
      <p className="text-xs leading-relaxed text-gray-500">Catatan: rotasi diterapkan ke seluruh halaman. File diproses secara lokal menggunakan pdf-lib.</p>
    </div>
  );
}
