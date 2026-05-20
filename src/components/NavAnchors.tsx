"use client";

import { Clock, CloudSun, ShoppingCart, AlertTriangle, MapPin, BarChart3 } from "lucide-react";

const links = [
  { href: "#datetime-section", label: "วันที่", icon: Clock },
  { href: "#weather-section", label: "อากาศ", icon: CloudSun },
  { href: "#market-section", label: "ตลาด", icon: ShoppingCart },
  { href: "#report-section", label: "ปัญหา", icon: AlertTriangle },
  { href: "#map-section", label: "แผนที่", icon: MapPin },
  { href: "#poll-section", label: "โหวต", icon: BarChart3 },
];

export default function NavAnchors() {
  return (
    <nav className="flex gap-2 flex-wrap justify-center mb-6 animate-fadeIn stagger-1">
      {links.map((l) => (
        <a
          key={l.href}
          href={l.href}
          className="inline-flex items-center gap-1.5 px-4 py-2 bg-[var(--glass)] backdrop-blur-md border border-[var(--border)] rounded-full text-sm text-[var(--text-secondary)] no-underline font-medium hover:bg-gradient-to-r hover:from-[var(--accent-1)] hover:to-[var(--accent-2)] hover:text-white hover:border-transparent hover:-translate-y-0.5 active:scale-95 transition-all duration-300"
        >
          <l.icon size={14} />
          {l.label}
        </a>
      ))}
    </nav>
  );
}
