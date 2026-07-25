import type { Metadata } from "next";
import ResourcePage from "@/app/components/ResourcePage";
import { sites } from "@/app/data/site";
import { createPageMetadata } from "@/app/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Sidama Specialty Coffee",
  description:
    "Explore traceable Sidama specialty coffee from Yihonal Trading sites in Bensa, Arbegona, Gonjobe, Duwancho, and Bochesa, Ethiopia.",
  path: "/coffee-origins/sidama-coffee",
  keywords: [
    "Sidama specialty coffee exporter",
    "Sidama green coffee supplier",
    "Bensa Gonjobe coffee",
    "Arbegona coffee Ethiopia",
  ],
});

export default function SidamaCoffeePage() {
  return (
    <ResourcePage
      kicker="Sidama coffee"
      title="High-elevation coffee from Bensa, Arbegona, and Duwancho."
      intro="Yihonal Trading&apos;s current Sidama portfolio brings together indigenous heirloom coffee, elevations above 2,200 metres, and diverse processing systems."
      image="/images/sites/Bensa%20Gonjobe/image.webp"
    >
      <section className="resource-section resource-introduction">
        <div className="resource-heading">
          <p>Regional profile</p>
          <h2>Sidama origin information buyers can use.</h2>
        </div>
        <div className="resource-prose">
          <p>
            Yihonal&apos;s Sidama sites range from 2,230 to 2,500 metres above sea level. Current
            site records identify indigenous heirloom coffee, including the 74158 cultivar or
            selection.
          </p>
          <p>
            Processing across the portfolio includes washed, natural, anaerobic, honey, hybrid,
            and experimental methods. Availability and specific lot information should be
            confirmed directly with Yihonal Trading for each buying period.
          </p>
        </div>
      </section>

      <section className="resource-section">
        <div className="resource-heading">
          <p>Site directory</p>
          <h2>Current Sidama coffee sites.</h2>
        </div>
        <div className="origin-detail-list">
          {sites.map((site, index) => (
            <article key={site.name}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <div>
                <p>{site.region} · {site.localArea}</p>
                <h3>{site.name}</h3>
              </div>
              <dl>
                <div><dt>Elevation</dt><dd>{site.altitudeRange} metres above sea level</dd></div>
                <div><dt>Variety</dt><dd>{site.variety}</dd></div>
                <div><dt>Processing</dt><dd>{site.processingSystem}</dd></div>
              </dl>
            </article>
          ))}
        </div>
      </section>
    </ResourcePage>
  );
}
