import Link from "next/link";
import { ArrowRight, MapPin } from "@/components/icons";

const companyAddress =
  "HuBin Avenue,NanXiaShu Street,WuJin Hi-tech Industry,ChangZhou,JiangSu,China";

const latitude = 31.6608;
const longitude = 119.9578;
const openStreetMapUrl = `https://www.openstreetmap.org/?mlat=${latitude}&mlon=${longitude}#map=13/${latitude}/${longitude}`;
const embedUrl =
  `https://www.openstreetmap.org/export/embed.html?bbox=119.8520%2C31.6000%2C120.0630%2C31.7360&layer=mapnik&marker=${latitude}%2C${longitude}`;

type GoogleMapCardProps = {
  className?: string;
};

export function GoogleMapCard({ className = "" }: GoogleMapCardProps) {
  return (
    <section className={`map-card ${className}`.trim()} aria-label="Company location map">
      <div className="map-card-copy">
        <p>Visit Asia Weighing</p>
        <h2>Our location in Changzhou</h2>
        <span>
          <MapPin size={17} />
          {companyAddress}
        </span>
        <Link className="map-open-button" href={openStreetMapUrl} target="_blank" rel="noreferrer">
          View on OpenStreetMap <ArrowRight size={14} />
        </Link>
      </div>
      <div className="map-frame">
        <iframe
          title="Asia Weighing location on OpenStreetMap"
          src={embedUrl}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        />
      </div>
    </section>
  );
}
