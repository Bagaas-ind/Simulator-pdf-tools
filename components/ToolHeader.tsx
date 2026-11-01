import { Lock, type LucideIcon } from "lucide-react";

type Props = {
  icon: LucideIcon;
  title: string;
  description: string;
  ai?: boolean;
};

export default function ToolHeader({ icon: Icon, title, description, ai }: Props) {
  return (
    <div className="border-b border-gray-200 pb-8 dark:border-gray-800">
      <p className="eyebrow flex items-center gap-2">
        <Icon size={14} strokeWidth={1.75} />
        {ai ? "Dengan AI" : "Alat lokal"}
      </p>
      <h1 className="mt-3 font-display text-4xl leading-tight sm:text-5xl">{title}</h1>
      <p className="mt-3 max-w-2xl text-gray-600 dark:text-gray-400">{description}</p>
      <p className="mt-4 flex items-center gap-2 text-sm text-gray-500">
        <Lock size={14} strokeWidth={1.75} />
        {ai
          ? "Hanya teks permintaan yang dikirim ke AI. File tidak diunggah."
          : "Diproses di browser kamu. File tidak diunggah."}
      </p>
    </div>
  );
}
