import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: {
          950: "#06090e",
          900: "#0b1018",
          850: "#0f1622",
          800: "#141d2c",
          750: "#1a2537",
          700: "#223046",
          600: "#324461",
        },
        brand: {
          blue: "#2563eb",
          sky: "#0284c7",
          cyan: "#06b6d4",
          teal: "#0d9488",
          emerald: "#059669",
        },
        border: {
          subtle: "rgba(255, 255, 255, 0.07)",
          medium: "rgba(255, 255, 255, 0.12)",
          bright: "rgba(56, 189, 248, 0.3)",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        mono: ["var(--font-jetbrains)", "monospace"],
      },
      boxShadow: {
        card: "0 4px 20px -2px rgba(0, 0, 0, 0.45)",
        glow: "0 0 25px -5px rgba(6, 182, 212, 0.18)",
        innerGlow: "inset 0 1px 1px 0 rgba(255, 255, 255, 0.08)",
      },
    },
  },
  plugins: [],
};
export default config;
