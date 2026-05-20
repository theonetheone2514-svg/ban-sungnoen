const thaiMonths = [
  "มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน", "พฤษภาคม", "มิถุนายน",
  "กรกฎาคม", "สิงหาคม", "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม",
];

const weatherIcons: Record<number, string> = {
  0: "☀️", 1: "🌤️", 2: "⛅", 3: "☁️", 45: "🌫️", 48: "🌫️",
  51: "🌧️", 53: "🌧️", 55: "🌧️", 61: "🌧️", 63: "🌧️", 65: "🌧️",
  80: "🌦️", 81: "🌧️", 82: "⛈️",
};

const weatherText: Record<number, string> = {
  0: "☀️ ท้องฟ้าแจ่มใส", 1: "🌤️ ท้องฟ้าแจ่ม", 2: "⛅ มีเมฆบางส่วน",
  3: "☁️ ท้องฟ้ามืดครึ้ม", 45: "🌫️ หมอก", 48: "🌫️ หมอก",
  51: "🌧️ ฝนเล็กน้อย", 53: "🌧️ ฝนปานกลาง", 55: "🌧️ ฝนหนัก",
  61: "🌧️ ฝนเล็กน้อย", 63: "🌧️ ฝนปานกลาง", 65: "🌧️ ฝนหนัก",
  80: "🌦️ ฝนเพลา", 81: "🌧️ ฝนปานกลาง", 82: "⛈️ ฝนหนัก",
};

const holidays: Record<string, string> = {
  "1-1": "🎆 วันปีใหม่ไทย",
  "13-4": "🎉 สงกรานต์",
  "14-4": "🎉 สงกรานต์",
  "15-4": "🎉 สงกรานต์",
  "1-5": "🎁 วันแรงงานแห่งชาติ",
  "5-5": "🎈 วันเฉลิมพระชนมพรรษารัชกาลที่ 9",
  "12-8": "🎓 วันแม่",
  "23-10": "🏛️ วันปิยมหาราช",
  "5-12": "🎂 วันพ่อ",
  "10-12": "🎊 วันรัฐธรรมนูญ",
  "31-12": "🎆 วันสิ้นปี",
};

const days = ["อา.", "จ.", "อ.", "พ.", "พฤ.", "ศ.", "ส."];

export function gregorianToJD(year: number, month: number, day: number): number {
  let y = year;
  let m = month;
  if (m <= 2) { y -= 1; m += 12; }
  const a = Math.floor(y / 100);
  const b = 2 - a + Math.floor(a / 4);
  return Math.floor(365.25 * (y + 4716)) + Math.floor(30.6001 * (m + 1)) + day + b - 1524.5;
}

export function getLunarDate(year: number, month: number, day: number): number {
  const jd = gregorianToJD(year, month, day);
  const d = jd - 2451549.5;
  const lun = 29.530588853;
  return Math.floor((jd - 2451550.1) / lun) + 1;
}

export function getThaiDateString(date: Date) {
  const thaiYear = date.getFullYear() + 543;
  return `${date.getDate()} ${thaiMonths[date.getMonth()]} พ.ศ. ${thaiYear}`;
}

export function getLunarInfo(date: Date) {
  const lunarPhase = getLunarDate(date.getFullYear(), date.getMonth() + 1, date.getDate());
  const isWaxing = lunarPhase <= 15;
  const moonEmoji = isWaxing ? "🌒" : "🌘";
  const lunarText = isWaxing ? `ข้างขึ้น ${lunarPhase}/15` : `ข้างแรม ${lunarPhase - 15}/15`;
  return { lunarPhase, moonEmoji, lunarText };
}

export function getWanPhra(lunarPhase: number): string {
  const map: Record<number, string> = {
    1: "วันพระศุกร์", 8: "วันพระวิสาข์", 15: "วันพระขึ้น 15 ค่ำ", 23: "วันพระวิสาข์",
  };
  return map[lunarPhase] || "";
}

export function getChulaSakarat(thaiYear: number) { return thaiYear - 1181; }
export function getMahaSakarat(ce: number) { return ce + 638; }
export function getRattanakosinSakarat(thaiYear: number) { return thaiYear - 2325; }

export function getHoliday(date: Date): string {
  return holidays[`${date.getDate()}-${date.getMonth() + 1}`] || "";
}

export function getWeatherEmoji(code: number): string {
  return weatherIcons[code] || "🌤️";
}

export function getWeatherText(code: number): string {
  return weatherText[code] || "ไม่ทราบ";
}

export function getDayName(index: number, isToday: boolean): string {
  return isToday ? "วันนี้" : days[index];
}

export function stripThinkTags(text: string): string {
  return text.replace(/<think>[\s\S]*?<\/think>/g, "").trim();
}
