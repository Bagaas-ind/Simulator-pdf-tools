"use client";

import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { UploadCloud } from "lucide-react";
import { readPdf, type PdfItem } from "@/lib/pdf";

type Props = {
  multiple?: boolean;
  onFiles: (items: PdfItem[]) => void;
  label?: string;
};

export default function PdfDropzone({ multiple = true, onFiles, label }: Props) {
  const [errors, setErrors] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const onDrop = useCallback(
    async (accepted: File[]) => {
      setLoading(true);
      const results = await Promise.all(accepted.map(readPdf));
      const good = results.flatMap((r) => (r.ok ? [r.item] : []));
      const bad = results.flatMap((r) => (r.ok ? [] : [`${r.name}: ${r.error}`]));
      setErrors(bad);
      if (good.length) onFiles(good);
      setLoading(false);
    },
    [onFiles]
  );

  const onDropRejected = useCallback((rejections: { file: File }[]) => {
    setErrors(rejections.map((r) => `${r.file.name}: Bukan file PDF`));
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    onDropRejected,
    multiple,
    accept: { "application/pdf": [".pdf"] },
  });

  return (
    <div>
      <div
        {...getRootProps()}
        className={`flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed p-10 text-center transition ${
          isDragActive
            ? "border-brand bg-brand/5"
            : "border-gray-300 bg-white hover:border-brand dark:border-gray-700 dark:bg-gray-900"
        }`}
      >
        <input {...getInputProps()} />
        <UploadCloud className="mb-2 text-brand" size={36} />
        <p className="font-medium">
          {loading
            ? "Memeriksa file..."
            : label ?? (multiple ? "Tarik file PDF ke sini, atau klik untuk memilih" : "Tarik 1 file PDF ke sini, atau klik untuk memilih")}
        </p>
        <p className="mt-1 text-sm text-gray-500">File diproses di browser, tidak diunggah.</p>
      </div>
      {errors.length > 0 && (
        <ul className="mt-3 space-y-1 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700 dark:border-red-900 dark:bg-red-950/40 dark:text-red-300">
          {errors.map((e) => (
            <li key={e}>• {e}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
