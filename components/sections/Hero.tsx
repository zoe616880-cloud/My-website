import Link from "next/link";
import { ArrowRight } from "@/components/icons";

export function Hero() {
  return (
    <section className="hero">
      <div className="hero-inner">
        <div className="hero-copy">
          <div className="hero-label">Source manufacturer · OEM/ODM partner</div>
          <h1>Industrial Weighing, Built Around Your Application.</h1>
          <p>
            Custom bench scales, floor scales and industrial weighing
            systems for importers, distributors, contractors and EPC
            projects.
          </p>
          <div className="hero-actions">
            <Link className="button" href="/request-a-quote">
              Get a Quote <ArrowRight size={18} />
            </Link>
            <Link className="button button-outline" href="/products">
              Explore Products <ArrowRight size={18} />
            </Link>
          </div>
          <div className="hero-proof" aria-label="Key capabilities">
            <span>Source manufacturer</span>
            <span>OEM / ODM support</span>
            <span>Global project supply</span>
          </div>
        </div>
      </div>
    </section>
  );
}
