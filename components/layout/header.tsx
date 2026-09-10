"use client";
import Link from "next/link";

import { useRef, useState, type FormEvent } from "react";
import { categories } from "@/data/categories";
import { Icon } from "@/components/ui/icon";
import { useStorefront } from "@/components/ui/storefront-provider";
import { Brand } from "./brand";

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [query, setQuery] = useState("");
  const menuButton = useRef<HTMLButtonElement>(null);
  const { filterProducts, showNotice, filter, cartCount } = useStorefront();

  function search(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMenuOpen(false);
    filterProducts({ query: query.trim() });
  }

  return (
    <>
      <div className="announcement">
        <div className="site-container announcement-inner">
          <p>
            <Icon name="truck" size={14} /> Giao nhanh nội khu Hà Nội
          </p>
          <p className="announcement-note">
            <Icon name="gift" size={14} /> Freeship đơn từ 300.000đ toàn quốc
          </p>
          <p className="announcement-desktop">
            <Icon name="shield" size={14} /> Hàng chính hãng <span>│</span>
            <Icon name="box" size={14} /> Đổi trả dễ dàng <span>│</span>
            <Icon name="heart" size={14} /> Tư vấn tận tâm
          </p>
        </div>
      </div>
      <header className="site-header site-container" id="trang-chu">
        <div className="header-main">
          <Brand />
          <form className="search-form" role="search" onSubmit={search}>
            <label htmlFor="site-search" className="sr-only">
              Tìm sản phẩm cho mẹ và bé
            </label>
            <input
              id="site-search"
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Bạn đang tìm gì cho bé hôm nay?"
              maxLength={120}
            />
            <button aria-label="Tìm kiếm" type="submit">
              <Icon name="search" size={21} />
            </button>
          </form>
          <div className="header-actions">
            <button
              className="header-action account-action"
              onClick={() =>
                showNotice({
                  title: "Chào mẹ ghé tiệm!",
                  description:
                    "Tài khoản chưa được mở trong bản xem trước. Khi tiệm chính thức bán hàng, mẹ có thể đặt hàng mà không cần đăng ký tài khoản.",
                })
              }
            >
              <Icon name="user" />
              <span>Đăng nhập</span>
            </button>
            <Link
              href="/gio-hang"
              className="header-action"
              aria-label={`Giỏ hàng, ${cartCount} sản phẩm`}
            >
              <span className="cart-icon">
                <Icon name="cart" size={25} />
                <span className="cart-count">{cartCount}</span>
              </span>
              <span className="cart-label">Giỏ hàng</span>
            </Link>
            <button
              ref={menuButton}
              className="icon-button mobile-menu-toggle"
              aria-label={menuOpen ? "Đóng menu" : "Mở menu"}
              aria-expanded={menuOpen}
              aria-controls="main-navigation"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <Icon name={menuOpen ? "close" : "menu"} />
            </button>
          </div>
        </div>
        <nav
          id="main-navigation"
          aria-label="Điều hướng chính"
          className={`navigation ${menuOpen ? "is-open" : ""}`}
          onKeyDown={(event) => {
            if (event.key === "Escape") {
              setMenuOpen(false);
              menuButton.current?.focus();
            }
          }}
        >
          <Link
            href="/"
            className="nav-home"
            onClick={() => setMenuOpen(false)}
          >
            Trang chủ
          </Link>
          {categories.map((category) => (
            <button
              key={category.id}
              aria-pressed={filter.category === category.id}
              onClick={() => {
                setMenuOpen(false);
                filterProducts({ category: category.id });
              }}
            >
              {category.name}
              {category.id !== "nutrition" && <Icon name="chevron" size={11} />}
            </button>
          ))}
          <Link href="/#do-tuoi" onClick={() => setMenuOpen(false)}>
            Mua theo tuổi <Icon name="chevron" size={12} />
          </Link>
          <Link href="/san-pham?deals=1" onClick={() => setMenuOpen(false)}>
            Khuyến mãi <Icon name="chevron" size={11} />
          </Link>
          <Link href="/#goc-cua-me" onClick={() => setMenuOpen(false)}>
            Góc của mẹ <Icon name="chevron" size={11} />
          </Link>
        </nav>
      </header>
    </>
  );
}
