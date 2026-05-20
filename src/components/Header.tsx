"use client";

import { RefreshCw } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

interface HeaderProps {
  onRefresh: () => void;
}

export default function Header({ onRefresh }: HeaderProps) {
  return (
    <header className="text-center mb-6 p-6 sm:p-8 bg-[var(--bg-section)] backdrop-blur-xl rounded-3xl border border-[var(--border)] shadow-[var(--shadow)] animate-fadeIn">
      <div className="flex items-center justify-center gap-3 mb-4">
        <span className="text-3xl animate-float">🏠</span>
        <h1 className="text-xl sm:text-2xl font-bold gradient-text tracking-wide">
          บ้านสูงเนิน
        </h1>
      </div>
      <p className="text-sm text-[var(--text-secondary)] mb-5 -mt-2">
        หมู่ 2 ต.พอกน้อย อ.พรรณานิคม จ.สกลนคร
      </p>
      <div className="flex items-center justify-center gap-3">
        <button
          onClick={onRefresh}
          className="inline-flex items-center gap-2 bg-gradient-to-r from-[var(--accent-1)] to-[var(--accent-2)] text-white border-none px-6 py-2.5 rounded-full font-semibold text-sm shadow-[0_4px_20px_rgba(102,126,234,0.3)] hover:shadow-[0_6px_30px_rgba(102,126,234,0.5)] hover:-translate-y-0.5 active:scale-95 transition-all duration-300"
        >
          <RefreshCw size={16} className="animate-spinSlow" />
          อัพเดทข้อมูล
        </button>
        <ThemeToggle />
      </div>
    </header>
  );
}
