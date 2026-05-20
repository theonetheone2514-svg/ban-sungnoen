"use client";

import { useState } from "react";
import { useChat, ChatMessage } from "@/hooks/useChat";

const VILLAGE_CONTEXT = `📍 ข้อมูลบ้านสูงเนิน (หมู่ 2 ต.พอกน้อย อ.พรรณานิคม จ.สกลนคร)
- พิกัด: 17.29494, 103.97192 (ที่ราบ)
- สถานศึกษา: โรงเรียนบ้านสูงเนินสามัคคี (ก่อตั้ง พ.ศ. 2481) สังกัด สพป.สกลนคร เขต 2
- เขื่อนชลประทานน้ำอูน (แหล่งน้ำหลัก)
- พืชเศรษฐกิจ: ข้าว (กข.6), แตงแคนตาลูป, พริก, ถั่วลิสง, มะเขือเทศ, แตงโม
- สาธารณสุข: รพ.สต.พอกน้อย, อสม.ในหมู่บ้าน
- ความปลอดภัย: สถานีตำรวจชุมชนบ้านสูงเนิน
- วัด: วัดไทรทอง
- ติดต่อ: เทศบาลตำบลพอกน้อย 042-707563, www.poknoi.go.th`;

function MessageBubble({ msg }: { msg: ChatMessage }) {
  return (
    <div
      className={`max-w-[85%] break-words text-sm leading-relaxed px-4 py-3 rounded-2xl ${
        msg.role === "user"
          ? "bg-gradient-to-r from-[#667eea] to-[#764ba2] text-white ml-auto rounded-br-sm"
          : "bg-bg-card text-text-primary mr-auto rounded-bl-sm border border-border"
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
    const text = input;
    setInput("");
    sendMessage(text, VILLAGE_CONTEXT);
  };

  return (
    <div className="fixed bottom-6 right-6 z-[1000]">
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="bg-gradient-to-r from-[#667eea] to-[#764ba2] text-white border-none px-7 py-4 rounded-full font-semibold text-base shadow-[0_5px_25px_rgba(102,126,234,0.4)] hover:-translate-y-1 hover:shadow-[0_8px_35px_rgba(102,126,234,0.6)] transition-all duration-300"
        >
          💬 ถาม AI
        </button>
      )}

      {open && (
        <div className="absolute bottom-[70px] right-0 w-[380px] h-[500px] bg-bg-secondary/85 backdrop-blur-xl rounded-2xl border border-border shadow-2xl flex flex-col overflow-hidden">
          <div className="bg-gradient-to-r from-[#667eea] to-[#764ba2] text-white px-5 py-4.5 flex justify-between items-center">
            <span className="font-semibold text-lg">AI สูงเนิน</span>
            <span className="text-xs bg-white/20 px-2.5 py-1 rounded-full">
              ✅ SungnoenLLM พร้อมใช้งาน
            </span>
            <button
              onClick={() => setOpen(false)}
              className="bg-none border-none text-white text-xl cursor-pointer opacity-80 hover:opacity-100 transition-opacity"
            >
              ✕
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-5 flex flex-col gap-3">
            {messages.map((msg, i) => (
              <MessageBubble key={i} msg={msg} />
            ))}
            {loading && (
              <div className="message ai mr-auto">
                <div className="flex gap-1.5 py-2.5">
                  {[0, 1, 2].map((i) => (
                    <span
                      key={i}
                      className="w-2.5 h-2.5 bg-[#667eea] rounded-full animate-bounce"
                      style={{ animationDelay: `${i * 0.2}s` }}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="flex gap-3 p-4.5 bg-bg-card border-t border-border">
            <input
              type="text"
              placeholder="พิมพ์ข้อความ..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && (e.preventDefault(), handleSend())}
              className="flex-1 px-4.5 py-3.5 bg-bg-secondary border border-border rounded-full text-sm text-text-primary focus:outline-none focus:border-[#667eea] focus:shadow-[0_0_20px_rgba(102,126,234,0.3)] transition-all placeholder:text-text-secondary"
            />
            <button
              onClick={handleSend}
              disabled={loading}
              className="bg-gradient-to-r from-[#667eea] to-[#764ba2] text-white border-none w-[50px] h-[50px] rounded-full text-xl cursor-pointer shadow-[0_4px_15px_rgba(102,126,234,0.3)] hover:scale-105 hover:shadow-[0_0_25px_rgba(102,126,234,0.5)] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
            >
              📤
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
