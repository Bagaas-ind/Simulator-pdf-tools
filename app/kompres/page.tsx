"use client";

import { useState } from "react";
import { FileText } from "lucide-react";
import PdfDropzone from "@/components/PdfDropzone";
import { compressPdf, downloadPdf, formatSize, type PdfItem } from "@/lib/pdf";

export default function KompresPage() {
  const [file, setFile] = useState<PdfItem | null>(null);
  const [result, setResult] = useState<Uint8Array | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  async function run() {
    if (!file) return;
    setBusy(true);
    setError("");
    try {
      setResult(await compressPdf(file));
    } catch {
      setError("Gagal mengompres PDF.");
    } finally {
      setBusy(false);
    }
  }

  const saved = file && result ? file.size - result.length : 0;
  const percent = file && result && file.size > 0 ? Math.round((saved / file.size) * 100) : 0;

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Kompres PDF</h1>
        <p className="text-gray-500 dark:text-gray-400">
          Optimasi struktur file di browser. Hasil terbaik untuk PDF yang belum dioptimasi.
        </p>
      </div>

      <PdfDropzone
        multiple={false}
        onFiles={(items) => {
          setFile(items[0]);
          setResult(null);
        }}
      />

      {file && (
        <div className="space-y-4 rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-gray-900">
          <div className="flex items-center gap-3">
            <FileText className="text-brand" size={20} />
            <div>
              <p className="text-sm font-medium">{file.name}</p>
              <p className="text-xs text-gray-500">
                {file.pages} halaman • {formatSize(file.size)}
              </p>
            </div>
          </div>

          <button
            onClick={run}
            disabled={busy}
            className="rounded-xl bg-brand px-5 py-3 font-medium text-white hover:bg-brand-dark disabled:opacity-50"
          >
            {busy ? "Memproses..." : "Kompres"}
          </button>

          {result && (
            <div className="space-y-3 rounded-lg bg-gray-50 p-3 text-sm dark:bg-gray-950">
              <p>
                {formatSize(file.size)} → <b>{formatSize(result.length)}</b>{" "}
                {saved > 0 ? `(hemat ${percent}%)` : "(tidak ada penghematan berarti)"}
              </p>
              {saved <= 0 && (
                <p className="text-gray-500">
                  File ini kemungkinan sudah optimal. Kompresi gambar di dalam PDF butuh engine
                  khusus (misalnya Ghostscript di server), yang sengaja tidak dipakai demi privasi.
                </p>
              )}
              <button
                onClick={() =>
                  downloadPdf(
                    saved > 0 ? result : file.bytes,
                    `${file.name.replace(/\.pdf$/i, "")}-kompres.pdf`
                  )
                }
                className="rounded-lg border border-brand px-4 py-2 font-medium text-brand hover:bg-brand/5"
              >
                Unduh {saved > 0 ? "hasil" : "file asli"}
              </button>
            </div>
          )}
        </div>
      )}

      {error && <p className="text-sm text-red-600">{error}</p>}
    </div>
  );
}
