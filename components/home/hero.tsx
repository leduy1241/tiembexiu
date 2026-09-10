import { ReferenceImage } from "@/components/ui/reference-image";

export function Hero() {
  return <section className="hero-wrap" aria-labelledby="hero-title">
    <h1 id="hero-title" className="sr-only">Cho những em bé iu</h1>
    <p className="sr-only">Đồ dùng mẹ & bé chính hãng. Được chọn lọc kỹ càng tại Tiệm Bé Xíu.</p>
    <div className="hero">
      <ReferenceImage name="hero" width={964} height={264} alt="Cho những em bé iu — Tiệm Bé Xíu. Giao nhanh nội khu Hà Nội, tư vấn tận tâm. Nội dung chính sách trong ảnh là mẫu thiết kế." className="hero-desktop" preload />
      <div className="hero-mobile" aria-hidden="true">
        <ReferenceImage name="hero-mobile-copy" width={382} height={264} />
        <ReferenceImage name="hero-mobile-baby" width={390} height={264} />
      </div>
      <a className="hero-cta" href="#danh-muc" aria-label="Khám phá ngay"><span className="sr-only">Khám phá ngay</span></a>
    </div>
  </section>;
}
