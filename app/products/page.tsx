import type { Metadata } from "next";
import { ArrowRight, Check } from "@/components/icons";
import { Header } from "@/components/Header";
import { PageHero } from "@/components/PageHero";
import { SiteFooter } from "@/components/SiteFooter";
import { products } from "@/data/products";

export const metadata: Metadata = {
  title: "Industrial Weighing Scale Products",
  description:
    "Explore bench scales, floor scales, mobile U-shape scales and animal weighing systems from Asia Weighing.",
  alternates: { canonical: "/products" },
};

export default function ProductsPage() {
  return (
    <>
      <Header />
      <main>
        <PageHero
          eyebrow="Industrial weighing equipment"
          title="Choose a platform. Configure it for your operation."
          description="Compare our core weighing platforms by load, working environment and installation method, then configure capacity, dimensions, material and interface."
          image="/floor-scale.jpg"
        />
        <section className="inner-section">
          <div className="inner-heading">
            <p>Core product families</p>
            <h2>Four starting points for industrial weighing.</h2>
            <span>
              Each platform can be adapted for importers, distributors,
              contractors and project procurement.
            </span>
          </div>
          <div className="catalog-grid">
            {products.map((product, index) => (
              <article className="catalog-card" key={product.slug}>
                <a href={`/products/${product.slug}`} className="catalog-image">
                  <img src={product.image} alt={product.name} />
                  <span>0{index + 1}</span>
                </a>
                <div className="catalog-copy">
                  <small>{product.category}</small>
                  <h3>{product.name}</h3>
                  <p>{product.description}</p>
                  <ul>
                    <li><Check size={15} /> {product.capacities}</li>
                    <li><Check size={15} /> {product.materials}</li>
                  </ul>
                  <a href={`/products/${product.slug}`} className="text-link">
                    View product details <ArrowRight size={17} />
                  </a>
                </div>
              </article>
            ))}
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
