import Link from "next/link";
import { INSTAGRAM_URL } from "@/app/lib/seo";

const coffeeLinks = [
  { label: "Ethiopian Coffee", href: "/ethiopian-coffee" },
  { label: "Sidama Coffee", href: "/coffee-origins/sidama-coffee" },
  { label: "Coffee Processing", href: "/coffee-processing" },
  { label: "Quality & Traceability", href: "/quality-and-traceability" },
  { label: "Export Services", href: "/export-services" },
];

const companyLinks = [
  { label: "About", href: "/about" },
  { label: "Coffee Sites", href: "/sites" },
  { label: "Gallery", href: "/gallery" },
  { label: "Contact", href: "/contact" },
];

export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="site-footer-inner">
        <div className="site-footer-brand">
          <p className="site-footer-kicker">Yihonal Trading Plc</p>
          <h2>Traceable Ethiopian coffee, connected to the world.</h2>
          <p>
            Specialty coffee sourcing, processing, quality control, and export support from
            Addis Ababa and Sidama, Ethiopia.
          </p>
        </div>

        <div className="site-footer-links">
          <div>
            <h3>Coffee</h3>
            {coffeeLinks.map((item) => (
              <Link key={item.href} href={item.href}>{item.label}</Link>
            ))}
          </div>
          <div>
            <h3>Company</h3>
            {companyLinks.map((item) => (
              <Link key={item.href} href={item.href}>{item.label}</Link>
            ))}
          </div>
          <div>
            <h3>Contact</h3>
            <a href="tel:+251916823355">+251 916823355</a>
            <a href="mailto:yihonal4@gmail.com">yihonal4@gmail.com</a>
            <a href={INSTAGRAM_URL} target="_blank" rel="noreferrer">Instagram</a>
            <span>Addis Ababa, Bole, Ethiopia</span>
          </div>
        </div>
      </div>
      <div className="site-footer-bottom">
        <p>© {new Date().getFullYear()} Yihonal Trading Plc. All rights reserved.</p>
        <p>Ethiopian specialty coffee supplier and exporter</p>
      </div>
    </footer>
  );
}
