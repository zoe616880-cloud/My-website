import Link from "next/link";
import Image from "next/image";
import type { HomeSectionConfig } from "@/data/home-page";
import { homePartClass, homePartStyle } from "@/lib/home-parts";

const productCategories = [
  {
    title: "Truck Scale",
    copy: "Robust and reliable for heavy-duty weighing.",
    image: "/uploads/products/transparent-home/clean/truck-scales-steel-deck-above-ground-truck-scale.png",
    href: "/products?category=truck-scales",
  },
  {
    title: "Floor Scale",
    copy: "Strong structure for every industrial use.",
    image: "/uploads/products/industrial-floor-scales-standard-mild-steel-floor-scale.jpg",
    href: "/products?category=industrial-floor-scales",
  },
  {
    title: "Bench Scale",
    copy: "Compact, precise and easy to operate.",
    image: "/uploads/products/transparent-home/clean/official-counting-bench-scale.png",
    href: "/products?category=industrial-platform-scales",
  },
  {
    title: "Axle Scale",
    copy: "Portable design for road and vehicle weighing.",
    image: "/uploads/products/transparent-home/clean/portable-axle-weighers-portable-axle-weigher.png",
    href: "/products?category=truck-scales",
  },
  {
    title: "Crane Scale",
    copy: "Safe lifting scale for accurate weighing.",
    image: "/uploads/products/import-4-0/crane-scales-xz-aae-lux.png",
    href: "/products?category=crane-scales",
  },
  {
    title: "Indicators",
    copy: "Smart indicators for all applications.",
    image: "/uploads/products/indicator-xk3190-a12-e.jpg",
    href: "/products?category=scale-accessories",
  },
  {
    title: "Load Cells",
    copy: "High-quality sensors for accurate results.",
    image: "/uploads/products/load-cell-keli-sqb.jpg",
    href: "/products?category=scale-accessories",
  },
  {
    title: "Balance",
    copy: "Precision balances for laboratory measurement.",
    image: "/uploads/products/official-analytical-balance.png",
    href: "/products?category=balances",
  },
];

export function ProductShowcase({ config }: { config?: HomeSectionConfig }) {
  return (
    <section className={`section product-section product-layout-${config?.layout || "portfolio"} home-bg-${config?.background || "white"} home-spacing-${config?.spacing || "standard"}`} id="products">
      <div className="product-watermark" aria-hidden="true">Products</div>
      <div className="product-portfolio">
        <div className={homePartClass(config, "intro", "product-portfolio-intro")} style={homePartStyle(config, "intro")}>
          <h2>Our Products</h2>
          <p>Reliable Weighing Solutions for Every Need</p>
        </div>

        <div className={homePartClass(config, "cards", "product-category-grid")} style={homePartStyle(config, "cards")}>
          {productCategories.map((product, index) => (
            <Link className="product-category-card" href={product.href} key={product.title}>
              <Image
                alt={product.title}
                className="product-category-image"
                height={132}
                src={product.image}
                width={160}
              />
              <span className="product-category-content">
                <strong>{product.title}</strong>
                <small>{product.copy}</small>
                <em>View more →</em>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

