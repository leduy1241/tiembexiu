"use client";
import { ReferenceImage } from "@/components/ui/reference-image";
import { useStorefront } from "@/components/ui/storefront-provider";

export function Promotions() {
  const { filterProducts } = useStorefront();
  return <section id="uu-dai" className="promotions home-section" aria-label="Khuyến mãi trong mẫu thiết kế">
    <button className="promotion promotion-peach" onClick={() => filterProducts({ dealsOnly: true })} aria-label="Deal xinh cho bé iu — Xem ngay">
      <ReferenceImage name="promotion-deals" width={496} height={135} alt="Deal xinh cho bé iu — Tiết kiệm hơn mỗi ngày. Ưu đãi minh họa." />
    </button>
    <button className="promotion promotion-sage" onClick={() => filterProducts({ query: "combo" })} aria-label="Combo tiết kiệm — Khám phá ngay">
      <ReferenceImage name="promotion-combo" width={458} height={135} alt="Combo tiết kiệm — Cho mẹ nhàn hơn" />
    </button>
  </section>;
}
