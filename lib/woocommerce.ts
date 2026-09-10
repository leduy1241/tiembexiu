import { products as demoProducts } from "@/data/products";
import type { CategoryId, Product } from "@/types/product";

type WooImage = { src?: string };
type WooCategory = { slug?: string };
type WooProduct = {
  id: number;
  name: string;
  slug: string;
  price?: string;
  regular_price?: string;
  sale_price?: string;
  images?: WooImage[];
  categories?: WooCategory[];
  average_rating?: string;
  rating_count?: number;
  stock_status?: string;
};

const categoryIds = new Set<CategoryId>([
  "diapers",
  "nutrition",
  "feeding",
  "care",
  "essentials",
  "mother",
]);

function env(name: string) {
  return process.env[name]?.trim();
}

function authHeader() {
  const key = env("WOOCOMMERCE_CONSUMER_KEY");
  const secret = env("WOOCOMMERCE_CONSUMER_SECRET");
  if (!key || !secret) return null;
  return "Basic " + Buffer.from(`${key}:${secret}`).toString("base64");
}

function apiUrl(path: string) {
  const base = env("WORDPRESS_URL")?.replace(/\/$/, "");
  if (!base) return null;
  return `${base}/wp-json/wc/v3${path}`;
}

function toNumber(value?: string) {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : 0;
}

function mapWooProduct(product: WooProduct): Product {
  const category =
    product.categories
      ?.map((item) => item.slug)
      .find((slug): slug is CategoryId =>
        Boolean(slug && categoryIds.has(slug as CategoryId)),
      ) ?? "care";
  const price = toNumber(product.price || product.sale_price || product.regular_price);
  const regularPrice = toNumber(product.regular_price);

  return {
    id: product.slug || String(product.id),
    name: product.name || "Sản phẩm",
    category,
    ages: ["0-6", "6-12", "1-2", "2-plus"],
    price,
    oldPrice: regularPrice > price ? regularPrice : undefined,
    image: product.images?.[0]?.src || "/assets/reference/product-cleanser.webp",
    rating: toNumber(product.average_rating) || 5,
    reviewCount: product.rating_count ?? 0,
    bestSeller: product.stock_status === "instock",
  };
}

export async function getWooProducts(): Promise<Product[]> {
  const url = apiUrl("/products?per_page=100&status=publish");
  const auth = authHeader();
  if (!url || !auth) return demoProducts;

  try {
    const response = await fetch(url, {
      headers: { Authorization: auth },
      next: { revalidate: 300 },
    });
    if (!response.ok) return demoProducts;
    const payload = (await response.json()) as WooProduct[];
    const products = payload.map(mapWooProduct);
    return products.length ? products : demoProducts;
  } catch {
    return demoProducts;
  }
}

export async function getWooProduct(slug: string): Promise<Product | null> {
  const products = await getWooProducts();
  return products.find((product) => product.id === slug) ?? null;
}
