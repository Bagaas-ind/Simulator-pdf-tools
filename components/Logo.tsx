/**
 * Logo Saroka: huruf S dari satu pita tebal dengan garis tipis di tengah,
 * ujung dipotong miring. Warna mengikuti tema (CSS variable --logo / --page).
 */
const S_PATH = "M100 22 H45 A24 24 0 0 0 45 70 H70 A24 24 0 0 1 70 118 H20";

export default function Logo({ className = "h-8 w-auto" }: { className?: string }) {
  return (
    <svg
      viewBox="4 5 108 130"
      className={className}
      role="img"
      aria-label="Logo Saroka"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <clipPath id="saroka-cut">
          <polygon points="0,0 77,0 120,43 120,140 43,140 0,97" />
        </clipPath>
      </defs>
      <g clipPath="url(#saroka-cut)">
        <path d={S_PATH} stroke="rgb(var(--logo))" strokeWidth="26" />
        <path
          d={S_PATH}
          stroke="rgb(var(--page))"
          strokeWidth="3.4"
          strokeDasharray="0 18 244 400"
        />
      </g>
    </svg>
  );
}
