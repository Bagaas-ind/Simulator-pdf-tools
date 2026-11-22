import Link from "next/link";
import { ArrowRight, Combine, FileOutput, FileText, Minimize2, RotateCw, Scissors, Sparkles } from "lucide-react";
import { tools } from "@/lib/tools";
import QuickPdfPreview from "@/components/QuickPdfPreview";

const iconMap = [Sparkles, Minimize2, Combine, Scissors, RotateCw];

export default function HomePage() {
  return (
    <main className="saroka-shell professional-home">
      <div className="home-heading">
        <div>
          <p className="eyebrow">SAROKA / DOCUMENT TOOLS</p>
          <h1>PDF work, made simple.</h1>
          <p className="home-intro">Satu tempat untuk membuat, mengatur, dan menyelesaikan dokumen PDF.</p>
        </div>
        <Link href="/alat" className="all-tools-link">Lihat semua alat <ArrowRight size={15}/></Link>
      </div>

      <section className="work-area" aria-label="Unggah dokumen">
        <div className="work-area-heading">
          <div><span className="section-kicker">MULAI BEKERJA</span><h2>Unggah dokumen</h2></div>
          <span className="local-note"><span/> File diproses di perangkat</span>
        </div>
        <QuickPdfPreview />
      </section>

      <section className="tools-section">
        <div className="tools-heading"><div><span className="section-kicker">TOOLS</span><h2>Yang bisa kamu lakukan</h2></div><span className="tools-count">{tools.length} tools</span></div>
        <div className="professional-tool-list">
          {tools.map((tool,index) => {
            const Icon=iconMap[index] ?? FileOutput;
            return <Link href={tool.href} key={tool.title} className="professional-tool-row">
              <span className="row-icon"><Icon size={19}/></span>
              <span className="row-copy"><strong>{tool.title}</strong><small>{tool.description}</small></span>
              <span className="row-type">{tool.badge === "AI" ? "AI" : "LOCAL"}</span>
              <ArrowRight className="row-arrow" size={17}/>
            </Link>;
          })}
        </div>
      </section>

      <section className="generator-note">
        <div className="generator-icon"><FileText size={19}/></div>
        <div><strong>Butuh dokumen baru?</strong><p>Buat dokumen dari instruksi teks menggunakan AI Generator.</p></div>
        <Link href="/buat-pdf">Buka generator <ArrowRight size={15}/></Link>
      </section>

      <footer className="professional-footer"><span>© {new Date().getFullYear()} SAROKA</span><span>Dokumen tetap milikmu. Proses dengan tenang.</span></footer>
    </main>
  );
}
