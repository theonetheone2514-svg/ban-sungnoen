import type { Metadata } from "next";
import { Kanit } from "next/font/google";
import { ToastProvider } from "@/components/Toast";
import ThemeProvider from "@/components/ThemeProvider";
import ScrollToTop from "@/components/ScrollToTop";
import "./globals.css";

const kanit = Kanit({
  subsets: ["thai", "latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-kanit",
  display: "swap",
});

export const metadata: Metadata = {
  title: "บ้านสูงเนิน - ระบบข้อมูลหมู่บ้าน",
  description: "ระบบข้อมูลหมู่บ้านบ้านสูงเนิน หมู่ 2 ต.พอกน้อย อ.พรรณานิคม จ.สกลนคร",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="th" className={kanit.variable} suppressHydrationWarning>
      <body className="bg-gradient-animate min-h-screen p-4 sm:p-6 lg:p-8">
        <ThemeProvider>
          <ToastProvider>
            <div className="max-w-[1200px] mx-auto">
              {children}
            </div>
            <ScrollToTop />
          </ToastProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
