import type { Metadata } from "next";
import { CheckoutPage } from "@/components/checkout/checkout-page";
import { ShopShell } from "@/components/layout/shop-shell";
import { getWooProducts } from "@/lib/woocommerce";

export const metadata: Metadata = {
  title: "Đặt hàng | Tiệm Bé Xíu",
  description: "Điền thông tin nhận hàng trong luồng đặt hàng mẫu của Tiệm Bé Xíu.",
  alternates: { canonical: "/dat-hang" },
  robots: {
    index: false,
    follow: true,
  },
};

export default async function Page() {
  const products = await getWooProducts();
  return <ShopShell><CheckoutPage products={products} /></ShopShell>;
}
