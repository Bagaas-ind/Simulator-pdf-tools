import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Warna aktif diatur lewat CSS variable di globals.css (terang/gelap)
        brand: {
          DEFAULT: "rgb(var(--brand) / <alpha-value>)",
          dark: "rgb(var(--brand-dark) / <alpha-value>)",
        },
        accent: "rgb(var(--accent) / <alpha-value>)",
        page: "rgb(var(--page) / <alpha-value>)",
        // Netral hangat di sisi terang, navy di sisi gelap
        gray: {
          50: "#f6f4ef",
          100: "#eeebe4",
          200: "#e1ddd3",
          300: "#cbc6ba",
          400: "#9a9ea8",
          500: "#6e7584",
          600: "#50596b",
          700: "#394254",
          800: "#1c263a",
          900: "#131c2e",
          950: "#0b1220",
        },
      },
      fontFamily: {
        sans: ['"Inter Variable"', "Inter", "ui-sans-serif", "system-ui", "sans-serif"],
        display: ['"Instrument Serif"', "Georgia", '"Times New Roman"', "serif"],
      },
      borderRadius: {
        lg: "0.375rem",
        xl: "0.5rem",
        "2xl": "0.625rem",
        "3xl": "0.75rem",
      },
      boxShadow: {
        sm: "0 1px 2px 0 rgb(15 27 45 / 0.05)",
        DEFAULT: "0 1px 3px 0 rgb(15 27 45 / 0.08)",
        md: "0 4px 12px -2px rgb(15 27 45 / 0.08)",
        lg: "0 10px 24px -6px rgb(15 27 45 / 0.12)",
        xl: "0 24px 48px -16px rgb(15 27 45 / 0.28)",
      },
    },
  },
  plugins: [],
};
export default config;
