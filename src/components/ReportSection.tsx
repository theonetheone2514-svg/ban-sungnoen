"use client";

import { useEffect, useState, useRef } from "react";
import { AlertTriangle, X, Send, Image, Phone, CheckCircle } from "lucide-react";
import { useReports, Report } from "@/hooks/useReports";

function ReportItem({ report, onUpdate }: { report: Report; onUpdate: (id: string) => void }) {
  const statusStyles: Record<string, string> = {
    pending: "bg-[var(--red)]/10 text-[var(--red)] border-[var(--red)]/20",
    in_progress: "bg-[var(--orange)]/10 text-[var(--orange)] border-[var(--orange)]/20",
    done: "bg-[var(--green)]/10 text-[var(--green)] border-[var(--green)]/20",
  };
  const statusLabels: Record<string, string> = {
    pending: "รอดำเนินการ",
    in_progress: "กำลังดำเนินการ",
    done: "เสร็จแล้ว",
  };

  return (
    <div className="bg-[var(--bg-card)] backdrop-blur-md rounded-xl p-4 border border-[var(--border)] card-3d">
      <div className="flex items-center justify-between mb-2.5">
        <span className="bg-gradient-to-r from-[var(--accent-1)] to-[var(--accent-2)] text-white px-2.5 py-0.5 rounded-full text-[10px] font-medium">
          {report.type}
        </span>
        <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${statusStyles[report.status] || ""}`}>
          {statusLabels[report.status] || report.status}
        </span>
      </div>
      <div className="text-sm text-[var(--text-primary)] leading-relaxed mb-3 break-words">
        {report.detail}
      </div>
      {report.image && (
        <img
          src={report.image}
          alt="รูปประกอบ"
          className="max-w-full max-h-40 rounded-lg mb-3 cursor-pointer border border-[var(--border)] object-cover hover:opacity-85 transition-opacity"
          onClick={() => window.open(report.image, "_blank")}
        />
      )}
      <div className="flex items-center justify-between gap-2 flex-wrap">
        <span className="text-[11px] text-[var(--text-secondary)]">{report.date}</span>
        <div className="flex items-center gap-2">
          {report.status !== "done" && (
            <button
              onClick={() => onUpdate(report.id)}
              className="inline-flex items-center gap-1 bg-transparent text-[var(--green)] border border-[var(--green)]/30 px-3 py-1 rounded-lg text-[11px] font-medium hover:bg-[var(--green)] hover:text-white active:scale-95 transition-all duration-300"
            >
              <CheckCircle size={12} />
              เสร็จแล้ว
            </button>
          )}
          {report.contact && (
            <span className="text-[11px] text-[var(--text-secondary)] flex items-center gap-1">
              <Phone size={11} /> {report.contact}
            </span>
          )}
        </div>
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

  useEffect(() => { fetchReports(); }, [fetchReports]);

  const handleSubmit = async () => {
    const ok = await createReport(type, detail, contact, image);
    if (ok) { setShowModal(false); setDetail(""); setContact(""); setImage(null); }
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
        className="fixed bottom-6 left-6 z-[999] inline-flex items-center gap-2 bg-gradient-to-r from-[var(--accent-1)] to-[var(--accent-2)] text-white border-none px-5 py-3 rounded-full text-sm font-semibold shadow-[0_4px_25px_rgba(102,126,234,0.4)] hover:shadow-[0_6px_30px_rgba(102,126,234,0.6)] hover:scale-105 active:scale-95 transition-all duration-300 animate-pulseGlow"
      >
        <AlertTriangle size={18} />
        แจ้งปัญหา
      </button>

      {showModal && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[1000] p-4"
          onClick={(e) => e.target === e.currentTarget && setShowModal(false)}
        >
          <div className="bg-[var(--bg-section)] backdrop-blur-2xl border border-[var(--border)] rounded-2xl w-full max-w-md overflow-hidden shadow-2xl animate-fadeInScale">
            <div className="flex items-center justify-between px-5 py-4 bg-gradient-to-r from-[var(--accent-1)] to-[var(--accent-2)] text-white">
              <div className="flex items-center gap-2 font-semibold text-sm">
                <AlertTriangle size={18} />
                แจ้งปัญหาหมู่บ้าน
              </div>
              <button
                onClick={() => setShowModal(false)}
                className="text-white/70 hover:text-white transition-colors"
              >
                <X size={18} />
              </button>
            </div>
            <div className="p-5 flex flex-col gap-3">
              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="bg-[var(--bg-card)] border border-[var(--border)] rounded-xl p-3 text-sm text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent-1)] transition-all"
              >
                {["ไฟฟ้า", "ประปา", "ถนน", "ขยะ", "อื่นๆ"].map((o) => (
                  <option key={o} value={o}>{o}</option>
                ))}
              </select>
              <textarea
                placeholder="รายละเอียดปัญหา..."
                value={detail}
                onChange={(e) => setDetail(e.target.value)}
                rows={4}
                className="bg-[var(--bg-card)] border border-[var(--border)] rounded-xl p-3 text-sm text-[var(--text-primary)] resize-y min-h-[80px] focus:outline-none focus:border-[var(--accent-1)] transition-all placeholder:text-[var(--text-secondary)]"
              />
              <div className="relative">
                <Phone size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--text-secondary)]" />
                <input
                  type="text"
                  placeholder="เบอร์ติดต่อ (ไม่บังคับ)"
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-[var(--bg-card)] border border-[var(--border)] rounded-xl text-sm text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent-1)] transition-all placeholder:text-[var(--text-secondary)]"
                />
              </div>
              <label className="flex items-center gap-2 px-4 py-3 bg-[var(--bg-card)] border border-dashed border-[var(--accent-1)]/40 rounded-xl cursor-pointer text-sm text-[var(--text-secondary)] hover:bg-[var(--accent-1)]/10 hover:border-[var(--accent-1)] transition-all">
                <Image size={16} className="text-[var(--accent-1)]" />
                แนบรูปภาพ (ไม่บังคับ)
                <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleImage} />
              </label>
              {image && (
                <div className="relative inline-block">
                  <img src={image} alt="preview" className="max-h-32 rounded-xl border border-[var(--border)]" />
                  <span
                    onClick={() => { setImage(null); if (fileRef.current) fileRef.current.value = ""; }}
                    className="absolute -top-2 -right-2 w-5 h-5 bg-[var(--red)] text-white rounded-full flex items-center justify-center text-[10px] cursor-pointer shadow-md hover:scale-110 transition-transform"
                  >
                    <X size={12} />
                  </span>
                </div>
              )}
              <button
                onClick={handleSubmit}
                className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[var(--accent-1)] to-[var(--accent-2)] text-white border-none py-3 rounded-xl text-sm font-semibold hover:shadow-[0_4px_20px_rgba(102,126,234,0.4)] active:scale-95 transition-all duration-300"
              >
                <Send size={16} />
                ส่งแจ้งปัญหา
              </button>
            </div>
          </div>
        </div>
      )}

      <section id="report-section" className="mt-8 animate-fadeIn stagger-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[var(--orange)] to-[var(--red)] flex items-center justify-center">
            <AlertTriangle size={20} className="text-white" />
          </div>
          <h2 className="text-lg font-bold gradient-text">รายงานปัญหาหมู่บ้าน</h2>
        </div>
        <div className="flex flex-col gap-3">
          {loading ? (
            Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="h-20 bg-[var(--bg-card)] rounded-xl skeleton-pulse" />
            ))
          ) : reports.length === 0 ? (
            <div className="text-center py-10 text-[var(--text-secondary)] text-sm bg-[var(--bg-card)] rounded-2xl border border-dashed border-[var(--border)]">
              <AlertTriangle size={36} className="mx-auto mb-3 opacity-30" />
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
