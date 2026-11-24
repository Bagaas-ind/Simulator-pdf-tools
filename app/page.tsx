import Link from "next/link";
import { ArrowRight, Check, FileSearch, LockKeyhole, Files, FileImage, Combine, Minimize2, RotateCw, Sparkles } from "lucide-react";

const work = [
  { href: "/edit-pdf", icon: Files, title: "Edit halaman", detail: "Susun ulang, hapus, gandakan, watermark, dan nomor halaman." },
  { href: "/konversi-pdf", icon: FileImage, title: "Konversi PDF & gambar", detail: "JPG atau PNG menjadi PDF, atau ekspor halaman ke PNG." },
  { href: "/olah-pdf", icon: Combine, title: "Gabung & pisah", detail: "Satukan beberapa file atau ambil halaman tertentu." },
  { href: "/kompres", icon: Minimize2, title: "Kompres PDF", detail: "Optimasi struktur dokumen langsung di browser." },
  { href: "/putar-pdf", icon: RotateCw, title: "Putar halaman", detail: "Perbaiki orientasi halaman dengan beberapa pilihan sudut." },
  { href: "/ai-pdf", icon: FileSearch, title: "Tanya dokumen dengan AI", detail: "Ringkas dan cari informasi dengan rujukan halaman." },
];

export default function HomePage() {
  return <main className="saroka-shell professional-home">
    <section className="home-heading">
      <div><p className="eyebrow">RUANG KERJA DOKUMEN</p><h1>Dokumen selesai,<br className="hidden sm:block"/> tanpa alur yang rumit.</h1><p className="home-intro">Kelola PDF, rapikan halaman, konversi file, dan pahami isi dokumen dalam satu tempat.</p><div className="mt-5 flex flex-wrap gap-4 text-xs text-gray-500"><span className="inline-flex items-center gap-2"><Check size={14} className="text-emerald-600"/> Tanpa akun</span><span className="inline-flex items-center gap-2"><LockKeyhole size={14}/> Proses lokal di browser</span></div></div>
      <Link href="/alat" className="all-tools-link">Lihat semua alat <ArrowRight size={15}/></Link>
    </section>
    <section className="work-area">
      <div className="work-area-heading"><div><p className="section-kicker">MULAI BEKERJA</p><h2>Butuh bantuan dengan dokumen?</h2></div><span className="local-note"><span/> Tidak perlu login</span></div>
      <div className="grid gap-3 sm:grid-cols-2">
        <Link href="/edit-pdf" className="group mt-4 flex items-center gap-4 rounded-lg border border-gray-200 bg-white p-5 transition hover:border-blue-300 dark:border-gray-800 dark:bg-gray-900"><span className="grid h-11 w-11 place-items-center rounded-md bg-gray-100 text-blue-600 dark:bg-gray-800"><Files size={21}/></span><span className="min-w-0 flex-1"><strong className="block text-sm">Atur halaman PDF</strong><small className="mt-1 block text-xs text-gray-500">Edit, susun, hapus, watermark, nomor halaman.</small></span><ArrowRight size={16} className="text-gray-400 group-hover:text-blue-600"/></Link>
        <Link href="/ai-pdf" className="group mt-4 flex items-center gap-4 rounded-lg border border-gray-200 bg-white p-5 transition hover:border-blue-300 dark:border-gray-800 dark:bg-gray-900"><span className="grid h-11 w-11 place-items-center rounded-md bg-gray-100 text-blue-600 dark:bg-gray-800"><Sparkles size={21}/></span><span className="min-w-0 flex-1"><strong className="block text-sm">Pahami dokumen dengan AI</strong><small className="mt-1 block text-xs text-gray-500">Tanya isi PDF dan buat ringkasan terarah.</small></span><ArrowRight size={16} className="text-gray-400 group-hover:text-blue-600"/></Link>
      </div>
    </section>
    <section className="tools-section">
      <div className="tools-heading"><div><p className="section-kicker">ALAT SAROKA</p><h2>Semua yang kamu perlukan</h2></div><span className="tools-count">{work.length} alat tersedia</span></div>
      <div className="professional-tool-list">{work.map(({href,icon:Icon,title,detail})=><Link href={href} key={href} className="professional-tool-row"><span className="row-icon"><Icon size={18}/></span><span className="row-copy"><strong>{title}</strong><small>{detail}</small></span><span className="row-type">{href==="/ai-pdf"?"AI":"PDF"}</span><ArrowRight size={16} className="row-arrow"/></Link>)}</div>
    </section>
    <section className="generator-note"><span className="generator-icon"><FileSearch size={19}/></span><div><strong>Perlu membuat dokumen dari awal?</strong><p>Buat surat, laporan, CV, atau notulen dengan bantuan AI.</p></div><Link href="/buat-pdf">Buka AI Generator <ArrowRight size={14}/></Link></section>
    <footer className="professional-footer"><span>© {new Date().getFullYear()} SAROKA</span><span>Dokumen pribadi tetap berada di perangkatmu untuk alat lokal.</span></footer>
  </main>;
}
