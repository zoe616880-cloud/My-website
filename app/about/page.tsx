import type { Metadata } from "next";
import { Box, Factory, ShieldCheck, Truck } from "@/components/icons";
import { Header } from "@/components/Header";
import { PageHero } from "@/components/PageHero";
import { SiteFooter } from "@/components/SiteFooter";

export const metadata: Metadata = {
  title: "About Asia Weighing",
  description:
    "Learn about Changzhou Asia Weighing Apparatus Co., Ltd., an industrial weighing equipment manufacturer founded in 2006.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <Header />
      <main>
        <PageHero
          eyebrow="About Asia Weighing"
          title="Industrial weighing manufacturing since 2006."
          description="Changzhou Asia Weighing Apparatus Co., Ltd. supports overseas B2B buyers with configurable platforms, practical engineering and export project coordination."
          image="/factory-modern.png"
        />
        <section className="about-story inner-section">
          <div className="about-story-copy">
            <p className="inner-kicker">Company profile</p>
            <h2>Built around dependable construction and clear communication.</h2>
            <p>
              Our core work covers bench scales, floor scales, animal scales
              and application-specific industrial weighing structures. We work
              with importers, distributors, contractors and project buyers who
              need product configuration rather than a generic catalog item.
            </p>
          </div>
          <div className="about-numbers">
            <div><strong>2006</strong><span>Established</span></div>
            <div><strong>30,000+ m²</strong><span>Factory area</span></div>
            <div><strong>30+</strong><span>Team members</span></div>
            <div><strong>Global B2B</strong><span>Export project support</span></div>
          </div>
        </section>
        <section className="factory-showcase">
          <img src="/factory-modern.png" alt="Industrial scale production workshop" />
          <div>
            <p className="inner-kicker light">Manufacturing approach</p>
            <h2>From steel structure to complete weighing system.</h2>
            <div className="factory-values">
              <span><Factory size={22} /><strong>Fabrication</strong>Configurable industrial structures</span>
              <span><ShieldCheck size={22} /><strong>Inspection</strong>Functional and assembly checks</span>
              <span><Box size={22} /><strong>Configuration</strong>Indicator and interface selection</span>
              <span><Truck size={22} /><strong>Export support</strong>Packing and delivery coordination</span>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
