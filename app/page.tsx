import Link from "next/link";
import { ArrowRight, Plus } from "lucide-react";
import ToolCard from "@/components/ToolCard";
import { tools } from "@/lib/tools";

const steps = [
  {
    n: "01",
    title: "Pilih alat",
    desc: "Buat dokumen dengan AI, atau gabung, pisah, dan kompres PDF yang sudah kamu punya.",
  },
  {
    n: "02",
    title: "Masukkan file atau permintaan",
    desc: "Tarik PDF ke halaman, atau tulis dokumen apa yang kamu butuhkan.",
  },
  {
    n: "03",
    title: "Unduh hasilnya",
    desc: "Hasil langsung bisa diunduh. Tidak perlu akun dan tidak ada antrean.",
  },
];

const faqs = [
  {
    q: "Apakah file PDF saya diunggah ke server?",
    a: "Tidak. Gabung, pisah, dan kompres diproses sepenuhnya di browser kamu. Satu-satunya data yang dikirim adalah teks permintaan di AI PDF Generator, supaya AI bisa menuliskan dokumennya.",
  },
  {
    q: "Apakah benar-benar gratis?",
    a: "Ya. Tidak perlu akun dan tidak ada watermark pada hasil PDF.",
  },
  {
    q: "Bisa dipakai di HP?",
    a: "Bisa. Tampilan menyesuaikan layar HP, tablet, dan desktop. Untuk tombol Unduh PDF di AI Generator, pilih “Simpan sebagai PDF” di dialog cetak.",
  },
  {
    q: "Kenapa hasil kompres kadang tidak mengecil?",
    a: "Kompres di browser merapikan struktur file, bukan mengecilkan gambar di dalamnya. PDF yang sudah teroptimasi memang tidak banyak berubah, dan aplikasi akan memberi tahu kalau tidak ada penghematan berarti.",
  },
  {
    q: "Ada batas ukuran file?",
    a: "Maksimal 100 MB per file. File yang sangat besar bisa terasa lambat karena diproses oleh perangkatmu sendiri.",
  },
];

export default function HomePage() {
  return (
    <>
      {/* HERO */}
      <section className="mx-auto grid max-w-6xl items-center gap-14 px-4 pb-20 pt-14 md:grid-cols-[1.15fr_1fr] md:pb-28 md:pt-24">
        <div>
          <p className="eyebrow fade-up">Alat PDF untuk dokumen sehari-hari</p>
          <h1 className="fade-up-2 mt-5 font-display text-4xl leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
            Minta dokumennya,
            <br />
            <span className="italic text-accent">PDF langsung jadi.</span>
          </h1>
          <p className="fade-up-3 mt-6 max-w-lg text-lg leading-relaxed text-gray-600 dark:text-gray-400">
            Tulis surat atau CV dengan bantuan AI, lalu gabung, pisah, dan kompres PDF. File
            diproses di perangkatmu sendiri.
          </p>
          <div className="fade-up-3 mt-9 flex flex-col gap-3 sm:flex-row">
            <Link href="/buat-pdf" className="btn-primary">
              Buat PDF dengan AI
            </Link>
            <Link href="/alat" className="btn-ghost">
              Lihat semua alat <ArrowRight size={16} strokeWidth={1.75} />
            </Link>
          </div>
          <p className="fade-up-3 mt-8 text-sm text-gray-500">
            Gratis&ensp;·&ensp;Tanpa akun&ensp;·&ensp;Tanpa watermark&ensp;·&ensp;Nyaman di HP
          </p>
        </div>

        {/* Contoh hasil */}
        <div className="fade-up-2 mx-auto w-full max-w-[25rem]">
          <p className="eyebrow">Contoh permintaan</p>
          <p className="mb-5 mt-3 border-l-2 border-accent pl-4 font-display text-xl italic leading-snug text-gray-700 dark:text-gray-300">
            “Surat permohonan cuti tahunan, 5 hari kerja.”
          </p>
          <div
            aria-hidden
            className="aspect-[210/297] overflow-hidden bg-white p-[9%] text-[10px] leading-[1.6] text-gray-800 shadow-xl ring-1 ring-black/5 sm:text-[10.5px]"
          >
            <p className="text-[13px] font-semibold leading-tight text-[#24569d]">
              Surat Permohonan Cuti Tahunan
            </p>
            <p className="mt-3">
              Yth. Kepala Divisi Sumber Daya Manusia
              <br />
              PT Nusantara Makmur
              <br />
              di Jakarta
            </p>
            <p className="mt-3">Dengan hormat,</p>
            <p className="mt-2">
              Saya yang bertanda tangan di bawah ini mengajukan permohonan cuti tahunan selama 5
              (lima) hari kerja, terhitung mulai tanggal [Tanggal Mulai] sampai dengan [Tanggal
              Selesai].
            </p>
            <p className="mt-2">
              Selama cuti, pekerjaan saya akan dikoordinasikan dengan rekan satu tim agar kegiatan
              operasional tetap berjalan.
            </p>
            <p className="mt-2">
              Demikian permohonan ini saya sampaikan. Atas perhatian dan persetujuan Bapak/Ibu,
              saya ucapkan terima kasih.
            </p>
            <p className="mt-4">
              Hormat saya,
              <br />
              <span className="mt-5 inline-block">[Nama Lengkap]</span>
            </p>
          </div>
        </div>
      </section>

      {/* ALAT */}
      <section className="border-t border-gray-200 dark:border-gray-800">
        <div className="mx-auto max-w-6xl px-4 py-20">
          <div className="flex items-end justify-between gap-6">
            <div>
              <p className="eyebrow">Alat</p>
              <h2 className="mt-3 font-display text-3xl leading-tight sm:text-4xl">
                Empat alat, satu tempat
              </h2>
            </div>
            <Link
              href="/alat"
              className="hidden items-center gap-1.5 text-sm font-medium text-accent hover:underline sm:inline-flex"
            >
              Lihat semua <ArrowRight size={15} strokeWidth={1.75} />
            </Link>
          </div>
          <div className="mt-12 border-b border-gray-200 dark:border-gray-800">
            {tools.map((t, i) => (
              <ToolCard key={t.title} tool={t} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* CARA KERJA */}
      <section className="border-t border-gray-200 dark:border-gray-800">
        <div className="mx-auto max-w-6xl px-4 py-20">
          <p className="eyebrow">Cara kerja</p>
          <h2 className="mt-3 font-display text-3xl leading-tight sm:text-4xl">Tiga langkah, selesai</h2>
          <div className="mt-12 grid gap-10 md:grid-cols-3 md:gap-8">
            {steps.map((s) => (
              <div key={s.n} className="border-t border-gray-300 pt-6 dark:border-gray-700">
                <p className="font-display text-4xl text-gray-300 dark:text-gray-700">{s.n}</p>
                <h3 className="mt-4 text-lg font-semibold">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-600 dark:text-gray-400">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRIVASI */}
      <section className="border-t border-gray-200 dark:border-gray-800">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-20 md:grid-cols-[1fr_1.4fr] md:gap-16">
          <div>
            <p className="eyebrow">Privasi</p>
            <h2 className="mt-3 font-display text-3xl leading-tight sm:text-4xl">
              Apa yang terjadi pada file kamu
            </h2>
            <p className="mt-4 text-gray-600 dark:text-gray-400">
              Kami tulis apa adanya, supaya kamu tahu mana yang tetap di perangkatmu dan mana yang
              dikirim keluar.
            </p>
          </div>
          <div className="divide-y divide-gray-200 border-y border-gray-200 dark:divide-gray-800 dark:border-gray-800">
            <div className="py-6">
              <p className="eyebrow !text-accent">Di browser kamu</p>
              <p className="mt-2 font-display text-xl">Gabung, pisah, dan kompres PDF</p>
              <p className="mt-2 text-sm leading-relaxed text-gray-600 dark:text-gray-400">
                File dibaca langsung oleh browser dan hasilnya diunduh dari sana. Tidak ada proses
                upload, dan tidak ada salinan yang tersimpan di server.
              </p>
            </div>
            <div className="py-6">
              <p className="eyebrow">Dikirim ke layanan AI</p>
              <p className="mt-2 font-display text-xl">AI PDF Generator</p>
              <p className="mt-2 text-sm leading-relaxed text-gray-600 dark:text-gray-400">
                Hanya teks permintaan yang kamu ketik yang dikirim ke Groq untuk dituliskan menjadi
                dokumen. Hindari mengetik data sensitif seperti nomor KTP atau kata sandi.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="border-t border-gray-200 dark:border-gray-800">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-20 md:grid-cols-[1fr_1.4fr] md:gap-16">
          <div>
            <p className="eyebrow">FAQ</p>
            <h2 className="mt-3 font-display text-3xl leading-tight sm:text-4xl">Pertanyaan umum</h2>
          </div>
          <div className="border-t border-gray-200 dark:border-gray-800">
            {faqs.map((f) => (
              <details key={f.q} className="group border-b border-gray-200 py-5 dark:border-gray-800">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-lg">
                  {f.q}
                  <Plus
                    size={20}
                    strokeWidth={1.5}
                    className="shrink-0 text-gray-400 transition-transform group-open:rotate-45"
                  />
                </summary>
                <p className="mt-3 max-w-xl text-sm leading-relaxed text-gray-600 dark:text-gray-400">
                  {f.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* PENUTUP */}
      <section className="border-t border-gray-200 dark:border-gray-800">
        <div className="mx-auto max-w-3xl px-4 py-24 text-center">
          <h2 className="font-display text-3xl leading-tight sm:text-5xl">
            Siap membuat <span className="italic text-accent">PDF pertamamu?</span>
          </h2>
          <p className="mt-4 text-gray-600 dark:text-gray-400">Gratis, tanpa daftar, langsung jalan.</p>
          <Link href="/buat-pdf" className="btn-primary mt-8">
            Mulai sekarang
          </Link>
        </div>
      </section>
    </>
  );
}
