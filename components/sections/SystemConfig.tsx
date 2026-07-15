import Link from "next/link";
import { ArrowRight, PackageCheck, Settings, ShieldCheck, Users } from "@/components/icons";
import type { HomeSectionConfig } from "@/data/home-page";
import { homePartClass, homePartStyle } from "@/lib/home-parts";

const advantages = [
  {
    icon: Users,
    title: "Fast response",
    copy: "Pre-sale and after-sale support.",
  },
  {
    icon: ShieldCheck,
    title: "Warranty support",
    copy: "Practical protection by product part.",
  },
  {
    icon: Settings,
    title: "OEM / ODM",
    copy: "Custom size, structure and interface.",
  },
  {
    icon: PackageCheck,
    title: "Complete supply",
    copy: "Load cells, indicators and accessories.",
  },
];

export function SystemConfig({ config }: { config?: HomeSectionConfig }) {
  return (
    <section className={`section solutions-section advantages-layout-${config?.layout || "split"} home-bg-${config?.background || "soft"} home-spacing-${config?.spacing || "standard"}`} id="solutions">
      <div className="services-watermark" aria-hidden="true">Our Services</div>
      <div className="advantages-layout">
        <div className={homePartClass(config, "copy-block", "advantages-copy")} style={homePartStyle(config, "copy-block")}>
          <div>
            <p className="section-index">{config?.eyebrow || "Why choose us"}</p>
            <h2>{config?.title || "Serve you now and always."}</h2>
            <p>{config?.copy || "Clear support from product selection to delivery, installation and long-term service."}</p>
            <Link href="/request-a-quote" className="services-guide">
              Get service support <ArrowRight size={15} />
            </Link>
          </div>
        </div>
        <div className={homePartClass(config, "cards", "advantage-grid")} style={homePartStyle(config, "cards")}>
          {advantages.map(({ icon: Icon, title, copy }, index) => {
            const partPrefix = `advantage-${index + 1}`;

            return (
            <article className={homePartClass(config, `${partPrefix}-card`)} style={homePartStyle(config, `${partPrefix}-card`)} key={title}>
              <span className={homePartClass(config, `${partPrefix}-icon`, "advantage-icon")} style={homePartStyle(config, `${partPrefix}-icon`)}>
                <Icon size={28} />
              </span>
              <h3 className={homePartClass(config, `${partPrefix}-title`)} style={homePartStyle(config, `${partPrefix}-title`)}>{title}</h3>
              <p className={homePartClass(config, `${partPrefix}-copy`)} style={homePartStyle(config, `${partPrefix}-copy`)}>{copy}</p>
            </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
