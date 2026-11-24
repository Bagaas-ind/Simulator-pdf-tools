 "use client";

import { useMemo, useState } from "react";
import { PDFDocument, StandardFonts, rgb, degrees } from "pdf-lib";
import { ArrowDown, ArrowUp, Copy, Download, FileText, Hash, RotateCcw, Trash2, Type } from "lucide-react";
import PdfDropzone from "@/components/PdfDropzone";
import ToolHeader from "@/components/ToolHeader";
import { downloadPdf, formatSize, type PdfItem } from "@/lib/pdf";

export default function EditPdfPage() {
  const [file, setFile] = useState<PdfItem | null>(null);
  const [order, setOrder] = useState<number[]>([]);
  const [watermark, setWatermark] = useState("");
  const [numberPages, setNumberPages] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  const move = (index: number, direction: -1 | 1) => setOrder((current) => {
    const next = [...current]; const target = index + direction;
    if (target < 0 || target >= next.length) return current;
    [next[index], next[target]] = [next[target], next[index]];
    return next;
  });
  const reset = () => { setFile(null); setOrder([]); setWatermark(""); setNumberPages(false); setError(""); setNotice(""); };
  const changed = useMemo(() => !!file && (order.length !== file.pages || order.some((n, i) => n !== i)), [file, order]);

  async function exportPdf() {
    if (!file || !order.length) return;
    setBusy(true); setError(""); setNotice("");
    try {
      const source = await PDFDocument.load(file.bytes);
      const output = await PDFDocument.create();
      const font = await output.embedFont(StandardFonts.Helvetica);
      const pages = await output.copyPages(source, order);
      pages.forEach((page, index) => {
        output.addPage(page);
        const { width, height } = page.getSize();
        if (watermark.trim()) page.drawText(watermark.trim().slice(0, 100), {
          x: width * 0.12, y: height * 0.5, size: Math.max(18, Math.min(width, height) * 0.055),
          font, color: rgb(0.55, 0.58, 0.64), opacity: 0.2, rotate: degrees(-32),
        });
        if (numberPages) page.drawText(String(index + 1), {
          x: width / 2 - 4, y: 22, size: 9, font, color: rgb(0.35, 0.38, 0.43),
        });
      });
      const bytes = await output.save({ useObjectStreams: true });
      downloadPdf(bytes, file.name.replace(/\.pdf$/i, "") + "-edited.pdf");
      setNotice("PDF berhasil dibuat dan diunduh.");
    } catch (e) {
      setError(e instanceof Error ? e.message : "PDF gagal diproses. Coba file lain.");
    } finally { setBusy(false); }
  }

  return <div className="mx-auto max-w-4xl space-y-6 px-4 py-8 sm:py-12">
    <ToolHeader icon={FileText} title="Edit halaman PDF" description="Susun ulang, hapus, gandakan halaman, tambahkan watermark, dan nomor halaman." />
    {!file ? <PdfDropzone multiple={false} onFiles={(items) => { const next = items[0]; if (next) { setFile(next); setOrder(Array.from({ length: next.pages }, (_, i) => i)); } }} /> : <>
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-gray-900">
        <div className="flex min-w-0 items-center gap-3"><FileText className="shrink-0 text-brand"/><div className="min-w-0"><p className="truncate text-sm font-semibold">{file.name}</p><p className="text-xs text-gray-500">{order.length} halaman aktif · {formatSize(file.size)}</p></div></div>
        <button onClick={reset} className="text-xs font-semibold text-gray-500 hover:text-red-600">Ganti file</button>
      </div>
      <section className="space-y-3">
        <div className="flex items-center justify-between"><h2 className="text-sm font-semibold">Urutan halaman</h2><span className="text-xs text-gray-500">Gunakan panah untuk mengatur urutan</span></div>
        {order.map((page, index) => <div key={index} className="flex items-center gap-3 rounded-lg border border-gray-200 bg-white p-3 dark:border-gray-800 dark:bg-gray-900">
          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-md bg-gray-100 text-xs font-bold dark:bg-gray-800">{index + 1}</span>
          <div className="min-w-0 flex-1"><p className="text-sm font-medium">Halaman sumber {page + 1}</p><p className="text-xs text-gray-500">Posisi {index + 1} pada hasil akhir</p></div>
          <button title="Naik" aria-label="Pindahkan ke atas" onClick={() => move(index, -1)} disabled={index === 0} className="rounded p-2 hover:bg-gray-100 disabled:opacity-25 dark:hover:bg-gray-800"><ArrowUp size={16}/></button>
          <button title="Turun" aria-label="Pindahkan ke bawah" onClick={() => move(index, 1)} disabled={index === order.length - 1} className="rounded p-2 hover:bg-gray-100 disabled:opacity-25 dark:hover:bg-gray-800"><ArrowDown size={16}/></button>
          <button title="Duplikat" aria-label="Gandakan halaman" onClick={() => setOrder((v) => [...v.slice(0, index + 1), page, ...v.slice(index + 1)])} className="rounded p-2 text-brand hover:bg-brand/10"><Copy size={16}/></button>
          <button title="Hapus" aria-label="Hapus halaman" onClick={() => setOrder((v) => v.filter((_, i) => i !== index))} disabled={order.length === 1} className="rounded p-2 text-red-600 hover:bg-red-50 disabled:opacity-25 dark:hover:bg-red-950/30"><Trash2 size={16}/></button>
        </div>)}
        {!order.length && <p className="rounded-lg border border-dashed p-6 text-center text-sm text-gray-500">Semua halaman dihapus. Unggah ulang file untuk memulai lagi.</p>}
      </section>
      <section className="grid gap-4 rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-gray-900 sm:grid-cols-2">
        <label className="block"><span className="flex items-center gap-2 text-sm font-semibold"><Type size={15}/> Watermark</span><input value={watermark} onChange={(e) => setWatermark(e.target.value)} maxLength={100} placeholder="Contoh: DOKUMEN INTERNAL" className="mt-2 w-full rounded-md border border-gray-200 bg-transparent px-3 py-2 text-sm outline-none focus:border-brand dark:border-gray-700"/><span className="mt-1 block text-xs text-gray-500">Teks transparan di tengah setiap halaman.</span></label>
        <label className="flex cursor-pointer items-start gap-3 pt-1"><input type="checkbox" checked={numberPages} onChange={(e) => setNumberPages(e.target.checked)} className="mt-1 accent-blue-600"/><span><span className="flex items-center gap-2 text-sm font-semibold"><Hash size={15}/> Nomor halaman</span><span className="mt-1 block text-xs text-gray-500">Tambahkan nomor urut di bagian bawah halaman.</span></span></label>
      </section>
      <div className="flex flex-wrap items-center gap-3"><button onClick={exportPdf} disabled={busy || !order.length} className="inline-flex items-center gap-2 rounded-lg bg-brand px-5 py-3 text-sm font-semibold text-white disabled:opacity-40"><Download size={16}/>{busy ? "Memproses..." : "Terapkan dan unduh"}</button><button onClick={() => setOrder(Array.from({length:file.pages},(_,i)=>i))} className="inline-flex items-center gap-2 rounded-lg border border-gray-300 px-4 py-3 text-sm dark:border-gray-700"><RotateCcw size={15}/> Reset urutan</button>{changed && <span className="text-xs text-gray-500">Perubahan halaman belum diekspor.</span>}</div>
    </>}
    {error && <p role="alert" className="rounded-lg bg-red-50 p-3 text-sm text-red-700 dark:bg-red-950/30 dark:text-red-300">{error}</p>}
    {notice && <p role="status" className="rounded-lg bg-emerald-50 p-3 text-sm text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-300">{notice}</p>}
    <p className="text-xs leading-5 text-gray-500">Seluruh proses berjalan di browser. Watermark dan nomor halaman diterapkan saat ekspor, bukan mengubah file asli.</p>
  </div>;
}
