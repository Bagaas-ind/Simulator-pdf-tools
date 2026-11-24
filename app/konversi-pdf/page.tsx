"use client";

import Script from "next/script";
import { useState } from "react";
import { ArrowDownToLine, FileImage, FileText, Images, Loader2 } from "lucide-react";
import ToolHeader from "@/components/ToolHeader";
import { PDFDocument } from "pdf-lib";
import PdfDropzone from "@/components/PdfDropzone";
import { downloadPdf, formatSize, type PdfItem } from "@/lib/pdf";

declare global {
  interface Window {
    pdfjsLib?: {
      GlobalWorkerOptions: { workerSrc: string };
      getDocument: (options: { data: Uint8Array }) => { promise: Promise<{ numPages: number; getPage: (n: number) => Promise<{ getViewport: (o: {scale:number}) => {width:number;height:number}; render: (o: {canvas: HTMLCanvasElement; canvasContext: CanvasRenderingContext2D; viewport: {width:number;height:number}}) => {promise: Promise<void>} }> }> };
    };
  }
}

type ImageItem = { id: string; name: string; file: File; preview: string };

export default function ConvertPdfPage() {
  const [mode, setMode] = useState<"to-pdf" | "to-image">("to-pdf");
  const [images, setImages] = useState<ImageItem[]>([]);
  const [pdf, setPdf] = useState<PdfItem | null>(null);
  const [scale, setScale] = useState("1.5");
  const [busy, setBusy] = useState(false);
  const [ready, setReady] = useState(false);
  const [error, setError] = useState("");
  const [done, setDone] = useState("");

  function addImages(list: FileList | null) {
    if (!list) return;
    const accepted = Array.from(list).filter((f) => ["image/png", "image/jpeg"].includes(f.type));
    if (!accepted.length) { setError("Pilih gambar PNG atau JPG."); return; }
    setError(""); setDone("");
    setImages((prev) => [...prev, ...accepted.map((file) => ({ id: crypto.randomUUID(), name: file.name, file, preview: URL.createObjectURL(file) }))]);
  }

  async function imagesToPdf() {
    if (!images.length) return;
    setBusy(true); setError(""); setDone("");
    try {
      const doc = await PDFDocument.create();
      for (const image of images) {
        const bytes = new Uint8Array(await image.file.arrayBuffer());
        const embedded = image.file.type === "image/png" ? await doc.embedPng(bytes) : await doc.embedJpg(bytes);
        const page = doc.addPage([595.28, 841.89]);
        const margin = 28;
        const fit = Math.min((page.getWidth() - margin * 2) / embedded.width, (page.getHeight() - margin * 2) / embedded.height);
        const width = embedded.width * fit; const height = embedded.height * fit;
        page.drawImage(embedded, { x: (page.getWidth() - width) / 2, y: (page.getHeight() - height) / 2, width, height });
      }
      downloadPdf(await doc.save(), "gambar-ke-pdf.pdf");
      setDone(images.length + " gambar berhasil digabung menjadi satu PDF.");
    } catch (e) { setError(e instanceof Error ? e.message : "Gagal membuat PDF dari gambar."); }
    finally { setBusy(false); }
  }

  async function pdfToImages() {
    if (!pdf || !window.pdfjsLib) return;
    setBusy(true); setError(""); setDone("");
    try {
      const lib = window.pdfjsLib;
      lib.GlobalWorkerOptions.workerSrc = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";
      const doc = await lib.getDocument({ data: new Uint8Array(pdf.bytes) }).promise;
      if (doc.numPages > 30) throw new Error("Untuk menjaga performa, ekspor dibatasi maksimal 30 halaman per proses.");
      for (let n = 1; n <= doc.numPages; n++) {
        const page = await doc.getPage(n);
        const viewport = page.getViewport({ scale: Number(scale) });
        const canvas = document.createElement("canvas");
        canvas.width = Math.ceil(viewport.width); canvas.height = Math.ceil(viewport.height);
        const context = canvas.getContext("2d");
        if (!context) throw new Error("Canvas tidak tersedia di browser ini.");
        await page.render({ canvas, canvasContext: context, viewport }).promise;
        const blob = await new Promise<Blob>((resolve, reject) => canvas.toBlob((value) => value ? resolve(value) : reject(new Error("Gagal membuat gambar.")), "image/png"));
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a"); link.href = url; link.download = pdf.name.replace(/\.pdf$/i, "") + "-halaman-" + n + ".png"; link.click();
        setTimeout(() => URL.revokeObjectURL(url), 1500);
        canvas.width = 0; canvas.height = 0;
      }
      setDone(doc.numPages + " halaman selesai diekspor sebagai PNG. Unduhan dilakukan per halaman.");
    } catch (e) { setError(e instanceof Error ? e.message : "Gagal mengubah PDF menjadi gambar."); }
    finally { setBusy(false); }
  }

  return <div className="mx-auto max-w-3xl space-y-6 px-4 py-8 sm:py-12">
    <Script src="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js" strategy="afterInteractive" onLoad={() => setReady(true)} onError={() => setError("Gagal memuat engine pembaca PDF.")}/>
    <ToolHeader icon={Images} title="Konversi PDF & gambar" description="Ubah JPG/PNG menjadi PDF atau ekspor halaman PDF menjadi gambar PNG."/>
    <div className="flex flex-wrap gap-2"><button onClick={() => {setMode("to-pdf");setError("");setDone("");}} className={mode==="to-pdf"?"rounded-md bg-brand px-4 py-2 text-sm font-semibold text-white":"rounded-md border px-4 py-2 text-sm dark:border-gray-700"}><FileText size={15} className="mr-2 inline"/>Gambar ke PDF</button><button onClick={() => {setMode("to-image");setError("");setDone("");}} className={mode==="to-image"?"rounded-md bg-brand px-4 py-2 text-sm font-semibold text-white":"rounded-md border px-4 py-2 text-sm dark:border-gray-700"}><FileImage size={15} className="mr-2 inline"/>PDF ke gambar</button></div>
    {mode==="to-pdf" ? <section className="space-y-4"><label className="flex min-h-48 cursor-pointer flex-col items-center justify-center rounded-lg border border-dashed border-gray-300 bg-white p-6 text-center dark:border-gray-700 dark:bg-gray-900"><Images size={27} className="mb-3 text-brand"/><strong className="text-sm">Pilih gambar JPG atau PNG</strong><span className="mt-1 text-xs text-gray-500">Setiap gambar akan menjadi satu halaman PDF.</span><input type="file" accept="image/png,image/jpeg" multiple className="sr-only" onChange={(e)=>addImages(e.target.files)}/></label>
      {images.length>0 && <div className="space-y-2">{images.map((img,i)=><div key={img.id} className="flex items-center gap-3 rounded-md border p-2 dark:border-gray-800"><img src={img.preview} alt="" className="h-12 w-12 rounded object-cover"/><div className="min-w-0 flex-1"><p className="truncate text-sm">{i+1}. {img.name}</p><p className="text-xs text-gray-500">{formatSize(img.file.size)}</p></div><button onClick={()=>setImages(v=>v.filter(x=>x.id!==img.id))} className="px-2 text-sm text-red-600">Hapus</button></div>)}</div>}
      <button onClick={imagesToPdf} disabled={!images.length||busy} className="rounded-lg bg-brand px-5 py-3 text-sm font-semibold text-white disabled:opacity-40">{busy?"Memproses...":"Buat dan unduh PDF"}</button>
    </section> : <section className="space-y-4"><PdfDropzone multiple={false} onFiles={(items)=>{setPdf(items[0]??null);setError("");setDone("");}}/>
      {pdf && <div className="rounded-lg border bg-white p-4 dark:border-gray-800 dark:bg-gray-900"><div className="flex items-center gap-3"><FileText className="text-brand"/><div className="min-w-0 flex-1"><p className="truncate text-sm font-semibold">{pdf.name}</p><p className="text-xs text-gray-500">{pdf.pages} halaman · {formatSize(pdf.size)}</p></div></div><label className="mt-4 block text-sm">Kualitas gambar<select value={scale} onChange={(e)=>setScale(e.target.value)} className="mt-1 block w-full rounded-md border bg-transparent px-3 py-2 dark:border-gray-700"><option value="1">Standar</option><option value="1.5">Tinggi</option><option value="2">Sangat tinggi (file lebih besar)</option></select></label></div>}
      <button onClick={pdfToImages} disabled={!pdf||busy||!ready} className="inline-flex items-center gap-2 rounded-lg bg-brand px-5 py-3 text-sm font-semibold text-white disabled:opacity-40">{busy?<Loader2 size={16} className="animate-spin"/>:<ArrowDownToLine size={16}/>} {busy?"Mengekspor halaman...":!ready?"Menyiapkan konverter...":"Unduh halaman sebagai PNG"}</button>
      <p className="text-xs text-gray-500">Setiap halaman diunduh sebagai file PNG terpisah. Maksimal 30 halaman per proses.</p>
    </section>}
    {error&&<p role="alert" className="rounded-md bg-red-50 p-3 text-sm text-red-700 dark:bg-red-950/30 dark:text-red-300">{error}</p>}
    {done&&<p role="status" className="rounded-md bg-emerald-50 p-3 text-sm text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-300">{done}</p>}
    <p className="text-xs text-gray-500">File diproses secara lokal di browser dan tidak dikirim ke server SAROKA.</p>
  </div>;
}
