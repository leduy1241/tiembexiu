import type { AgeId, CategoryId } from "@/types/product";
import type { IconName } from "@/components/ui/icon";

export const categories: {
  id: CategoryId;
  name: string;
  icon: IconName;
  color: string;
}[] = [
  { id: "diapers", name: "Bỉm & Tã", icon: "diaper", color: "blue" },
  { id: "nutrition", name: "Sữa & Dinh dưỡng", icon: "bottle", color: "blue" },
  { id: "feeding", name: "Ăn dặm", icon: "bowl", color: "yellow" },
  { id: "care", name: "Chăm sóc bé", icon: "bath", color: "blue" },
  { id: "essentials", name: "Đồ dùng", icon: "stroller", color: "coral" },
  { id: "mother", name: "Đồ cho mẹ", icon: "heart", color: "coral" },
];

export const ages: {
  id: AgeId;
  name: string;
  note: string;
  icon: IconName;
  color: string;
}[] = [
  {
    id: "0-6",
    name: "0–6 tháng",
    note: "Những ngày đầu bên nhau",
    icon: "sprout",
    color: "blue",
  },
  {
    id: "6-12",
    name: "6–12 tháng",
    note: "Mỗi ngày một khám phá",
    icon: "sun",
    color: "sage",
  },
  {
    id: "1-2",
    name: "1–2 tuổi",
    note: "Chập chững bước vào đời",
    icon: "bear",
    color: "coral",
  },
  {
    id: "2-plus",
    name: "2 tuổi+",
    note: "Lớn khôn cùng bé iu",
    icon: "balloon",
    color: "lavender",
  },
];
