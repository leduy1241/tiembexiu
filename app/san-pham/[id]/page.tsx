import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { formatPrice, products } from "@/data/products";
import { ProductDetail } from "@/components/product/product-detail";
import { ShopShell } from "@/components/layout/shop-shell";
import { productDescription, siteName } from "@/lib/seo";
import { getWooProduct, getWooProducts } from "@/lib/woocommerce";
export async function generateStaticParams() {
  const wooProducts = await getWooProducts();
  return wooProducts.map((p) => ({ id: p.id }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const product = (await getWooProduct(id)) ?? products.find((p) => p.id === id);
  if (!product) {
    return { title: `Sản phẩm | ${siteName}` };
  }
  const description = productDescription(product.id);
  return {
    title: `${product.name} | ${siteName}`,
    description,
    alternates: { canonical: `/san-pham/${product.id}` },
    openGraph: {
      title: `${product.name} | ${siteName}`,
      description,
      url: `/san-pham/${product.id}`,
      images: [{ url: product.image, alt: product.name }],
    },
    other: {
      "product:price:amount": String(product.price),
      "product:price:currency": "VND",
      "product:retailer_item_id": product.id,
      "product:availability": "preview",
      "product:formatted_price": formatPrice(product.price),
    },
  };
}
export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const allProducts = await getWooProducts();
  const product = allProducts.find((p) => p.id === id) ?? products.find((p) => p.id === id);
  if (!product) notFound();
  const related = allProducts.filter((item) => item.id !== product.id).slice(0, 4);
  return (
    <ShopShell>
      <ProductDetail key={id} product={product} related={related} />
    </ShopShell>
  );
}
