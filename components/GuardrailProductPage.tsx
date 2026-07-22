"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  ChevronDown,
  Factory,
  Gauge,
  Maximize2,
  Menu,
  Play,
  ShieldCheck,
  SkipForward,
  Warehouse,
  X,
} from "lucide-react";
import { SiteFooter } from "@/components/SiteFooter";
import type { Product } from "@/data/products";
import styles from "./GuardrailProductPage.module.css";

type GuardrailProductPageProps = {
  product: Product;
  parentCategoryHref: string;
};

const cases = [
  {
    title: "Warehouse receiving station",
    copy: "A compact weighing point for cartons, components and inbound goods without interrupting aisle traffic.",
    image: "/uploads/cases/warehouse-scale-frames.png",
    icon: Warehouse,
  },
  {
    title: "Production-line quality checks",
    copy: "A guarded platform helps operators position repetitive loads while keeping the indicator at eye level.",
    image: "/uploads/factory/plant-display-punch.jpg",
    icon: Factory,
  },
  {
    title: "Packing and dispatch workflow",
    copy: "Configured for final weight confirmation before labeling, palletizing and outbound logistics.",
    image: "/uploads/cases/logistics-scale-frames.png",
    icon: Gauge,
  },
];

const faqs = [
  {
    question: "What is the purpose of the guardrail?",
    answer:
      "The rear guardrail gives operators a clear loading boundary and helps prevent cartons, bins or components from sliding beyond the platform during repetitive work.",
  },
  {
    question: "Can the platform size and capacity be changed?",
    answer:
      "Yes. The standard archive lists a 40 × 40 cm platform and 60 kg capacity, while project quotations can review alternative capacity, division and platform dimensions.",
  },
  {
    question: "Which materials are available?",
    answer:
      "Painted mild steel is suitable for dry workshops and warehouses. Stainless steel can be specified for wet, cleaning or corrosion-sensitive environments.",
  },
  {
    question: "What should I send for a quotation?",
    answer:
      "Share the maximum load, preferred platform size, required division, working environment, quantity, power supply and destination country. Site or load photos are also useful.",
  },
];

const articles = [
  {
    href: "/news/bench-scale-vs-floor-scale",
    index: "01",
    title: "Bench Scale vs Floor Scale: Which System Fits Your Application?",
    copy: "Compare load size, workflow, accuracy and installation before choosing a scale type.",
  },
  {
    href: "/news/stainless-vs-painted-steel-industrial-scales",
    index: "02",
    title: "Stainless Steel vs Painted Steel Industrial Scales",
    copy: "Choose a surface and structure that match cleaning, corrosion and budget requirements.",
  },
  {
    href: "/news/industrial-floor-scale-buying-guide",
    index: "03",
    title: "Industrial Scale Buying Guide for Warehouse Projects",
    copy: "A practical checklist for capacity, size, installation, data output and RFQ preparation.",
  },
];

export function GuardrailProductPage({ product, parentCategoryHref }: GuardrailProductPageProps) {
  const introRef = useRef<HTMLElement>(null);
  const introNavRef = useRef<HTMLElement>(null);
  const introMenuRef = useRef<HTMLDetailsElement>(null);
  const skipRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    let frame = 0;

    const autoFinishTimer = window.setTimeout(() => {
      introRef.current?.setAttribute("data-auto-complete", "");
      introNavRef.current?.setAttribute("data-hidden", "");
      introMenuRef.current?.removeAttribute("open");
      skipRef.current?.setAttribute("data-hidden", "");
    }, 2000);

    const update = () => {
      if (!introRef.current) return;
      if (introRef.current.hasAttribute("data-auto-complete")) return;
      const rect = introRef.current.getBoundingClientRect();
      const travel = Math.max(introRef.current.offsetHeight - window.innerHeight, 1);
      const progress = Math.min(Math.max(-rect.top / travel, 0), 1);
      const productProgress = Math.min(Math.max((progress - 0.08) / 0.62, 0), 1);
      const copyProgress = Math.min(Math.max((progress - 0.5) / 0.3, 0), 1);
      introRef.current.style.setProperty("--intro-progress", progress.toFixed(4));
      introRef.current.style.setProperty("--product-progress", productProgress.toFixed(4));
      introRef.current.style.setProperty("--copy-progress", copyProgress.toFixed(4));
      skipRef.current?.toggleAttribute("data-hidden", progress > 0.55);
      introNavRef.current?.toggleAttribute("data-hidden", progress > 0.24);
      if (progress > 0.24) introMenuRef.current?.removeAttribute("open");
    };

    const onScroll = () => {
      window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.clearTimeout(autoFinishTimer);
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  function skipIntro() {
    introRef.current?.setAttribute("data-auto-complete", "");
    introNavRef.current?.setAttribute("data-hidden", "");
    introMenuRef.current?.removeAttribute("open");
    skipRef.current?.setAttribute("data-hidden", "");
  }

  return (
    <>
      <main className={styles.page}>
        <Link className={styles.backLink} href={parentCategoryHref} aria-label="Back to Industrial Platform Scales">
          <ArrowLeft size={17} aria-hidden="true" />
          <span>Industrial Platform Scales</span>
        </Link>

        <section className={styles.motionIntro} ref={introRef}>
          <span className={styles.motionAnchor} id="product-motion-final" aria-hidden="true" />
          <div className={styles.stickyStage}>
            <header className={styles.introNav} ref={introNavRef}>
              <Link className={styles.introLogo} href="/" aria-label="Asia Weighing home">
                <Image src="/logo-white.png" alt="Asia Weighing" width={220} height={60} priority />
              </Link>
              <details className={styles.introMenu} ref={introMenuRef}>
                <summary aria-label="Open navigation menu">
                  <Menu className={styles.menuOpenIcon} size={28} aria-hidden="true" />
                  <X className={styles.menuCloseIcon} size={28} aria-hidden="true" />
                </summary>
                <nav aria-label="Video introduction navigation">
                  <Link href="/" onClick={() => introMenuRef.current?.removeAttribute("open")}>Home</Link>
                  <Link href="/products" onClick={() => introMenuRef.current?.removeAttribute("open")}>Products</Link>
                  <Link href="/news" onClick={() => introMenuRef.current?.removeAttribute("open")}>News</Link>
                  <Link href="/about" onClick={() => introMenuRef.current?.removeAttribute("open")}>About</Link>
                  <Link href="/request-a-quote" onClick={() => introMenuRef.current?.removeAttribute("open")}>Contact</Link>
                </nav>
              </details>
            </header>

            <div className={styles.productCopy} id="product-summary">
              <p>{product.category}</p>
              <h1>{product.name}</h1>
              <span>{product.description}</span>
              <div className={styles.heroFacts}>
                <div><strong>60 kg</strong><small>Standard capacity</small></div>
                <div><strong>40 × 40 cm</strong><small>Standard platform</small></div>
                <div><strong>Custom</strong><small>Material and indicator</small></div>
              </div>
              <Link className={styles.primaryAction} href="/request-a-quote">
                Get a quote <ArrowRight size={17} />
              </Link>
            </div>

            <div className={styles.productVisual} aria-hidden="true">
              <div className={styles.turntableSprite} />
            </div>

            <div className={styles.videoFrame}>
              <video
                aria-label="Guardrail platform scale production video"
                autoPlay
                loop
                muted
                playsInline
                preload="metadata"
              >
                <source src="/media/guardrail-platform-scale-production.mp4" type="video/mp4" />
              </video>
              <div className={styles.videoLabel}>
                <span><Play size={13} fill="currentColor" /> Production footage</span>
              </div>
              <button
                className={styles.skipButton}
                data-testid="skip-product-video"
                onClick={skipIntro}
                ref={skipRef}
                type="button"
              >
                Skip video <SkipForward size={17} aria-hidden="true" />
              </button>
            </div>

            <div className={styles.scrollCue} aria-hidden="true">
              <span>Scroll to explore</span>
              <ChevronDown size={18} />
            </div>
          </div>
        </section>

        <section className={styles.overview} id="overview">
          <div className={styles.sectionHeading}>
            <p>Built for a clearer working boundary</p>
            <h2>Compact footprint.<br />Confident daily weighing.</h2>
          </div>
          <div className={styles.overviewBody}>
            <p>
              The Guardrail Platform Scale creates a defined loading zone for packing benches, warehouse receiving
              points and production stations. Its upright indicator keeps readings visible, while the rear rail helps
              operators position repeated loads with less guesswork.
            </p>
            <div className={styles.featureList}>
              {product.features.map((feature) => (
                <div key={feature}><Check size={16} aria-hidden="true" /><span>{feature}</span></div>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.specBand}>
          <div className={styles.specImage}>
            <Image
              src={product.image}
              alt={product.name}
              fill
              sizes="(max-width: 760px) 100vw, 50vw"
            />
          </div>
          <div className={styles.specContent}>
            <div className={styles.specTitle}>
              <Maximize2 size={22} aria-hidden="true" />
              <div><p>Configuration</p><h2>Technical profile</h2></div>
            </div>
            <dl>
              {product.specifications
                .filter(([label]) => label !== "Product style" && label !== "Category")
                .map(([label, value]) => (
                  <div key={label}><dt>{label}</dt><dd>{value.replace("*", " × ")}</dd></div>
                ))}
              <div><dt>Project options</dt><dd>Capacity, division, finish, indicator and data output</dd></div>
            </dl>
            <Link className={styles.textAction} href="/request-a-quote">
              Discuss your configuration <ArrowRight size={16} />
            </Link>
          </div>
        </section>

        <section className={styles.casesSection}>
          <div className={styles.sectionHeading}>
            <p>Related cases</p>
            <h2>Designed around the workflow,<br />not just the load.</h2>
          </div>
          <div className={styles.caseRail}>
            {cases.map(({ title, copy, image, icon: Icon }, index) => (
              <article className={styles.caseItem} key={title}>
                <div className={styles.caseImage}>
                  <Image src={image} alt={title} fill sizes="(max-width: 760px) 92vw, 34vw" />
                  <span>{String(index + 1).padStart(2, "0")}</span>
                </div>
                <div className={styles.caseCopy}>
                  <Icon size={20} aria-hidden="true" />
                  <h3>{title}</h3>
                  <p>{copy}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className={styles.faqSection}>
          <div className={styles.faqIntro}>
            <ShieldCheck size={26} aria-hidden="true" />
            <p>Frequently asked questions</p>
            <h2>Plan the right scale before production starts.</h2>
            <Link className={styles.primaryAction} href="/request-a-quote">
              Ask engineering <ArrowRight size={17} />
            </Link>
          </div>
          <div className={styles.faqList}>
            {faqs.map((item) => (
              <details key={item.question}>
                <summary><span>{item.question}</span><ChevronDown size={18} /></summary>
                <p>{item.answer}</p>
              </details>
            ))}
          </div>
        </section>

        <section className={styles.blogSection}>
          <div className={styles.sectionHeading}>
            <p>From the blog</p>
            <h2>Useful reading for<br />your next weighing project.</h2>
          </div>
          <div className={styles.articleList}>
            {articles.map((article) => (
              <Link href={article.href} key={article.href}>
                <span>{article.index}</span>
                <div><h3>{article.title}</h3><p>{article.copy}</p></div>
                <ArrowRight size={22} aria-hidden="true" />
              </Link>
            ))}
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
