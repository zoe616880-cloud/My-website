import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "@/components/icons";
import { applications } from "@/data/site-data";
import type { HomeSectionConfig } from "@/data/home-page";
import { homePartClass, homePartStyle } from "@/lib/home-parts";

const sceneImages = [
  "/factory-modern.png",
  "/uploads/products/truck-scales-steel-deck-above-ground-or-pit-mounted-truck-scale.png",
  "/uploads/products/industrial-platform-scales-guardrail-platform-scale.png",
  "/uploads/products/industrial-floor-scales-washable-stainless-steel-floor-scale.jpg",
];

export function ApplicationSelector({ config }: { config?: HomeSectionConfig }) {
  return (
    <section className={`selector-section home-bg-${config?.background || "soft"} home-spacing-${config?.spacing || "standard"}`}>
      <div className="section selector-inner">
        <div className={homePartClass(config, "heading", "selector-heading")} style={homePartStyle(config, "heading")}>
          <p className="section-index">{config?.eyebrow || "Find your weighing direction"}</p>
          <h2>{config?.title || "Choose by real working scene."}</h2>
          <p>{config?.copy || "Select a scale by workflow, load type and site condition. Each scene leads to practical product directions for quotation."}</p>
        </div>
        <div className={homePartClass(config, "cards", "selector-grid")} style={homePartStyle(config, "cards")}>
          {applications.map(({ icon: Icon, title, copy }, index) => {
            const partPrefix = `app-${index + 1}`;

            return (
            <Link href="/products" className={homePartClass(config, `${partPrefix}-card`)} style={homePartStyle(config, `${partPrefix}-card`)} key={title}>
              <div className={homePartClass(config, `${partPrefix}-image`, "selector-card-image")} style={homePartStyle(config, `${partPrefix}-image`)}>
                <Image
                  src={sceneImages[index]}
                  alt={`${title} weighing scene`}
                  width={520}
                  height={320}
                />
              </div>
              <span className={homePartClass(config, `${partPrefix}-icon`, "selector-card-icon")} style={homePartStyle(config, `${partPrefix}-icon`)}>
                <Icon size={28} />
              </span>
              <h3 className={homePartClass(config, `${partPrefix}-title`)} style={homePartStyle(config, `${partPrefix}-title`)}>{title}</h3>
              <p className={homePartClass(config, `${partPrefix}-copy`)} style={homePartStyle(config, `${partPrefix}-copy`)}>{copy}</p>
              <span className={homePartClass(config, `${partPrefix}-link`, "selector-link")} style={homePartStyle(config, `${partPrefix}-link`)}>{config?.buttonLabel || "View suitable systems"} <ArrowRight size={16} /></span>
            </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
