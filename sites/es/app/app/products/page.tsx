import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check } from "@/components/icons";
import { SiteFooter } from "@/components/SiteFooter";
import { products } from "@/data/products";

export const metadata: Metadata = {
  title: "Industrial Weighing Scale Products",
  description:
    "Explore bench scales, floor scales, mobile U-shape scales and animal weighing systems from Asia Weighing.",
  alternates: { canonical: "/products" },
};

type ProductsPageProps = {
  searchParams?: Promise<{ category?: string; subcategory?: string }>;
};

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  const categories = Array.from(new Set(products.map((product) => product.category)));
  const categoryId = (category: string) => category.toLowerCase().replace(/[^a-z0-9]+/g, "-");
  const subcategoriesByCategory = categories.reduce<Record<string, string[]>>((result, category) => {
    result[category] = Array.from(
      new Set(
        products
          .filter((product) => product.category === category)
          .map((product) => product.subcategory)
          .filter((subcategory): subcategory is string => Boolean(subcategory)),
      ),
    );
    return result;
  }, {});
  const params = await searchParams;
  const legacyCategoryAliases: Record<string, { category: string; subcategory?: string }> = {
    "portable-axle-weighers": { category: "truck-scales" },
  };
  const categoryParam = params?.category ?? "all";
  const categoryAlias = legacyCategoryAliases[categoryParam];
  const selectedCategoryId = categoryAlias?.category ?? categoryParam;
  const selectedSubcategoryId = categoryAlias?.subcategory ?? params?.subcategory;
  const selectedCategory = categories.find((category) => categoryId(category) === selectedCategoryId);
  const selectedSubcategory = selectedCategory
    ? subcategoriesByCategory[selectedCategory]?.find((subcategory) => categoryId(subcategory) === selectedSubcategoryId)
    : undefined;
  const visibleProducts = selectedCategory
    ? products.filter((product) =>
        product.category === selectedCategory &&
        (!selectedSubcategory || product.subcategory === selectedSubcategory),
      )
    : products;
  const renderProductCards = (items: typeof products) =>
    items.map((product) => (
      <article className="catalog-card" key={product.slug}>
        <a href={`/products/${product.slug}`} className="catalog-image">
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 760px) 46vw, (max-width: 1100px) 42vw, 320px"
            quality={68}
          />
        </a>
        <div className="catalog-copy">
          <small>{product.category}</small>
          <h3>{product.name}</h3>
          <p>{product.longDescription}</p>
          <ul>
            <li><Check size={15} /> {product.capacities}</li>
            <li><Check size={15} /> {product.materials}</li>
          </ul>
          <a href={`/products/${product.slug}`} className="text-link">
            View product details <ArrowRight size={17} />
          </a>
        </div>
      </article>
    ));

  return (
    <>
      <main>
        <section className="inner-section products-list-section">
          <div className="products-catalog-header">
            <div>
              <p>Products Catalog</p>
              <h1>Industrial weighing products</h1>
              <span>
                Browse product styles by category and open each product page for
                sizes, capacities, materials and configuration details.
              </span>
            </div>
            <div className="products-catalog-summary">
              <strong>{products.length}</strong>
              <span>Product styles</span>
              <strong>{categories.length}</strong>
              <span>Categories</span>
              <a href="/request-a-quote">
                Send Requirements <ArrowRight size={16} />
              </a>
            </div>
          </div>
          <div className="products-catalog-layout">
            <aside className="product-category-sidebar" id="product-categories" aria-label="Product categories">
              <strong>Categories</strong>
              <Link href="/products" scroll={false} className={!selectedCategory ? "active" : undefined}>
                <span className="product-sidebar-count">{products.length}</span>
                <span className="product-sidebar-label">All Products</span>
              </Link>
              {categories.map((category) => {
                const subcategories = subcategoriesByCategory[category] || [];

                return subcategories.length ? (
                  <div className={`product-sidebar-group${selectedCategory === category ? " open" : ""}`} key={category}>
                    <Link
                      href={`/products?category=${categoryId(category)}`}
                      scroll={false}
                      className={selectedCategory === category && !selectedSubcategory ? "active product-sidebar-parent" : "product-sidebar-parent"}
                    >
                      <span className="product-sidebar-count">{products.filter((product) => product.category === category).length}</span>
                      <span className="product-sidebar-label">{category}</span>
                    </Link>
                    <div className="product-subcategory-list">
                      {subcategories.map((subcategory) => {
                        const count = products.filter((product) => product.category === category && product.subcategory === subcategory).length;
                        return (
                          <Link
                            href={`/products?category=${categoryId(category)}&subcategory=${categoryId(subcategory)}`}
                            scroll={false}
                            className={selectedCategory === category && selectedSubcategory === subcategory ? "active" : undefined}
                            key={subcategory}
                          >
                            <span className="product-sidebar-count">{count}</span>
                            <span className="product-sidebar-label">{subcategory}</span>
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                ) : (
                  <Link
                    href={`/products?category=${categoryId(category)}`}
                    scroll={false}
                    className={selectedCategory === category ? "active" : undefined}
                    key={category}
                  >
                    <span className="product-sidebar-count">{products.filter((product) => product.category === category).length}</span>
                    <span className="product-sidebar-label">{category}</span>
                  </Link>
                )
              })}
            </aside>
            <div className="product-category-content">
              <section className="product-category-group">
                <div className="product-category-heading">
                  <p>{visibleProducts.length} styles</p>
                  <h3>{selectedSubcategory ?? selectedCategory ?? "All Products"}</h3>
                </div>
                <div className="catalog-grid">
                  {renderProductCards(visibleProducts)}
                </div>
              </section>
            </div>
          </div>
        </section>
        <section className="selection-band">
          <div className="selection-band-inner">
            <div>
              <p>Selection support</p>
              <h2>Not sure which structure fits?</h2>
            </div>
            <div className="selection-steps">
              <span><strong>01</strong> Define the load</span>
              <span><strong>02</strong> Confirm the environment</span>
              <span><strong>03</strong> Select data output</span>
              <span><strong>04</strong> Review installation</span>
            </div>
            <a className="button button-white" href="/request-a-quote">
              Send Requirements <ArrowRight size={18} />
            </a>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
