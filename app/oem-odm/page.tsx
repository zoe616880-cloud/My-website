import type { Metadata } from "next";
import { ArrowRight, ClipboardList, DraftingCompass, Factory, PackageCheck, Settings } from "@/components/icons";
import { Header } from "@/components/Header";
import { PageHero } from "@/components/PageHero";
import { SiteFooter } from "@/components/SiteFooter";

export const metadata: Metadata = {
  title: "OEM & ODM Weighing Scale Manufacturing",
  description:
    "Custom dimensions, capacities, materials, indicators, interfaces and branding for industrial weighing projects.",
  alternates: { canonical: "/oem-odm" },
};

const stages = [
  [ClipboardList, "Requirement review", "Application, capacity, accuracy, dimensions, quantity and destination."],
  [DraftingCompass, "Engineering proposal", "Structure, material, load cells, indicator and interface selection."],
  [Settings, "Sample or confirmation", "Drawing review, prototype planning and functional confirmation."],
  [Factory, "Controlled production", "Fabrication, assembly, inspection and documented project communication."],
  [PackageCheck, "Packing & delivery", "Export-oriented packing and coordination for the destination market."],
] as const;

export default function OemPage() {
  return (
    <>
      <Header />
      <main>
        <PageHero
          eyebrow="OEM / ODM manufacturing"
          title="Turn a weighing requirement into a buildable system."
          description="We configure the mechanical platform, sensing components, indicator, interface and brand presentation as one coordinated project."
          image="/factory-modern.png"
        />
        <section className="inner-section oem-capabilities">
          <div className="inner-heading">
            <p>Scope of customization</p>
            <h2>More than changing a model label.</h2>
          </div>
          <div className="capability-matrix">
            {[
              ["Structure", "Platform size, deck, frame, ramps, guardrails and mobility."],
              ["Performance", "Capacity, division, load distribution and load cell selection."],
              ["Environment", "Painted steel, stainless steel and cleaning requirements."],
              ["Electronics", "Indicator model, communication interface and power options."],
              ["Branding", "Product label, manual, packaging and distributor presentation."],
              ["Delivery", "Quantity planning, export packing and project documentation."],
            ].map(([title, copy], index) => (
              <article key={title}><span>0{index + 1}</span><h3>{title}</h3><p>{copy}</p></article>
            ))}
          </div>
        </section>
        <section className="oem-process">
          <div className="inner-section">
            <div className="inner-heading dark">
              <p>Project workflow</p>
              <h2>A clear path from brief to shipment.</h2>
            </div>
            <div className="oem-stage-grid">
              {stages.map(([Icon, title, copy], index) => (
                <article key={title}><Icon size={27} /><span>0{index + 1}</span><h3>{title}</h3><p>{copy}</p></article>
              ))}
            </div>
            <a className="button button-white" href="/request-a-quote">
              Discuss a Custom Project <ArrowRight size={18} />
            </a>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
