"use client";

import { useEffect, useState, useRef } from "react";
import { useReports, Report } from "@/hooks/useReports";

function ReportItem({ report, onUpdate }: { report: Report; onUpdate: (id: string) => void }) {
  const statusMap: Record<string, string> = {
    pending: "🔴 รอดำเนินการ",
    in_progress: "🟡 กำลังดำเนินการ",
    done: "🟢 ดำเนินการเสร็จ",
  };

  return (
    <div className="bg-white/5 backdrop-blur-md rounded-xl p-4 border border-white/10 hover:border-[#667eea] transition-all duration-300">
      <div className="flex justify-between items-center mb-2">
        <span className="bg-gradient-to-r from-[#667eea] to-[#764ba2] text-white px-3 py-1 rounded-full text-xs font-medium">
          {report.type}
        </span>
        <span
          className={`text-xs font-semibold ${
            report.status === "done"
              ? "text-green-400"
              : report.status === "in_progress"
              ? "text-yellow-400"
              : "text-red-400"
          }`}
        >
          {statusMap[report.status] || report.status}
        </span>
      </div>
      <div className="text-text-primary text-sm leading-relaxed mb-2.5 break-words">
        {report.detail}
      </div>
      {report.image && (
        <img
          src={report.image}
          alt="รูปประกอบ"
          className="max-w-full max-h-48 rounded-lg mt-2 cursor-pointer border border-white/10 object-cover hover:opacity-85 transition-opacity"
          onClick={() => window.open(report.image, "_blank")}
        />
      )}
      <div className="flex justify-between items-center gap-2 flex-wrap mt-2">
        <span className="text-text-secondary text-xs">{report.date}</span>
        {report.status !== "done" && (
          <button
            onClick={() => onUpdate(report.id)}
            className="bg-transparent text-cyan border border-cyan px-3.5 py-1.5 rounded-lg text-xs font-semibold hover:bg-cyan hover:text-white transition-all duration-300"
          >
            ✅ เสร็จแล้ว
          </button>
        )}
        {report.contact && (
          <span className="text-text-secondary text-xs">📞 {report.contact}</span>
        )}
      </div>
    </div>
  );
}

export default function ReportSection() {
  const { reports, loading, fetchReports, createReport, updateStatus } = useReports();
  const [showModal, setShowModal] = useState(false);
  const [type, setType] = useState("ไฟฟ้า");
  const [detail, setDetail] = useState("");
  const [contact, setContact] = useState("");
  const [image, setImage] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetchReports();
  }, [fetchReports]);

  const handleSubmit = async () => {
    const ok = await createReport(type, detail, contact, image);
    if (ok) {
      setShowModal(false);
      setDetail("");
      setContact("");
      setImage(null);
    }
  };

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => setImage(ev.target?.result as string);
    reader.readAsDataURL(file);
  };

  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        className="fixed bottom-20 left-5 z-[999] bg-gradient-to-r from-[#667eea] to-[#764ba2] text-white border-none px-5 py-3.5 rounded-full font-semibold text-sm shadow-[0_4px_20px_rgba(102,126,234,0.4)] hover:scale-105 hover:shadow-[0_6px_25px_rgba(102,126,234,0.6)] transition-all duration-300"
      >
        🚨 แจ้งปัญหา
      </button>

      {showModal && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-[1000]"
          onClick={(e) => e.target === e.currentTarget && setShowModal(false)}
        >
          <div className="bg-bg-card border border-border rounded-2xl w-[90%] max-w-[400px] overflow-hidden shadow-2xl">
            <div className="flex justify-between items-center px-5 py-4 bg-gradient-to-r from-[#667eea] to-[#764ba2] text-white font-semibold text-base">
              <span>🚨 แจ้งปัญหาหมู่บ้าน</span>
              <button
                onClick={() => setShowModal(false)}
                className="bg-none border-none text-white text-xl cursor-pointer p-0"
              >
                ✕
              </button>
            </div>
            <div className="p-5 flex flex-col gap-3">
              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="bg-bg-secondary border border-border rounded-xl p-3 text-text-primary font-sans text-sm focus:outline-none focus:border-[#667eea]"
              >
                <option value="ไฟฟ้า">ไฟฟ้า</option>
                <option value="ประปา">ประปา</option>
                <option value="ถนน">ถนน</option>
                <option value="ขยะ">ขยะ</option>
                <option value="อื่นๆ">อื่นๆ</option>
              </select>
              <textarea
                placeholder="รายละเอียดปัญหา..."
                value={detail}
                onChange={(e) => setDetail(e.target.value)}
                rows={4}
                className="bg-bg-secondary border border-border rounded-xl p-3 text-text-primary font-sans text-sm resize-y min-h-[80px] focus:outline-none focus:border-[#667eea]"
              />
              <input
                type="text"
                placeholder="เบอร์ติดต่อ (ไม่บังคับ)"
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                className="bg-bg-secondary border border-border rounded-xl p-3 text-text-primary font-sans text-sm focus:outline-none focus:border-[#667eea]"
              />
              <label className="flex items-center gap-2 px-3.5 py-2.5 bg-white/5 border border-dashed border-[#667eea] rounded-xl cursor-pointer text-sm text-text-primary hover:bg-[#667eea]/20 transition-colors">
                📷 แนบรูปภาพ (ไม่บังคับ)
                <input
                  ref={fileRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImage}
                />
              </label>
              {image && (
                <div className="relative flex items-center gap-2 mt-2">
                  <img
                    src={image}
                    alt="preview"
                    className="max-w-full max-h-36 rounded-lg border border-white/10 object-cover"
                  />
                  <span
                    onClick={() => {
                      setImage(null);
                      if (fileRef.current) fileRef.current.value = "";
                    }}
                    className="absolute -top-1.5 -right-1.5 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-sm cursor-pointer shadow-md"
                  >
                    ✕
                  </span>
                </div>
              )}
              <button
                onClick={handleSubmit}
                className="bg-gradient-to-r from-[#667eea] to-[#764ba2] text-white border-none py-3.5 rounded-xl font-semibold text-base hover:shadow-[0_4px_15px_rgba(102,126,234,0.4)] hover:-translate-y-0.5 transition-all duration-300"
              >
                📤 ส่งแจ้งปัญหา
              </button>
            </div>
          </div>
        </div>
      )}

      <section
        id="report-section"
        className="mt-8 animate-fadeIn"
      >
        <div className="mb-4">
          <h2 className="text-text-primary text-xl font-bold">
            🚨 รายงานปัญหาหมู่บ้าน
          </h2>
        </div>
        <div className="flex flex-col gap-2.5">
          {loading ? (
            Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="h-[70px] bg-white/5 rounded-xl skeleton-pulse" />
            ))
          ) : reports.length === 0 ? (
            <div className="text-center text-text-secondary py-8 bg-white/5 border border-dashed border-border rounded-2xl">
              ยังไม่มีรายงานปัญหา
            </div>
          ) : (
            reports.map((r) => (
              <ReportItem key={r.id} report={r} onUpdate={updateStatus} />
            ))
          )}
        </div>
      </section>
    </>
  );
}
