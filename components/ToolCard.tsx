import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Tool } from "@/lib/tools";

/** Satu baris pada daftar alat (gaya indeks editorial). */
export default function ToolCard({ tool, index }: { tool: Tool; index: number }) {
  const Icon = tool.icon;
  return (
    <Link
      href={tool.href}
      className="group flex items-start gap-4 border-t border-gray-200 py-7 transition hover:bg-gray-100/60 sm:items-center sm:gap-8 dark:border-gray-800 dark:hover:bg-gray-900/60"
    >
      <span className="w-8 shrink-0 pt-1 font-display text-xl text-gray-400 sm:w-12 sm:pt-0 sm:text-2xl">
        {String(index + 1).padStart(2, "0")}
      </span>

      <div className="min-w-0 flex-1 sm:grid sm:grid-cols-[1fr_1.3fr] sm:items-center sm:gap-8">
        <h3 className="flex items-center gap-3 font-display text-2xl leading-tight sm:text-3xl">
          {tool.title}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-gray-600 sm:mt-0 dark:text-gray-400">
          {tool.description}
        </p>
      </div>

      <div className="flex shrink-0 items-center gap-4 pt-1.5 sm:pt-0">
        <span
          className={`hidden items-center gap-1.5 rounded border px-2 py-0.5 text-[11px] font-medium uppercase tracking-wider sm:inline-flex ${
            tool.badge === "AI"
              ? "border-accent/40 text-accent"
              : "border-gray-300 text-gray-500 dark:border-gray-700"
          }`}
        >
          <Icon size={12} strokeWidth={1.75} />
          {tool.badge}
        </span>
        <ArrowUpRight
          size={22}
          strokeWidth={1.5}
          className="text-gray-400 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
        />
      </div>
    </Link>
  );
}
