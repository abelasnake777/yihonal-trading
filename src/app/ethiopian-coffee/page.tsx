import type { Metadata } from "next";
import Link from "next/link";
import ResourcePage from "@/app/components/ResourcePage";
import { createPageMetadata } from "@/app/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Ethiopian Specialty Coffee for International Buyers",
  description:
    "Discover traceable Ethiopian specialty coffee supplied by Yihonal Trading from high-elevation Sidama sites, with multiple processing systems and export support.",
  path: "/ethiopian-coffee",
  keywords: [
    "Ethiopian specialty coffee supplier",
    "Ethiopian green coffee exporter",
    "traceable Ethiopian coffee",
    "coffee supplier international buyers",
  ],
});

export default function EthiopianCoffeePage() {
  return (
    <ResourcePage
      kicker="Ethiopian coffee"
      title="Traceable specialty coffee for international buyers."
      intro="Yihonal Trading connects distinctive Ethiopian coffee with global buyers through origin knowledge, careful processing, quality control, and professional export support."
    >
      <section className="resource-section resource-introduction">
        <div className="resource-heading">
          <p>Origin and identity</p>
          <h2>Coffee shaped by Sidama&apos;s high elevations.</h2>
        </div>
        <div className="resource-prose">
          <p>
            Yihonal Trading works with coffee from Sidama, one of Ethiopia&apos;s renowned
            specialty-coffee regions. The company&apos;s current site portfolio includes Hurre,
            Bensa Gonjobe, Duwancho, and Bochesa, spanning approximately 2,230 to 2,500 metres
            above sea level.
          </p>
          <p>
            These sites produce indigenous heirloom coffee, including the 74158 cultivar or
            selection. Every profile is presented with its local area, elevation range, processing
            systems, and an original visual archive.
          </p>
        </div>
      </section>

      <section className="resource-section">
        <div className="resource-heading">
          <p>Processing options</p>
          <h2>Five ways to express Ethiopian coffee.</h2>
        </div>
        <div className="resource-card-grid">
          {[
            ["Washed", "Clean, bright coffees prepared for clarity and dependable cup structure."],
            ["Natural", "Sun-dried coffees developed for sweetness, fruit character, body, and aroma."],
            ["Honey", "Selected mucilage is retained during drying to balance fruit, sweetness, and mouthfeel."],
            ["Anaerobic", "Controlled oxygen-limited fermentation develops expressive fruit and layered sweetness."],
            ["Experimental", "Limited coffees developed through innovative processing for qualified buyer enquiries."],
          ].map(([title, description], index) => (
            <article className="resource-card" key={title}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h3>{title}</h3>
              <p>{description}</p>
            </article>
          ))}
        </div>
        <Link className="resource-inline-link" href="/coffee-processing">
          Explore Yihonal&apos;s coffee processing <span aria-hidden="true">→</span>
        </Link>
      </section>

      <section className="resource-section resource-split">
        <div className="resource-heading">
          <p>Buyer support</p>
          <h2>From sourcing decisions to shipment preparation.</h2>
        </div>
        <ul className="resource-list">
          <li><strong>Origin information</strong><span>Site, local area, elevation, variety, and processing details.</span></li>
          <li><strong>Customized solutions</strong><span>Sourcing, processing, and packaging aligned with buyer requirements.</span></li>
          <li><strong>Quality control</strong><span>Attention to preparation and consistency throughout the supply chain.</span></li>
          <li><strong>Export coordination</strong><span>Professional production, shipping, sales, and buyer communication.</span></li>
        </ul>
      </section>
    </ResourcePage>
  );
}
