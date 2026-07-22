import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import { ArrowRight, ClipboardList, MessageCircle, PackageCheck, Settings, ShieldCheck, Truck } from "@/components/icons";
import { SiteFooter } from "@/components/SiteFooter";
import { GuardrailProductPage } from "@/components/GuardrailProductPage";
import { getProduct, products, type Product } from "@/data/products";

type ProductPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

function sentenceSubject(text: string) {
  return text.replace(/\.$/, "").trim().toLowerCase();
}

function featureSupportCopy(feature: string, product: Product, index: number) {
  const value = feature.toLowerCase();
  const subject = sentenceSubject(feature);
  const productName = product.shortName;
  if (value.includes("waterproof") || value.includes("dustproof") || value.includes("ip67") || value.includes("harsh environment")) {
    return `${productName} stays better protected when ${subject} is required on site.`;
  }
  if (value.includes("display") || value.includes("lcd") || value.includes("led")) {
    return `The ${subject} makes weighing results easier to read during daily operation.`;
  }
  if (value.includes("peak hold") || value.includes("animal weighing") || value.includes("accumulation")) {
    return `The ${subject} adds working modes for moving loads, repeat checks and totals.`;
  }
  if (value.includes("rs232") || value.includes("rs485") || value.includes("communication") || value.includes("printer")) {
    return `The ${subject} lets ${productName} connect with printers, computers or data systems.`;
  }
  if (value.includes("shear beam")) {
    return `Gives ${productName} a stable force-transfer form for platform, floor or hopper scales.`;
  }
  if (value.includes("junction box") || value.includes("indicator")) {
    return `Matches the electronic parts needed to build a complete ${product.category.toLowerCase()} system.`;
  }
  if (value.includes("capacity") || value.includes("division") || value.includes("layout")) {
    return `Use ${subject} to match the required load range, division or installation layout.`;
  }
  if (value.includes("leveling") || value.includes("feet")) {
    return `The ${subject} helps the platform sit level before calibration and daily use.`;
  }
  if (value.includes("uneven") || value.includes("stability")) {
    return `The ${subject} improves support when the floor or equipment base is uneven.`;
  }
  if (value.includes("thread") || value.includes("structure requirement")) {
    return `Choose by ${subject} so the part matches the base frame and load direction.`;
  }
  if (value.includes("replacement parts") || value.includes("scale kits") || value.includes("complete scale")) {
    return `The ${subject} works for spare-part stocking and complete scale assembly orders.`;
  }
  if (value.includes("replacement") || value.includes("new scale")) {
    return `The ${subject} supports equipment rebuilds as well as new weighing systems.`;
  }
  if (value.includes("measurement range") || value.includes("measurement ranges")) {
    return `The ${subject} can follow vessel size, process load and required resolution.`;
  }
  if (value.includes("data management") || value.includes("software")) {
    return `Helps operators record, review and manage weighing data from ${productName}.`;
  }
  if (value.includes("sensor") || value.includes("load cell")) {
    return `The ${subject} supports dependable weight-signal conversion for ${product.category.toLowerCase()} work.`;
  }
  if (value.includes("alloy steel") || value.includes("stainless steel")) {
    return `The ${subject} can match dry areas, washdown work or corrosion-sensitive sites.`;
  }
  if (value.includes("truck scale") || value.includes("weighbridge")) {
    return `The ${subject} fits vehicle weighing projects where weighbridge operation matters.`;
  }
  if (value.includes("signal")) {
    return `The ${subject} keeps output steadier during operation, inspection and calibration.`;
  }
  if (value.includes("installation") || value.includes("maintenance")) {
    return `The ${subject} helps installation teams and service staff prepare the job.`;
  }
  if (value.includes("export")) {
    return `Suitable when export orders need matching, packing and clear project documents.`;
  }
  const fallback = [
    `Highlights ${subject} for model selection and quotation work.`,
    `For ${subject}, buyers can confirm whether ${productName} matches the request.`,
    `This point makes ${subject} easier to compare with nearby models.`,
  ];
  return fallback[index % fallback.length];
}

function applicationSupportCopy(application: string, product: Product, index: number) {
  const value = application.toLowerCase();
  const productName = product.shortName;
  const subject = sentenceSubject(application);
  if (value.includes("floor scale")) {
    return `${productName} fits ${subject} work where stable corner response is needed.`;
  }
  if (value.includes("platform scale")) {
    return `For ${subject}, the structure needs reliable load transfer across the deck.`;
  }
  if (value.includes("hopper")) {
    return `${subject} projects use fixed mounting points to transfer vessel load.`;
  }
  if (value.includes("sensing")) {
    return `${subject} uses the product with a junction box and indicator in one system.`;
  }
  if (value.includes("production")) {
    return `${subject} covers assembling, matching and testing ${productName} before delivery.`;
  }
  if (value.includes("maintenance")) {
    return `${subject} focuses on repair, replacement and routine service of installed scales.`;
  }
  if (value.includes("integration")) {
    return `${subject} is used when weighing parts must communicate as one working system.`;
  }
  if (value.includes("export")) {
    return `${subject} covers model matching, packing and documents for overseas orders.`;
  }
  const fallback = [
    `${productName} is selected for ${subject} when stable weighing performance matters.`,
    `For ${subject}, buyers can match the product to project conditions before ordering.`,
    `${subject} needs clear configuration and dependable supply from the start.`,
  ];
  return fallback[index % fallback.length];
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
  const categoryId = (category: string) => category.toLowerCase().replace(/[^a-z0-9]+/g, "-");
  const parentCategoryHref = `/products?category=${categoryId(product.category)}#product-categories`;
  if (product.slug === "industrial-platform-scales-guardrail-platform-scale") {
    return <GuardrailProductPage product={product} parentCategoryHref={parentCategoryHref} />;
  }
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
  const detailLines = product.longDescription
    .split(/\r?\n|(?=\s+\d+\.\s)/)
    .map((line) => line.trim())
    .map((line) => line.replace(/^\d+\.\s*/, ""))
    .filter(Boolean);
  const detailIsList = detailLines.length >= 4;

  return (
    <>
      <main className="product-catalog-detail-page">
        <section className="catalog-detail-hero">
          <div className="catalog-detail-hero-inner">
            <a className="product-back-link" href={parentCategoryHref}>
              <ArrowRight size={16} aria-hidden="true" />
              Back to {product.category}
            </a>
            <div className="catalog-detail-media">
              <Image
                src={product.image}
                alt={product.name}
                fill
                priority
                sizes="(max-width: 760px) 94vw, (max-width: 1100px) 52vw, 720px"
                quality={74}
              />
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
              {detailIsList ? (
                <ol className="detail-lead detail-lead-list">
                  {detailLines.map((line, index) => (
                    <li key={`${index}-${line}`}>{line.replace(/<=/g, "≤")}</li>
                  ))}
                </ol>
              ) : (
                <div className="detail-lead">
                  {detailLines.map((line, index) => (
                    <span key={`${index}-${line}`}>{line.replace(/<=/g, "≤")}</span>
                  ))}
                </div>
              )}
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
                <a className={category === product.category ? "active" : ""} href={`/products?category=${categoryId(category)}`} key={category}>
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
                {product.features.map((feature, index) => (
                  <article key={feature}>
                    <ShieldCheck size={18} />
                    <h3>{feature}</h3>
                    <p>{featureSupportCopy(feature, product, index)}</p>
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
                {product.applications.map((item, index) => (
                  <article key={item}>
                    <Truck size={20} />
                    <strong>{item}</strong>
                    <span>{applicationSupportCopy(item, product, index)}</span>
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

