# Saroka PDF Tools

Aplikasi web untuk membuat dan mengelola dokumen PDF dengan antarmuka berbahasa Indonesia. Dibangun menggunakan Next.js App Router, TypeScript, Tailwind CSS, pdf-lib, dan Groq AI.

## Live demo

https://simulator-pdf-tools.vercel.app/

## Fitur

| Fitur | Keterangan | Pemrosesan |
|---|---|---|
| AI PDF Generator | Membuat draf surat, CV, notulen, dan laporan dalam Markdown dengan preview A4 | Teks prompt dikirim ke Groq API |
| Gabung PDF | Menggabungkan beberapa PDF dan mengatur urutannya | Browser |
| Pisah PDF | Mengekstrak halaman berdasarkan rentang, misalnya `1-3, 5` | Browser |
| Kompres PDF | Menyimpan ulang struktur PDF dan membersihkan metadata | Browser |
| Putar Halaman PDF | Memutar seluruh halaman sebesar 90°, 180°, atau 270° | Browser |

## Privasi dan keamanan

- Operasi gabung, pisah, kompres, dan putar berjalan di browser. File PDF tidak diunggah ke server.
- File PDF divalidasi melalui ekstensi, ukuran, signature `%PDF-`, dan kemampuan parser untuk membukanya.
- AI Generator hanya mengirim teks instruksi ke endpoint server yang meneruskan permintaan ke Groq. Jangan masukkan data rahasia atau informasi pribadi sensitif.
- Kunci API Groq hanya disimpan sebagai environment variable server, tidak boleh menggunakan prefix `NEXT_PUBLIC_`.
- Kompresi saat ini mengoptimalkan struktur dan metadata; bukan kompresi ulang gambar tertanam. Hasilnya tidak selalu lebih kecil.

## Tech stack

- Next.js 14 / App Router
- React 18 dan TypeScript
- Tailwind CSS
- pdf-lib untuk manipulasi PDF di browser
- Vercel AI SDK dan Groq API untuk pembuatan teks
- Lucide React untuk ikon

## Menjalankan secara lokal

Persyaratan: Node.js 18+ dan npm.

```bash
git clone https://github.com/Bagaas-ind/Simulator-pdf-tools.git
cd Simulator-pdf-tools
npm install
```

Buat file `.env.local` di root project:

```env
GROQ_API_KEY=your_groq_api_key
# Opsional
GROQ_MODEL=openai/gpt-oss-120b
```

Jalankan development server:

```bash
npm run dev
```

Buka http://localhost:3000.

Untuk memeriksa build produksi:

```bash
npm run build
npm run start
```

## Deployment

Project dapat dihubungkan ke Vercel melalui GitHub. Set `GROQ_API_KEY` dan, bila diperlukan, `GROQ_MODEL` pada Project Settings → Environment Variables. Push ke branch akan menghasilkan Preview Deployment jika Git integration aktif; merge ke production branch akan memicu deployment produksi.

## Catatan

- Batas ukuran PDF saat ini 100 MB per file.
- AI Generator membutuhkan API key Groq yang valid.
- Hasil PDF yang dibuat melalui tombol cetak browser sebaiknya disimpan dengan ukuran kertas A4 dan header/footer browser dinonaktifkan.
