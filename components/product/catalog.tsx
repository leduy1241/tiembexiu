"use client";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { brands, normalize } from "@/data/product-details";
import { categories, ages } from "@/data/categories";
import type { CategoryId, Product } from "@/types/product";
import { ProductCard } from "./product-card";

export function Catalog({
  category,
  products,
}: {
  category?: CategoryId;
  products: Product[];
}) {
  const params = useSearchParams(),
    router = useRouter(),
    pathname = usePathname();
  const query = params.get("q") ?? "",
    brand = params.get("brand") ?? "",
    age = params.get("age") ?? "",
    price = params.get("price") ?? "",
    sort = params.get("sort") ?? "featured";
  const deals = params.get("deals") === "1";
  const title =
    categories.find((c) => c.id === category)?.name ?? "Tất cả sản phẩm";
  const update = (key: string, value: string) => {
    const next = new URLSearchParams(params.toString());
    if (value) next.set(key, value);
    else next.delete(key);
    next.delete("page");
    router.push(pathname + (next.size ? "?" + next.toString() : ""), {
      scroll: false,
    });
  };
  const filtered = products.filter(
    (p) =>
      (!category || p.category === category) &&
      (!query ||
        normalize(p.name + " " + (brands[p.id] ?? "")).includes(normalize(query))) &&
      (!brand || (brands[p.id] ?? "Tiệm Bé Xíu") === brand) &&
      (!age || p.ages.some((a) => a === age)) &&
      (!deals || !!p.oldPrice) &&
      (!price ||
        (price === "under-200" && p.price < 200000) ||
        (price === "200-500" && p.price >= 200000 && p.price <= 500000) ||
        (price === "over-500" && p.price > 500000)),
  );
  const ordered = [...filtered].sort((a, b) =>
    sort === "price-asc"
      ? a.price - b.price
      : sort === "price-desc"
        ? b.price - a.price
        : sort === "name"
          ? a.name.localeCompare(b.name, "vi")
          : 0,
  );
  const pageCount = Math.max(1, Math.ceil(ordered.length / 6));
  const requested = Number(params.get("page") ?? 1);
  const page = Math.min(
    pageCount,
    Math.max(1, Number.isFinite(requested) ? Math.floor(requested) : 1),
  );
  const visible = ordered.slice((page - 1) * 6, page * 6);
  const active = !!(query || brand || age || price || deals);
  return (
    <>
      <nav className="breadcrumbs" aria-label="Đường dẫn">
        <Link href="/">Trang chủ</Link>
        <span>/</span>
        <span>{title}</span>
      </nav>
      <section className="catalog-banner">
        <div>
          <p className="eyebrow">NHỮNG MÓN NHỎ XINH, CÙNG BÉ LỚN KHÔN</p>
          <h1>{title}</h1>
          <p>Mẹ chọn điều bé cần, tiệm gửi một chút yêu thương.</p>
        </div>
        <span aria-hidden="true">♡</span>
      </section>
      <div className="catalog-layout">
        <aside className="catalog-sidebar">
          <h2>Mẹ đang tìm gì?</h2>
          <nav aria-label="Danh mục sản phẩm">
            <Link
              href="/san-pham"
              aria-current={!category ? "page" : undefined}
            >
              Tất cả sản phẩm <span>{products.length}</span>
            </Link>
            {categories.map((c) => (
              <Link
                key={c.id}
                href={"/danh-muc/" + c.id}
                aria-current={category === c.id ? "page" : undefined}
              >
                {c.name}
                <span>
                  {products.filter((p) => p.category === c.id).length}
                </span>
              </Link>
            ))}
          </nav>
          <details className="catalog-filters" open>
            <summary>Lọc sản phẩm</summary>
            <label>
              Thương hiệu
              <select
                aria-label="Thương hiệu"
                value={brand}
                onChange={(e) => update("brand", e.target.value)}
              >
                <option value="">Tất cả thương hiệu</option>
                {[...new Set(products.map((p) => brands[p.id] ?? "Tiệm Bé Xíu"))].map((b) => (
                  <option key={b}>{b}</option>
                ))}
              </select>
            </label>
            <label>
              Độ tuổi
              <select
                aria-label="Độ tuổi"
                value={age}
                onChange={(e) => update("age", e.target.value)}
              >
                <option value="">Tất cả độ tuổi</option>
                {ages.map((a) => (
                  <option key={a.id} value={a.id}>
                    {a.name}
                  </option>
                ))}
              </select>
            </label>
            <label>
              Khoảng giá
              <select
                aria-label="Khoảng giá"
                value={price}
                onChange={(e) => update("price", e.target.value)}
              >
                <option value="">Tất cả mức giá</option>
                <option value="under-200">Dưới 200.000đ</option>
                <option value="200-500">200.000đ – 500.000đ</option>
                <option value="over-500">Trên 500.000đ</option>
              </select>
            </label>
            <label className="check-label">
              <input
                type="checkbox"
                checked={deals}
                onChange={(e) => update("deals", e.target.checked ? "1" : "")}
              />
              Đang có ưu đãi
            </label>
            {active && (
              <button
                className="reset-filter"
                onClick={() => router.push(pathname, { scroll: false })}
              >
                Xóa bộ lọc
              </button>
            )}
          </details>
        </aside>
        <section className="catalog-results" aria-label="Danh sách sản phẩm">
          <form
            className="catalog-search"
            onSubmit={(e) => {
              e.preventDefault();
              update(
                "q",
                String(new FormData(e.currentTarget).get("q") ?? "").trim(),
              );
            }}
          >
            <input
              key={query}
              name="q"
              aria-label="Tìm trong sản phẩm"
              defaultValue={query}
              placeholder="Tìm món xinh cho bé…"
              maxLength={120}
            />
            <button className="button button-primary">Tìm kiếm</button>
          </form>
          <div className="catalog-toolbar">
            <p aria-live="polite">
              <strong>{ordered.length}</strong> sản phẩm
              {query && <> cho “{query}”</>}
            </p>
            <label>
              Sắp xếp
              <select
                aria-label="Sắp xếp"
                value={sort}
                onChange={(e) => update("sort", e.target.value)}
              >
                <option value="featured">Nổi bật</option>
                <option value="price-asc">Giá tăng dần</option>
                <option value="price-desc">Giá giảm dần</option>
                <option value="name">Tên A – Z</option>
              </select>
            </label>
          </div>
          {visible.length ? (
            <div className="catalog-grid">
              {visible.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          ) : (
            <div className="catalog-empty">
              <h2>Chưa tìm thấy món mẹ cần</h2>
              <p>Mẹ thử từ khóa khác hoặc bỏ bớt bộ lọc nhé.</p>
              <button
                className="button button-primary"
                onClick={() => router.push(pathname, { scroll: false })}
              >
                Xóa bộ lọc
              </button>
            </div>
          )}
          {pageCount > 1 && (
            <nav className="pagination" aria-label="Phân trang">
              {Array.from({ length: pageCount }, (_, i) => {
                const next = new URLSearchParams(params.toString());
                next.set("page", String(i + 1));
                return (
                  <Link
                    key={i}
                    href={pathname + "?" + next}
                    aria-current={page === i + 1 ? "page" : undefined}
                    aria-label={"Trang " + (i + 1)}
                  >
                    {i + 1}
                  </Link>
                );
              })}
            </nav>
          )}
          <p className="sample-note">
            Bộ sưu tập mẫu · Giá và thông tin sản phẩm đang được hoàn thiện.
          </p>
        </section>
      </div>
    </>
  );
}
