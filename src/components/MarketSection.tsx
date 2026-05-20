"use client";

import { useEffect } from "react";
import { ShoppingCart, Search, Plus, ShoppingBag, XCircle } from "lucide-react";
import { useMarket, Product } from "@/hooks/useMarket";

function ProductCard({ product, onSold }: { product: Product; onSold: (id: string) => void }) {
  return (
    <div className="bg-[var(--bg-card)] backdrop-blur-md rounded-2xl p-5 border border-[var(--border)] card-3d">
      <div className="flex items-start justify-between mb-3">
        <div className="font-semibold text-base text-[var(--text-primary)] leading-tight">
          {product["ชื่อสินค้า"]}
        </div>
        <span className="shrink-0 ml-2 bg-gradient-to-r from-[var(--accent-1)] to-[var(--accent-2)] text-white px-2.5 py-0.5 rounded-full text-[10px] font-medium">
          {product["หมวดหมู่"] || "ทั่วไป"}
        </span>
      </div>
      <div className="text-2xl font-bold text-[var(--cyan)] mb-1">
        ฿{product["ราคา"]}
        <span className="text-xs text-[var(--text-secondary)] font-normal"> / {product["หน่วย"] || "ชิ้น"}</span>
      </div>
      {product["รายละเอียด"] && product["รายละเอียด"] !== "-" && (
        <div className="text-xs text-[var(--text-secondary)] mt-2 mb-4 line-clamp-2 leading-relaxed">
          {product["รายละเอียด"]}
        </div>
      )}
      <div className="flex gap-2 mt-3">
        <button
          onClick={() => window.open(`https://line.me/ti/p/~${product["LINE ID"].replace("@", "")}`, "_blank")}
          className="flex-1 inline-flex items-center justify-center gap-1.5 bg-gradient-to-r from-[var(--accent-1)] to-[var(--accent-2)] text-white border-none py-2.5 rounded-xl text-xs font-semibold hover:shadow-[0_4px_20px_rgba(102,126,234,0.4)] active:scale-95 transition-all duration-300"
        >
          <ShoppingBag size={14} />
          สั่งซื้อ
        </button>
        <button
          onClick={() => onSold(product.id)}
          className="inline-flex items-center gap-1 bg-[var(--bg-section)] text-[var(--text-secondary)] border border-[var(--border)] py-2.5 px-3 rounded-xl text-xs font-medium hover:bg-[var(--red)] hover:text-white hover:border-[var(--red)] active:scale-95 transition-all duration-300"
        >
          <XCircle size={14} />
          ขายแล้ว
        </button>
      </div>
    </div>
  );
}

export default function MarketSection() {
  const {
    filtered, loading, search, setSearch,
    category, setCategory, categories,
    fetchProducts, markSold,
  } = useMarket();

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return (
    <section
      id="market-section"
      className="bg-[var(--bg-section)] backdrop-blur-xl rounded-2xl p-6 border border-[var(--border)] shadow-[var(--shadow)] animate-fadeIn stagger-3"
    >
      <div className="flex items-center gap-3 mb-5">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[var(--green)] to-[var(--accent-1)] flex items-center justify-center">
          <ShoppingCart size={20} className="text-white" />
        </div>
        <h2 className="text-lg font-bold gradient-text">ตลาดสินค้าชุมชน</h2>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 mb-5">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--text-secondary)]" />
          <input
            type="text"
            placeholder="ค้นหาสินค้า..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-[var(--bg-card)] border border-[var(--border)] rounded-xl text-sm text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent-1)] focus:ring-1 focus:ring-[var(--accent-1)]/30 transition-all placeholder:text-[var(--text-secondary)]"
          />
        </div>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="px-4 py-2.5 bg-[var(--bg-card)] border border-[var(--border)] rounded-xl text-sm text-[var(--text-primary)] cursor-pointer focus:outline-none focus:border-[var(--accent-1)] transition-all"
        >
          {categories.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
        <button
          onClick={() => window.open("https://docs.google.com/forms/d/e/1FAIpQLSeUwS6XvgfAPG7XxTx5gdg26FLi29t3dzGFMfCez9j9UWxMTA/viewform?usp=dialog", "_blank")}
          className="inline-flex items-center gap-1.5 bg-gradient-to-r from-[var(--green)] to-emerald-400 text-white border-none px-5 py-2.5 rounded-xl text-sm font-semibold hover:shadow-[0_4px_20px_rgba(0,200,83,0.4)] active:scale-95 transition-all duration-300"
        >
          <Plus size={16} />
          ลงขาย
        </button>
      </div>

      <div className="mb-4 text-xs text-[var(--text-secondary)]">
        {loading ? "⏳ กำลังโหลด..." : `พบสินค้า ${filtered.length} รายการ`}
      </div>

      {loading ? (
        <div className="grid grid-cols-[repeat(auto-fill,minmax(220px,1fr))] gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-44 bg-[var(--bg-card)] rounded-2xl skeleton-pulse" />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-12 text-[var(--text-secondary)] text-sm">
          <ShoppingCart size={40} className="mx-auto mb-3 opacity-30" />
          ไม่พบสินค้า
        </div>
      ) : (
        <div className="grid grid-cols-[repeat(auto-fill,minmax(220px,1fr))] gap-4">
          {filtered.map((p) => (
            <ProductCard key={p.id} product={p} onSold={markSold} />
          ))}
        </div>
      )}
    </section>
  );
}
