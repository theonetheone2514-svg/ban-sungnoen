"use client";

import { useState, useCallback } from "react";
import { API } from "@/lib/api";

export interface Report {
  id: string;
  type: string;
  detail: string;
  contact: string;
  date: string;
  status: "pending" | "in_progress" | "done";
  image?: string;
}

export function useReports() {
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchReports = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(API.reports.list);
      const data = await res.json();
      if (data.success) setReports(data.reports);
    } catch {
      // silent
    } finally {
      setLoading(false);
    }
  }, []);

  const createReport = useCallback(
    async (type: string, detail: string, contact: string, image: string | null) => {
      if (!detail.trim()) {
        alert("กรุณากรอกรายละเอียดปัญหา");
        return false;
      }
      try {
        const body: Record<string, string> = { type, detail, contact };
        if (image) body.image = image;
        const res = await fetch(API.reports.create, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });
        if (!res.ok) throw new Error("ส่งไม่สำเร็จ");
        await fetchReports();
        return true;
      } catch (err) {
        alert("เกิดข้อผิดพลาด: " + (err as Error).message);
        return false;
      }
    },
    [fetchReports]
  );

  const updateStatus = useCallback(
    async (id: string) => {
      try {
        const res = await fetch(API.reports.status, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id }),
        });
        if (!res.ok) throw new Error("อัปเดตไม่สำเร็จ");
        await fetchReports();
      } catch (err) {
        alert("เกิดข้อผิดพลาด: " + (err as Error).message);
      }
    },
    [fetchReports]
  );

  return { reports, loading, fetchReports, createReport, updateStatus };
}
