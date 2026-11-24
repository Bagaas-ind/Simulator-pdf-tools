<div align="center">

# 📄 Saroka PDF Tools

**Satu tempat untuk membuat, menggabungkan, memisahkan, dan mengelola dokumen PDF.**

Aplikasi PDF berbasis web dengan AI Generator dan pemrosesan file langsung di browser.

<br />

[![Next.js](https://img.shields.io/badge/Next.js-14.2.15-000000?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)

[![Vercel](https://img.shields.io/badge/Deployed_on-Vercel-000000?style=flat-square&logo=vercel&logoColor=white)](https://vercel.com/)
[![Groq](https://img.shields.io/badge/AI-Groq-F55036?style=flat-square)](https://groq.com/)
[![License](https://img.shields.io/badge/License-AGPL--3.0-blue?style=flat-square)](./LICENSE)

<br />

### 🚀 [Buka Aplikasi](https://simulator-pdf-tools.vercel.app/)

</div>

---

## ✨ Tentang Proyek

**Saroka PDF Tools** adalah aplikasi web untuk membantu pengguna membuat dan mengelola dokumen PDF melalui satu antarmuka yang sederhana. Aplikasi ini menyediakan AI Generator untuk membantu menyusun dokumen serta berbagai alat manipulasi PDF yang diproses secara lokal di browser.

## 🧰 Fitur Utama

| Fitur | Deskripsi | Pemrosesan |
|:---|:---|:---:|
| ✨ **AI PDF Generator** | Membuat draf surat, CV, notulen, dan laporan dengan preview ukuran A4. | Groq API |
| 📚 **Gabung PDF** | Menggabungkan beberapa file PDF dan mengatur urutannya. | Browser |
| ✂️ **Pisah PDF** | Mengekstrak halaman berdasarkan rentang, contoh `1-3, 5`. | Browser |
| 🗜️ **Kompres PDF** | Mengoptimalkan ulang PDF dan menurunkan resolusi gambar tertanam dengan Ghostscript WebAssembly. | Browser (WASM) |
| 🔄 **Putar Halaman** | Memutar halaman PDF sebesar 90°, 180°, atau 270°. | Browser |

## 🛠️ Teknologi yang Digunakan

<div align="center">

| Teknologi | Kegunaan |
|:---|:---|
| ![Next.js](https://img.shields.io/badge/Next.js-000000?style=flat-square&logo=next.js&logoColor=white) | Framework aplikasi web (App Router) |
| ![React](https://img.shields.io/badge/React-20232A?style=flat-square&logo=react&logoColor=61DAFB) | Library antarmuka pengguna |
| ![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white) | Bahasa pemrograman utama |
| ![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white) | Styling antarmuka |
| ![pdf-lib](https://img.shields.io/badge/pdf--lib-PDF_Tools-DC2626?style=flat-square) | Manipulasi dokumen PDF |
| ![Groq](https://img.shields.io/badge/Groq_AI-F55036?style=flat-square) | AI text generation |
| ![Vercel](https://img.shields.io/badge/Vercel_AI_SDK-000000?style=flat-square&logo=vercel&logoColor=white) | Integrasi AI SDK |
| ![Lucide](https://img.shields.io/badge/Lucide_React-F56565?style=flat-square) | Ikon antarmuka |

</div>

## 🔐 Privasi dan Keamanan

- Operasi gabung, pisah, kompres, dan putar PDF berjalan langsung di browser. File PDF tidak diunggah ke server untuk operasi tersebut.
- File PDF divalidasi melalui ekstensi, ukuran, signature `%PDF-`, dan kemampuan parser untuk membukanya.
- AI Generator mengirimkan teks instruksi ke endpoint server yang meneruskan permintaan ke Groq API.
- API key Groq disimpan sebagai environment variable di sisi server. Jangan gunakan prefix `NEXT_PUBLIC_` untuk secret key.
- Hindari memasukkan data rahasia atau informasi pribadi sensitif ke dalam prompt AI.

> **Kompresi PDF:** Menggunakan Ghostscript WebAssembly di browser dengan preset Ringan (300 DPI), Seimbang (150 DPI), dan Kuat (96 DPI). Ukuran hasil bergantung pada isi dokumen. Penulisan ulang PDF dapat memengaruhi formulir, anotasi, bookmark, aksesibilitas, atau tanda tangan digital; simpan dokumen asli. File PDF tidak dikirim ke server.\n\n> **Lisensi:** Proyek ini menggunakan AGPL-3.0. Mesin Ghostscript dan komponen pihak ketiga memiliki pemberitahuan lisensi masing-masing yang disalin ke `public/licenses/ghostscript/` saat instalasi dependensi.

## 💻 Menjalankan di Komputer Lokal

### Persyaratan

- [Node.js](https://nodejs.org/) versi 18 atau lebih baru
- npm
- Groq API Key untuk menggunakan AI Generator

### 1. Clone repository

```bash
git clone https://github.com/Bagaas-ind/Simulator-pdf-tools.git
cd Simulator-pdf-tools
```

### 2. Install dependencies

```bash
npm install
```

### 3. Atur environment variable

Buat file bernama `.env.local` di direktori utama proyek:

```env
GROQ_API_KEY=your_groq_api_key

# Opsional: model Groq yang ingin digunakan
GROQ_MODEL=openai/gpt-oss-120b
```

Ganti `your_groq_api_key` dengan API key milikmu.

### 4. Jalankan development server

```bash
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000) melalui browser.

### 5. Build untuk production

```bash
npm run build
npm run start
```

## ☁️ Deployment

Proyek dapat di-deploy melalui [Vercel](https://vercel.com/) dengan menghubungkan repository GitHub.

Tambahkan environment variable berikut pada **Project Settings → Environment Variables**:

- `GROQ_API_KEY` — wajib untuk AI Generator.
- `GROQ_MODEL` — opsional untuk menentukan model Groq.

Jika integrasi Git aktif, push ke branch dapat menghasilkan Preview Deployment dan perubahan pada production branch dapat memicu deployment produksi.

## 📝 Catatan

- Batas ukuran PDF saat ini adalah **100 MB per file**.
- AI Generator membutuhkan Groq API key yang valid.
- Untuk hasil cetak PDF, gunakan ukuran kertas **A4** dan nonaktifkan header/footer browser.

## 🤝 Kontribusi

Ide, masukan, dan laporan bug sangat terbuka. Silakan buat [Issue](https://github.com/Bagaas-ind/Simulator-pdf-tools/issues) atau ajukan Pull Request jika ingin berkontribusi.

---

<div align="center">


**Saroka PDF Tools**

</div>
