import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Kanit", "Sarabun", "Noto Sans TH", "sans-serif"],
      },
      colors: {
        "bg-primary": "#1a1a2e",
        "bg-secondary": "#252545",
        "bg-card": "#2d2d50",
        "text-primary": "#f0f0f0",
        "text-secondary": "#9898b0",
        "accent-start": "#667eea",
        "accent-end": "#764ba2",
        cyan: "#00d9ff",
        border: "#363660",
      },
    },
  },
  plugins: [],
};
export default config;
