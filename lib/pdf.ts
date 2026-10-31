import { PDFDocument } from "pdf-lib";

export type PdfItem = {
  id: string;
  name: string;
  size: number;
  pages: number;
  bytes: Uint8Array;
};

export type ReadResult =
  | { ok: true; item: PdfItem }
  | { ok: false; name: string; error: string };

const MAX_SIZE = 100 * 1024 * 1024; // 100 MB

/** Cek magic bytes "%PDF-" di awal file */
async function hasPdfSignature(file: File): Promise<boolean> {
  const head = new Uint8Array(await file.slice(0, 5).arrayBuffer());
  return (
    head.length === 5 &&
    head[0] === 0x25 && // %
    head[1] === 0x50 && // P
    head[2] === 0x44 && // D
    head[3] === 0x46 && // F
    head[4] === 0x2d // -
  );
}

/** Validasi: ekstensi, ukuran, magic bytes, dan bisa dibuka pdf-lib */
export async function readPdf(file: File): Promise<ReadResult> {
  const name = file.name;
  if (!name.toLowerCase().endsWith(".pdf")) {
    return { ok: false, name, error: "Bukan file .pdf" };
  }
  if (file.size === 0) return { ok: false, name, error: "File kosong" };
  if (file.size > MAX_SIZE) return { ok: false, name, error: "File lebih dari 100 MB" };
  if (!(await hasPdfSignature(file))) {
    return { ok: false, name, error: "Isi file bukan PDF asli (magic bytes tidak cocok)" };
  }
  try {
    const bytes = new Uint8Array(await file.arrayBuffer());
    const doc = await PDFDocument.load(bytes, { ignoreEncryption: false });
    return {
      ok: true,
      item: {
        id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
        name,
        size: file.size,
        pages: doc.getPageCount(),
        bytes,
      },
    };
  } catch {
    return { ok: false, name, error: "File rusak, terenkripsi, atau tidak bisa dibaca" };
  }
}

export function formatSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / 1024 / 1024).toFixed(2)} MB`;
}

export function downloadPdf(bytes: Uint8Array, filename: string) {
  const blob = new Blob([new Uint8Array(bytes)], { type: "application/pdf" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

/** "1-3, 5" -> [0,1,2,4] (index 0-based). Lempar Error kalau tidak valid. */
export function parseRanges(input: string, totalPages: number): number[] {
  const parts = input
    .split(",")
    .map((p) => p.trim())
    .filter(Boolean);
  if (parts.length === 0) throw new Error("Isi range halaman, contoh: 1-3, 5");

  const result: number[] = [];
  for (const part of parts) {
    const m = part.match(/^(\d+)(?:\s*-\s*(\d+))?$/);
    if (!m) throw new Error(`Format salah: "${part}". Contoh yang benar: 1-3, 5`);
    const start = parseInt(m[1], 10);
    const end = m[2] ? parseInt(m[2], 10) : start;
    if (start < 1 || end < 1 || start > end) throw new Error(`Range tidak valid: "${part}"`);
    if (end > totalPages) throw new Error(`Halaman ${end} melebihi total ${totalPages} halaman`);
    for (let i = start; i <= end; i++) result.push(i - 1);
  }
  return Array.from(new Set(result)).sort((a, b) => a - b);
}

export async function mergePdfs(items: PdfItem[]): Promise<Uint8Array> {
  const out = await PDFDocument.create();
  for (const item of items) {
    const src = await PDFDocument.load(item.bytes);
    const pages = await out.copyPages(src, src.getPageIndices());
    pages.forEach((p) => out.addPage(p));
  }
  return out.save();
}

export async function extractPages(item: PdfItem, indices: number[]): Promise<Uint8Array> {
  const src = await PDFDocument.load(item.bytes);
  const out = await PDFDocument.create();
  const pages = await out.copyPages(src, indices);
  pages.forEach((p) => out.addPage(p));
  return out.save();
}

/** Kompres ringan: re-save dengan object streams, buang metadata. */
export async function compressPdf(item: PdfItem): Promise<Uint8Array> {
  const doc = await PDFDocument.load(item.bytes);
  doc.setTitle("");
  doc.setAuthor("");
  doc.setSubject("");
  doc.setKeywords([]);
  doc.setProducer("");
  doc.setCreator("");
  return doc.save({ useObjectStreams: true, addDefaultPage: false });
}
