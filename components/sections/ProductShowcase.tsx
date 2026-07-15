import Link from "next/link";
import { ArrowRight } from "@/components/icons";
import { products } from "@/data/site-data";
import type { HomeSectionConfig } from "@/data/home-page";
import { homePartClass, homePartStyle } from "@/lib/home-parts";
import { ProductCarousel } from "@/components/sections/ProductCarousel";

export function ProductShowcase({ config }: { config?: HomeSectionConfig }) {
  const displayProducts = [
    {
      ...products[0],
      title: "Bench Scale",
      image: "/uploads/products/transparent-home/centered/official-counting-bench-scale.png",
    },
    {
      ...products[3],
      title: "Guardrail Platform Scale",
      image: "/uploads/products/transparent-home/centered/industrial-platform-scales-guardrail-platform-scale.png",
    },
    {
      ...products[1],
      title: "Floor Scale",
      image: "/uploads/products/transparent-home/centered/truck-scales-steel-deck-above-ground-truck-scale.png",
    },
    {
      ...products[2],
      title: "Mobile Floor Scale",
      image: "/uploads/products/transparent-home/centered/portable-axle-weighers-portable-axle-weigher.png",
    },
    {
      ...products[0],
      title: "Electronic Scale",
      image: "/uploads/products/transparent-home/centered/official-electronic-scale.png",
    },
    {
      ...products[1],
      title: "Weighing Module",
      image: "/uploads/products/transparent-home/centered/official-weighing-module-system.png",
    },
    {
      ...products[2],
      title: "Truck Scale",
      image: "/uploads/products/transparent-home/centered/truck-scales-steel-concrete-deck-above-ground-truck-scale.png",
    },
  ].map((product, index) => ({
    ...product,
    id: `${product.title}-${index}`,
    title: index > 3 ? product.title : product.title,
  }));

  return (
    <section className={`section product-section product-layout-${config?.layout || "portfolio"} home-bg-${config?.background || "white"} home-spacing-${config?.spacing || "standard"}`} id="products">
      <div className="product-watermark" aria-hidden="true">Products</div>
      <div className="product-portfolio">
        <div className={homePartClass(config, "intro", "product-portfolio-intro")} style={homePartStyle(config, "intro")}>
          <p>{config?.copy || "Select by application and build the right weighing system faster."}</p>
        </div>

        <div className={homePartClass(config, "cards", "product-skyline product-carousel-wrap")} style={homePartStyle(config, "cards")}>
          <ProductCarousel products={displayProducts} />
        </div>

        <div className="product-portfolio-action">
          <Link className={homePartClass(config, "button", "product-portfolio-button")} style={homePartStyle(config, "button")} href="/products">
            {config?.buttonLabel || "Explore products"} <ArrowRight size={15} />
          </Link>
        </div>
      </div>
    </section>
  );
}
