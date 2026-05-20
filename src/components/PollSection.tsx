"use client";

import { useEffect } from "react";
import { BarChart3, Send } from "lucide-react";
import { usePoll } from "@/hooks/usePoll";

export default function PollSection() {
  const { poll, selected, setSelected, fetchPoll, vote } = usePoll();

  useEffect(() => { fetchPoll(); }, [fetchPoll]);

  return (
    <section id="poll-section" className="mt-8 animate-fadeIn stagger-8">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[var(--accent-3)] to-[var(--accent-2)] flex items-center justify-center">
          <BarChart3 size={20} className="text-white" />
        </div>
        <h2 className="text-lg font-bold gradient-text">แบบสำรวจความคิดเห็น</h2>
      </div>

      {!poll ? (
        <div className="bg-[var(--bg-section)] rounded-2xl p-6 border border-[var(--border)]">
          <div className="h-10 bg-[var(--bg-card)] rounded-xl mb-4 skeleton-pulse" />
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-14 bg-[var(--bg-card)] rounded-xl mb-2 skeleton-pulse" />
          ))}
        </div>
      ) : (
        <div className="bg-[var(--bg-section)] backdrop-blur-xl rounded-2xl p-6 border border-[var(--border)] shadow-[var(--shadow)]">
          <div className="text-base font-medium text-[var(--text-primary)] mb-5 p-4 bg-[var(--bg-card)] border border-[var(--border)] rounded-xl leading-relaxed">
            {poll.question}
          </div>
          <div className="flex flex-col gap-2">
            {Object.entries(poll.options).map(([opt, count]) => {
              const pct = poll.total > 0 ? Math.round((count / poll.total) * 100) : 0;
              const isSelected = selected === opt;
              return (
                <div
                  key={opt}
                  onClick={() => setSelected(opt)}
                  className={`relative overflow-hidden flex items-center gap-3 p-3.5 bg-[var(--bg-card)] border rounded-xl cursor-pointer transition-all duration-300 ${
                    isSelected
                      ? "border-[var(--accent-1)] bg-[var(--accent-1)]/10"
                      : "border-[var(--border)] hover:border-[var(--accent-1)]/50"
                  }`}
                >
                  <div
                    className={`absolute inset-0 bg-gradient-to-r from-[var(--accent-1)]/10 to-transparent transition-all duration-800 ${
                      isSelected ? "opacity-100" : "opacity-0"
                    }`}
                  />
                  <div className="relative flex items-center gap-2 min-w-[70px] font-medium text-sm text-[var(--text-primary)]">
                    <span
                      className={`w-4 h-4 border-2 rounded-full shrink-0 transition-all ${
                        isSelected
                          ? "border-[var(--accent-1)] bg-[var(--accent-1)] shadow-[inset_0_0_0_3px_var(--bg-card)]"
                          : "border-[var(--border)]"
                      }`}
                    />
                    <span>{opt}</span>
                  </div>
                  <div className="relative flex-1 h-2.5 bg-[var(--bg-section)] rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full animate-barFill"
                      style={{
                        width: `${pct}%`,
                        background: `linear-gradient(90deg, var(--accent-1), ${isSelected ? "var(--accent-3)" : "var(--accent-2)"})`,
                      }}
                    />
                  </div>
                  <span className="relative text-[11px] text-[var(--text-secondary)] min-w-[80px] text-right shrink-0">
                    {count} โหวต ({pct}%)
                  </span>
                </div>
              );
            })}
          </div>
          <button
            onClick={vote}
            className="w-full mt-4 inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[var(--accent-1)] to-[var(--accent-2)] text-white border-none py-3 rounded-xl text-sm font-semibold hover:shadow-[0_4px_20px_rgba(102,126,234,0.4)] active:scale-[0.98] transition-all duration-300"
          >
            <Send size={16} />
            โหวต
          </button>
          <div className="text-center mt-3 text-xs text-[var(--text-secondary)]">
            โหวตทั้งหมด: {poll.total} ครั้ง
          </div>
        </div>
      )}
    </section>
  );
}
