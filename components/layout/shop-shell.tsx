import type { ReactNode } from "react";
import { Header } from "./header";
import { Footer } from "./footer";
import { StorefrontProvider } from "@/components/ui/storefront-provider";
export function ShopShell({ children }: { children: ReactNode }) {
  return (
    <StorefrontProvider>
      <a className="skip-link" href="#noi-dung">
        Chuyển đến nội dung chính
      </a>
      <Header />
      <main id="noi-dung" className="site-container shop-page">
        {children}
      </main>
      <Footer />
    </StorefrontProvider>
  );
}
