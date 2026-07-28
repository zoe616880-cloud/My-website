"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import {
  ArrowRight,
  Boxes,
  ClipboardCheck,
  Factory,
  Gauge,
  Menu,
  PackageCheck,
  Play,
  ShieldCheck,
  Truck,
  Warehouse,
} from "lucide-react";
import { SiteFooter } from "@/components/SiteFooter";
import type { Product } from "@/data/products";
import { products } from "@/data/products";
import styles from "./GuardrailProductPage.module.css";

type GuardrailProductPageProps = {
  product: Product;
  parentCategoryHref: string;
};

const specificationRows = [
  ["Available sizes", "40 x 40 cm / 50 x 50 cm / 60 x 60 cm"],
  ["Available capacities", "60 kg / 150 kg / 300 kg"],
  ["Material", "Mild steel / Stainless steel"],
  ["Load cell", "Mavin load cell, aluminum alloy single-point type"],
  ["Certification", "CE / ISO / RoHS / SGS documentation available"],
  ["Installation", "Non-marking feet, adjustable upright stand or fixed installation"],
  ["Packing", "Export carton or wooden case packing available"],
  ["Warranty", "12 months standard warranty"],
];

const configurations = [
  {
    title: "Indicator Options",
    copy: "Functional weighing display, simple operation and stable reading.",
    icon: ClipboardCheck,
  },
  {
    title: "Upright Stand",
    copy: "Stainless or painted stand options for different workstations.",
    icon: Gauge,
  },
  {
    title: "Adjustable Feet",
    copy: "Anti-slip leveling feet for stable use on workshop floors.",
    icon: ShieldCheck,
  },
  {
    title: "Label Printer",
    copy: "Optional label or ticket printing for warehouse records.",
    icon: PackageCheck,
  },
];

const cases = [
  {
    country: "Australia",
    title: "Warehouse Weighing Project",
    copy: "Delivered guardrail platform scales for carton receiving and warehouse weighing.",
    image: "/uploads/factory/warehouse-platform-scale-frames.png",
  },
  {
    country: "Malaysia",
    title: "Food Industry Application",
    copy: "Stainless steel configuration used for raw material checking in a food factory.",
    image: "/uploads/factory/plant-display-assemble.jpg",
  },
  {
    country: "South Africa",
    title: "Logistics Center Project",
    copy: "Customized scales for logistics centers, improving dispatch efficiency and accuracy.",
    image: "/uploads/factory/plant-display-stock.jpg",
  },
];

const faqs = [
  {
    question: "Can I customize platform size?",
    answer:
      "Yes. Platform size can be adjusted according to carton size, workstation space and weighing capacity.",
  },
  {
    question: "Can I replace the indicator?",
    answer:
      "Yes. We can match different display indicators, output signals and power supply options.",
  },
  {
    question: "Can I use stainless steel material?",
    answer:
      "Yes. Stainless steel is suitable for wet areas, cleaning-intensive sites and corrosion-sensitive applications.",
  },
  {
    question: "Can you print my logo on the scale?",
    answer: "Yes. Logo labels, nameplates and packaging marks can be arranged before production.",
  },
  {
    question: "What is the MOQ?",
    answer: "Small trial orders are acceptable. Final MOQ depends on configuration, packing and destination.",
  },
  {
    question: "How long is the production time?",
    answer: "Standard models are usually prepared faster. Customized orders depend on quantity and configuration.",
  },
];

const applications = [
  { title: "Warehouse Logistics", icon: Warehouse },
  { title: "Manufacturing", icon: Factory },
  { title: "Food & Beverage", icon: Gauge },
  { title: "Retail Trade", icon: Boxes },
  { title: "Express Sorting", icon: PackageCheck },
  { title: "Transport Dispatch", icon: Truck },
];

const articles = [
  {
    href: "/news/bench-scale-vs-floor-scale",
    title: "Bench Scale vs Floor Scale: Which System Fits Your Application?",
    copy: "Compare workflow, load size and installation before choosing a scale type.",
  },
  {
    href: "/news/industrial-floor-scale-buying-guide",
    title: "How to Choose an Industrial Floor Scale for Warehouse Projects",
    copy: "A practical guide for capacity, platform size, material and RFQ preparation.",
  },
  {
    href: "/news/stainless-vs-painted-steel-industrial-scales",
    title: "Stainless Steel vs Painted Steel Industrial Scales",
    copy: "Understand when stainless steel is worth the extra cost.",
  },
  {
    href: "/news/bench-scale-vs-floor-scale",
    title: "Bench Scale Capacity Selection Guide",
    copy: "Quick notes for capacity and division selection.",
  },
  {
    href: "/news/stainless-vs-painted-steel-industrial-scales",
    title: "304 vs 201 Stainless Steel: Which Is Better?",
    copy: "Material comparison for industrial weighing sites.",
  },
  {
    href: "/news/industrial-floor-scale-buying-guide",
    title: "Maintenance Tips for Platform Scale Projects",
    copy: "Keep weighing systems stable during daily use.",
  },
];

const relatedSlugs = [
  "official-counting-bench-scale",
  "official-waterproof-bench-scale",
  "industrial-platform-scales-guardrail-platform-scale",
  "industrial-floor-scales-standard-mild-steel-floor-scale",
  "industrial-platform-scales-mild-steel-platform-scale-with-rubber-pad",
  "industrial-platform-scales-round-tube-platform-scale",
];

export function GuardrailProductPage({ product, parentCategoryHref }: GuardrailProductPageProps) {
  const heroProductAnchorRef = useRef<HTMLDivElement>(null);
  const specProductAnchorRef = useRef<HTMLDivElement>(null);
  const specContentRef = useRef<HTMLDivElement>(null);
  const specTableWrapRef = useRef<HTMLDivElement>(null);
  const [floatingProductStyle, setFloatingProductStyle] = useState<CSSProperties>({});

  useEffect(() => {
    document.body.classList.add("guardrail-product-page-active");
    return () => document.body.classList.remove("guardrail-product-page-active");
  }, []);

  useEffect(() => {
    const revealItems = Array.from(document.querySelectorAll<HTMLElement>("[data-guardrail-reveal]"));
    if (revealItems.length === 0) return;

    if (!("IntersectionObserver" in window)) {
      revealItems.forEach((item) => {
        item.dataset.guardrailVisible = "true";
      });
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const target = entry.target as HTMLElement;
          target.dataset.guardrailVisible = "true";
          observer.unobserve(target);
        });
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.14 },
    );

    revealItems.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    let frame = 0;

    const updateProductPosition = () => {
      const heroAnchor = heroProductAnchorRef.current;
      const specAnchor = specProductAnchorRef.current;
      const specContent = specContentRef.current;
      const specTableWrap = specTableWrapRef.current;
      if (!heroAnchor || !specAnchor || !specContent || !specTableWrap) return;

      const heroRect = heroAnchor.getBoundingClientRect();
      const specRect = specAnchor.getBoundingClientRect();
      const specContentRect = specContent.getBoundingClientRect();
      const specTableRect = specTableWrap.getBoundingClientRect();
      if (specRect.width === 0 || specRect.height === 0) {
        setFloatingProductStyle({
          left: `${heroRect.left}px`,
          top: `${heroRect.top}px`,
          width: `${heroRect.width}px`,
          height: `${heroRect.height}px`,
        });
        return;
      }
      const specScrollTop = specAnchor.getBoundingClientRect().top + window.scrollY;
      const startScroll = Math.max(0, specScrollTop - window.innerHeight * 1.02);
      const endScroll = Math.max(startScroll + 1, specScrollTop - window.innerHeight * 0.38);
      const rawProgress = Math.min(1, Math.max(0, (window.scrollY - startScroll) / (endScroll - startScroll)));
      const progress = rawProgress * rawProgress * (3 - 2 * rawProgress);
      const lerp = (start: number, end: number) => start + (end - start) * progress;
      const heroDocumentTop = heroRect.top + window.scrollY;
      const startTop = heroDocumentTop;
      const centeredSpecTop = specTableRect.top + (specTableRect.height - specRect.height) / 2;
      const parkedTop = Math.max(118, centeredSpecTop);
      const leavingTop = Math.min(parkedTop, specContentRect.bottom - specRect.height - 42);
      const targetTop = progress < 1 ? parkedTop : leavingTop;

      setFloatingProductStyle({
        left: `${lerp(heroRect.left, specRect.left)}px`,
        top: `${progress <= 0 ? startTop : lerp(startTop, targetTop)}px`,
        width: `${lerp(heroRect.width, specRect.width)}px`,
        height: `${lerp(heroRect.height, specRect.height)}px`,
      });
    };

    const requestUpdate = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(updateProductPosition);
    };

    requestUpdate();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
    };
  }, []);

  const relatedProducts = relatedSlugs
    .map((slug) => products.find((item) => item.slug === slug))
    .filter((item): item is Product => Boolean(item));

  return (
    <>
      <main className={styles.page}>
        <div className={styles.floatingProduct} style={floatingProductStyle} aria-hidden="true">
          <Image
            src="/uploads/products/transparent-home/clean/industrial-platform-scales-guardrail-platform-scale.png"
            alt=""
            fill
            priority
            sizes="(max-width: 760px) 78vw, 34vw"
          />
        </div>
        <section className={styles.hero}>
          <div className={styles.heroCopy}>
            <Link className={styles.logo} href="/" aria-label="Asia Weighing home">
              <Image src="/logo.png" alt="Asia Weighing" width={176} height={48} priority />
            </Link>
            <h1>{product.name}</h1>
            <p className={styles.lead}>Warehouse platform scale for cartons, parcels and logistics applications.</p>
            <div className={styles.heroBullets}>
              <span>Custom platform size</span>
              <span>Export packing support</span>
            </div>
            <div className={styles.heroSpecCard} aria-label="Key specifications">
              <span>40-60 cm platform</span>
              <span>60-300 kg capacity</span>
            </div>
            <div className={styles.heroUsePanel}>
              <strong>For warehouse receiving, carton sorting and logistics dispatch.</strong>
              <span>Optional indicator, upright stand, leveling feet and label printer.</span>
            </div>
            <Image
              className={styles.certifications}
              src="/uploads/generated/certification-logos-transparent.png"
              alt="RoHS, CE, MC, SGS and ISO certifications"
              width={260}
              height={56}
            />
            <div className={styles.heroActions}>
              <Link className={styles.primaryButton} href="/request-a-quote">
                Request a Quote <ArrowRight size={17} />
              </Link>
              <Link className={styles.secondaryButton} href={parentCategoryHref}>
                Download Catalog <ArrowRight size={16} />
              </Link>
            </div>
          </div>
          <div className={styles.heroStage}>
            <div className={styles.productCard} ref={heroProductAnchorRef} aria-hidden="true" />
            <div className={styles.videoCard}>
              <video
                autoPlay
                muted
                loop
                playsInline
                poster="/uploads/factory/plant-display-factory-press.jpg"
                aria-label="Guardrail platform scale production video"
              >
                <source src="/media/guardrail-platform-scale-production.mp4" type="video/mp4" />
              </video>
              <div className={styles.videoOverlay}>
                <span><Play size={15} fill="currentColor" /> Production Video</span>
                <strong>See the frame, guardrail and workshop process</strong>
              </div>
            </div>
          </div>
          <button className={styles.menuButton} type="button" aria-label="Open menu">
            <Menu size={30} />
          </button>
        </section>

        <section className={`${styles.section} ${styles.specSection}`} data-guardrail-reveal="section">
          <div className={styles.specLayout}>
            <div className={styles.specProductRail} ref={specProductAnchorRef} aria-hidden="true" />
            <div className={styles.specContent} ref={specContentRef}>
              <div className={styles.sectionHead}>
                <p>Product Data</p>
                <h2>Technical Specifications</h2>
              </div>
              <div className={styles.specTableWrap} ref={specTableWrapRef} data-guardrail-reveal="table">
                <table className={styles.specTable}>
                  <thead>
                    <tr>
                      <th>Parameter</th>
                      <th>Detail</th>
                    </tr>
                  </thead>
                  <tbody>
                    {specificationRows.map(([label, value]) => (
                      <tr key={label}>
                        <td>{label}</td>
                        <td>{value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        <section className={`${styles.section} ${styles.configSection}`} data-guardrail-reveal="section">
          <div className={styles.sideTitle}>
            <p>Build Options</p>
            <h2>Optional Configurations</h2>
            <span>Match the scale to the workstation, packing line or warehouse process.</span>
          </div>
          <div className={styles.configGrid}>
            {configurations.map(({ title, copy, icon: Icon }, index) => (
              <article
                className={styles.configCard}
                key={title}
                data-guardrail-reveal="item"
                style={{ "--reveal-delay": `${index * 70}ms` } as CSSProperties}
              >
                <small>{String(index + 1).padStart(2, "0")}</small>
                <Icon size={24} />
                <h3>{title}</h3>
                <p>{copy}</p>
              </article>
            ))}
          </div>
        </section>

        <section className={styles.section} data-guardrail-reveal="section">
          <div className={styles.centerHead}>
            <p>Project Use</p>
            <h2>Customer Cases</h2>
          </div>
          <div className={styles.caseGrid}>
            {cases.map(({ country, title, copy, image }, index) => (
              <article
                className={styles.caseCard}
                key={title}
                data-guardrail-reveal="item"
                style={{ "--reveal-delay": `${index * 90}ms` } as CSSProperties}
              >
                <div className={styles.caseImage}>
                  <Image src={image} alt={title} fill sizes="(max-width: 760px) 92vw, 30vw" />
                  <span className={styles.caseNumber}>0{index + 1}</span>
                </div>
                <div>
                  <span className={styles.caseCountry}>{country}</span>
                  <h3>{title}</h3>
                  <p>{copy}</p>
                </div>
              </article>
            ))}
          </div>
          <div className={styles.centerAction}>
            <Link className={styles.primaryButton} href="/products?category=industrial-platform-scales">
              View More <ArrowRight size={17} />
            </Link>
          </div>
        </section>

        <section className={`${styles.section} ${styles.faqSection}`} data-guardrail-reveal="section">
          <div className={styles.sectionHead}>
            <p>Buyer Questions</p>
            <h2>FAQ</h2>
          </div>
          <div className={styles.faqList}>
            {faqs.map(({ question, answer }, index) => (
              <article
                className={styles.faqItem}
                key={question}
                data-guardrail-reveal="row"
                style={{ "--reveal-delay": `${index * 45}ms` } as CSSProperties}
              >
                <h3>Q: {question}</h3>
                <p>A: {answer}</p>
              </article>
            ))}
          </div>
        </section>

        <section className={styles.section} data-guardrail-reveal="section">
          <div className={styles.sectionHead}>
            <p>Where It Fits</p>
            <h2>Application Scenarios</h2>
          </div>
          <div className={styles.applicationGrid}>
            {applications.map(({ title, icon: Icon }, index) => (
              <article
                className={styles.applicationCard}
                key={title}
                data-guardrail-reveal="item"
                style={{ "--reveal-delay": `${index * 55}ms` } as CSSProperties}
              >
                <Icon size={25} />
                <span>{title}</span>
              </article>
            ))}
          </div>
        </section>

        <section className={`${styles.section} ${styles.articleSection}`} data-guardrail-reveal="section">
          <div className={styles.sectionHead}>
            <p>Selection Guides</p>
            <h2>Related Articles</h2>
          </div>
          <div className={styles.articleList}>
            {articles.map(({ href, title, copy }, index) => (
              <Link
                className={styles.articleLink}
                href={href}
                key={title}
                data-guardrail-reveal="row"
                style={{ "--reveal-delay": `${index * 45}ms` } as CSSProperties}
              >
                <span>
                  <strong>{title}</strong>
                  <small>{copy}</small>
                </span>
                <ArrowRight size={18} />
              </Link>
            ))}
          </div>
        </section>

        <section className={`${styles.section} ${styles.relatedSection}`} data-guardrail-reveal="section">
          <div className={`${styles.sectionHead} ${styles.centeredHead}`}>
            <p>Similar Equipment</p>
            <h2>Related Products</h2>
          </div>
          <div className={styles.relatedGrid}>
            {relatedProducts.map((item, index) => (
              <Link
                className={styles.relatedCard}
                href={`/products/${item.slug}`}
                key={item.slug}
                data-guardrail-reveal="item"
                style={{ "--reveal-delay": `${index * 70}ms` } as CSSProperties}
              >
                <div className={styles.relatedImage}>
                  <Image src={item.image} alt={item.name} fill sizes="(max-width: 760px) 45vw, 22vw" />
                </div>
                <strong>{item.shortName}</strong>
                <span>View Product <ArrowRight size={12} /></span>
              </Link>
            ))}
          </div>
        </section>

      </main>
      <SiteFooter />
    </>
  );
}
