"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, type FormEvent } from "react";
import { formatPrice } from "@/data/products";
import { Icon } from "@/components/ui/icon";
import { useStorefront } from "@/components/ui/storefront-provider";
import type { Product } from "@/types/product";

const shippingFee = 0;

export function CheckoutPage({ products }: { products: Product[] }) {
  const { cart, cartCount, clearCart, showNotice } = useStorefront();
  const [method, setMethod] = useState("cod");
  const rows = cart.flatMap((item) => {
    const product = products.find((entry) => entry.id === item.productId);
    return product ? [{ ...item, product }] : [];
  });
  const subtotal = rows.reduce((total, item) => total + item.product.price * item.quantity, 0);
  const total = subtotal + shippingFee;

  function submitOrder(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (rows.length === 0) return;
    clearCart();
    showNotice({
      title: "Đơn mẫu đã được tạo",
      description:
        "Thông tin chỉ được xử lý trên trình duyệt để xem trước trải nghiệm. Chưa có đơn hàng, thanh toán hay dữ liệu cá nhân nào được gửi ra ngoài.",
    });
  }

  return (
    <>
      <nav className="breadcrumbs" aria-label="Đường dẫn">
        <Link href="/">Trang chủ</Link><span>/</span><Link href="/gio-hang">Giỏ hàng</Link><span>/</span><span>Đặt hàng</span>
      </nav>
      <header className="cart-heading">
        <div><p className="eyebrow">HOÀN TẤT GIỎ HÀNG MẪU</p><h1>Thông tin nhận hàng</h1></div>
      </header>

      {rows.length === 0 ? (
        <section className="cart-empty">
          <span aria-hidden="true">♡</span>
          <h2>Chưa có món nào để đặt</h2>
          <p>Mẹ chọn sản phẩm trước, rồi quay lại bước đặt hàng nhé.</p>
          <Link className="button button-primary" href="/san-pham">Xem tất cả sản phẩm</Link>
        </section>
      ) : (
        <div className="checkout-layout">
          <form className="checkout-form" onSubmit={submitOrder}>
            <section className="checkout-panel">
              <h2>Người nhận</h2>
              <div className="form-grid">
                <label>Họ và tên<input name="name" autoComplete="name" required placeholder="Nguyễn An" /></label>
                <label>Số điện thoại<input name="phone" autoComplete="tel" required inputMode="tel" placeholder="09xx xxx xxx" /></label>
                <label className="form-span">Địa chỉ nhận hàng<input name="address" autoComplete="street-address" required placeholder="Số nhà, đường, phường/xã, quận/huyện" /></label>
                <label className="form-span">Ghi chú cho tiệm<textarea name="note" rows={4} placeholder="Ví dụ: giao giờ hành chính, gọi trước khi đến..." /></label>
              </div>
            </section>

            <section className="checkout-panel">
              <h2>Phương thức thanh toán</h2>
              <div className="payment-options" role="radiogroup" aria-label="Phương thức thanh toán">
                <label className={method === "cod" ? "payment-option is-selected" : "payment-option"}>
                  <input type="radio" name="payment" value="cod" checked={method === "cod"} onChange={(event) => setMethod(event.target.value)} />
                  <span><Icon name="truck" size={22} /></span>
                  <strong>Thanh toán khi nhận hàng</strong>
                  <small>Phù hợp nhất cho bản xem trước.</small>
                </label>
                <label className={method === "transfer" ? "payment-option is-selected" : "payment-option"}>
                  <input type="radio" name="payment" value="transfer" checked={method === "transfer"} onChange={(event) => setMethod(event.target.value)} />
                  <span><Icon name="shield" size={22} /></span>
                  <strong>Chuyển khoản sau xác nhận</strong>
                  <small>Chưa kết nối ngân hàng thật.</small>
                </label>
              </div>
            </section>

            <button className="button button-primary checkout-submit" type="submit">Tạo đơn hàng mẫu</button>
            <p className="sample-note">Nút này chỉ mô phỏng hoàn tất đơn hàng trên trình duyệt hiện tại.</p>
          </form>

          <aside className="cart-summary checkout-summary">
            <h2>Đơn của mẹ</h2>
            <div className="checkout-items">
              {rows.map((item) => (
                <article key={`${item.productId}-${item.variant}`}>
                  <span className="checkout-thumb"><Image src={item.product.image} alt="" fill sizes="52px" unoptimized /></span>
                  <div><strong>{item.product.name}</strong><small>{item.variant} × {item.quantity}</small></div>
                  <b>{formatPrice(item.product.price * item.quantity)}</b>
                </article>
              ))}
            </div>
            <p><span>Sản phẩm</span><span>{cartCount}</span></p>
            <p><span>Tạm tính</span><strong>{formatPrice(subtotal)}</strong></p>
            <p><span>Phí giao hàng</span><span>Sẽ xác nhận</span></p>
            <div className="cart-summary-total"><span>Tổng dự kiến</span><strong>{formatPrice(total)}</strong></div>
          </aside>
        </div>
      )}
    </>
  );
}
