"use client";

interface HeaderProps {
  onRefresh: () => void;
}

export default function Header({ onRefresh }: HeaderProps) {
  return (
    <header className="text-center mb-6 p-6 bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl rounded-2xl border border-white/10 shadow-2xl">
      <h1 className="text-text-primary text-xl font-bold mb-4 tracking-wide drop-shadow-lg">
        🏠 บ้านสูงเนิน หมู่ 2 ต.พอกน้อย อ.พรรณานิคม จ.สกลนคร
      </h1>
      <button
        onClick={onRefresh}
        className="bg-gradient-to-r from-[#667eea] to-[#764ba2] text-white border-none px-7 py-3 rounded-full font-semibold text-base shadow-[0_0_20px_rgba(102,126,234,0.3)] hover:shadow-[0_0_30px_rgba(102,126,234,0.5)] hover:-translate-y-0.5 transition-all duration-300"
      >
        🔄 อัพเดทข้อมูล
      </button>
    </header>
  );
}
