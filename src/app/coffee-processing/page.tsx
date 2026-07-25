import type { Metadata } from "next";
import Image from "next/image";
import ResourcePage from "@/app/components/ResourcePage";
import { products } from "@/app/data/site";
import { createPageMetadata } from "@/app/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Ethiopian Coffee Processing Methods",
  description:
    "Learn about washed, natural, honey, anaerobic, and experimental Ethiopian coffee processing available through Yihonal Trading.",
  path: "/coffee-processing",
  keywords: [
    "Ethiopian coffee processing",
    "washed Ethiopian coffee",
    "natural Ethiopian coffee",
    "honey process coffee Ethiopia",
    "anaerobic Ethiopian coffee",
  ],
});

export default function CoffeeProcessingPage() {
  return (
    <ResourcePage
      kicker="Coffee processing"
      title="Five processing approaches, one commitment to quality."
      intro="Processing choices shape how each coffee develops. Yihonal works across established and experimental methods to support different buyer requirements."
      image="/images/backgrounds/image4.webp"
    >
      <section className="resource-section resource-introduction">
        <div className="resource-heading">
          <p>Care after harvest</p>
          <h2>Processing aligned with coffee and buyer needs.</h2>
        </div>
        <div className="resource-prose">
          <p>
            Yihonal provides customized support in sourcing, processing, and packaging. Quality
            control continues through preparation and shipment, with processing information tied
            to the relevant coffee site and lot.
          </p>
          <p>
            Specific protocols, lot availability, samples, and commercial details are provided
            directly to qualified buyers.
          </p>
        </div>
      </section>

      <section className="resource-section">
        <div className="processing-profile-grid">
          {products.map((product, index) => (
            <article className="processing-profile" key={product.name}>
              <div className="processing-profile-image">
                <Image src={product.image} alt={`${product.name} Ethiopian coffee processing`} fill sizes="(max-width: 760px) 92vw, 36vw" />
                <span>{String(index + 1).padStart(2, "0")}</span>
              </div>
              <div>
                <p>{product.notes}</p>
                <h2>{product.name} coffee</h2>
                <span>{product.description}</span>
                {product.name !== "Experimental" ? <p>{product.details}</p> : null}
              </div>
            </article>
          ))}
        </div>
      </section>
    </ResourcePage>
  );
}
