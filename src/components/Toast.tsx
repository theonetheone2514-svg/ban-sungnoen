"use client";

import { createContext, useContext, useState, useCallback, type ReactNode } from "react";
import { X } from "lucide-react";

interface ToastItem {
  id: number;
  message: string;
  type: "success" | "error" | "info";
}

interface ToastContextType {
  showToast: (message: string, type?: "success" | "error" | "info") => void;
}

const ToastContext = createContext<ToastContextType>({ showToast: () => {} });

export function useToast() {
  return useContext(ToastContext);
}

let nextId = 0;

const borders = {
  success: "border-l-[var(--green)]",
  error: "border-l-[var(--red)]",
  info: "border-l-[var(--accent-1)]",
};

const icons = {
  success: "✅",
  error: "❌",
  info: "ℹ️",
};

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const showToast = useCallback((message: string, type: "success" | "error" | "info" = "info") => {
    const id = nextId++;
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== id)), 3200);
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className="fixed top-5 right-5 z-[9999] flex flex-col gap-2.5 pointer-events-none">
        {toasts.map((t) => (
          <div
            key={t.id}
            className={`flex items-center gap-2.5 bg-[var(--bg-section)] backdrop-blur-2xl border border-[var(--border)] text-[var(--text-primary)] px-4 py-3 rounded-xl text-sm font-medium shadow-2xl pointer-events-auto max-w-[360px] border-l-4 ${borders[t.type]} animate-toastIn`}
          >
            <span>{icons[t.type]}</span>
            <span className="flex-1">{t.message}</span>
            <button
              onClick={() => setToasts((prev) => prev.filter((x) => x.id !== t.id))}
              className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors bg-none border-none cursor-pointer p-0"
            >
              <X size={14} />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}
