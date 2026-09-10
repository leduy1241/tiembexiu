export type CategoryId =
  "diapers" | "nutrition" | "feeding" | "care" | "essentials" | "mother";
export type AgeId = "0-6" | "6-12" | "1-2" | "2-plus";

export interface Product {
  id: string;
  name: string;
  category: CategoryId;
  ages: AgeId[];
  price: number;
  oldPrice?: number;
  image: string;
  rating: number;
  reviewCount: number;
  bestSeller?: boolean;
  isDemo?: boolean;
}
