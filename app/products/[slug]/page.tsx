import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowRight, ClipboardList, MessageCircle, PackageCheck, Settings, ShieldCheck, Truck } from "@/components/icons";
import { SiteFooter } from "@/components/SiteFooter";
import { getProduct, products } from "@/data/products";

type ProductPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const product = getProduct((await params).slug);
  if (!product) return {};
  return {
    title: `${product.name} Manufacturer`,
    description: product.longDescription,
    alternates: { canonical: `/products/${product.slug}` },
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const product = getProduct((await params).slug);
  if (!product) notFound();
  const categories = Array.from(new Set(products.map((item) => item.category)));
  const availableSizes =
    product.specifications.find(([label]) => label === "Available sizes")?.[1]
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean) ?? [];
  const availableCapacities =
    product.specifications.find(([label]) => label === "Available capacities")?.[1]
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean) ?? [];
  const specificationRows = product.specifications.filter(
    ([label]) => label !== "Product style" && label !== "Category",
  );

  return (
    <>
      <main className="product-catalog-detail-page">
        <section className="catalog-detail-hero">
          <div className="catalog-detail-hero-inner">
            <div className="catalog-detail-media">
              <img src={product.image} alt={product.name} />
              <a className="catalog-whatsapp" href="https://wa.me/8613775237471?text=Hello%2C%20I%20am%20interested%20in%20your%20products.%20Please%20send%20me%20more%20details.">
                <MessageCircle size={15} /> WhatsApp
              </a>
            </div>
            <div className="catalog-detail-copy">
              <div className="breadcrumbs">
                <a href="/">Home</a><span>/</span>
                <a href="/products">Products</a><span>/</span>
                <strong>{product.shortName}</strong>
              </div>
              <p className="detail-category">{product.category}</p>
              <h1>{product.name}</h1>
              <p className="detail-lead">{product.longDescription}</p>
              <div className="catalog-detail-stats">
                <div><strong>{availableSizes.length || "Custom"}</strong><span>Size Options</span></div>
                <div><strong>{availableCapacities.length || "By RFQ"}</strong><span>Capacity Range</span></div>
                <div><strong>Export</strong><span>Project Supply</span></div>
              </div>
              <div className="detail-actions">
                <a className="button" href="/request-a-quote">
                  Request a Quote <ArrowRight size={18} />
                </a>
                <a className="button button-outline" href="#specifications">
                  Technical Data Sheet
                </a>
              </div>
            </div>
          </div>
        </section>

        <section className="catalog-detail-body">
          <aside className="catalog-detail-sidebar">
            <div className="catalog-side-card">
              <strong>Product Categories</strong>
              {categories.map((category) => (
                <a className={category === product.category ? "active" : ""} href={`/products#${category.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`} key={category}>
                  <PackageCheck size={14} /> {category}
                </a>
              ))}
            </div>
            <div className="catalog-engineer-card">
              <MessageCircle size={22} />
              <h3>Need a Custom Size?</h3>
              <p>Send capacity, platform size, quantity and working site photos for engineering review.</p>
              <a href="/request-a-quote">Consult Engineering</a>
            </div>
          </aside>

          <div className="catalog-detail-content">
            <section className="catalog-panel" id="specifications">
              <div className="catalog-section-title">
                <span></span>
                <h2>Technical Specifications</h2>
              </div>
              <div className="catalog-spec-table">
                <div><strong>Parameter</strong><strong>Detailed Specifications</strong></div>
                {specificationRows.map(([label, value]) => (
                  <div key={label}><span>{label}</span><span>{value}</span></div>
                ))}
              </div>
            </section>

            <section className="catalog-panel">
              <div className="catalog-section-title">
                <span></span>
                <h2>Available Sizes and Capacity Options</h2>
              </div>
              <div className="catalog-size-grid">
                <div>
                  <h3>Available Sizes</h3>
                  <div>{availableSizes.map((size) => <span key={size}>{size}</span>)}</div>
                </div>
                <div>
                  <h3>Capacity Options</h3>
                  <div>{availableCapacities.map((capacity) => <span key={capacity}>{capacity}</span>)}</div>
                </div>
              </div>
              <p className="catalog-note">
                The dimensions above are grouped from this product style. Final quotation can combine platform size,
                load cell model, signal type and export packing requirements.
              </p>
            </section>

            <section className="catalog-panel">
              <div className="catalog-section-title">
                <span></span>
                <h2>Structural Advantages</h2>
              </div>
              <div className="catalog-advantage-grid">
                {product.features.map((feature) => (
                  <article key={feature}>
                    <ShieldCheck size={18} />
                    <h3>{feature}</h3>
                    <p>Configured for stable industrial weighing, shipment inspection and project installation preparation.</p>
                  </article>
                ))}
              </div>
            </section>

            <section className="catalog-panel">
              <div className="catalog-section-title">
                <span></span>
                <h2>Application Scenarios</h2>
              </div>
              <div className="catalog-application-grid">
                {product.applications.map((item) => (
                  <article key={item}>
                    <Truck size={20} />
                    <strong>{item}</strong>
                    <span>Suitable for daily weighing, dispatch control and incoming material inspection.</span>
                  </article>
                ))}
              </div>
            </section>

            <section className="catalog-panel">
              <div className="catalog-section-title">
                <span></span>
                <h2>Recommended Accessories</h2>
              </div>
              <div className="catalog-accessory-grid">
                <a href="/request-a-quote"><ClipboardList size={20} /><strong>Indicator and Display</strong><span>Match signal output and working environment.</span><em>View Details <ArrowRight size={13} /></em></a>
                <a href="/request-a-quote"><Settings size={20} /><strong>Load Cell and Junction Box</strong><span>Select by capacity, division and protection rating.</span><em>View Details <ArrowRight size={13} /></em></a>
              </div>
            </section>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
