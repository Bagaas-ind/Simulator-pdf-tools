import { Combine, Minimize2, Scissors, Sparkles, type LucideIcon } from "lucide-react";

export type Tool = {
  title: string;
  description: string;
  href: string;
  category: "Buat" | "Atur halaman" | "Optimasi";
  badge: "AI" | "Lokal";
  icon: LucideIcon;
};

export const tools: Tool[] = [
  {
    title: "AI PDF Generator",
    description: "Minta surat, CV, notulen, atau laporan. AI menulis, kamu tinggal unduh PDF-nya.",
    href: "/buat-pdf",
    category: "Buat",
    badge: "AI",
    icon: Sparkles,
  },
  {
    title: "Kompres PDF",
    description: "Rapikan dan perkecil ukuran file PDF langsung di browser.",
    href: "/kompres",
    category: "Optimasi",
    badge: "Lokal",
    icon: Minimize2,
  },
  {
    title: "Gabung PDF",
    description: "Satukan beberapa file PDF jadi satu dokumen, urutan bebas diatur.",
    href: "/olah-pdf",
    category: "Atur halaman",
    badge: "Lokal",
    icon: Combine,
  },
  {
    title: "Pisah PDF",
    description: "Ambil halaman tertentu saja, contoh: 1-3, 5.",
    href: "/olah-pdf",
    category: "Atur halaman",
    badge: "Lokal",
    icon: Scissors,
  },
];
