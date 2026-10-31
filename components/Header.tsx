import Link from "next/link";
import ThemeToggle from "./ThemeToggle";

const nav = [
  { href: "/buat-pdf", label: "Buat PDF" },
  { href: "/kompres", label: "Kompres" },
  { href: "/olah-pdf", label: "Olah PDF" },
];

export default function Header() {
  return (
    <header className="sticky top-0 z-20 border-b border-gray-200 bg-white/90 backdrop-blur dark:border-gray-800 dark:bg-gray-950/90">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link href="/" className="flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand text-lg font-bold text-white">
            S
          </span>
          <span className="font-semibold">Saroka PDF Tools</span>
        </Link>
        <nav className="flex items-center gap-1 sm:gap-3">
          {nav.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              className="rounded-lg px-2 py-1.5 text-sm text-gray-600 hover:bg-gray-100 hover:text-brand dark:text-gray-300 dark:hover:bg-gray-800"
            >
              {n.label}
            </Link>
          ))}
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
