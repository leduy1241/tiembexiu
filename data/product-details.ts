import { products } from "./products";
export const brands: Record<string, string> = {
  "demo-01": "Merries",
  "demo-02": "Aptamil",
  "demo-03": "Tiệm Bé Xíu",
  "demo-04": "Pigeon",
  "demo-05": "Mamamy",
  "demo-06": "Baobaohao",
  "demo-07": "Tiệm Bé Xíu",
};
export const variants: Record<string, string[]> = {
  "demo-01": ["Size M · 64 miếng", "Size L · 54 miếng"],
  "demo-02": ["Hộp 800g"],
  "demo-03": ["Hồng đào", "Xanh sage"],
  "demo-04": ["Chai 700ml"],
  "demo-05": ["Gói 80 tờ"],
  "demo-06": ["Màu be", "Màu ghi"],
  "demo-07": ["Combo tiêu chuẩn"],
};
export const normalize = (value: string) =>
  value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d");
export const productHref = (id: string) => "/san-pham/" + id;
export function relatedProducts(id: string) {
  const current = products.find((p) => p.id === id);
  return products
    .filter((p) => p.id !== id)
    .sort(
      (a, b) =>
        Number(b.category === current?.category) -
        Number(a.category === current?.category),
    )
    .slice(0, 4);
}
