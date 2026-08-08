import type { Config } from "tailwindcss";

/**
 * Tailwind CSS v3 — Konfigurasi untuk BaleLearn LMS
 * Primary: Navy Blue (#2A4B7C), Accent: Gold (#F59E0B)
 * Dark mode: class strategy
 */
const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#EBF0F7",
          100: "#D6E1EF",
          200: "#ADC3DF",
          300: "#85A5CF",
          400: "#5C87BF",
          500: "#2A4B7C",
          600: "#243F69",
          700: "#1D3356",
          800: "#172843",
          900: "#101C30",
          950: "#0A1120",
        },
        accent: {
          50: "#FFFBEB",
          100: "#FEF3C7",
          200: "#FDE68A",
          300: "#FCD34D",
          400: "#FBBF24",
          500: "#F59E0B",
          600: "#D97706",
          700: "#B45309",
          800: "#92400E",
          900: "#78350F",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "-apple-system", "sans-serif"],
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { transform: "translateY(8px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
      },
      animation: {
        "fade-in": "fadeIn 0.25s ease-out",
        "slide-up": "slideUp 0.25s ease-out",
      },
    },
  },
  plugins: [],
};

export default config;
