"use client";

import { useEffect } from "react";
import { usePoll } from "@/hooks/usePoll";

export default function PollSection() {
  const { poll, selected, setSelected, fetchPoll, vote } = usePoll();

  useEffect(() => {
    fetchPoll();
  }, [fetchPoll]);

  return (
    <section
      id="poll-section"
      className="mt-8 animate-fadeIn"
    >
      <div className="mb-4">
        <h2 className="text-text-primary text-xl font-bold">
          📊 แบบสำรวจความคิดเห็น
        </h2>
      </div>

      {!poll ? (
        <div>
          <div className="h-10 bg-white/5 rounded-xl mb-4 skeleton-pulse" />
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-[50px] bg-white/5 rounded-xl mb-2 skeleton-pulse" />
          ))}
          <div className="h-11 bg-white/5 rounded-xl mt-3 w-1/2 skeleton-pulse" />
        </div>
      ) : (
        <div>
          <div className="text-base text-text-primary font-medium mb-3.5 p-4 bg-white/5 border border-white/10 rounded-xl">
            {poll.question}
          </div>
          <div className="flex flex-col gap-2">
            {Object.entries(poll.options).map(([opt, count]) => {
              const pct = poll.total > 0 ? Math.round((count / poll.total) * 100) : 0;
              return (
                <div
                  key={opt}
                  onClick={() => setSelected(opt)}
                  className={`flex items-center gap-3 p-3.5 bg-white/5 border rounded-xl cursor-pointer transition-all duration-300 ${
                    selected === opt
                      ? "border-[#667eea] bg-[#667eea]/10"
                      : "border-white/10 hover:border-[#667eea]"
                  }`}
                >
                  <div className="flex items-center gap-2 min-w-[80px] font-medium text-text-primary">
                    <span
                      className={`w-[18px] h-[18px] border-2 rounded-full shrink-0 transition-all ${
                        selected === opt
                          ? "border-[#667eea] bg-[#667eea] shadow-[inset_0_0_0_4px_#2d2d50]"
                          : "border-border"
                      }`}
                    />
                    <span>{opt}</span>
                  </div>
                  <div className="flex-1 h-2 bg-bg-secondary rounded overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-[#667eea] to-[#764ba2] rounded transition-all duration-500"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                  <span className="min-w-[100px] text-right text-xs text-text-secondary">
                    {count} โหวต ({pct}%)
                  </span>
                </div>
              );
            })}
          </div>
          <button
            onClick={vote}
            className="w-full mt-3.5 bg-gradient-to-r from-[#667eea] to-[#764ba2] text-white border-none py-3.5 rounded-xl font-semibold text-base hover:shadow-[0_4px_15px_rgba(102,126,234,0.4)] hover:-translate-y-0.5 transition-all duration-300"
          >
            📤 โหวต
          </button>
          <div className="text-center text-text-secondary text-sm mt-2.5">
            โหวตทั้งหมด: {poll.total} ครั้ง
          </div>
        </div>
      )}
    </section>
  );
}
