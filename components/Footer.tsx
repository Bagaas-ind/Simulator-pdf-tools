import Link from "next/link";
import Logo from "./Logo";

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 dark:border-gray-800">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-12 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <Logo className="h-7 w-auto" />
          <div>
            <p className="font-display text-xl leading-none">Saroka PDF Tools</p>
            <p className="mt-1 text-xs text-gray-500">© {new Date().getFullYear()}</p>
          </div>
        </div>
        <nav className="flex flex-wrap gap-x-8 gap-y-3 text-sm text-gray-500">
          <Link href="/alat" className="hover:text-gray-900 dark:hover:text-white">Semua Alat</Link>
          <Link href="/buat-pdf" className="hover:text-gray-900 dark:hover:text-white">Buat PDF</Link>
          <Link href="/kompres" className="hover:text-gray-900 dark:hover:text-white">Kompres</Link>
          <Link href="/olah-pdf" className="hover:text-gray-900 dark:hover:text-white">Olah PDF</Link>
        </nav>
      </div>
    </footer>
  );
}
