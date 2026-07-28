import { applications } from "@/data/site-data";

export function IndustryBand() {
  return (
    <section className="industry-band">
      <div className="section industry-band-inner">
        <div>
          <p className="section-index light">Industries served</p>
          <h2>Built for real industrial environments.</h2>
        </div>
        <div className="industry-list">
          {applications.map(({ icon: Icon, title, copy }, index) => (
            <article key={title}>
              <div className="application-icon">
                <Icon size={27} />
              </div>
              <span>0{index + 1}</span>
              <h3>{title}</h3>
              <p>{copy}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
