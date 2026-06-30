import Link from "next/link";
import { ArrowRight } from "@/components/icons";
import { applications } from "@/data/site-data";

export function ApplicationSelector() {
  return (
    <section className="selector-section">
      <div className="section selector-inner">
        <div className="selector-heading">
          <p className="section-index light">Find your weighing direction</p>
          <h2>Start with what you need to weigh.</h2>
          <p>
            Product selection becomes easier when the load, environment and
            workflow are defined first.
          </p>
        </div>
        <div className="selector-grid">
          {applications.map(({ icon: Icon, title, copy }, index) => (
            <Link href="/solutions" key={title}>
              <span className="selector-number">0{index + 1}</span>
              <Icon size={28} />
              <h3>{title}</h3>
              <p>{copy}</p>
              <span className="selector-link">View suitable systems <ArrowRight size={16} /></span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
