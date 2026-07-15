import Link from "next/link";
import { ArrowRight } from "@/components/icons";
import type { HomeSectionConfig } from "@/data/home-page";
import { homePartClass, homePartStyle } from "@/lib/home-parts";

export function Hero({ config }: { config?: HomeSectionConfig }) {
  const titleLines = (config?.title || "Industrial Weighing\nBuilt Around Your Application.").split("\n");

  return (
    <section className="hero">
      <div className="hero-inner">
        <div className="hero-copy">
          <div className={homePartClass(config, "eyebrow", "hero-label")} style={homePartStyle(config, "eyebrow")}>{config?.eyebrow || "Source industrial weighing manufacturer"}</div>
          <h1 className={homePartClass(config, "title")} style={homePartStyle(config, "title")}>
            {titleLines.map((line) => (
              <span key={line}>{line}</span>
            ))}
          </h1>
          <p className={homePartClass(config, "copy")} style={homePartStyle(config, "copy")}>{config?.copy || "Custom bench scales, floor scales and industrial weighing systems for importers, distributors, contractors and EPC projects."}</p>
          <div className={homePartClass(config, "buttons", "hero-actions")} style={homePartStyle(config, "buttons")}>
            <Link className={homePartClass(config, "primary-button", "button")} style={homePartStyle(config, "primary-button")} href="/request-a-quote">
              {config?.buttonLabel || "Get a Quote"} <ArrowRight size={18} />
            </Link>
            <Link className={homePartClass(config, "secondary-button", "button button-outline")} style={homePartStyle(config, "secondary-button")} href="/products">
              Explore Products <ArrowRight size={18} />
            </Link>
          </div>
          <div className={homePartClass(config, "proof", "hero-proof")} style={homePartStyle(config, "proof")} aria-label="Key capabilities">
            <span className={homePartClass(config, "proof-1")} style={homePartStyle(config, "proof-1")}>Source manufacturer</span>
            <span className={homePartClass(config, "proof-2")} style={homePartStyle(config, "proof-2")}>Custom configuration</span>
            <span className={homePartClass(config, "proof-3")} style={homePartStyle(config, "proof-3")}>Global project supply</span>
          </div>
        </div>
      </div>
    </section>
  );
}
