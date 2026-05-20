export default function MapSection() {
  return (
    <section
      id="map-section"
      className="mt-8 animate-fadeIn"
    >
      <div className="mb-4">
        <h2 className="text-text-primary text-xl font-bold">
          📍 แผนที่หมู่บ้าน
        </h2>
      </div>
      <div className="rounded-2xl overflow-hidden border border-border">
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
        {["📍 วัดไทรทอง", "📍 โรงเรียนบ้านสูงเนินสามัคคี", "📍 รพ.สต.พอกน้อย", "📍 ที่ทำการผู้ใหญ่บ้าน"].map(
          (label) => (
            <span
              key={label}
              className="bg-white/5 backdrop-blur-md border border-white/10 px-3.5 py-2 rounded-lg text-sm text-text-primary"
            >
              {label}
            </span>
          )
        )}
      </div>
    </section>
  );
}
