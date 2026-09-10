// Explicitly fictional demo reviews; never present as verified purchases.
export const reviews = [
  {
    id: "review-demo-1",
    name: "Mẹ Mầm Nhỏ",
    initials: "MN",
    color: "sage",
    text: "Tiệm nhỏ xinh, tìm đồ cho bé rất dễ. Mình thích cách sản phẩm được sắp xếp theo từng độ tuổi.",
    rating: 5,
  },
  {
    id: "review-demo-2",
    name: "Ba Gấu Con",
    initials: "GC",
    color: "blue",
    text: "Giao diện gọn gàng, hình ảnh rõ ràng. Chỉ cần vài thao tác là tìm được món đồ mình đang cần.",
    rating: 5,
  },
  {
    id: "review-demo-3",
    name: "Mẹ Nắng Mai",
    initials: "NM",
    color: "coral",
    text: "Màu sắc nhẹ nhàng, những bộ đồ dùng nhỏ xinh rất hợp gu. Mong được ghé tiệm cùng bé iu!",
    rating: 5,
  },
] as const;
