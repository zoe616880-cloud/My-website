"use client";

import { useEffect, useMemo, useState } from "react";
import type { HomeSectionConfig } from "@/data/home-page";
import { homePartClass, homePartStyle } from "@/lib/home-parts";

const partners = [
  { name: "dini argeo", image: "/uploads/partners/dini-argeo.jpg" },
  { name: "T-scale", image: "/uploads/partners/t-scale.jpg" },
  { name: "MMS", image: "/uploads/partners/mms.jpg" },
  { name: "Keli", image: "/uploads/partners/keli.jpg" },
  { name: "Transcell", image: "/uploads/partners/transcell.jpg" },
  { name: "Mettler", image: "/uploads/partners/mettler.jpg" },
  { name: "Yaohua", image: "/uploads/partners/yaohua.jpg" },
  { name: "Excell", image: "/uploads/partners/excell.jpg" },
  { name: "ZEMIC", image: "/uploads/partners/zemic.jpg" },
  { name: "Mavin", image: "/uploads/partners/mavin.jpg" },
  { name: "OHAUS", image: "/uploads/partners/ohaus.jpg" },
  { name: "Sartorius", image: "/uploads/partners/sartorius.jpg" },
];

const visibleRowsPerColumn = 3;
const columnCount = 4;

function wrapPartnerIndex(index: number) {
  return ((index % partners.length) + partners.length) % partners.length;
}

export function FAQAndQuote({ config }: { config?: HomeSectionConfig }) {
  const [step, setStep] = useState(0);
  const partnerColumns = useMemo(
    () =>
      Array.from({ length: columnCount }, (_, columnIndex) =>
        Array.from({ length: visibleRowsPerColumn }, (_, rowIndex) => {
          const partnerIndex = wrapPartnerIndex(step + columnIndex * visibleRowsPerColumn + rowIndex);

          return {
            ...partners[partnerIndex],
            originalIndex: partnerIndex,
          };
        }),
      ),
    [step],
  );

  useEffect(() => {
    const timer = window.setInterval(() => {
      setStep((current) => wrapPartnerIndex(current + 1));
    }, 2400);

    return () => window.clearInterval(timer);
  }, []);

  return (
    <section className={`news-partners section home-bg-${config?.background || "soft"} home-spacing-${config?.spacing || "standard"}`} id="news-guide">
      <div className="partner-section">
        <div className={homePartClass(config, "heading", "partner-heading")} style={homePartStyle(config, "heading")}>
          <p className="section-index">{config?.eyebrow || "Cooperation"}</p>
          <h2>{config?.title || "Trusted partners."}</h2>
        </div>
        <div className={homePartClass(config, "logos", "partner-marquee partner-waterfall")} style={homePartStyle(config, "logos")} aria-label="Cooperation partners">
          <div className="partner-track">
            {partnerColumns.map((column, columnIndex) => (
              <div
                className={`partner-column partner-column-${columnIndex + 1} ${
                  columnIndex % 2 === 0 ? "partner-column-up" : "partner-column-down"
                }`}
                key={`partner-column-${columnIndex + 1}`}
              >
                <div className="partner-column-track" key={`partner-column-track-${columnIndex + 1}-${step}`}>
                  {column.map((partner) => {
                    const partId = `partner-${partner.originalIndex + 1}-logo`;

                    return (
                      <div
                        className={homePartClass(config, partId, "partner-logo")}
                        style={homePartStyle(config, partId)}
                        key={`${partner.name}-${step}-${columnIndex}`}
                      >
                        <img src={partner.image} alt={`${partner.name} partner logo`} />
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
