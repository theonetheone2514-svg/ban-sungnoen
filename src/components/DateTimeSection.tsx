"use client";

import { useDateTime } from "@/hooks/useDateTime";

export default function DateTimeSection() {
  const data = useDateTime();

  if (!data) return null;

  return (
    <section
      id="datetime-section"
      className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 mb-5 border border-white/10 shadow-lg animate-fadeIn"
    >
      <div className="text-center">
        <div className="text-2xl font-semibold text-text-primary mb-3 bg-gradient-to-r from-[#667eea] to-[#764ba2] bg-clip-text text-transparent tracking-wide">
          {data.timeStr}
        </div>
        <div className="text-xl text-text-primary mb-2 font-medium">
          {data.thaiDate}
        </div>
        <div className="text-base text-text-secondary my-1">
          💬 วันนี้คุณลงขายสินค้า หาตังค์หรือยัง
        </div>
        <div className="text-base text-text-secondary my-1">
          {data.lunarInfo.moonEmoji} {data.wanPhra}
        </div>
        <div className="text-sm text-text-secondary mt-2 opacity-80">
          จ.ศ. {data.chulaSakarat} | ค.ศ. {data.now.getFullYear()} | ม.ศ.{" "}
          {data.mahaSakarat} | ร.ศ. {data.rattanakosinSakarat}
        </div>
        {data.holiday && (
          <div className="text-lg text-cyan mt-4 px-5 py-2 bg-cyan/10 rounded-full inline-block border border-cyan/30 font-medium">
            {data.holiday}
          </div>
        )}
      </div>
    </section>
  );
}
