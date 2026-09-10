"use client";
import { ages } from "@/data/categories";
import { SectionHeading } from "@/components/ui/section-heading";
import { ReferenceImage } from "@/components/ui/reference-image";
import { useStorefront } from "@/components/ui/storefront-provider";

export function ShopByAge() {
  const { filterProducts } = useStorefront();
  return <section id="do-tuoi" className="home-section age-section" aria-labelledby="age-title">
    <SectionHeading id="age-title" title="Mua theo độ tuổi" subtitle="Gợi ý sản phẩm phù hợp từng giai đoạn phát triển của bé" />
    <div className="age-grid">{ages.map(age => <button key={age.id} className="age-card" onClick={() => filterProducts({ age: age.id })} aria-label={age.name + " — Khám phá ngay"}>
      <ReferenceImage name={"age-" + age.id} width={age.id === "2-plus" ? 229 : 235} height={81} alt={"Mua theo độ tuổi: " + age.name} />
    </button>)}</div>
  </section>;
}
