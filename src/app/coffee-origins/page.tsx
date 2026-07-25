import type { Metadata } from "next";
import Link from "next/link";
import ResourcePage from "@/app/components/ResourcePage";
import { sites } from "@/app/data/site";
import { createPageMetadata } from "@/app/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Ethiopian Coffee Origins",
  description:
    "Explore Yihonal Trading coffee origins in Sidama, Ethiopia, including Hurre, Bensa Gonjobe, Duwancho, and Bochesa site profiles.",
  path: "/coffee-origins",
  keywords: ["Ethiopian coffee origins", "Sidama coffee origin", "Bensa coffee", "Arbegona coffee"],
});

export default function CoffeeOriginsPage() {
  return (
    <ResourcePage
      kicker="Coffee origins"
      title="Four high-elevation sites, rooted in Sidama."
      intro="Yihonal Trading presents verified site information and visual archives from coffee-producing areas in Bensa, Arbegona, and Duwancho."
      image="/images/backgrounds/image2.webp"
    >
      <section className="resource-section">
        <div className="resource-heading">
          <p>Current origin portfolio</p>
          <h2>Traceable places behind the coffee.</h2>
        </div>
        <div className="origin-profile-grid">
          {sites.map((site) => (
            <article className="origin-profile-card" key={site.name}>
              <p>{site.region}</p>
              <h3>{site.name}</h3>
              <dl>
                <div><dt>Local area</dt><dd>{site.localArea}</dd></div>
                <div><dt>Altitude</dt><dd>{site.altitudeRange} m a.s.l.</dd></div>
                <div><dt>Variety</dt><dd>{site.variety}</dd></div>
              </dl>
            </article>
          ))}
        </div>
        <div className="resource-link-row">
          <Link className="resource-inline-link" href="/coffee-origins/sidama-coffee">Read the Sidama coffee profile <span aria-hidden="true">→</span></Link>
          <Link className="resource-inline-link" href="/sites">View the site image archives <span aria-hidden="true">→</span></Link>
        </div>
      </section>
    </ResourcePage>
  );
}
