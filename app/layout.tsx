import type { Metadata, Viewport } from "next";
import "@fontsource-variable/inter";
import "@fontsource/instrument-serif/400.css";
import "@fontsource/instrument-serif/400-italic.css";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: {
    default: "SAROKA — AI PDF & Document Workspace",
    template: "%s | SAROKA PDF Tools",
  },
  description: "Ruang kerja dokumen untuk bertanya dan merangkum PDF dengan AI, membuat dokumen, serta mengelola halaman PDF langsung di browser.",
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
  return <html lang="id" suppressHydrationWarning><head><script dangerouslySetInnerHTML={{ __html: themeScript }} /></head>
    <body className="flex min-h-screen flex-col bg-page font-sans text-gray-900 antialiased dark:text-gray-100"><Header/><main className="flex-1">{children}</main><Footer/></body>
  </html>;
}
