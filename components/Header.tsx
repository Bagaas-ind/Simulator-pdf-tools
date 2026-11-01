"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import Logo from "./Logo";
import ThemeToggle from "./ThemeToggle";

const nav = [
  { href: "/alat", label: "Semua Alat" },
  { href: "/buat-pdf", label: "Buat PDF" },
  { href: "/kompres", label: "Kompres" },
  { href: "/olah-pdf", label: "Olah PDF" },
];

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header className="sticky top-0 z-30 border-b border-gray-200 bg-page/85 backdrop-blur-md dark:border-gray-800">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-3" aria-label="Saroka PDF Tools, beranda">
          <Logo className="h-8 w-auto" />
          <span className="flex items-baseline gap-2.5">
            <span className="font-display text-2xl leading-none">Saroka</span>
            <span className="hidden text-[11px] font-medium uppercase tracking-[0.2em] text-gray-500 sm:inline">
              PDF Tools
            </span>
          </span>
        </Link>

        {/* Desktop */}
        <nav className="hidden items-center gap-7 md:flex">
          {nav.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              className={`text-sm transition ${
                pathname === n.href
                  ? "font-medium text-gray-900 underline decoration-accent decoration-2 underline-offset-[10px] dark:text-white"
                  : "text-gray-500 hover:text-gray-900 dark:hover:text-white"
              }`}
            >
              {n.label}
            </Link>
          ))}
          <ThemeToggle />
        </nav>

        {/* Mobile */}
        <div className="flex items-center gap-1 md:hidden">
          <ThemeToggle />
          <button
            onClick={() => setOpen((v) => !v)}
            aria-label="Buka menu"
            aria-expanded={open}
            className="rounded-md p-2 text-gray-700 dark:text-gray-200"
          >
            {open ? <X size={20} strokeWidth={1.5} /> : <Menu size={20} strokeWidth={1.5} />}
          </button>
        </div>
      </div>

      {open && (
        <nav className="border-t border-gray-200 bg-page md:hidden dark:border-gray-800">
          <div className="mx-auto flex max-w-6xl flex-col px-4">
            {nav.map((n) => (
              <Link
                key={n.href}
                href={n.href}
                className={`border-b border-gray-200 py-4 text-base last:border-b-0 dark:border-gray-800 ${
                  pathname === n.href ? "font-medium text-accent" : "text-gray-700 dark:text-gray-300"
                }`}
              >
                {n.label}
              </Link>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}
