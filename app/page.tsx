import Link from "next/link";
import { ArrowRight, Check, FileSearch, LockKeyhole, Sparkles, Layers3 } from "lucide-react";
import { tools } from "@/lib/tools";

const benefits = [
  { icon: LockKeyhole, title: "Privasi lebih terjaga", text: "Operasi PDF utama berjalan langsung di browser." },
  { icon: Sparkles, title: "AI yang membantu", text: "Tanya isi dokumen dan buat ringkasan dengan rujukan halaman." },
  { icon: Layers3, title: "Alat dalam satu ruang", text: "Buat, atur, dan optimalkan dokumen tanpa berpindah aplikasi." },
];

export default function HomePage() {
  return <main className="mx-auto max-w-6xl px-5 pb-16 pt-10 sm:px-8 sm:pt-16">
    <section className="relative overflow-hidden rounded-3xl border border-blue-100 bg-gradient-to-br from-blue-50 via-white to-indigo-50 px-6 py-12 dark:border-blue-950 dark:from-slate-900 dark:via-slate-950 dark:to-blue-950 sm:px-10 sm:py-16">
      <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_.9fr]">
        <div>
          <p className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-white px-3 py-1.5 text-[10px] font-bold tracking-widest text-blue-700 dark:border-blue-900 dark:bg-slate-900 dark:text-blue-300"><span className="h-1.5 w-1.5 rounded-full bg-emerald-500"/> DOCUMENT WORKSPACE</p>
          <h1 className="mt-6 max-w-2xl text-4xl font-semibold leading-tight tracking-tight text-slate-950 dark:text-white sm:text-6xl">Semua urusan PDF, <span className="text-blue-600 dark:text-blue-400">lebih sederhana.</span></h1>
          <p className="mt-5 max-w-xl text-sm leading-7 text-slate-600 dark:text-slate-300 sm:text-base">SAROKA membantu kamu membuat dokumen, memahami isi PDF dengan AI, dan mengelola halaman dalam satu ruang kerja yang rapi.</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/ai-pdf" className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 hover:bg-blue-700">Coba AI Assistant <ArrowRight size={16}/></Link>
            <Link href="/alat" className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-700 hover:border-blue-300 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200">Jelajahi semua alat</Link>
          </div>
          <div className="mt-8 flex flex-wrap gap-5 text-[11px] font-medium text-slate-500 dark:text-slate-400"><span className="inline-flex items-center gap-1"><Check size={13}/> Tanpa akun</span><span className="inline-flex items-center gap-1"><Check size={13}/> Alat PDF di browser</span><span className="inline-flex items-center gap-1"><Check size={13}/> AI dengan Groq</span></div>
        </div>
        <div className="mx-auto w-full max-w-sm rounded-2xl border border-slate-200 bg-white p-5 shadow-xl dark:border-slate-700 dark:bg-slate-900">
          <div className="flex items-center gap-3 border-b border-slate-100 pb-4 dark:border-slate-800"><span className="grid h-10 w-10 place-items-center rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-950 dark:text-blue-300"><FileSearch size={20}/></span><div><p className="text-sm font-bold text-slate-900 dark:text-white">AI Document Assistant</p><p className="text-xs text-slate-400">PDF analysis workspace</p></div></div>
          <div className="mt-5 rounded-xl bg-slate-50 p-4 dark:bg-slate-800"><p className="text-[10px] font-semibold text-slate-400">PERTANYAAN</p><p className="mt-2 text-sm text-slate-700 dark:text-slate-200">Apa kesimpulan utama dari dokumen ini?</p></div>
          <div className="mt-3 rounded-xl border border-blue-100 bg-blue-50 p-4 dark:border-blue-900 dark:bg-blue-950/40"><p className="flex items-center gap-2 text-[10px] font-bold text-blue-700 dark:text-blue-300"><Sparkles size={13}/> RINGKASAN AI</p><p className="mt-2 text-xs leading-5 text-slate-700 dark:text-slate-200">Temukan temuan utama dan rekomendasi dengan rujukan halaman dari dokumen.</p><span className="mt-3 inline-flex rounded-md border border-blue-200 bg-white px-2 py-1 text-[9px] font-semibold text-blue-700 dark:border-blue-800 dark:bg-slate-900 dark:text-blue-300">Rujukan halaman</span></div>
        </div>
      </div>
    </section>
    <section className="mt-14">
      <div className="flex items-end justify-between gap-4"><div><p className="text-[10px] font-bold tracking-widest text-blue-600 dark:text-blue-400">MULAI DARI SINI</p><h2 className="mt-2 text-2xl font-semibold text-slate-900 dark:text-white">Pilih pekerjaanmu</h2><p className="mt-2 text-sm text-slate-500 dark:text-slate-400">Alat yang kamu butuhkan, tanpa alur yang berbelit.</p></div><Link href="/alat" className="text-xs font-semibold text-blue-600 dark:text-blue-400">Lihat semua alat →</Link></div>
      <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {tools.map((tool, i) => { const Icon = tool.icon; return <Link key={tool.title} href={tool.href} className={`group rounded-2xl border p-5 transition hover:-translate-y-1 hover:shadow-lg ${i === 0 ? "border-blue-200 bg-blue-50/60 dark:border-blue-900 dark:bg-blue-950/20" : "border-slate-200 bg-white hover:border-blue-200 dark:border-slate-800 dark:bg-slate-900"}`}>
          <div className="flex items-start justify-between"><span className="grid h-10 w-10 place-items-center rounded-xl border border-slate-200 bg-white text-blue-600 dark:border-slate-700 dark:bg-slate-800"><Icon size={19}/></span><span className="rounded-full bg-slate-100 px-2 py-1 text-[9px] font-bold text-slate-600 dark:bg-slate-800 dark:text-slate-300">{tool.badge}</span></div>
          <h3 className="mt-5 text-sm font-bold text-slate-900 dark:text-white">{tool.title}</h3><p className="mt-2 min-h-10 text-xs leading-5 text-slate-500 dark:text-slate-400">{tool.description}</p><span className="mt-5 inline-flex items-center gap-2 text-[11px] font-semibold text-blue-600 dark:text-blue-400">Buka alat <ArrowRight size={13}/></span>
        </Link>; })}
      </div>
    </section>
    <section className="mt-14 grid gap-5 border-t border-slate-200 pt-9 dark:border-slate-800 sm:grid-cols-3">
      {benefits.map(({ icon: Icon, title, text }) => <div key={title} className="flex gap-3"><span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300"><Icon size={17}/></span><div><h3 className="text-xs font-bold text-slate-900 dark:text-white">{title}</h3><p className="mt-1.5 text-xs leading-5 text-slate-500 dark:text-slate-400">{text}</p></div></div>)}
    </section>
    <footer className="mt-10 flex justify-between border-t border-slate-200 pt-5 text-[10px] text-slate-400 dark:border-slate-800"><span>© {new Date().getFullYear()} SAROKA PDF Tools</span><span>Created for simpler document workflows.</span></footer>
  </main>;
}
