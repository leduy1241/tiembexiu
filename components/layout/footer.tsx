"use client";
import { useState, type FormEvent } from "react";
import { Brand } from "./brand";
import { Icon } from "@/components/ui/icon";
import { useStorefront } from "@/components/ui/storefront-provider";

export function Footer() {
  const [email, setEmail] = useState("");
  const { showNotice } = useStorefront();
  function subscribe(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    showNotice({ title: "Cảm ơn mẹ đã ghé tiệm!", description: "Đăng ký nhận tin chưa mở trong bản xem trước. Email của mẹ chưa được gửi hoặc lưu lại." });
    setEmail("");
  }
  function contact(channel: string) {
    showNotice({ title: "Kết nối qua " + channel, description: "Liên kết chính thức của tiệm đang được cập nhật. Hiện chưa mở cuộc trò chuyện hoặc gửi tin nhắn nào." });
  }
  return <footer className="site-footer">
    <div className="site-container footer-row">
      <Brand footer />
      <section className="newsletter" aria-labelledby="newsletter-title">
        <h2 id="newsletter-title">Đăng ký nhận tin</h2>
        <p>Nhận ưu đãi mới nhất từ Tiệm Bé Xíu nhé!</p>
        <form className="newsletter-form" onSubmit={subscribe}>
          <label className="sr-only" htmlFor="newsletter-email">Email nhận tin</label>
          <input id="newsletter-email" type="email" placeholder="Nhập email của bạn" value={email} onChange={event => setEmail(event.target.value)} autoComplete="email" maxLength={254} required />
          <button type="submit">Đăng ký</button>
        </form>
      </section>
      <section className="footer-social" aria-labelledby="social-title">
        <h2 id="social-title">Kết nối với chúng tôi</h2>
        <div className="social-links">
          {["Facebook", "TikTok", "YouTube", "Zalo"].map((channel, index) => <button key={channel} className={"social-" + index} onClick={() => contact(channel)} aria-label={"Kết nối " + channel}>{["f", "♪", "▶", "Zalo"][index]}</button>)}
        </div>
      </section>
      <aside className="floating-contact" aria-label="Liên hệ với tiệm">
        <button className="floating-messenger" aria-label="Chat với tiệm qua Messenger" onClick={() => contact("Messenger")}><Icon name="chat" size={16} /><span>Chat với chúng tôi</span></button>
        <button className="floating-zalo" aria-label="Tư vấn qua Zalo" onClick={() => contact("Zalo")}><Icon name="chat" size={16} /><span>Tư vấn Zalo</span></button>
      </aside>
    </div>
    <p className="preview-note">Bản xem trước theo mẫu thiết kế · Sản phẩm, đánh giá và chính sách chưa được xác nhận để mở bán.</p>
  </footer>;
}
