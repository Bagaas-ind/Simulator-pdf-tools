import type { Metadata, Viewport } from "next";
import "@fontsource-variable/inter";
import "@fontsource/instrument-serif/400.css";
import "@fontsource/instrument-serif/400-italic.css";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: {
    default: "Saroka PDF Tools: buat, gabung, pisah, dan kompres PDF",
    template: "%s | Saroka PDF Tools",
  },
  description:
    "Buat dokumen dengan AI, gabung, pisah, dan kompres PDF langsung di browser. Gratis, tanpa akun, file tidak diunggah ke server.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#24569d",
};

const themeScript = `
(function () {
  try {
    var t = localStorage.getItem('theme');
    var dark = t ? t === 'dark' : window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (dark) document.documentElement.classList.add('dark');
  } catch (e) {}
})();
`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="flex min-h-screen flex-col bg-page font-sans text-gray-900 antialiased dark:text-gray-100">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
