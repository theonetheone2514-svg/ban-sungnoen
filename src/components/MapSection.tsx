import { MapPin } from "lucide-react";

const places = ["วัดไทรทอง", "โรงเรียนบ้านสูงเนินสามัคคี", "รพ.สต.พอกน้อย", "ที่ทำการผู้ใหญ่บ้าน"];

export default function MapSection() {
  return (
    <section id="map-section" className="mt-8 animate-fadeIn stagger-7">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-400 to-[var(--accent-1)] flex items-center justify-center">
          <MapPin size={20} className="text-white" />
        </div>
        <h2 className="text-lg font-bold gradient-text">แผนที่หมู่บ้าน</h2>
      </div>
      <div className="rounded-2xl overflow-hidden border border-[var(--border)] shadow-[var(--shadow)]">
        <iframe
          src="https://www.google.com/maps/d/embed?mid=14LMRO5b8R5hqnD1kcKXPA8W8UwYutL8"
          width="100%"
          height="450"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          title="แผนที่หมู่บ้าน"
        />
      </div>
      <div className="flex flex-wrap gap-2.5 mt-3">
        {places.map((label) => (
          <span
            key={label}
            className="inline-flex items-center gap-1.5 bg-[var(--bg-card)] backdrop-blur-md border border-[var(--border)] px-3.5 py-1.5 rounded-lg text-xs text-[var(--text-primary)]"
          >
            <MapPin size={12} className="text-[var(--accent-1)]" />
            {label}
          </span>
        ))}
      </div>
    </section>
  );
}
