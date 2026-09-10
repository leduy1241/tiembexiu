"use client";

import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/types/product";
import { formatPrice } from "@/data/products";
import { Icon } from "@/components/ui/icon";
import { useStorefront } from "@/components/ui/storefront-provider";
import { variants } from "@/data/product-details";

export function ProductCard({ product }: { product: Product }) {
  const { addToCart, showNotice } = useStorefront();
  const defaultVariant = variants[product.id]?.[0] ?? "Tiêu chuẩn";
  const discount = product.oldPrice
    ? Math.round((1 - product.price / product.oldPrice) * 100)
    : 0;
  return (
    <article className="product-card">
      <Link
        className="product-image"
        href={"/san-pham/" + product.id}
        aria-label={`Xem chi tiết ${product.name}`}
      >
        <Image
          src={product.image}
          alt={`Ảnh minh họa ${product.name}`}
          fill
          sizes="(max-width: 600px) 45vw, 16vw"
          unoptimized
        />
        {!product.image.includes("/reference/") && product.bestSeller && (
          <span className="product-badge">Bán chạy</span>
        )}
        {!product.image.includes("/reference/") && discount > 0 && (
          <span className="discount-badge">−{discount}%</span>
        )}
      </Link>
      <div className="product-info">
        <Link className="product-name" href={"/san-pham/" + product.id}>
          {product.name}
        </Link>
        <p
          className="product-rating"
          aria-label={`Điểm minh họa ${product.rating} trên 5, ${product.reviewCount} đánh giá mẫu`}
        >
          <Icon name="star" size={13} />
          <span>{product.rating}</span>
          <span className="review-count">({product.reviewCount})</span>
        </p>
        <div className="product-bottom">
          <div>
            <span className="product-price">{formatPrice(product.price)}</span>
            {product.oldPrice && (
              <del className="old-price">{formatPrice(product.oldPrice)}</del>
            )}
          </div>
          <button
            className="add-to-cart"
            aria-label={`Thêm ${product.name} vào giỏ — bản xem trước`}
            onClick={() => {
              addToCart({
                productId: product.id,
                variant: defaultVariant,
                quantity: 1,
              });
              showNotice({
                title: "Món xinh mẹ vừa chọn",
                description: `Đã thêm “${product.name}” vào giỏ hàng trên trình duyệt này. Đây vẫn là sản phẩm và giá minh họa; chưa phát sinh đơn hàng.`,
              });
            }}
          >
            <Icon name="cart" size={19} />
          </button>
        </div>
      </div>
    </article>
  );
}
