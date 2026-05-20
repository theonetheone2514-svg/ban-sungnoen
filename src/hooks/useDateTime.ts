"use client";

import { useState, useEffect } from "react";
import {
  getThaiDateString, getLunarInfo, getWanPhra,
  getChulaSakarat, getMahaSakarat, getRattanakosinSakarat, getHoliday,
} from "@/lib/utils";

export interface DateTimeData {
  now: Date;
  timeStr: string;
  thaiDate: string;
  lunarInfo: ReturnType<typeof getLunarInfo>;
  wanPhra: string;
  chulaSakarat: number;
  mahaSakarat: number;
  rattanakosinSakarat: number;
  holiday: string;
}

export function useDateTime() {
  const [data, setData] = useState<DateTimeData | null>(null);

  useEffect(() => {
    function update() {
      const now = new Date();
      const year = now.getFullYear();
      const thaiYear = year + 543;
      const lunarInfo = getLunarInfo(now);
      setData({
        now,
        timeStr: now.toLocaleDateString("th-TH", {
          weekday: "long", year: "numeric", month: "long", day: "numeric",
          hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false,
        }),
        thaiDate: getThaiDateString(now),
        lunarInfo,
        wanPhra: getWanPhra(lunarInfo.lunarPhase),
        chulaSakarat: getChulaSakarat(thaiYear),
        mahaSakarat: getMahaSakarat(year),
        rattanakosinSakarat: getRattanakosinSakarat(thaiYear),
        holiday: getHoliday(now),
      });
    }
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);

  return data;
}
