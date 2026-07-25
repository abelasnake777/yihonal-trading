import type { Metadata } from "next";
import ResourcePage from "@/app/components/ResourcePage";
import { createPageMetadata } from "@/app/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Coffee Quality and Traceability",
  description:
    "Learn how Yihonal Trading supports traceable Ethiopian coffee through origin records, sourcing relationships, processing oversight, quality control, and shipment preparation.",
  path: "/quality-and-traceability",
  keywords: ["traceable Ethiopian coffee", "Ethiopian coffee quality control", "specialty coffee traceability"],
});

const qualitySteps = [
  ["Origin records", "Site, region, local area, elevation, variety, and available processing information create a clear starting profile."],
  ["Responsible sourcing", "Yihonal collaborates with farmers, processors, and trusted supply-chain partners in coffee-producing communities."],
  ["Processing attention", "Sorting, drying, fermentation, preparation, and consistency are considered according to each method and lot."],
  ["Quality control", "Product sourcing and quality control are connected with sales and marketing so buyer requirements remain visible."],
  ["Preparation and shipping", "Quality attention continues through packaging, production coordination, and shipment preparation."],
];

export default function QualityTraceabilityPage() {
  return (
    <ResourcePage
      kicker="Quality and traceability"
      title="Clear origin information, careful work, dependable communication."
      intro="Yihonal Trading connects local coffee knowledge with structured quality control and professional buyer support."
      image="/images/about/quality_to_export.webp"
    >
      <section className="resource-section">
        <div className="resource-heading">
          <p>From site to shipment</p>
          <h2>Five connected points of attention.</h2>
        </div>
        <ol className="quality-step-list">
          {qualitySteps.map(([title, description], index) => (
            <li key={title}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <div><h3>{title}</h3><p>{description}</p></div>
            </li>
          ))}
        </ol>
      </section>

      <section className="resource-section resource-split">
        <div className="resource-heading">
          <p>Responsible practice</p>
          <h2>People and environmental responsibility are part of quality.</h2>
        </div>
        <div className="resource-prose">
          <p>
            Yihonal puts people first, conducts fair and legitimate business, and considers
            employee well-being, community interests, and environmental responsibility.
          </p>
          <p>
            The company selects processing methods and technologies intended to prevent
            pollution, protect health and safety, and support sustainable coffee production.
          </p>
        </div>
      </section>
    </ResourcePage>
  );
}
