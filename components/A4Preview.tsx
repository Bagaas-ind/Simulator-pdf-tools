"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

const PAPER_PX = 794; // 210mm pada 96dpi

/** Membungkus kertas A4 dan mengecilkannya otomatis agar pas di layar HP. */
export default function A4Preview({ children }: { children: ReactNode }) {
  const wrap = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0.5);

  useEffect(() => {
    const el = wrap.current;
    if (!el) return;
    const update = () => setScale(Math.max(0.2, Math.min(1, (el.clientWidth - 24) / PAPER_PX)));
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <div ref={wrap} className="overflow-hidden rounded-2xl bg-gray-200 p-3 dark:bg-gray-800">
      <div className="a4-zoom" style={{ zoom: scale }}>
        {children}
      </div>
    </div>
  );
}
