import { Suspense } from "react";
import type { Metadata } from "next";
import { ShopShell } from "@/components/layout/shop-shell";
import { Catalog } from "@/components/product/catalog";
import { defaultOgImage } from "@/lib/seo";
import { getWooProducts } from "@/lib/woocommerce";

export const metadata: Metadata = {
  title: "Sản phẩm cho mẹ & bé | Tiệm Bé Xíu",
  description:
    "Khám phá bộ sưu tập sản phẩm mẹ và bé tại Tiệm Bé Xíu: bỉm, sữa, ăn dặm, chăm sóc bé và đồ dùng thiết yếu.",
  alternates: { canonical: "/san-pham" },
  openGraph: {
    title: "Sản phẩm cho mẹ & bé | Tiệm Bé Xíu",
    description:
      "Bộ sưu tập sản phẩm mẹ và bé được chọn lọc cho bản xem trước Tiệm Bé Xíu.",
    url: "/san-pham",
    images: [defaultOgImage],
  },
};
export default async function Page() {
  const products = await getWooProducts();
  return (
    <ShopShell>
      <Suspense fallback={<p>Đang mở những món xinh…</p>}>
        <Catalog products={products} />
      </Suspense>
    </ShopShell>
  );
}
