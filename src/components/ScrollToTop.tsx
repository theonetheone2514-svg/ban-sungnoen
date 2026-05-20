"use client";

import { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";

export default function ScrollToTop() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 500);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className={`fixed bottom-6 left-1/2 -translate-x-1/2 w-11 h-11 rounded-full bg-gradient-to-r from-[var(--accent-1)] to-[var(--accent-2)] text-white border-none flex items-center justify-center cursor-pointer shadow-[0_4px_20px_rgba(102,126,234,0.4)] z-[998] transition-all duration-300 ${
        show ? "scale-100 opacity-100 translate-y-0" : "scale-0 opacity-0 translate-y-4"
      } hover:scale-110 hover:shadow-[0_6px_25px_rgba(102,126,234,0.6)] active:scale-95`}
    >
      <ArrowUp size={18} />
    </button>
  );
}
