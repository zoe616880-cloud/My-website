import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Check } from "@/components/icons";
import { products } from "@/data/site-data";

export function ProductShowcase() {
  return (
    <section className="section product-section" id="products">
      <div className="section-heading">
        <div>
          <p className="section-index">01 / Product families</p>
          <h2>Build the right scale from a proven platform.</h2>
        </div>
        <p>
          Start with the application, not a model number. We configure the
          structure, sensing and display around how the scale will be used.
        </p>
      </div>
      <div className="product-grid">
        {products.map((product, index) => (
          <article className="product-card" key={product.title}>
            <Link href={product.href} className="product-image">
              <Image 
                src={product.image} 
                alt={product.title} 
                width={400} 
                height={300} 
                style={{ objectFit: 'contain', width: '100%', height: 'auto' }}
              />
            </Link>
            <div className="product-meta">
              <span>0{index + 1}</span>
              <span>{product.type}</span>
            </div>
            <h3>{product.title}</h3>
            <p>{product.copy}</p>
            <ul className="product-specs">
              {product.specs.map((spec) => (
                <li key={spec}><Check size={15} /> {spec}</li>
              ))}
            </ul>
            <Link className="text-link" href={product.href}>
              View product direction <ArrowRight size={17} />
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}
