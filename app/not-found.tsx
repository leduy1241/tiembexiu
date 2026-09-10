import Link from "next/link";
import { ShopShell } from "@/components/layout/shop-shell";
export default function NotFound() {
  return (
    <ShopShell>
      <div className="catalog-empty">
        <p className="eyebrow">TIỆM BÉ XÍU</p>
        <h1>Món xinh này chưa có trong tiệm</h1>
        <p>Đường dẫn có thể đã thay đổi. Mẹ xem những sản phẩm khác nhé.</p>
        <Link className="button button-primary" href="/san-pham">
          Khám phá sản phẩm
        </Link>
      </div>
    </ShopShell>
  );
}
