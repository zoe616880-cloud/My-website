import type { Metadata } from "next";
import { ArrowRight, Factory, Gauge, Warehouse, Waves } from "@/components/icons";
import { Header } from "@/components/Header";
import { PageHero } from "@/components/PageHero";
import { SiteFooter } from "@/components/SiteFooter";

export const metadata: Metadata = {
  title: "Industrial Weighing Solutions",
  description:
    "Weighing solutions for warehouses, manufacturing, livestock and wet processing environments.",
  alternates: { canonical: "/solutions" },
};

const solutions = [
  [Warehouse, "Warehouse & Logistics", "Receive, verify, store and dispatch goods with bench, floor and mobile weighing systems.", "Bench and floor scales"],
  [Factory, "Industrial Manufacturing", "Support production control, component weighing, batching and internal material movement.", "Floor and custom scales"],
  [Gauge, "Farm & Livestock", "Stabilize animal weighing with suitable platform dimensions, gates and indicator functions.", "Animal scale systems"],
  [Waves, "Wet & Washdown Areas", "Use stainless structures and suitable indicators where frequent cleaning is required.", "Stainless configurations"],
] as const;

export default function SolutionsPage() {
  return (
    <>
      <Header />
      <main>
        <PageHero
          eyebrow="Application engineering"
          title="Weighing solutions shaped by the work around them."
          description="A useful system starts with what is being weighed, how it is loaded, where it operates and where the data needs to go."
          image="/hero-welding-banner.png"
        />
        <section className="inner-section">
          <div className="inner-heading">
            <p>Industries and workflows</p>
            <h2>Start with your operating environment.</h2>
          </div>
          <div className="solution-page-grid">
            {solutions.map(([Icon, title, copy, recommendation], index) => (
              <article key={title}>
                <div className="solution-top"><Icon size={28} /><span>0{index + 1}</span></div>
                <h3>{title}</h3>
                <p>{copy}</p>
                <div><small>Recommended direction</small><strong>{recommendation}</strong></div>
                <a href="/products">Review products <ArrowRight size={17} /></a>
              </article>
            ))}
          </div>
        </section>
        <section className="workflow-section">
          <div className="inner-section workflow-layout">
            <div>
              <p className="inner-kicker light">System definition</p>
              <h2>Five questions before selecting a scale.</h2>
            </div>
            <ol>
              <li><span>01</span><strong>What is the maximum load?</strong><p>Include uneven loading and possible overload conditions.</p></li>
              <li><span>02</span><strong>How is the load applied?</strong><p>By hand, pallet truck, forklift, animal or production line.</p></li>
              <li><span>03</span><strong>Where will it operate?</strong><p>Dry warehouse, outdoor area, wet room or farm.</p></li>
              <li><span>04</span><strong>What data is required?</strong><p>Local display, serial output or system integration.</p></li>
              <li><span>05</span><strong>How will it be installed?</strong><p>Bench, above floor, pit mounted or mobile.</p></li>
            </ol>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
