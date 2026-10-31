import Link from "next/link";
import type { LucideIcon } from "lucide-react";

export type Tool = {
  title: string;
  description: string;
  href: string;
  category: "Buat" | "Atur halaman" | "Optimasi";
  badge: "AI" | "Lokal";
  icon: LucideIcon;
};

export default function ToolCard({ tool }: { tool: Tool }) {
  const Icon = tool.icon;
  return (
    <Link
      href={tool.href}
      className="group rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition hover:border-brand hover:shadow-md dark:border-gray-800 dark:bg-gray-900"
    >
      <div className="mb-3 flex items-center justify-between">
        <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand/10 text-brand">
          <Icon size={20} />
        </span>
        <span
          className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
            tool.badge === "AI"
              ? "bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300"
              : "bg-brand/10 text-brand"
          }`}
        >
          {tool.badge}
        </span>
      </div>
      <h3 className="font-semibold group-hover:text-brand">{tool.title}</h3>
      <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{tool.description}</p>
    </Link>
  );
}
