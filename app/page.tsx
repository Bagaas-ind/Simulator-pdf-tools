import Link from "next/link";
import { ArrowUpRight, Combine, FileOutput, FileText, Minimize2, RotateCw, Scissors, ShieldCheck, Sparkles, WandSparkles, Zap } from "lucide-react";
import { tools } from "@/lib/tools";
import QuickPdfPreview from "@/components/QuickPdfPreview";

const iconMap = [Sparkles, Minimize2, Combine, Scissors, RotateCw];
const highlights = [
  { icon: ShieldCheck, title: "Privasi terjaga", text: "Pemrosesan PDF lokal di browser. File tidak perlu diunggah." },
  { icon: Zap, title: "Cepat dan praktis", text: "Buka alat yang dibutuhkan, proses, lalu unduh hasilnya." },
  { icon: WandSparkles, title: "AI saat dibutuhkan", text: "Ubah instruksi menjadi dokumen siap cetak." },
];

export default function HomePage() {
  return (
    <div className="saroka-shell">
      <section className="dashboard-hero">
        <div className="hero-copy">
          <div className="status-pill"><span className="status-dot" /> YOUR DOCUMENT WORKSPACE</div>
          <p className="eyebrow mt-7">Selamat datang di Saroka</p>
          <h1 className="hero-title">Semua dokumen.<br /><span>Satu ruang kerja.</span></h1>
          <p className="hero-description">Buat, rapikan, dan kelola PDF dengan workflow yang lebih sederhana. Fokus pada pekerjaan, biarkan Saroka menangani dokumennya.</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/buat-pdf" className="btn-primary"><Sparkles size={17} /> Mulai dengan AI <ArrowUpRight size={16} /></Link>
            <Link href="/alat" className="btn-ghost">Jelajahi semua alat</Link>
          </div>
          <div className="hero-meta"><span><ShieldCheck size={15}/> File tetap privat</span><i /> <span>Gratis digunakan</span><i /> <span>Tanpa akun</span></div>
        </div>
        <div className="hero-visual" aria-label="Ilustrasi workspace dokumen">
          <div className="visual-glow" />
          <div className="floating-tag tag-top"><span className="tag-icon"><FileText size={16}/></span><span><b>PDF Workspace</b><small>Ready to work</small></span><span className="tag-check">✓</span></div>
          <div className="document-stack">
            <div className="doc-back" />
            <div className="doc-front"><div className="doc-brand">SAROKA <span>DOCUMENT</span></div><div className="doc-line wide"/><div className="doc-line"/><div className="doc-line short"/><div className="doc-heading"/><div className="doc-line wide"/><div className="doc-line"/><div className="doc-line short"/><div className="doc-sign"/></div>
          </div>
          <div className="floating-tag tag-bottom"><span className="sparkle-orb"><Sparkles size={17}/></span><span><b>Smart tools</b><small>Ready when you are</small></span></div>
        </div>
      </section>

      <section className="workspace-section">
        <div className="section-heading"><div><p className="eyebrow">WORKSPACE</p><h2>Mulai dari mana hari ini?</h2><p>Pilih alat sesuai kebutuhan dokumenmu.</p></div><Link href="/alat" className="section-link">Semua alat <ArrowUpRight size={16}/></Link></div>
        <div className="tool-grid">
          {tools.map((tool, index) => {
            const Icon = iconMap[index] ?? FileOutput;
            return <Link href={tool.href} key={tool.title} className="workspace-card">
              <div className="card-top"><span className="tool-icon"><Icon size={21}/></span><span className={tool.badge === "AI" ? "badge-ai" : "badge-local"}>{tool.badge === "AI" ? "AI POWERED" : "ON DEVICE"}</span></div>
              <h3>{tool.title}</h3><p>{tool.description}</p>
              <span className="card-action">Buka alat <ArrowUpRight size={15}/></span>
            </Link>;
          })}
        </div>
      </section>

      <section className="drop-banner">
        <div className="drop-icon"><FileOutput size={24}/></div>
        <div className="min-w-0 flex-1"><p className="eyebrow">QUICK ACCESS</p><h2>Punya PDF yang ingin diolah?</h2><p>Buka workspace alat untuk mengunggah, melihat detail file, dan memilih tindakan yang tepat.</p></div>
        <div className="w-full"><QuickPdfPreview /></div>
      </section>

      <section className="benefit-grid">
        {highlights.map(({icon: Icon,title,text}) => <div className="benefit-item" key={title}><Icon size={20}/><div><h3>{title}</h3><p>{text}</p></div></div>)}
      </section>
      <footer className="dashboard-footer"><span>© {new Date().getFullYear()} SAROKA</span><span>Thoughtful tools for better documents.</span></footer>
    </div>
  );
}
