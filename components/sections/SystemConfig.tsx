import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Box, Gauge, Settings, ShieldCheck } from "@/components/icons";

export function SystemConfig() {
  return (
    <section className="section solutions-section" id="solutions">
      <div className="section-heading">
        <div>
          <p className="section-index">03 / System configuration</p>
          <h2>One platform. The right structure for your operation.</h2>
        </div>
        <p>
          A useful quotation connects the mechanical platform, load cells,
          indicator and data interface as one system.
        </p>
      </div>
      <div className="system-layout">
        <div className="system-visual">
          <Image 
            src="/floor-scale.jpg" 
            alt="Industrial floor scale system" 
            width={600} 
            height={400} 
            style={{ width: '100%', height: 'auto' }}
          />
          <div className="system-callout callout-one">01 · Platform structure</div>
          <div className="system-callout callout-two">02 · Load cell selection</div>
          <div className="system-callout callout-three">03 · Indicator & interface</div>
        </div>
        <div className="system-options">
          {[
            ["Structure", "Platform dimensions, plate type, pit frame and mobility."],
            ["Sensing", "Capacity, division, load pattern and load cell configuration."],
            ["Environment", "Painted steel, stainless steel and washdown requirements."],
            ["Connectivity", "Indicator selection and optional serial or Bluetooth output."],
          ].map(([title, copy], index) => (
            <article key={title}>
              <span>0{index + 1}</span>
              <div>
                <h3>{title}</h3>
                <p>{copy}</p>
              </div>
              <ArrowRight size={19} />
            </article>
          ))}
          <Link className="button" href="/request-a-quote">
            Configure a System <ArrowRight size={18} />
          </Link>
        </div>
      </div>
      <div className="capability-strip">
        {[
          [Box, "Custom dimensions"],
          [Gauge, "Capacity & division"],
          [ShieldCheck, "Material selection"],
          [Settings, "Indicator & data"],
        ].map(([Icon, title]) => (
          <div key={title as string}>
            <Icon size={22} />
            <span>{title as string}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
