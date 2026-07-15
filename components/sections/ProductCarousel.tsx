"use client";

import Link from "next/link";
import { ChevronLeft, ChevronRight } from "@/components/icons";
import { useEffect, useMemo, useState, type CSSProperties } from "react";

type ProductCarouselItem = {
  id?: string;
  title: string;
  image: string;
  href: string;
};

const visibleSlots = [-3, -2, -1, 0, 1, 2, 3] as const;

function wrapIndex(index: number, length: number) {
  return ((index % length) + length) % length;
}

export function ProductCarousel({ products }: { products: ProductCarouselItem[] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const activeProduct = products[wrapIndex(activeIndex, products.length)];

  const visibleProducts = useMemo(
    () =>
      visibleSlots.map((slot) => ({
        product: products[wrapIndex(activeIndex + slot, products.length)],
        slot,
      })),
    [activeIndex, products],
  );

  useEffect(() => {
    if (isPaused) return;

    const timer = window.setInterval(() => {
      setActiveIndex((current) => wrapIndex(current + 1, products.length));
    }, 4200);

    return () => window.clearInterval(timer);
  }, [isPaused, products.length]);

  return (
    <div
      className="product-carousel"
      aria-label="Featured products carousel"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
    >
      <button
        className="product-carousel-control product-carousel-control-prev"
        type="button"
        aria-label="Previous product"
        onClick={() => setActiveIndex((current) => wrapIndex(current - 1, products.length))}
      >
        <ChevronLeft size={22} />
      </button>

      <div className="product-carousel-stage">
        {visibleProducts.map(({ product, slot }) => (
          <Link
            className={`product-carousel-card product-carousel-card-${slot === 0 ? "center" : slot < 0 ? "left" : "right"} product-carousel-slot-${slot}`}
            data-product={product.title}
            data-slot={slot}
            href={product.href}
            key={product.id || product.title}
            style={{ "--slot": slot } as CSSProperties}
          >
            <span
              aria-label={product.title}
              className="product-carousel-image"
              role="img"
              style={{ backgroundImage: `url("${product.image}")` }}
            />
          </Link>
        ))}
      </div>

      <div className="product-carousel-caption" aria-live="polite">
        {activeProduct.title}
      </div>

      <button
        className="product-carousel-control product-carousel-control-next"
        type="button"
        aria-label="Next product"
        onClick={() => setActiveIndex((current) => wrapIndex(current + 1, products.length))}
      >
        <ChevronRight size={22} />
      </button>
    </div>
  );
}
