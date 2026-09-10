"use client";

import { useState } from "react";
import { products } from "@/data/products";
import { ages, categories } from "@/data/categories";
import { ProductCard } from "@/components/product/product-card";
import { SectionHeading } from "@/components/ui/section-heading";
import { useStorefront } from "@/components/ui/storefront-provider";
import { Icon } from "@/components/ui/icon";

const normalize = (value: string) =>
  value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d");

export function ProductSection() {
  const { filter, filterProducts } = useStorefront();
  const showAll = false;
  const [offset, setOffset] = useState(0);
  const filtered = products.filter(
    (product) =>
      (filter.category === "all" || product.category === filter.category) &&
      (filter.age === "all" || product.ages.includes(filter.age)) &&
      (!filter.dealsOnly || Boolean(product.oldPrice)) &&
      (!filter.query ||
        normalize(product.name).includes(normalize(filter.query))),
  );
  const isFiltered =
    filter.query ||
    filter.category !== "all" ||
    filter.age !== "all" ||
    filter.dealsOnly;
  const label = filter.query
    ? `Tìm kiếm: “${filter.query}”`
    : filter.category !== "all"
      ? categories.find((c) => c.id === filter.category)?.name
      : filter.age !== "all"
        ? `Dành cho bé ${ages.find((a) => a.id === filter.age)?.name}`
        : filter.dealsOnly
          ? "Deal xinh cho bé iu"
          : "Sản phẩm bán chạy";
  const ordered = [...filtered.slice(offset), ...filtered.slice(0, offset)];
  const visible = isFiltered || showAll ? filtered : ordered.slice(0, 6);

  return (
    <section
      id="san-pham"
      className="home-section"
      aria-labelledby="products-title"
    >
      <SectionHeading
        id="products-title"
        title={label ?? "Sản phẩm"}
        subtitle={
          isFiltered
            ? `${filtered.length} sản phẩm trong bộ sưu tập mẫu`
            : "Những sản phẩm được các mẹ tin chọn nhiều nhất"
        }
        icon="fire"
      >
        {isFiltered ? (
          <button className="text-link" onClick={() => filterProducts({})}>
            Xóa bộ lọc <Icon name="close" size={16} />
          </button>
        ) : (
          <button className="text-link" onClick={() => filterProducts({})}>
            {showAll ? "Thu gọn" : "Xem tất cả"}
            <Icon name="arrow" size={16} />
          </button>
        )}
      </SectionHeading>
      <p className="sr-only" aria-live="polite">
        Bộ sưu tập mẫu · Giá, ưu đãi và đánh giá chỉ để minh họa
        {isFiltered ? ` · ${filtered.length} kết quả` : ""}
      </p>
      {visible.length > 0 ? (
        <div className="product-grid-wrap">
          <div className="product-grid">
            {visible.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          {!isFiltered && !showAll && (
            <div className="product-arrows">
              <button
                aria-label="Sản phẩm trước"
                onClick={() =>
                  setOffset((offset + products.length - 1) % products.length)
                }
              >
                <Icon name="chevron" size={12} />
              </button>
              <button
                aria-label="Sản phẩm tiếp theo"
                onClick={() => setOffset((offset + 1) % products.length)}
              >
                <Icon name="chevron" size={12} />
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="empty-state">
          <Icon name="search" size={36} />
          <h3>Chưa tìm thấy món mẹ cần</h3>
          <p>Mẹ thử từ khóa khác hoặc xem các món xinh trong tiệm nhé.</p>
          <button
            className="button button-primary"
            onClick={() => filterProducts({})}
          >
            Xem lại sản phẩm
          </button>
        </div>
      )}
    </section>
  );
}
