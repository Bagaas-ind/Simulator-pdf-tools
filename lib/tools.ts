import { Combine, Minimize2, Scissors, Sparkles, RotateCw, FileSearch, type LucideIcon } from "lucide-react";

export type Tool = {
  title: string;
  description: string;
  href: string;
  category: "Buat" | "Atur halaman" | "Optimasi";
  badge: "AI" | "Lokal";
  icon: LucideIcon;
};

export const tools: Tool[] = [
  { title: "AI Document Assistant", description: "Tanya isi PDF, buat ringkasan seluruh dokumen, dan temukan informasi dengan rujukan halaman.", href: "/ai-pdf", category: "Buat", badge: "AI", icon: FileSearch },
  { title: "AI PDF Generator", description: "Minta surat, CV, notulen, atau laporan. AI menulis, kamu tinggal unduh PDF-nya.", href: "/buat-pdf", category: "Buat", badge: "AI", icon: Sparkles },
  { title: "Kompres PDF", description: "Optimasi struktur file di browser tanpa mengirim dokumen ke server.", href: "/kompres", category: "Optimasi", badge: "Lokal", icon: Minimize2 },
  { title: "Gabung PDF", description: "Satukan beberapa file PDF menjadi satu dokumen dengan urutan yang bisa diatur.", href: "/olah-pdf", category: "Atur halaman", badge: "Lokal", icon: Combine },
  { title: "Pisah PDF", description: "Ekstrak halaman tertentu berdasarkan rentang, misalnya 1-3, 5.", href: "/olah-pdf", category: "Atur halaman", badge: "Lokal", icon: Scissors },
  { title: "Putar Halaman PDF", description: "Perbaiki orientasi halaman PDF 90°, 180°, atau 270° langsung di perangkat.", href: "/putar-pdf", category: "Atur halaman", badge: "Lokal", icon: RotateCw },
];
