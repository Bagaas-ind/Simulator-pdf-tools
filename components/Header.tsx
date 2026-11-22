"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, LayoutGrid, Sparkles, Wrench } from "lucide-react";
import { useEffect, useState } from "react";
import Logo from "./Logo";
import ThemeToggle from "./ThemeToggle";

const nav = [
  { href: "/alat", label: "Workspace", icon: LayoutGrid },
  { href: "/buat-pdf", label: "AI Generator", icon: Sparkles },
  { href: "/olah-pdf", label: "Olah PDF", icon: Wrench },
];

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  useEffect(() => setOpen(false), [pathname]);

  return (
    <header className="saroka-header">
      <div className="header-inner">
        <Link href="/" className="brand-lockup" aria-label="Saroka, beranda">
          <span className="brand-mark"><Logo className="h-7 w-auto"/></span>
          <span><b>SAROKA</b><small>DOCUMENT WORKSPACE</small></span>
        </Link>
        <nav className="desktop-nav">
          {nav.map(({href,label,icon:Icon}) => <Link key={href} href={href} className={pathname === href ? "nav-link active" : "nav-link"}><Icon size={16}/>{label}</Link>)}
        </nav>
        <div className="header-actions"><span className="privacy-indicator"><span/> PRIVATE BY DESIGN</span><ThemeToggle/><button className="mobile-menu" onClick={() => setOpen(v=>!v)} aria-label={open ? "Tutup menu" : "Buka menu"} aria-expanded={open}>{open ? <X size={21}/> : <Menu size={21}/>}</button></div>
      </div>
      {open && <nav className="mobile-nav">{nav.map(({href,label,icon:Icon})=><Link key={href} href={href} className={pathname===href ? "active" : ""}><Icon size={18}/>{label}</Link>)}</nav>}
    </header>
  );
}
