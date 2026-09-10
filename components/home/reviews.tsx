"use client";
import { ReferenceImage } from "@/components/ui/reference-image";
import { SectionHeading } from "@/components/ui/section-heading";
import { Icon } from "@/components/ui/icon";
import { useStorefront } from "@/components/ui/storefront-provider";

export function Reviews() {
  const { showNotice } = useStorefront();
  return <section className="home-section reviews-section" aria-labelledby="reviews-title">
    <SectionHeading id="reviews-title" title="Khách hàng nói gì về Tiệm Bé Xíu?">
      <button className="text-link" onClick={() => showNotice({ title: "Đánh giá trong mẫu thiết kế", description: "Những thẻ đánh giá này được cắt từ ảnh bạn cung cấp để tái hiện giao diện. Đây chưa phải đánh giá khách hàng đã xác minh của cửa hàng." })}>Đánh giá minh họa <Icon name="arrow" size={13} /></button>
    </SectionHeading>
    <div className="review-grid">{[1, 2, 3].map(index => <figure className="review-card" key={index}>
      <ReferenceImage name={"review-" + index} width={index === 2 ? 315 : 314} height={93} alt={"Thẻ đánh giá mẫu " + index + " từ ảnh thiết kế — chưa phải đánh giá đã xác minh"} />
      <figcaption className="sr-only">Nội dung minh họa từ bản thiết kế, không phải testimonial thật.</figcaption>
    </figure>)}</div>
  </section>;
}
