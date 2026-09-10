import { Suspense } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { categories } from "@/data/categories";
import { Catalog } from "@/components/product/catalog";
import { ShopShell } from "@/components/layout/shop-shell";
import { categoryDescription, defaultOgImage, siteName } from "@/lib/seo";
import { getWooProducts } from "@/lib/woocommerce";
export function generateStaticParams() {
  return categories.map((c) => ({ category: c.id }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}): Promise<Metadata> {
  const { category } = await params;
  const item = categories.find((c) => c.id === category);
  if (!item) {
    return { title: `Danh mục | ${siteName}` };
  }
  const description = categoryDescription(item.id);
  return {
    title: `${item.name} | ${siteName}`,
    description,
    alternates: { canonical: `/danh-muc/${item.id}` },
    openGraph: {
      title: `${item.name} | ${siteName}`,
      description,
      url: `/danh-muc/${item.id}`,
      images: [defaultOgImage],
    },
  };
}
export default async function Page({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  const item = categories.find((c) => c.id === category);
  if (!item) notFound();
  const products = await getWooProducts();
  return (
    <ShopShell>
      <Suspense fallback={<p>Đang mở danh mục…</p>}>
        <Catalog category={item.id} products={products} />
      </Suspense>
    </ShopShell>
  );
}
