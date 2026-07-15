import Link from "next/link";
import { ArrowRight } from "@/components/icons";
import type { HomeSectionConfig } from "@/data/home-page";
import { homePartClass, homePartStyle } from "@/lib/home-parts";

const profileStats = [
  { value: "2014", label: "Established" },
  { value: "30", label: "Patent" },
  { value: "3600", label: "Plant area" },
  { value: "120", label: "Exporting countries" },
];

export function QualityManufacturing({ config }: { config?: HomeSectionConfig }) {
  return (
    <section className={`quality-section factory-layout-${config?.layout || "split"} home-bg-${config?.background || "white"} home-spacing-${config?.spacing || "standard"}`} id="about">
      <div className="quality-watermark" aria-hidden="true">About</div>
      <div className={homePartClass(config, "copy-block", "quality-copy")} style={homePartStyle(config, "copy-block")}>
        <p className="section-index">{config?.eyebrow || "Company profile"}</p>
        <h2>{config?.title || "Company profile"}</h2>
        <p>{config?.copy || "Our core work covers bench scales, floor scales, animal scales and application-specific industrial weighing structures. We work with importers, distributors, contractors and project buyers who need product configuration rather than a generic catalog item."}</p>
        <div className="quality-stat-grid">
          {profileStats.map((stat) => (
            <div key={stat.label}>
              <strong>{stat.value}</strong>
              <span>{stat.label}</span>
            </div>
          ))}
        </div>
        <Link href="/about" className="quality-guide">
          Company details <ArrowRight size={15} />
        </Link>
      </div>
      <div className={homePartClass(config, "image", "quality-image")} style={homePartStyle(config, "image")}>
        {[1, 2, 3].map((index) => (
          <div
            className={`quality-photo-strip quality-photo-strip-${index}`}
            key={`workshop-strip-${index}`}
            role="img"
            aria-label="Asia Weighing workshop and fabrication process"
          >
            <span aria-hidden="true" />
          </div>
        ))}
      </div>
    </section>
  );
}
