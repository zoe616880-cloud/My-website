"use client";

import { useMemo } from "react";
import type { HomeSectionConfig } from "@/data/home-page";
import { homePartClass, homePartStyle } from "@/lib/home-parts";

const defaultPartners = [
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
const columnCount = 3;

export function FAQAndQuote({ config }: { config?: HomeSectionConfig }) {
  const partners = useMemo(
    () =>
      (config?.images?.length ? config.images : defaultPartners.map((partner) => partner.image)).map((image, index) => ({
        name: defaultPartners[index]?.name || `Partner ${index + 1}`,
        image,
      })),
    [config?.images],
  );
  const partnerColumns = useMemo(
    () =>
      Array.from({ length: columnCount }, (_, columnIndex) =>
        partners
          .map((partner, originalIndex) => ({ ...partner, originalIndex }))
          .filter((_, partnerIndex) => partnerIndex % columnCount === columnIndex),
      ).map((column) => (column.length ? column : partners.map((partner, originalIndex) => ({ ...partner, originalIndex })))),
    [partners],
  );


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
                <div className="partner-column-track">
                  {[...column, ...column].map((partner, loopIndex) => {
                    const partId = `partner-${partner.originalIndex + 1}-logo`;

                    return (
                      <div
                        className={homePartClass(config, partId, "partner-logo")}
                        style={homePartStyle(config, partId)}
                        key={`${partner.name}-${columnIndex}-${loopIndex}`}
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
