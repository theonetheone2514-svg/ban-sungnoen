import type { Metadata } from "next";
import { ToastProvider } from "@/components/Toast";
import ScrollToTop from "@/components/ScrollToTop";
import "./globals.css";

export const metadata: Metadata = {
  title: "บ้านสูงเนิน - ระบบข้อมูลหมู่บ้าน",
  description: "ระบบข้อมูลหมู่บ้านบ้านสูงเนิน หมู่ 2 ต.พอกน้อย อ.พรรณานิคม จ.สกลนคร",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="th">
      <body className="bg-gradient-to-br from-[#1a1a2e] via-[#252545] to-[#1a1a2e] bg-fixed min-h-screen text-[#f0f0f0] p-5 leading-relaxed">
        <ToastProvider>
          <div className="max-w-[900px] mx-auto">
            {children}
          </div>
          <ScrollToTop />
        </ToastProvider>
      </body>
    </html>
  );
}
