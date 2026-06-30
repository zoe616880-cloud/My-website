import type { Metadata } from "next";
import { ArrowRight, ClipboardList, Gauge, Settings, ShieldCheck } from "@/components/icons";
import { Header } from "@/components/Header";
import { PageHero } from "@/components/PageHero";
import { SiteFooter } from "@/components/SiteFooter";

export const metadata: Metadata = {
  title: "Industrial Scale Resources & Buying Guides",
  description:
    "Selection, installation, maintenance and procurement guidance for industrial weighing equipment buyers.",
  alternates: { canonical: "/resources" },
};

const guides = [
  [Gauge, "Scale Selection", "How capacity, division, platform size and load pattern affect product selection.", "Selection guide"],
  [ClipboardList, "Procurement Checklist", "The technical and commercial information to prepare before requesting a quote.", "Buying guide"],
  [Settings, "Installation Planning", "Pit, above-floor, mobile and workstation installation considerations.", "Installation"],
  [ShieldCheck, "Care & Maintenance", "Practical inspection, cleaning and troubleshooting topics for scale owners.", "Maintenance"],
] as const;

export default function ResourcesPage() {
  return (
    <>
      <Header />
      <main>
        <PageHero
          eyebrow="Buyer knowledge center"
          title="Better specifications create better quotations."
          description="Use these purchasing and engineering topics to define the right platform, reduce clarification time and compare proposals more effectively."
          image="/bench-scale-white.png"
          actionLabel="Send Your Specification"
        />
        <section className="inner-section">
          <div className="inner-heading">
            <p>Resource categories</p>
            <h2>Practical guidance for industrial scale buyers.</h2>
          </div>
          <div className="resource-card-grid">
            {guides.map(([Icon, title, copy, type], index) => (
              <article key={title}>
                <div><Icon size={27} /><span>0{index + 1}</span></div>
                <small>{type}</small>
                <h3>{title}</h3>
                <p>{copy}</p>
                <a href="/request-a-quote">Ask our team <ArrowRight size={17} /></a>
              </article>
            ))}
          </div>
        </section>
        <section className="procurement-section">
          <div className="inner-section procurement-layout">
            <div>
              <p className="inner-kicker light">RFQ preparation</p>
              <h2>Six inputs that improve quotation quality.</h2>
              <p>
                A model name alone rarely defines the complete scale. Include
                these inputs so the platform, sensing and indicator can be
                reviewed together.
              </p>
            </div>
            <div className="procurement-list">
              {["Maximum capacity", "Required division", "Platform dimensions", "Operating environment", "Indicator and interface", "Quantity and destination"].map((item, index) => (
                <span key={item}><strong>0{index + 1}</strong>{item}</span>
              ))}
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
