import Link from "next/link";
import Image from "next/image";
import { Mail, MapPin, Users } from "./icons";

export function SiteFooter() {
  return (
    <footer className="footer">
      <div className="footer-main">
        <div className="footer-brand">
          <Image src="/logo-white.png" alt="Asia Weighing" width={176} height={48} />
          <p>
            Source manufacturer and OEM/ODM partner for industrial weighing
            equipment.
          </p>
        </div>
        <div>
          <h3>Products</h3>
          <Link href="/products/bench-scales">Bench Scales</Link>
          <Link href="/products/floor-scales">Floor Scales</Link>
          <Link href="/products/mobile-u-shape-scales">Mobile Scales</Link>
          <Link href="/products/animal-special-scales">Animal Scales</Link>
        </div>
        <div>
          <h3>Company</h3>
          <Link href="/about">About Us</Link>
          <Link href="/solutions">Solutions</Link>
          <Link href="/oem-odm">OEM/ODM</Link>
          <Link href="/resources">Resources</Link>
        </div>
        <div>
          <h3>Contact</h3>
          <a href="mailto:ida@asiaweigh.com">
            <Mail size={16} /> ida@asiaweigh.com
          </a>
          <a href="tel:+8613775237471">
            <Users size={16} /> +86 137 7523 7471
          </a>
          <span>
            <MapPin size={16} /> Changzhou, Jiangsu, China
          </span>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} Asia Weighing</span>
        <span>Professional B2B industrial weighing solutions</span>
      </div>
    </footer>
  );
}
