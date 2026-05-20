"use client";

import { useState, useCallback, useMemo } from "react";
import { API } from "@/lib/api";

export interface Product {
  id: string;
  "ชื่อสินค้า": string;
  "หมวดหมู่": string;
  "ราคา": string;
  "หน่วย": string;
  "LINE ID": string;
  "รายละเอียด"?: string;
}

export function useMarket() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("ทั้งหมด");

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(API.market.products);
      const data = await res.json();
      setProducts(data.products || []);
    } catch {
      setProducts([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const categories = useMemo(() => {
    const cats = new Set(products.map((p) => p["หมวดหมู่"] || "ทั่วไป"));
    return ["ทั้งหมด", ...cats];
  }, [products]);

  const filtered = useMemo(() => {
    const s = search.toLowerCase();
    return products.filter((p) => {
      const name = (p["ชื่อสินค้า"] || "").toLowerCase();
      const cat = p["หมวดหมู่"] || "ทั่วไป";
      const details = (p["รายละเอียด"] || "").toLowerCase();
      return (
        (name.includes(s) || details.includes(s)) &&
        (category === "ทั้งหมด" || cat === category)
      );
    });
  }, [products, search, category]);

  const markSold = useCallback(async (id: string) => {
    if (!confirm("ยืนยันว่าสินค้านี้ขายแล้ว?")) return;
    try {
      const res = await fetch(API.market.sold, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      if (!res.ok) throw new Error("API Error");
      setProducts((prev) => prev.filter((p) => p.id !== id));
    } catch (err) {
      alert("เกิดข้อผิดพลาด: " + (err as Error).message);
    }
  }, []);

  return {
    products, loading, search, setSearch,
    category, setCategory, categories,
    filtered, fetchProducts, markSold,
  };
}
