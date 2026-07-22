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
            Industrial weighing manufacturer for configurable scale structures,
            weighing components and export-ready project supply.
          </p>
        </div>
        <div className="footer-products">
          <h3>Products</h3>
          <Link href="/products?category=truck-scales">Truck Scales</Link>
          <Link href="/products?category=industrial-platform-scales">Industrial Platform Scales</Link>
          <Link href="/products?category=industrial-floor-scales">Industrial Floor Scales</Link>
          <Link href="/products?category=balances">Balances</Link>
          <Link href="/products?category=weighing-solutions">Weighing Solutions</Link>
          <Link href="/products?category=weighing-module-systems">Weighing Module Systems</Link>
          <Link href="/products?category=scale-accessories">Scale Accessories</Link>
          <Link href="/products?category=test-weights">Test Weights</Link>
          <Link href="/products?category=crane-scales">Crane Scales</Link>
          <Link href="/products?category=table-top-scales">Table Top Scales</Link>
        </div>
        <div>
          <h3>Company</h3>
          <Link href="/about">About Asia Weighing</Link>
          <Link href="/news">News Center</Link>
          <Link href="/products">Products Catalog</Link>
          <Link href="/request-a-quote">Request a Quote</Link>
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
        <span>Copyright {new Date().getFullYear()} Asia Weighing</span>
        <span>Industrial scales, weighing components and project support</span>
      </div>
    </footer>
  );
}
