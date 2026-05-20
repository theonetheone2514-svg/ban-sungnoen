"use client";

import { useEffect } from "react";
import { useMarket, Product } from "@/hooks/useMarket";

function ProductCard({ product, onSold }: { product: Product; onSold: (id: string) => void }) {
  return (
    <div className="bg-white/5 backdrop-blur-md rounded-2xl p-4 border border-white/10 hover:-translate-y-1.5 hover:border-[#667eea] hover:shadow-[0_0_20px_rgba(102,126,234,0.3)] transition-all duration-300">
      <div className="font-semibold text-base text-text-primary mb-2">
        {product["ชื่อสินค้า"]}
      </div>
      <span className="inline-block bg-gradient-to-r from-[#667eea] to-[#764ba2] text-white px-3 py-1 rounded-full text-xs mb-2.5">
        {product["หมวดหมู่"] || "ทั่วไป"}
      </span>
      <div className="text-2xl text-cyan font-bold my-2">
        ฿{product["ราคา"]}
        <span className="text-sm text-text-secondary font-normal">
          {" "}/ {product["หน่วย"] || "ชิ้น"}
        </span>
      </div>
      <div className="text-sm text-text-secondary my-2 leading-relaxed">
        {product["รายละเอียด"] || "-"}
      </div>
      <div className="flex gap-2">
        <button
          onClick={() =>
            window.open(
              `https://line.me/ti/p/~${product["LINE ID"].replace("@", "")}`,
              "_blank"
            )
          }
          className="flex-1 bg-gradient-to-r from-[#667eea] to-[#764ba2] text-white border-none py-3 rounded-xl font-semibold text-sm hover:shadow-[0_0_20px_rgba(102,126,234,0.4)] hover:-translate-y-0.5 transition-all duration-300"
        >
          📱 สั่งซื้อ
        </button>
        <button
          onClick={() => onSold(product.id)}
          className="bg-bg-card text-text-secondary border border-border py-3 px-4 rounded-xl font-semibold text-sm whitespace-nowrap hover:bg-red-500 hover:text-white hover:border-red-500 transition-all duration-300"
        >
          🚫 ขายแล้ว
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
      className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 mb-5 border border-white/10 shadow-lg animate-fadeIn"
    >
      <div className="flex justify-between items-center mb-5 flex-wrap gap-4">
        <h2 className="text-[#667eea] text-xl font-bold">🛒 ตลาดสินค้าชุมชน</h2>
        <div className="flex gap-2.5">
          <button
            onClick={() =>
              window.open(
                "https://docs.google.com/forms/d/e/1FAIpQLSeUwS6XvgfAPG7XxTx5gdg26FLi29t3dzGFMfCez9j9UWxMTA/viewform?usp=dialog",
                "_blank"
              )
            }
            className="bg-gradient-to-r from-green-500 to-green-400 text-white border-none px-5 py-2.5 rounded-full font-semibold text-sm shadow-[0_0_15px_rgba(0,200,83,0.3)] hover:shadow-[0_0_25px_rgba(0,200,83,0.5)] hover:-translate-y-0.5 transition-all duration-300"
          >
            ➕ ลงขาย
          </button>
        </div>
      </div>

      <div className="flex gap-3 mb-5">
        <input
          type="text"
          placeholder="🔍 ค้นหาสินค้า..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 px-4 py-3 bg-bg-card border border-border rounded-xl text-sm text-text-primary focus:outline-none focus:border-[#667eea] focus:shadow-[0_0_20px_rgba(102,126,234,0.3)] transition-all duration-300 placeholder:text-text-secondary"
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="px-4 py-3 bg-bg-card border border-border rounded-xl text-sm text-text-primary cursor-pointer focus:outline-none focus:border-[#667eea] transition-all"
        >
          {categories.map((c) => (
            <option key={c} value={c} className="bg-bg-card text-text-primary">
              {c}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-5 text-text-secondary text-sm">
        {loading
          ? "⏳ กำลังโหลด..."
          : `พบสินค้า ${filtered.length} รายการ`}
      </div>

      {loading ? (
        <div className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="h-44 bg-white/5 rounded-2xl skeleton-pulse"
            />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-4">
          {filtered.map((p) => (
            <ProductCard key={p.id} product={p} onSold={markSold} />
          ))}
        </div>
      )}
    </section>
  );
}
