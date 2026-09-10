"use client";
import { categories } from "@/data/categories";
import { ReferenceImage } from "@/components/ui/reference-image";
import { SectionHeading } from "@/components/ui/section-heading";
import { useStorefront } from "@/components/ui/storefront-provider";

export function Categories() {
  const { filterProducts } = useStorefront();
  return <section id="danh-muc" className="home-section category-section" aria-labelledby="categories-title">
    <SectionHeading id="categories-title" title="Mẹ đang tìm gì?" subtitle="Khám phá nhanh theo nhu cầu của mẹ" icon="star" />
    <div className="category-row">
      <div className="category-grid">{categories.map(category => <button key={category.id} className="category-card" aria-label={category.name} onClick={() => filterProducts({ category: category.id })}>
        <ReferenceImage name={"category-" + category.id} width={117} height={85} alt={category.name} />
      </button>)}</div>
      <a className="age-teaser" href="#do-tuoi" aria-label="Mua theo tuổi — dễ dàng hơn"><ReferenceImage name="age-teaser" width={207} height={97} /></a>
    </div>
  </section>;
}
