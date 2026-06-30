import Link from "next/link";
import { ArrowRight } from "@/components/icons";
import { process } from "@/data/site-data";

export function CustomProcess() {
  return (
    <section className="process-section" id="custom">
      <div className="section process-inner">
        <div className="process-intro">
          <p className="section-index light">02 / OEM & ODM</p>
          <h2>From requirement to delivery, one clear process.</h2>
          <p>
            Our team turns your use case into a buildable weighing
            configuration, with decisions documented before production.
          </p>
          <Link className="button button-white" href="/request-a-quote">
            Start a Custom Project <ArrowRight size={18} />
          </Link>
        </div>
        <ol className="process-list">
          {process.map(({ icon: Icon, title, copy }, index) => (
            <li key={title}>
              <span className="process-icon">
                <Icon size={25} />
              </span>
              <span className="process-step">0{index + 1}</span>
              <h3>{title}</h3>
              <p>{copy}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
