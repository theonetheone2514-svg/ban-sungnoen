"use client";

import { useState } from "react";
import { MessageCircle, X, Send } from "lucide-react";
import { useChat, ChatMessage } from "@/hooks/useChat";

const VILLAGE_CONTEXT = `📍 ข้อมูลบ้านสูงเนิน (หมู่ 2 ต.พอกน้อย อ.พรรณานิคม จ.สกลนคร)
- พิกัด: 17.29494, 103.97192 (ที่ราบ)
- สถานศึกษา: โรงเรียนบ้านสูงเนินสามัคคี (ก่อตั้ง พ.ศ. 2481)
- เขื่อนชลประทานน้ำอูน (แหล่งน้ำหลัก)
- พืชเศรษฐกิจ: ข้าว (กข.6), แตงแคนตาลูป, พริก, ถั่วลิสง, มะเขือเทศ, แตงโม
- สาธารณสุข: รพ.สต.พอกน้อย
- วัด: วัดไทรทอง
- ติดต่อ: เทศบาลตำบลพอกน้อย 042-707563`;

function MessageBubble({ msg }: { msg: ChatMessage }) {
  return (
    <div
      className={`max-w-[88%] break-words text-sm leading-relaxed px-4 py-3 rounded-2xl ${
        msg.role === "user"
          ? "bg-gradient-to-r from-[var(--accent-1)] to-[var(--accent-2)] text-white ml-auto rounded-br-sm animate-slideUp"
          : "bg-[var(--bg-card)] text-[var(--text-primary)] mr-auto rounded-bl-sm border border-[var(--border)] animate-slideUp"
      }`}
    >
      {msg.content}
    </div>
  );
}

export default function ChatBot() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const { messages, loading, sendMessage } = useChat();

  const handleSend = () => {
    if (!input.trim() || loading) return;
    sendMessage(input, VILLAGE_CONTEXT);
    setInput("");
  };

  return (
    <div className="fixed bottom-6 right-6 z-[1000]">
      {!open ? (
        <button
          onClick={() => setOpen(true)}
          className="inline-flex items-center gap-2 bg-gradient-to-r from-[var(--accent-1)] to-[var(--accent-2)] text-white border-none px-6 py-3.5 rounded-full font-semibold text-sm shadow-[0_5px_25px_rgba(102,126,234,0.4)] hover:shadow-[0_8px_35px_rgba(102,126,234,0.6)] hover:scale-105 active:scale-95 transition-all duration-300 animate-pulseGlow"
        >
          <MessageCircle size={20} />
          ถาม AI
        </button>
      ) : (
        <div className="absolute bottom-20 right-0 w-[360px] sm:w-[400px] h-[520px] bg-[var(--bg-section)] backdrop-blur-2xl rounded-2xl border border-[var(--border)] shadow-2xl flex flex-col overflow-hidden animate-fadeInScale">
          <div className="bg-gradient-to-r from-[var(--accent-1)] to-[var(--accent-2)] text-white px-5 py-4 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-2">
              <MessageCircle size={18} />
              <span className="font-semibold text-sm">AI สูงเนิน</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-[10px] bg-white/20 px-2 py-0.5 rounded-full">ออนไลน์</span>
              <button onClick={() => setOpen(false)} className="text-white/70 hover:text-white transition-colors">
                <X size={18} />
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3">
            {messages.map((msg, i) => (
              <MessageBubble key={i} msg={msg} />
            ))}
            {loading && (
              <div className="flex items-center gap-2 mr-auto bg-[var(--bg-card)] px-4 py-3 rounded-2xl border border-[var(--border)]">
                {[0, 1, 2].map((i) => (
                  <span
                    key={i}
                    className="w-2 h-2 bg-[var(--accent-1)] rounded-full animate-bounce"
                    style={{ animationDelay: `${i * 0.15}s` }}
                  />
                ))}
              </div>
            )}
          </div>

          <div className="flex gap-2 p-4 bg-[var(--bg-section)] border-t border-[var(--border)] shrink-0">
            <input
              type="text"
              placeholder="พิมพ์ข้อความ..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && (e.preventDefault(), handleSend())}
              className="flex-1 px-4 py-2.5 bg-[var(--bg-card)] border border-[var(--border)] rounded-xl text-sm text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent-1)] transition-all placeholder:text-[var(--text-secondary)]"
            />
            <button
              onClick={handleSend}
              disabled={loading}
              className="bg-gradient-to-r from-[var(--accent-1)] to-[var(--accent-2)] text-white border-none w-[42px] h-[42px] rounded-xl flex items-center justify-center hover:shadow-[0_4px_15px_rgba(102,126,234,0.4)] active:scale-90 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
            >
              <Send size={16} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
