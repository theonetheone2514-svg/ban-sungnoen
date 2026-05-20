const links = [
  { href: "#datetime-section", label: "📍 วันที่" },
  { href: "#weather-section", label: "🌤️ อากาศ" },
  { href: "#market-section", label: "🛒 ตลาด" },
  { href: "#report-section", label: "🚨 ปัญหา" },
  { href: "#map-section", label: "📍 แผนที่" },
  { href: "#poll-section", label: "📊 โหวต" },
];

export default function NavAnchors() {
  return (
    <nav className="flex gap-2 flex-wrap justify-center mb-5">
      {links.map((l) => (
        <a
          key={l.href}
          href={l.href}
          className="px-4 py-2 bg-white/5 backdrop-blur-md border border-white/10 rounded-full text-text-secondary no-underline text-sm font-medium hover:bg-gradient-to-r hover:from-[#667eea] hover:to-[#764ba2] hover:text-white hover:border-transparent hover:-translate-y-0.5 transition-all duration-300"
        >
          {l.label}
        </a>
      ))}
    </nav>
  );
}
