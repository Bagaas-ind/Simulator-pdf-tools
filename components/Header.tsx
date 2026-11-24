"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, LayoutGrid, Sparkles, Wrench, FileSearch } from "lucide-react";
import { useEffect, useState } from "react";
import Logo from "./Logo";
import ThemeToggle from "./ThemeToggle";

const nav = [
  { href: "/alat", label: "Semua alat", icon: LayoutGrid },
  { href: "/buat-pdf", label: "AI Generator", icon: Sparkles },
  { href: "/ai-pdf", label: "AI Assistant", icon: FileSearch },
  { href: "/olah-pdf", label: "Olah PDF", icon: Wrench },
];

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  useEffect(() => setOpen(false), [pathname]);
  return <header className="saroka-header">
    <div className="header-inner">
      <Link href="/" className="brand-lockup" aria-label="Saroka, beranda"><span className="brand-mark"><Logo className="h-6 w-auto"/></span><span className="brand-name">SAROKA</span></Link>
      <nav className="desktop-nav" aria-label="Navigasi utama">{nav.map(({ href, label }) => <Link key={href} href={href} className={pathname === href ? "nav-link active" : "nav-link"}>{label}</Link>)}</nav>
      <div className="header-actions"><ThemeToggle/><button className="mobile-menu" onClick={() => setOpen((v) => !v)} aria-label={open ? "Tutup menu" : "Buka menu"} aria-expanded={open}>{open ? <X size={20}/> : <Menu size={20}/>}</button></div>
    </div>
    {open && <nav className="mobile-nav" aria-label="Navigasi mobile">{nav.map(({ href, label }) => <Link key={href} href={href} className={pathname === href ? "active" : ""}>{label}</Link>)}</nav>}
  </header>;
}
