"use client";

import { useState, useCallback, useRef } from "react";
import { API, MODEL_NAME } from "@/lib/api";
import { stripThinkTags } from "@/lib/utils";

export interface ChatMessage {
  role: "user" | "ai";
  content: string;
}

export function useChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(false);
  const historyRef = useRef<ChatMessage[]>([]);

  const sendMessage = useCallback(
    async (
      text: string,
      villageContext: string
    ) => {
      if (!text.trim() || loading) return;

      const userMsg: ChatMessage = { role: "user", content: text };
      setMessages((prev) => [...prev, userMsg]);
      setLoading(true);

      try {
        const res = await fetch(API.chat, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            model: MODEL_NAME,
            messages: [
              { role: "system", content: `คุณคือผู้ช่วย AI ของหมู่บ้านบ้านสูงเนิน\n\n${villageContext}\n\nกรุณาตอบเป็นภาษาไทย` },
              ...historyRef.current.slice(-5).map((m) => ({ role: m.role, content: m.content })),
              { role: "user", content: text },
            ],
            temperature: 0.7,
            max_tokens: 1000,
          }),
        });

        if (!res.ok) throw new Error("API Error: " + res.status);
        const data = await res.json();
        const aiContent = stripThinkTags(
          data.choices?.[0]?.message?.content || "ไม่ได้รับคำตอบ"
        );
        const aiMsg: ChatMessage = { role: "ai", content: aiContent };
        setMessages((prev) => [...prev, aiMsg]);
        historyRef.current.push(userMsg, aiMsg);
      } catch (err) {
        const errMsg: ChatMessage = {
          role: "ai",
          content: "เกิดข้อผิดพลาด: " + (err as Error).message,
        };
        setMessages((prev) => [...prev, errMsg]);
      } finally {
        setLoading(false);
      }
    },
    [loading]
  );

  return { messages, loading, sendMessage };
}
