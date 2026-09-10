import type { Metadata } from "next";
import type { ReactNode } from "react";
import { absoluteUrl, defaultDescription, defaultOgImage, siteName, siteUrl } from "@/lib/seo";
import "./globals.css";
import "./storefront.css";
import "./shop.css";

export const metadata: Metadata = {
  metadataBase: siteUrl,
  title: "Tiệm Bé Xíu | Những món đồ nhỏ xinh dành cho em bé iu",
  description: defaultDescription,
  applicationName: siteName,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "vi_VN",
    siteName,
    title: "Tiệm Bé Xíu | Những món đồ nhỏ xinh dành cho em bé iu",
    description: defaultDescription,
    url: "/",
    images: [
      {
        url: defaultOgImage,
        width: 964,
        height: 264,
        alt: "Tiệm Bé Xíu - đồ mẹ và bé nhỏ xinh",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Tiệm Bé Xíu | Những món đồ nhỏ xinh dành cho em bé iu",
    description: defaultDescription,
    images: [defaultOgImage],
  },
  icons: {
    icon: [
      { url: "/assets/reference/logo.webp", type: "image/webp" },
      { url: absoluteUrl("/assets/reference/logo.webp"), type: "image/webp" },
    ],
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="vi">
      <body>{children}</body>
    </html>
  );
}
