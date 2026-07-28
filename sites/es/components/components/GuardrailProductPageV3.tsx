"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowDown,
  ArrowRight,
  ArrowUp,
  CirclePause,
  CirclePlay,
  Factory,
  Menu,
  PackageCheck,
  Ruler,
  Truck,
  Warehouse,
  X,
} from "lucide-react";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { SiteFooter } from "@/components/SiteFooter";
import styles from "./GuardrailProductPageV3.module.css";

const cases = [
  {
    title: "Warehouse receiving",
    copy: "Fast carton checks at the point where incoming goods enter inventory.",
    detail: "A guarded deck gives operators a clear loading position while adjustable feet keep the workstation stable.",
    image: "/uploads/cases/warehouse-scale-frames.png",
    icon: Warehouse,
  },
  {
    title: "Food production",
    copy: "Controlled ingredient and container checks beside the production line.",
    detail: "A stainless configuration supports cleaning routines and corrosion-sensitive working areas.",
    image: "/uploads/factory/plant-display-assemble.jpg",
    icon: Factory,
  },
  {
    title: "Logistics dispatch",
    copy: "Verify parcel weight before labeling, documentation and loading.",
    detail: "Indicator and printer options can bring weighing results into a repeatable dispatch workflow.",
    image: "/uploads/cases/logistics-scale-frames.png",
    icon: Truck,
  },
];

const faqs = [
  {
    question: "Can I customize the platform size?",
    answer:
      "Yes. Tell us the carton dimensions, target capacity and available workstation space. Our engineers will confirm a practical platform size and division.",
  },
  {
    question: "Can I choose stainless steel?",
    answer:
      "Yes. Painted mild steel suits dry industrial areas, while stainless steel is recommended for wet, cleaning-intensive or corrosion-sensitive sites.",
  },
  {
    question: "Which indicator options are available?",
    answer:
      "Options include basic weight display, accumulation, printing and data communication. The final match depends on your recording and integration needs.",
  },
  {
    question: "What is the typical production time?",
    answer:
      "Lead time depends on quantity, material and customization. Standard configurations can usually be prepared faster than custom sizes or integrated systems.",
  },
  {
    question: "Can you add my logo?",
    answer:
      "Yes. Product labels, nameplates and export packaging marks can be customized after artwork confirmation.",
  },
];

const articles = [
  {
    href: "/news/industrial-floor-scale-buying-guide",
    title: "How to choose an industrial platform scale",
  },
  {
    href: "/news/stainless-vs-painted-steel-industrial-scales",
    title: "Painted steel vs stainless steel",
  },
  {
    href: "/news/bench-scale-vs-floor-scale",
    title: "How to prepare a useful scale RFQ",
  },
];

export function GuardrailProductPageV3() {
  const pageRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [videoPlaying, setVideoPlaying] = useState(true);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    document.body.classList.add("guardrail-v3-active");
    const globalHeader = document.querySelector<HTMLElement>(".site-header");
    const globalWhatsapp = document.querySelector<HTMLElement>(".whatsapp-widget");
    const globalBackToTop = document.querySelector<HTMLElement>(".back-to-top");
    const previousHeaderDisplay = globalHeader?.style.display ?? "";
    const previousWhatsappDisplay = globalWhatsapp?.style.display ?? "";
    const previousBackToTopDisplay = globalBackToTop?.style.display ?? "";
    if (globalHeader) globalHeader.style.display = "none";
    if (globalWhatsapp) globalWhatsapp.style.display = "none";
    if (globalBackToTop) globalBackToTop.style.display = "none";
    const update = () => {
      const range = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1);
      setScrollProgress(Math.min(1, window.scrollY / range));
      setShowBackToTop(window.scrollY > 520);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => {
      document.body.classList.remove("guardrail-v3-active");
      if (globalHeader) globalHeader.style.display = previousHeaderDisplay;
      if (globalWhatsapp) globalWhatsapp.style.display = previousWhatsappDisplay;
      if (globalBackToTop) globalBackToTop.style.display = previousBackToTopDisplay;
      window.removeEventListener("scroll", update);
    };
  }, []);

  useEffect(() => {
    const elements = pageRef.current?.querySelectorAll<HTMLElement>("[data-polish-reveal]");
    if (!elements?.length) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      elements.forEach((element) => {
        element.dataset.polishVisible = "true";
      });
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          (entry.target as HTMLElement).dataset.polishVisible = "true";
          observer.unobserve(entry.target);
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
    );

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  function toggleVideo() {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      void video.play();
      setVideoPlaying(true);
    } else {
      video.pause();
      setVideoPlaying(false);
    }
  }

  const pageStyle = { "--page-progress": scrollProgress } as CSSProperties;

  return (
    <>
      <main ref={pageRef} className={styles.page} style={pageStyle}>
        <div className={styles.progressRail} aria-hidden="true">
          <span />
        </div>

        <section className={styles.hero}>
          <header className={styles.header}>
            <Link href="/" className={styles.logo} aria-label="Asia Weighing home">
              <Image src="/logo.png" alt="Asia Weighing" width={190} height={52} priority />
            </Link>
            <nav className={`${styles.nav} ${menuOpen ? styles.navOpen : ""}`} aria-label="Concept page navigation">
              <Link href="/" onClick={() => setMenuOpen(false)}>Home</Link>
              <Link href="/products" onClick={() => setMenuOpen(false)}>Products</Link>
              <Link href="/news" onClick={() => setMenuOpen(false)}>News</Link>
              <Link href="/about" onClick={() => setMenuOpen(false)}>About</Link>
              <Link href="/request-a-quote" onClick={() => setMenuOpen(false)}>Contact</Link>
            </nav>
            <button
              className={styles.menuButton}
              type="button"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((value) => !value)}
            >
              {menuOpen ? <X /> : <Menu />}
            </button>
          </header>

          <div className={styles.heroContent}>
            <div className={styles.heroCopy}>
              <h1>Guardrail<br />Platform Scale</h1>
              <p>Built for fast, controlled weighing across warehouse and production workflows.</p>
              <div className={styles.heroActions}>
                <Link className={styles.primaryButton} href="/request-a-quote">
                  Configure your scale <ArrowRight size={18} />
                </Link>
                <a className={styles.secondaryButton} href="#engineering">
                  Explore specifications <ArrowDown size={17} />
                </a>
              </div>
            </div>

            <div className={styles.heroVisual}>
              <div className={styles.heroProductStage}>
                <Image
                  src="/media/guardrail-turntable/angle-045.png"
                  alt="Guardrail Platform Scale"
                  fill
                  priority
                  sizes="(max-width: 800px) 92vw, 34vw"
                />
              </div>

              <aside className={styles.heroSide}>
                <div className={styles.heroBrief}>
                  <h2>Built for daily industrial weighing</h2>
                  <p>A stable guardrail platform for cartons, containers and repeatable loading tasks.</p>
                  <dl>
                    <div><dt>Capacity</dt><dd>60–300 kg</dd></div>
                    <div><dt>Platform</dt><dd>40–60 cm</dd></div>
                    <div><dt>Finish</dt><dd>Painted or stainless</dd></div>
                  </dl>
                </div>

                <div className={styles.videoModule} id="production-video">
                  <video
                    ref={videoRef}
                    autoPlay
                    muted
                    loop
                    playsInline
                    poster="/uploads/factory/plant-display-factory-press.jpg"
                    aria-label="Guardrail platform scale production footage"
                  >
                    <source src="/media/guardrail-platform-scale-production.mp4" type="video/mp4" />
                  </video>
                  <button type="button" onClick={toggleVideo} aria-label={videoPlaying ? "Pause production video" : "Play production video"}>
                    {videoPlaying ? <CirclePause /> : <CirclePlay />}
                    <span><strong>{videoPlaying ? "Pause video" : "Play video"}</strong><small>Production footage</small></span>
                  </button>
                  <div className={styles.videoLine}><span /></div>
                </div>
              </aside>
            </div>
          </div>
          <a className={styles.scrollCue} href="#engineering">Scroll to inspect <ArrowDown size={16} /></a>
        </section>

        <section className={styles.engineering} id="engineering">
          <div className={styles.engineeringIntro} data-polish-reveal>
            <h2>Specifications</h2>
            <p>See the main components and core specifications together, without opening additional panels.</p>
          </div>

          <div className={styles.specificationLayout} data-polish-reveal>
            <div className={styles.specificationProduct}>
              <Image
                src="/media/guardrail-turntable/angle-045.png"
                alt="Guardrail Platform Scale"
                fill
                draggable={false}
                sizes="(max-width: 800px) 86vw, 520px"
              />
            </div>

            <div className={styles.specificationTableWrap}>
              <div className={styles.specificationTableHeader}>
                <h3>Core specifications</h3>
                <p>Standard configurations for everyday industrial weighing.</p>
              </div>
              <dl className={styles.specificationTable} aria-label="Core product specifications">
                <div><dt>Capacity</dt><dd>60 / 150 / 300 kg</dd></div>
                <div><dt>Platform size</dt><dd>40 × 40 / 50 × 50 / 60 × 60 cm</dd></div>
                <div><dt>Material</dt><dd>Painted steel or stainless steel</dd></div>
                <div><dt>Guardrail</dt><dd>Raised protective loading rail</dd></div>
                <div><dt>Indicator</dt><dd>Digital weight display</dd></div>
                <div><dt>Warranty</dt><dd>12 months</dd></div>
              </dl>
            </div>
          </div>
        </section>

        <section className={styles.caseSection} id="applications">
          <div className={styles.sectionNumber} aria-hidden="true">02</div>
          <div className={styles.caseHeading} data-polish-reveal>
            <h2>Applications</h2>
            <p>One scale architecture, configured around the environment and operating rhythm.</p>
          </div>
          <div className={styles.caseGrid}>
            {cases.map((item) => {
              const Icon = item.icon;
              return (
                <article className={styles.caseCard} key={item.title} data-polish-reveal>
                  <div className={styles.caseCardImage}>
                    <Image src={item.image} alt={item.title} fill sizes="(max-width: 800px) 100vw, 33vw" />
                  </div>
                  <div className={styles.caseCardBody}>
                    <Icon size={24} />
                    <h3>{item.title}</h3>
                    <p>{item.copy}</p>
                    <small>{item.detail}</small>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        <section className={styles.faqSection} id="faq">
          <div className={styles.faqIntro} data-polish-reveal>
            <div className={styles.sectionLine}><span>03</span><i /></div>
            <h2>FAQ</h2>
            <p>Straight answers about configuring a Guardrail Platform Scale for your project.</p>
            <Link href="/request-a-quote">Ask our engineers <ArrowRight size={17} /></Link>
          </div>
          <div className={styles.faqList} data-polish-reveal>
            {faqs.map((item) => (
              <article key={item.question}>
                <h3>{item.question}</h3>
                <p>{item.answer}</p>
              </article>
            ))}
          </div>
        </section>

        <section className={styles.articleSection} id="articles">
          <div className={styles.articleIntro} data-polish-reveal>
            <h2>Articles</h2>
            <p>Practical reads to help you specify, compare and get more from your scale.</p>
            <Link href="/news">View all articles <ArrowRight size={17} /></Link>
          </div>
          <div className={styles.articleList} data-polish-reveal>
            {articles.map((article) => (
              <Link href={article.href} key={article.title}>
                <h3>{article.title}</h3>
                <ArrowRight aria-hidden="true" size={22} />
              </Link>
            ))}
          </div>
        </section>

        <button
          className={`${styles.backToTop} ${showBackToTop ? styles.backToTopVisible : ""}`}
          type="button"
          aria-label="Back to top"
          title="Back to top"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          <ArrowUp aria-hidden="true" size={21} />
        </button>

      </main>
      <SiteFooter />
    </>
  );
}
