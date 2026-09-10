import { categories } from "@/data/categories";
import { products } from "@/data/products";

export const siteUrl = new URL(
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://tiembexiu.store",
);

export const siteName = "Tiệm Bé Xíu";

export const defaultDescription =
  "Tiệm Bé Xíu — tiệm nhỏ, chọn kỹ đồ cho bé. Đồ mẹ và bé nhỏ xinh, được chọn lọc với sự tận tâm.";

export const defaultOgImage = "/assets/reference/hero.webp";

export function absoluteUrl(path: string) {
  return new URL(path, siteUrl).toString();
}

export function productDescription(productId: string) {
  const product = products.find((item) => item.id === productId);
  if (!product) return defaultDescription;
  const category = categories.find((item) => item.id === product.category);
  return `${product.name}. Sản phẩm thuộc nhóm ${category?.name ?? "mẹ và bé"} tại Tiệm Bé Xíu. Giá và tồn kho đang là dữ liệu mẫu.`;
}

export function categoryDescription(categoryId: string) {
  const category = categories.find((item) => item.id === categoryId);
  return category
    ? `Khám phá ${category.name.toLowerCase()} cho mẹ và bé tại Tiệm Bé Xíu. Danh mục hiện dùng dữ liệu mẫu để xem trước giao diện.`
    : defaultDescription;
}
