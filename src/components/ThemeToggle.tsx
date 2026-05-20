"use client";

import { Sun, Moon } from "lucide-react";
import { useTheme } from "./ThemeProvider";

export default function ThemeToggle() {
  const { theme, toggle } = useTheme();
  return (
    <button
      onClick={toggle}
      className="p-2.5 rounded-full bg-white/5 border border-white/10 text-text-secondary hover:bg-white/10 hover:text-[#f093fb] transition-all duration-300"
      title="สลับธีม"
    >
      {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
    </button>
  );
}
