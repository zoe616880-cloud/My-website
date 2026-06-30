import { ArrowRight } from "@/components/icons";

export function BuyerGuidance() {
  return (
    <section className="section resource-section" id="resources">
      <div className="resource-copy">
        <p className="section-index">05 / Buyer guidance</p>
        <h2>Better specifications create better quotations.</h2>
        <p>
          Capacity alone is not enough. Platform size, division, material,
          load pattern, cleaning environment and data interface all affect
          the final configuration.
        </p>
        <div className="buyer-checklist">
          <span>Maximum capacity</span>
          <span>Required division</span>
          <span>Platform dimensions</span>
          <span>Operating environment</span>
          <span>Indicator and interface</span>
          <span>Destination and quantity</span>
        </div>
      </div>
      <div className="resource-panel">
        <h3>Before requesting a quote</h3>
        <p>
          Prepare these six inputs to reduce clarification time and receive
          a more useful proposal.
        </p>
        <a href="/request-a-quote" className="text-link">
          Send your specifications <ArrowRight size={17} />
        </a>
      </div>
    </section>
  );
}
