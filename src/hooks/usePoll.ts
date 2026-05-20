"use client";

import { useState, useCallback } from "react";
import { API } from "@/lib/api";

export interface PollData {
  question: string;
  options: Record<string, number>;
  total: number;
}

export function usePoll() {
  const [poll, setPoll] = useState<PollData | null>(null);
  const [selected, setSelected] = useState("");

  const fetchPoll = useCallback(async () => {
    try {
      const res = await fetch(API.poll.get);
      const data = await res.json();
      if (data.success) {
        setPoll({ question: data.question, options: data.options, total: data.total });
        setSelected("");
      }
    } catch {
      // silent
    }
  }, []);

  const vote = useCallback(async () => {
    if (!selected) {
      alert("กรุณาเลือกตัวเลือกก่อน");
      return;
    }
    try {
      const res = await fetch(API.poll.vote, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ option: selected }),
      });
      if (!res.ok) throw new Error("โหวตไม่สำเร็จ");
      await fetchPoll();
    } catch (err) {
      alert("เกิดข้อผิดพลาด: " + (err as Error).message);
    }
  }, [selected, fetchPoll]);

  return { poll, selected, setSelected, fetchPoll, vote };
}
