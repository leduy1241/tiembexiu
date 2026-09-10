import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Hero } from "@/components/home/hero";
import { Categories } from "@/components/home/categories";
import { ProductSection } from "@/components/home/product-section";
import { Promotions } from "@/components/home/promotions";
import { ShopByAge } from "@/components/home/shop-by-age";
import { Benefits } from "@/components/home/benefits";
import { Reviews } from "@/components/home/reviews";
import { Blog } from "@/components/home/blog";
import { StorefrontProvider } from "@/components/ui/storefront-provider";

export default function HomePage() {
  return (
    <StorefrontProvider>
      <a href="#noi-dung" className="skip-link">
        Chuyển đến nội dung chính
      </a>
      <Header />
      <main id="noi-dung" className="site-container">
        <Hero />
        <Categories />
        <ProductSection />
        <Promotions />
        <ShopByAge />
        <div className="trust-strip">
          <Benefits />
        </div>
        <Reviews />
        <Blog />
      </main>
      <Footer />
    </StorefrontProvider>
  );
}
