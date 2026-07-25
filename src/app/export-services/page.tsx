import type { Metadata } from "next";
import ResourcePage from "@/app/components/ResourcePage";
import { createPageMetadata } from "@/app/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Ethiopian Coffee Export Services",
  description:
    "Yihonal Trading provides Ethiopian specialty coffee sourcing, quality control, customized processing and packaging, production coordination, and shipping support.",
  path: "/export-services",
  keywords: ["Ethiopian coffee export services", "green coffee export Ethiopia", "coffee sourcing Ethiopia"],
});

const services = [
  ["Sourcing and origin information", "Coffee sourcing supported by site, elevation, variety, processing, and local-area information."],
  ["Quality control", "Quality attention connected with product sourcing, sales, marketing, production, and shipping."],
  ["Customized processing", "Solutions shaped around buyer requirements across washed, natural, honey, anaerobic, hybrid, and experimental processing."],
  ["Packaging coordination", "Packaging requirements can be discussed directly with buyers as part of a customized supply solution."],
  ["Production and shipping", "Professional coordination from preparation through production and shipment."],
  ["Buyer communication", "Direct contact for coffee information, samples, requirements, and commercial conversations."],
];

export default function ExportServicesPage() {
  return (
    <ResourcePage
      kicker="Export services"
      title="Ethiopian coffee supply built around buyer requirements."
      intro="Yihonal Trading organizes sourcing, quality control, processing, packaging, production, and shipping through connected functional teams."
      image="/images/about/background.webp"
    >
      <section className="resource-section">
        <div className="resource-heading">
          <p>How Yihonal works</p>
          <h2>Practical support across the coffee supply process.</h2>
        </div>
        <div className="service-grid">
          {services.map(([title, description], index) => (
            <article key={title}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h3>{title}</h3>
              <p>{description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="resource-section resource-introduction">
        <div className="resource-heading">
          <p>Company structure</p>
          <h2>Three functional areas, connected around quality.</h2>
        </div>
        <ol className="resource-numbered-list">
          <li>Sourcing, quality control, sales, and marketing</li>
          <li>Production and shipping</li>
          <li>Administration and finance</li>
        </ol>
      </section>
    </ResourcePage>
  );
}
