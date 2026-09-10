"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/types/product";
import { formatPrice } from "@/data/products";
import { brands, variants, relatedProducts } from "@/data/product-details";
import { categories } from "@/data/categories";
import { useStorefront } from "@/components/ui/storefront-provider";
import { ProductCard } from "./product-card";

export function ProductDetail({
  product,
  related = [],
}: {
  product: Product;
  related?: Product[];
}) {
  const productVariants = variants[product.id] ?? ["Tiêu chuẩn"];
  const productBrand = brands[product.id] ?? "Tiệm Bé Xíu";
  const [variant, setVariant] = useState(productVariants[0]),
    [quantity, setQuantity] = useState(1),
    [zoom, setZoom] = useState(false);
  const { addToCart, showNotice } = useStorefront();
  const category = categories.find((c) => c.id === product.category)!;
  return (
    <>
      <nav className="breadcrumbs" aria-label="Đường dẫn">
        <Link href="/">Trang chủ</Link>
        <span>/</span>
        <Link href={"/danh-muc/" + category.id}>{category.name}</Link>
        <span>/</span>
        <span>{productBrand}</span>
      </nav>
      <div className="detail-layout">
        <section className="product-gallery" aria-label="Ảnh sản phẩm">
          <button
            className={"gallery-main" + (zoom ? " is-zoomed" : "")}
            onClick={() => setZoom(!zoom)}
            aria-pressed={zoom}
            aria-label={zoom ? "Thu nhỏ ảnh sản phẩm" : "Phóng to ảnh sản phẩm"}
          >
            <Image
              src={product.image}
              alt={product.name}
              fill
              unoptimized
              sizes="(max-width: 850px) 90vw, 45vw"
              preload
            />
          </button>
          <p>
            Bấm ảnh để {zoom ? "thu nhỏ" : "phóng to"} · Ảnh từ mẫu thiết kế
          </p>
          <div className="gallery-thumbnails">
            <button
              aria-label="Ảnh chính"
              aria-pressed="true"
              onClick={() => setZoom(false)}
            >
              <Image
                src={product.image}
                alt=""
                width={90}
                height={65}
                unoptimized
              />
            </button>
            <span>Tiệm đang bổ sung ảnh chi tiết.</span>
          </div>
        </section>
        <section className="detail-info">
          <p className="eyebrow">
            {productBrand} · MÃ {product.id.toUpperCase()}
          </p>
          <h1>{product.name}</h1>
          <p className="detail-rating">
            ★ {product.rating}{" "}
            <span>({product.reviewCount} đánh giá minh họa)</span>
          </p>
          <div className="detail-price">
            <strong>{formatPrice(product.price)}</strong>
            {product.oldPrice && (
              <>
                <del>{formatPrice(product.oldPrice)}</del>
                <span>
                  −{Math.round((1 - product.price / product.oldPrice) * 100)}%
                </span>
              </>
            )}
          </div>
          <p className="detail-intro">
            Một món nhỏ trong bộ sưu tập {category.name.toLowerCase()} của Tiệm
            Bé Xíu, để mẹ khám phá và lựa chọn theo nhu cầu của gia đình.
          </p>
          <fieldset className="variant-options">
            <legend>
              Phân loại <span>· {variant}</span>
            </legend>
            {productVariants.map((v) => (
              <button
                key={v}
                aria-pressed={variant === v}
                onClick={() => setVariant(v)}
              >
                {v}
              </button>
            ))}
          </fieldset>
          <div className="quantity-row">
            <span id="quantity-label">Số lượng</span>
            <div
              className="quantity-control"
              role="group"
              aria-labelledby="quantity-label"
            >
              <button
                aria-label="Giảm số lượng"
                disabled={quantity === 1}
                onClick={() => setQuantity(quantity - 1)}
              >
                −
              </button>
              <output aria-live="polite">{quantity}</output>
              <button
                aria-label="Tăng số lượng"
                disabled={quantity === 10}
                onClick={() => setQuantity(quantity + 1)}
              >
                +
              </button>
            </div>
            <span>Tối đa 10 trong bản mẫu</span>
          </div>
          <p className="detail-total">
            Tạm tính <strong>{formatPrice(product.price * quantity)}</strong>
          </p>
          <button
            className="button button-primary detail-cta"
            onClick={() => {
              addToCart({ productId: product.id, variant, quantity });
              showNotice({
                title: "Món xinh đã vào giỏ",
                description:
                  product.name +
                  " · " +
                  variant +
                  " · Số lượng " +
                  quantity +
                  ". Tổng giá minh họa: " +
                  formatPrice(product.price * quantity) +
                  ". Đã lưu vào giỏ trên trình duyệt này; chưa tạo đơn hàng.",
              });
            }}
          >
            Thêm vào giỏ
          </button>
          <p className="sample-note">
            Phân loại và giá là dữ liệu mẫu, chưa phản ánh tồn kho thực tế.
          </p>
          <div className="detail-support">
            <span>♡ Chọn đồ cùng mẹ</span>
            <button
              onClick={() =>
                showNotice({
                  title: "Tiệm sẵn lòng hỗ trợ mẹ",
                  description:
                    "Thông tin liên hệ chính thức đang được bổ sung. Chưa có tin nhắn nào được gửi.",
                })
              }
            >
              Nhờ tiệm tư vấn →
            </button>
          </div>
        </section>
      </div>
      <section className="detail-description">
        <h2>Thông tin món xinh</h2>
        <p>
          {product.name} thuộc bộ sưu tập {category.name} tại Tiệm Bé Xíu. Hình
          ảnh và tên gọi được dùng để minh họa trải nghiệm mua sắm.
        </p>
        <dl>
          <div>
            <dt>Thương hiệu</dt>
            <dd>{productBrand}</dd>
          </div>
          <div>
            <dt>Danh mục</dt>
            <dd>{category.name}</dd>
          </div>
          <div>
            <dt>Phân loại đang chọn</dt>
            <dd>{variant}</dd>
          </div>
          <div>
            <dt>Mã sản phẩm mẫu</dt>
            <dd>{product.id.toUpperCase()}</dd>
          </div>
        </dl>
        <details>
          <summary>Mô tả và hướng dẫn sử dụng</summary>
          <p>
            Thông số, thành phần và hướng dẫn sử dụng chi tiết sẽ được bổ sung
            từ thông tin nhà sản xuất. Mẹ cần xem nhãn sản phẩm chính thức để
            chọn đúng nhu cầu.
          </p>
        </details>
        <details>
          <summary>Giao hàng và đổi trả</summary>
          <p>
            Phí giao hàng, thời gian giao và điều kiện đổi trả sẽ được xác nhận
            khi tiệm mở bán.
          </p>
        </details>
      </section>
      <section className="related-section">
        <div className="related-heading">
          <h2>Mẹ có thể thích</h2>
          <Link href="/san-pham">Xem tất cả →</Link>
        </div>
        <div className="related-grid">
          {(related.length ? related : relatedProducts(product.id)).map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>
    </>
  );
}
