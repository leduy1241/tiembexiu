import type { Metadata } from "next";
import { ShopShell } from "@/components/layout/shop-shell";
import { CartPage } from "@/components/cart/cart-page";
import { getWooProducts } from "@/lib/woocommerce";

export const metadata: Metadata = {
  title: "Giỏ hàng | Tiệm Bé Xíu",
  description: "Xem lại các sản phẩm mẹ đã chọn trong giỏ hàng cục bộ của Tiệm Bé Xíu.",
  alternates: { canonical: "/gio-hang" },
  robots: {
    index: false,
    follow: true,
  },
};

export default async function Page() {
  const products = await getWooProducts();
  return <ShopShell><CartPage products={products} /></ShopShell>;
}
