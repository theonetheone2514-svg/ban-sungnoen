"use client";

import { Clock, Calendar, Moon, Star } from "lucide-react";
import { useDateTime } from "@/hooks/useDateTime";

export default function DateTimeSection() {
  const data = useDateTime();
  if (!data) return <div className="h-48 bg-[var(--bg-section)] rounded-2xl skeleton-pulse" />;

  return (
    <section
      id="datetime-section"
      className="bg-[var(--bg-section)] backdrop-blur-xl rounded-2xl p-6 border border-[var(--border)] shadow-[var(--shadow)] animate-fadeIn stagger-1 card-3d"
    >
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[var(--accent-1)] to-[var(--accent-2)] flex items-center justify-center shrink-0 animate-float">
          <Clock size={22} className="text-white" />
        </div>
        <div className="flex-1 min-w-0">
          <h2 className="text-xs font-semibold text-[var(--accent-1)] uppercase tracking-widest mb-1">
            วันและเวลา
          </h2>
          <div className="text-xl sm:text-2xl font-bold gradient-text tracking-wide break-words">
            {data.timeStr}
          </div>
        </div>
      </div>

      <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="flex items-center gap-3 p-3.5 bg-[var(--bg-card)] border border-[var(--border)] rounded-xl">
          <Calendar size={18} className="text-[var(--accent-1)] shrink-0" />
          <div>
            <div className="text-xs text-[var(--text-secondary)]">วันที่ไทย</div>
            <div className="text-sm font-medium text-[var(--text-primary)]">{data.thaiDate}</div>
          </div>
        </div>
        <div className="flex items-center gap-3 p-3.5 bg-[var(--bg-card)] border border-[var(--border)] rounded-xl">
          <Moon size={18} className="text-[var(--cyan)] shrink-0" />
          <div>
            <div className="text-xs text-[var(--text-secondary)]">ข้างขึ้น/แรม</div>
            <div className="text-sm font-medium text-[var(--text-primary)]">
              {data.lunarInfo.moonEmoji} {data.lunarInfo.lunarText}
            </div>
          </div>
        </div>
        {data.wanPhra && (
          <div className="flex items-center gap-3 p-3.5 bg-[var(--bg-card)] border border-[var(--border)] rounded-xl">
            <Star size={18} className="text-[var(--orange)] shrink-0" />
            <div>
              <div className="text-xs text-[var(--text-secondary)]">วันพระ</div>
              <div className="text-sm font-medium text-[var(--text-primary)]">{data.wanPhra}</div>
            </div>
          </div>
        )}
        <div className="flex items-center gap-3 p-3.5 bg-[var(--bg-card)] border border-[var(--border)] rounded-xl col-span-1 sm:col-span-1">
          <div className="w-[18px] shrink-0" />
          <div>
            <div className="text-xs text-[var(--text-secondary)]">ศักราช</div>
            <div className="text-xs text-[var(--text-secondary)]">
              จ.ศ. {data.chulaSakarat} | ค.ศ. {data.now.getFullYear()} | ม.ศ. {data.mahaSakarat} | ร.ศ. {data.rattanakosinSakarat}
            </div>
          </div>
        </div>
      </div>

      {data.holiday && (
        <div className="mt-3 p-3 rounded-xl bg-gradient-to-r from-[var(--accent-1)]/10 to-[var(--accent-2)]/10 border border-[var(--accent-1)]/20 text-center animate-borderGlow">
          <span className="text-sm font-medium text-[var(--accent-1)]">{data.holiday}</span>
        </div>
      )}

      <div className="mt-4 text-center">
        <p className="text-sm text-[var(--text-secondary)] italic">
          💬 วันนี้คุณลงขายสินค้า หาตังค์หรือยัง
        </p>
      </div>
    </section>
  );
}
