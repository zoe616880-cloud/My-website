import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowRight, Check, Settings, ShieldCheck } from "@/components/icons";
import { Header } from "@/components/Header";
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
  const related = products.filter((item) => item.slug !== product.slug).slice(0, 3);

  return (
    <>
      <Header />
      <main>
        <section className="product-detail-hero">
          <div className="product-detail-inner">
            <div className="product-detail-copy">
              <div className="breadcrumbs">
                <a href="/">Home</a><span>/</span>
                <a href="/products">Products</a><span>/</span>
                <strong>{product.shortName}</strong>
              </div>
              <p className="detail-category">{product.category}</p>
              <h1>{product.name}</h1>
              <p className="detail-lead">{product.longDescription}</p>
              <div className="detail-actions">
                <a className="button" href="/request-a-quote">
                  Request a Quote <ArrowRight size={18} />
                </a>
                <a className="button button-outline" href="#specifications">
                  View Specifications
                </a>
              </div>
            </div>
            <div className="product-detail-image">
              <img src={product.image} alt={product.name} />
            </div>
          </div>
        </section>

        <section className="detail-proof">
          <div><small>Capacity</small><strong>{product.capacities}</strong></div>
          <div><small>Material</small><strong>{product.materials}</strong></div>
          <div><small>Supply</small><strong>OEM / ODM configuration</strong></div>
        </section>

        <section className="inner-section detail-overview">
          <div>
            <p className="inner-kicker">Application fit</p>
            <h2>Designed around the actual weighing workflow.</h2>
            <div className="application-tags">
              {product.applications.map((item) => <span key={item}>{item}</span>)}
            </div>
          </div>
          <div className="feature-panel">
            <h3>Platform highlights</h3>
            {product.features.map((feature) => (
              <div key={feature}><Check size={18} /> {feature}</div>
            ))}
          </div>
        </section>

        <section className="spec-section" id="specifications">
          <div className="inner-section spec-layout">
            <div className="spec-intro">
              <p className="inner-kicker light">Technical overview</p>
              <h2>Confirm the specification before quotation.</h2>
              <p>
                Final values depend on platform size, load distribution,
                environment and interface requirements.
              </p>
            </div>
            <div className="spec-table">
              {product.specifications.map(([label, value]) => (
                <div key={label}><span>{label}</span><strong>{value}</strong></div>
              ))}
            </div>
          </div>
        </section>

        <section className="inner-section custom-detail">
          <div className="custom-detail-title">
            <Settings size={28} />
            <p className="inner-kicker">Configurable supply</p>
            <h2>Adapt the scale to your project.</h2>
          </div>
          <div className="custom-list">
            {product.customization.map((item, index) => (
              <div key={item}><span>0{index + 1}</span><strong>{item}</strong></div>
            ))}
          </div>
          <div className="engineering-note">
            <ShieldCheck size={25} />
            <p>
              Share the maximum load, required division, platform size,
              quantity and destination. Our team will review the complete
              system rather than quote the platform alone.
            </p>
            <a href="/request-a-quote">Start an RFQ <ArrowRight size={17} /></a>
          </div>
        </section>

        <section className="related-section">
          <div className="inner-section">
            <div className="inner-heading compact">
              <p>Related products</p>
              <h2>Compare other weighing platforms.</h2>
            </div>
            <div className="related-grid">
              {related.map((item) => (
                <a href={`/products/${item.slug}`} key={item.slug}>
                  <img src={item.image} alt={item.name} />
                  <span>{item.category}</span>
                  <strong>{item.name}</strong>
                  <ArrowRight size={18} />
                </a>
              ))}
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
