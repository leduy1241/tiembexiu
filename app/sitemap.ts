import type { MetadataRoute } from "next";
import { categories } from "@/data/categories";
import { products } from "@/data/products";
import { absoluteUrl } from "@/lib/seo";

const now = new Date();

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: absoluteUrl("/"), lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: absoluteUrl("/san-pham"), lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: absoluteUrl("/gio-hang"), lastModified: now, changeFrequency: "monthly", priority: 0.4 },
    { url: absoluteUrl("/dat-hang"), lastModified: now, changeFrequency: "monthly", priority: 0.3 },
  ];

  const categoryRoutes: MetadataRoute.Sitemap = categories.map((category) => ({
    url: absoluteUrl(`/danh-muc/${category.id}`),
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  const productRoutes: MetadataRoute.Sitemap = products.map((product) => ({
    url: absoluteUrl(`/san-pham/${product.id}`),
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.7,
    images: [absoluteUrl(product.image)],
  }));

  return [...staticRoutes, ...categoryRoutes, ...productRoutes];
}
