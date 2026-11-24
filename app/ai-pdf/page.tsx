"use client";

import Script from "next/script";
import { useMemo, useState, type ChangeEvent } from "react";
import { FileSearch, FileText, Loader2, Send, Sparkles, UploadCloud, X } from "lucide-react";
import MarkdownView from "@/components/MarkdownView";

declare global {
  interface Window {
    pdfjsLib?: {
      GlobalWorkerOptions: { workerSrc: string };
      getDocument: (options: { data: Uint8Array }) => { promise: Promise<{
        numPages: number;
        getPage: (n: number) => Promise<{ getTextContent: () => Promise<{ items: Array<{ str?: string }> }> }>;
      }> };
    };
  }
}

type PageText = { page: number; text: string };
type Message = { role: "user" | "assistant"; text: string; pages?: number[] };

function relevantPages(pages: PageText[], question: string, limit = 10) {
  const words = Array.from(new Set(question.toLocaleLowerCase("id-ID").match(/[a-z0-9À-ÿ]{3,}/g) ?? []));
  return pages.map((page) => ({
    page,
    score: words.reduce((sum, word) => sum + (page.text.toLocaleLowerCase("id-ID").includes(word) ? 1 : 0), 0),
  })).filter((item) => item.score > 0).sort((a, b) => b.score - a.score).slice(0, limit).map((item) => item.page);
}

export default function AiPdfPage() {
  const [pages, setPages] = useState<PageText[]>([]);
  const [name, setName] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [question, setQuestion] = useState("");
  const [ready, setReady] = useState(false);
  const [busy, setBusy] = useState(false);
  const [progress, setProgress] = useState("");
  const [error, setError] = useState("");
  const words = useMemo(() => pages.reduce((n, p) => n + p.text.split(/\s+/).filter(Boolean).length, 0), [pages]);

  async function upload(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;
    setError("");
    if (!file.name.toLowerCase().endsWith(".pdf") || file.size > 50 * 1024 * 1024) {
      setError("Pilih PDF valid dengan ukuran maksimal 50 MB.");
      return;
    }
    if (!window.pdfjsLib) {
      setError("Pembaca PDF belum siap. Muat ulang halaman dan coba lagi.");
      return;
    }
    setBusy(true);
    try {
      const pdfjs = window.pdfjsLib;
      pdfjs.GlobalWorkerOptions.workerSrc = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";
      const pdf = await pdfjs.getDocument({ data: new Uint8Array(await file.arrayBuffer()) }).promise;
      const extracted: PageText[] = [];
      for (let n = 1; n <= Math.min(pdf.numPages, 300); n++) {
        const content = await (await pdf.getPage(n)).getTextContent();
        const text = content.items.map((item) => item.str ?? "").join(" ").replace(/\s+/g, " ").trim();
        if (text) extracted.push({ page: n, text });
      }
      if (!extracted.length) throw new Error("Teks tidak ditemukan. PDF hasil scan memerlukan OCR, yang belum tersedia.");
      setPages(extracted);
      setName(file.name);
      setMessages([{ role: "assistant", text: `PDF berhasil dibaca: **${extracted.length} halaman berisi teks**. Tanyakan apa saja tentang isi dokumen ini.` }]);
    } catch (e) {
      setError(e instanceof Error ? e.message : "PDF gagal dibaca.");
    } finally {
      setBusy(false);
    }
  }

  async function ask(prompt: string) {
    if (!prompt.trim() || !pages.length || busy) return;
    setBusy(true);
    setError("");
    setMessages((items) => [...items, { role: "user", text: prompt }]);
    setQuestion("");
    try {
      const selected = relevantPages(pages, prompt);
      if (!selected.length) throw new Error("Tidak ditemukan halaman yang cocok. Coba kata kunci lain.");
      const response = await fetch("/api/assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: prompt, pages: selected }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error ?? "Gagal menghubungi AI.");
      setMessages((items) => [...items, { role: "assistant", text: data.text, pages: data.pagesUsed }]);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Terjadi kesalahan.");
    } finally {
      setBusy(false);
    }
  }

  async function summarize() {
    if (!pages.length || busy) return;
    setBusy(true);
    setError("");
    setProgress("Menyiapkan ringkasan...");
    setMessages((items) => [...items, { role: "user", text: "Buat ringkasan dari seluruh PDF." }]);
    try {
      const batches: PageText[][] = [];
      let batch: PageText[] = [];
      let size = 0;
      for (const page of pages) {
        if (batch.length >= 18 || (size + page.text.length > 36000 && batch.length)) {
          batches.push(batch); batch = []; size = 0;
        }
        batch.push(page); size += page.text.length;
      }
      if (batch.length) batches.push(batch);
      const summaries: string[] = [];
      for (let i = 0; i < batches.length; i++) {
        setProgress(`Menganalisis bagian ${i + 1} dari ${batches.length}...`);
        const response = await fetch("/api/assistant", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            question: "Ringkas bagian ini secara terstruktur. Ambil tujuan, pokok bahasan, fakta/angka penting dan kesimpulan. Sertakan rujukan [Hal. N], jangan mengarang.",
            pages: batches[i],
            mode: "summary",
          }),
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data.error ?? "Gagal merangkum PDF.");
        summaries.push(`### Bagian ${i + 1} · Halaman ${batches[i][0].page}–${batches[i][batches[i].length - 1].page}\n\n${data.text}`);
      }
      setMessages((items) => [...items, { role: "assistant", text: `## Ringkasan seluruh dokumen\n\n${summaries.join("\n\n---\n\n")}\n\n*Ringkasan mencakup ${pages.length} halaman berisi teks.*` }]);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Gagal merangkum PDF.");
    } finally {
      setBusy(false); setProgress("");
    }
  }

  function reset() {
    setPages([]); setName(""); setMessages([]); setError(""); setProgress("");
  }

  return <div className="mx-auto max-w-5xl px-4 py-8 sm:py-12">
    <Script src="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js" strategy="afterInteractive" onLoad={() => setReady(true)} onError={() => setError("Gagal memuat PDF.js. Periksa koneksi internet.")} />
    <div className="mb-8 border-b border-gray-200 pb-7 dark:border-gray-800">
      <p className="eyebrow flex items-center gap-2"><Sparkles size={14}/> AI DOCUMENT ASSISTANT</p>
      <h1 className="mt-3 font-display text-4xl sm:text-5xl">Tanya dokumenmu.</h1>
      <p className="mt-3 max-w-2xl text-sm leading-6 text-gray-600 dark:text-gray-400">Unggah PDF, ajukan pertanyaan, dan dapatkan jawaban dengan rujukan halaman.</p>
      <p className="mt-2 text-xs text-gray-500">Ekstraksi teks berlangsung di browser. Hanya halaman relevan yang dikirim ke AI.</p>
    </div>
    {!pages.length ? <label className="flex min-h-64 cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed border-gray-300 bg-white px-6 py-10 text-center hover:border-blue-500 dark:border-gray-700 dark:bg-gray-900">
      <input type="file" accept="application/pdf,.pdf" onChange={upload} className="sr-only" disabled={!ready || busy}/>
      <UploadCloud size={28} className="mb-4 text-blue-600"/>
      <strong className="text-sm">{busy ? "Membaca PDF..." : "Pilih file PDF"}</strong>
      <span className="mt-2 text-xs text-gray-500">Maksimal 50 MB · Hingga 300 halaman pertama</span>
      {!ready && <span className="mt-3 text-xs text-gray-400">Menyiapkan pembaca PDF...</span>}
    </label> : <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900">
      <div className="flex items-center justify-between gap-3 border-b border-gray-200 px-4 py-3 dark:border-gray-800">
        <div className="flex min-w-0 items-center gap-3"><FileText className="shrink-0 text-blue-600"/><div className="min-w-0"><p className="truncate text-sm font-semibold">{name}</p><p className="text-xs text-gray-500">{pages.length} halaman · {words.toLocaleString("id-ID")} kata</p></div></div>
        <button onClick={reset} className="flex items-center gap-1 text-xs text-gray-500"><X size={14}/> Ganti PDF</button>
      </div>
      <div className="max-h-[520px] space-y-4 overflow-y-auto bg-gray-50 p-4 sm:p-6 dark:bg-gray-950/40">
        {messages.map((message, i) => <div key={i} className={message.role === "user" ? "ml-auto max-w-[88%] rounded-xl bg-blue-600 px-4 py-3 text-sm text-white" : "max-w-[92%] rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm dark:border-gray-800 dark:bg-gray-900"}>
          {message.role === "assistant" ? <MarkdownView source={message.text} titleColor="#2563eb"/> : message.text}
          {message.pages?.length ? <p className="mt-3 border-t pt-2 text-[10px] text-gray-400">Rujukan: {message.pages.map((p) => `Hal. ${p}`).join(", ")}</p> : null}
        </div>)}
        {busy && <p className="flex items-center gap-2 text-xs text-gray-500"><Loader2 size={15} className="animate-spin"/>{progress || "Menganalisis dokumen..."}</p>}
      </div>
      <div className="border-t border-gray-200 p-4 dark:border-gray-800">
        <div className="mb-3 flex flex-wrap gap-2">
          <button onClick={summarize} disabled={busy} className="rounded-full border border-blue-200 bg-blue-50 px-3 py-2 text-xs font-semibold text-blue-700 disabled:opacity-50 dark:border-blue-900 dark:bg-blue-950/40 dark:text-blue-300">Ringkas seluruh PDF</button>
          <button onClick={() => ask("Apa kesimpulan dan rekomendasi utama dalam dokumen ini?")} disabled={busy} className="rounded-full border px-3 py-2 text-xs disabled:opacity-50">Cari kesimpulan</button>
        </div>
        <form onSubmit={(e) => { e.preventDefault(); void ask(question); }} className="flex items-end gap-2">
          <textarea value={question} onChange={(e) => setQuestion(e.target.value)} rows={2} maxLength={2000} placeholder="Tanyakan sesuatu tentang PDF ini..." className="min-h-12 flex-1 resize-y rounded-lg border border-gray-200 bg-white px-3 py-3 text-sm outline-none focus:border-blue-500 dark:border-gray-700 dark:bg-gray-950"/>
          <button type="submit" disabled={!question.trim() || busy} aria-label="Kirim pertanyaan" className="grid h-11 w-11 shrink-0 place-items-center rounded-lg bg-brand text-white disabled:opacity-40"><Send size={17}/></button>
        </form>
      </div>
    </div>}
    {error && <div role="alert" className="mt-4 flex items-center justify-between gap-3 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700"><span>{error}</span><button onClick={() => setError("")}><X size={15}/></button></div>}
    <p className="mt-5 text-xs leading-5 text-gray-500">PDF hasil scan/gambar belum didukung karena OCR belum tersedia. Ringkasan seluruh PDF dianalisis bertahap; hasil AI tetap perlu diperiksa terhadap dokumen asli.</p>
  </div>;
}
