import type { Metadata } from "next";
import { ContentStudio } from "@/components/content-studio/content-studio";
import "./studio.css";

export const metadata: Metadata = { title: "Content Studio | Tiệm Bé Xíu", robots: { index: false, follow: false } };

export default function ContentStudioPage() {
  return <ContentStudio />;
}
