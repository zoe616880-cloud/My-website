import Link from "next/link";
import { ArrowRight, Factory, PackageCheck, Truck, Warehouse } from "@/components/icons";
import type { HomeSectionConfig } from "@/data/home-page";
import { homePartClass, homePartStyle } from "@/lib/home-parts";

const projectCases = [
  {
    title: "Food Industry",
    description: "Hygienic and waterproof scales for food processing and packaging.",
    image: "/uploads/factory/plant-display-assemble.jpg",
    Icon: PackageCheck,
  },
  {
    title: "Warehouse",
    description: "Durable floor scales and platform scales for inventory and logistics.",
    image: "/uploads/cases/warehouse-scale-frames.png",
    Icon: Warehouse,
  },
  {
    title: "Logistics",
    description: "Truck scales and axle weighing scales for efficient transportation.",
    image: "/uploads/cases/logistics-scale-frames.png",
    Icon: Truck,
  },
  {
    title: "Steel Plant",
    description: "High-capacity weighing solutions for harsh industrial environments.",
    image: "/uploads/factory/welding-workshop-highres.jpg",
    Icon: Factory,
  },
];

export function SystemConfig({ config }: { config?: HomeSectionConfig }) {
  return (
    <section className={`section solutions-section advantages-layout-${config?.layout || "split"} home-bg-${config?.background || "soft"} home-spacing-${config?.spacing || "standard"}`} id="solutions">
      <div className="services-watermark" aria-hidden="true">Cases</div>
      <div className="advantages-layout">
        <div className={homePartClass(config, "copy-block", "advantages-copy")} style={homePartStyle(config, "copy-block")}>
          <div>
            <p className="section-index">Projects</p>
            <h2>Trusted Worldwide</h2>
            <p>Delivering reliable weighing solutions across industries and regions.</p>
            <Link href="/request-a-quote" className="services-guide">
              View All Projects <ArrowRight size={15} />
            </Link>
          </div>
        </div>
        <div className={homePartClass(config, "cards", "project-case-grid")} style={homePartStyle(config, "cards")}>
          {projectCases.map(({ title, description, image, Icon }) => (
            <article className="project-case-card" key={title}>
              <img src={image} alt={title} />
              <div className="project-case-content">
                <span className="project-case-icon" aria-hidden="true">
                  <Icon size={20} />
                </span>
                <h3>{title}</h3>
                <p>{description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
