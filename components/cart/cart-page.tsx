"use client";

import Image from "next/image";
import Link from "next/link";
import { formatPrice } from "@/data/products";
import { useStorefront } from "@/components/ui/storefront-provider";
import type { Product } from "@/types/product";

export function CartPage({ products }: { products: Product[] }) {
  const { cart, cartCount, updateCartQuantity, removeFromCart, clearCart } = useStorefront();
  const rows = cart.flatMap((item) => {
    const product = products.find((entry) => entry.id === item.productId);
    return product ? [{ ...item, product }] : [];
  });
  const subtotal = rows.reduce((total, item) => total + item.product.price * item.quantity, 0);

  return (
    <>
      <nav className="breadcrumbs" aria-label="Đường dẫn">
        <Link href="/">Trang chủ</Link><span>/</span><span>Giỏ hàng</span>
      </nav>
      <header className="cart-heading">
        <div><p className="eyebrow">GIỎ HÀNG TRÊN THIẾT BỊ NÀY</p><h1>Những món mẹ đã chọn</h1></div>
        {rows.length > 0 && <button onClick={clearCart}>Xóa tất cả</button>}
      </header>
      {rows.length === 0 ? (
        <section className="cart-empty">
          <span aria-hidden="true">♡</span>
          <h2>Giỏ hàng đang chờ những món xinh</h2>
          <p>Mẹ khám phá bộ sưu tập rồi quay lại đây nhé.</p>
          <Link className="button button-primary" href="/san-pham">Xem tất cả sản phẩm</Link>
        </section>
      ) : (
        <div className="cart-layout">
          <section className="cart-items" aria-label={`${cartCount} sản phẩm trong giỏ`}>
            {rows.map((item) => (
              <article className="cart-item" key={`${item.productId}-${item.variant}`}>
                <Link className="cart-item-image" href={`/san-pham/${item.productId}`}>
                  <Image src={item.product.image} alt="" fill sizes="120px" unoptimized />
                </Link>
                <div className="cart-item-info">
                  <Link href={`/san-pham/${item.productId}`}><h2>{item.product.name}</h2></Link>
                  <p>{item.variant}</p>
                  <strong>{formatPrice(item.product.price)}</strong>
                  <button className="cart-remove" onClick={() => removeFromCart(item.productId, item.variant)}>Xóa khỏi giỏ</button>
                </div>
                <div className="cart-item-actions">
                  <div className="quantity-control" role="group" aria-label={`Số lượng ${item.product.name}`}>
                    <button aria-label="Giảm số lượng" disabled={item.quantity === 1} onClick={() => updateCartQuantity(item.productId, item.variant, item.quantity - 1)}>−</button>
                    <output aria-live="polite">{item.quantity}</output>
                    <button aria-label="Tăng số lượng" disabled={item.quantity === 10} onClick={() => updateCartQuantity(item.productId, item.variant, item.quantity + 1)}>+</button>
                  </div>
                  <strong>{formatPrice(item.product.price * item.quantity)}</strong>
                </div>
              </article>
            ))}
          </section>
          <aside className="cart-summary">
            <h2>Tóm tắt giỏ hàng</h2>
            <p><span>Sản phẩm</span><span>{cartCount}</span></p>
            <p><span>Tạm tính</span><strong>{formatPrice(subtotal)}</strong></p>
            <p><span>Phí giao hàng</span><span>Chưa xác định</span></p>
            <div className="cart-summary-total"><span>Tổng dự kiến</span><strong>{formatPrice(subtotal)}</strong></div>
            <Link className="button button-primary" href="/dat-hang">Tiếp tục đặt hàng</Link>
            <p className="sample-note">Sản phẩm, giá và chính sách giao hàng đang là dữ liệu mẫu.</p>
          </aside>
        </div>
      )}
    </>
  );
}
