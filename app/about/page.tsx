import type { Metadata } from "next";
import type { CSSProperties } from "react";
import {
  Factory,
  Settings,
  ShieldCheck,
} from "@/components/icons";
import { AboutScrollMotion } from "@/components/AboutScrollMotion";
import { SiteFooter } from "@/components/SiteFooter";

export const metadata: Metadata = {
  title: "About Asia Weighing",
  description:
    "Learn about Changzhou Asia Weighing Apparatus Co., Ltd., an industrial weighing equipment manufacturer founded in 2006.",
  alternates: { canonical: "/about" },
};

const plantDisplay = [
  {
    title: "Assemble",
    image: "/uploads/factory/plant-display-assemble.jpg",
  },
  {
    title: "Carbon steel welding abrasive tool",
    image: "/uploads/factory/plant-display-welding-tool.jpg",
  },
  {
    title: "Carbon steel welding abrasives",
    image: "/uploads/factory/plant-display-welding-abrasives.jpg",
  },
  {
    title: "Punch",
    image: "/uploads/factory/plant-display-punch.jpg",
  },
  {
    title: "Partially prepared products",
    image: "/uploads/factory/plant-display-prepared-products.jpg",
  },
  {
    title: "Factory press",
    image: "/uploads/factory/plant-display-factory-press.jpg",
  },
  {
    title: "Assembly line",
    image: "/uploads/factory/plant-display-assembly.jpg",
  },
  {
    title: "Factory stock area",
    image: "/uploads/factory/plant-display-stock.jpg",
  },
];

export default function AboutPage() {
  return (
    <>
      <main className="about-page detail-page-theme">
        <AboutScrollMotion />
        <section className="about-layout-hero">
          <div className="about-layout-hero-inner">
            <h1>Senior engineers. Reliable manufacturing. Global export support.</h1>
            <span>
              From product selection to export, we provide complete support for
              distributors and industrial customers worldwide.
            </span>
            <a href="/request-a-quote">Get a free quote</a>
          </div>
        </section>

        <section className="about-story inner-section">
          <div className="about-story-copy">
            <h2>About Company</h2>
            <p>
              At Changzhou Asia, we believe that industrial weighing is more than
              just hardware; it is about creating reliable tools that enhance
              industrial efficiency and safety. Our journey from a specialized
              load cell workshop to a global leader is built on mechanical
              integrity and technical transparency.
            </p>
            <div className="about-cert-row" aria-label="Certifications">
              <img src="/uploads/generated/certification-logos-transparent.png" alt="RoHS, CE, MC, SGS and ISO certifications" />
            </div>
          </div>
          <div className="about-numbers">
            <div><strong>3600+</strong><small>Sqm advanced production plant</small></div>
            <div><strong>120+</strong><small>Countries served globally</small></div>
            <div><strong>30+</strong><small>Technical patents</small></div>
            <div><strong>150+</strong><small>Expert engineers</small></div>
          </div>
        </section>

        <section className="about-business-section about-motion-section">
          <span className="about-business-watermark" aria-hidden="true">Advantages</span>
          <div className="about-business-copy">
            <h2>Business Advantage</h2>
            <span></span>
            <p>
              We combine technical expertise, advanced equipment and continuous
              innovation to deliver reliable weighing solutions and create
              long-term value for our customers.
            </p>
            <div className="about-business-points" aria-label="Business strengths">
              <div><strong>01</strong><small>Engineering review</small></div>
              <div><strong>02</strong><small>Production control</small></div>
              <div><strong>03</strong><small>Export support</small></div>
            </div>
          </div>
          <div className="about-business-list">
            <article>
              <Settings size={34} />
              <div>
                <h3>Corporate Philosophy</h3>
                <p>Set the pioneer&apos;s technical experience, continue to innovate independently, and strive to provide users with high-quality products and perfect services.</p>
              </div>
            </article>
            <article>
              <Factory size={34} />
              <div>
                <h3>Advanced Equipment</h3>
                <p>Advanced production equipment and perfect testing methods ensure that we can provide customers with more accurate and stable quality products.</p>
              </div>
            </article>
            <article>
              <ShieldCheck size={34} />
              <div>
                <h3>Innovation</h3>
                <p>It has its own technology in the weighing industry, and the product quality is stable and reliable, which is well received by the majority of users.</p>
              </div>
            </article>
          </div>
        </section>

        <section className="about-plant-display about-motion-section">
          <div className="about-plant-heading">
            <p className="inner-kicker">Plant display</p>
            <h2>Work Scenes</h2>
          </div>
          <div className="about-plant-marquee" aria-label="Plant display gallery">
            <div className="about-plant-track">
              {[...plantDisplay, ...plantDisplay].map((item, index) => (
                <article className="about-plant-card" key={`${item.image}-${index}`} style={{ "--plant-delay": `${(index % plantDisplay.length) * 260}ms` } as CSSProperties}>
                  <img src={item.image} alt={item.title} />
                  <div>
                    <strong>{item.title}</strong>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

      </main>
      <SiteFooter />
    </>
  );
}
