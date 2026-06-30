import Image from "next/image";
import { Box, ShieldCheck, Truck } from "@/components/icons";

export function QualityManufacturing() {
  return (
    <section className="quality-section" id="about">
      <div className="quality-image">
        <Image
          src="/factory-modern.png"
          alt="Industrial weighing equipment assembly workshop"
          width={800}
          height={600}
          style={{ width: '100%', height: 'auto' }}
        />
      </div>
      <div className="quality-copy">
        <p className="section-index light">04 / Manufacturing</p>
        <h2>Source manufacturing with practical engineering support.</h2>
        <p>
          Founded in 2006 in Changzhou, Jiangsu, Asia Weighing develops and
          manufactures industrial weighing equipment for overseas B2B
          buyers. Our focus is dependable construction, configurable
          platforms and clear project communication.
        </p>
        <div className="facts">
          <div>
            <strong>2006</strong>
            <span>Established</span>
          </div>
          <div>
            <strong>30,000+ m²</strong>
            <span>Factory area</span>
          </div>
          <div>
            <strong>30+</strong>
            <span>Team members</span>
          </div>
        </div>
        <ul className="quality-points">
          <li>
            <ShieldCheck size={20} /> Industrial-grade quality control
          </li>
          <li>
            <Box size={20} /> OEM and ODM configuration support
          </li>
          <li>
            <Truck size={20} /> Export packing and project coordination
          </li>
        </ul>
      </div>
    </section>
  );
}
