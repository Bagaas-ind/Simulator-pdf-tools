# 📄 Saroka PDF Tools (Simulator PDF Tools)

![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Groq AI](https://img.shields.io/badge/Groq_AI-F55036?style=for-the-badge&logo=openai&logoColor=white)

**Saroka PDF Tools** adalah platform *all-in-one* berbasis web untuk membuat dan memanipulasi file PDF secara aman dan cepat. Dilengkapi dengan kecerdasan buatan (AI) untuk meng-*generate* dokumen secara otomatis, serta alat manipulasi PDF yang berjalan sepenuhnya di *browser* (tanpa mengunggah file ke server).

## 🌐 Live Demo
Cek website yang sudah online di sini:
👉 **[https://simulator-pdf-tools.vercel.app/](https://simulator-pdf-tools.vercel.app/)**

## ✨ Fitur Utama

- **🤖 AI PDF Generator**: Ketik instruksi bahasa natural (contoh: *"Buatkan surat izin sakit untuk HRD"*), AI akan menyusun drafnya. Kamu bisa langsung mengedit teks dan melihat *live preview* di kertas A4 sebelum mengunduhnya.
- **🔗 Merge PDF**: Gabungkan beberapa file PDF sekaligus menjadi satu dokumen utuh.
- **✂️ Split PDF**: Ekstrak atau pisahkan halaman spesifik dari file PDF yang besar berdasarkan rentang halaman (contoh: "1-3, 5").
- **🔒 Keamanan & Privasi**: 
  - Pemrosesan *Merge* dan *Split* dilakukan 100% di *browser* (Client-Side) menggunakan `pdf-lib`. File kamu tidak pernah dikirim ke server.
  - Validasi *Magic Bytes* (`%PDF-`) untuk mencegah file berbahaya yang menyamar sebagai PDF.
- **🎨 Antarmuka Modern**: Desain bersih, dilengkapi fitur *Dark Mode* dan *Light Mode* yang responsif di HP maupun Laptop.

## 🛠️ Tech Stack
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS & Lucide React
- **PDF Engine**: pdf-lib (Client-Side manipulation)
- **AI Integration**: Vercel AI SDK & Groq API (Llama 3)

## 🚀 Cara Menjalankan (Secara Lokal)

Ikuti langkah ini jika kamu ingin menjalankan proyek ini di komputermu:

1. **Clone repositori ini:**
   ```bash
   git clone https://github.com/Bagaas-ind/Simulator-pdf-tools.git
   cd Simulator-pdf-tools
