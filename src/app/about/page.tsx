import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import AnimatedSection from "@/app/components/AnimatedSection";
import Header from "@/app/components/Header";
import { assetPath } from "@/app/lib/assets";
import { createPageMetadata } from "@/app/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "About Yihonal Trading Plc",
  description:
    "Learn about Yihonal Trading Plc, an Ethiopian specialty coffee supplier focused on responsible sourcing, quality control, processing, and international export.",
  path: "/about",
  keywords: ["Yihonal Trading Ethiopia", "Ethiopian coffee company", "specialty coffee exporter Addis Ababa"],
});

const journeySteps = [
  {
    number: "01",
    label: "The land",
    title: "Rooted at origin",
    description:
      "Our local knowledge begins in Ethiopia's renowned coffee-growing communities, where altitude, soil, and careful cultivation shape every lot.",
    src: assetPath("/images/about/root_of_origin.webp"),
    alt: "Coffee-growing hills in Ethiopia",
  },
  {
    number: "02",
    label: "The relationship",
    title: "Traceable sourcing",
    description:
      "We collaborate with farmers, processors, and trusted partners to build transparent, dependable supply chains.",
    src: assetPath("/images/about/sourcing.webp"),
    alt: "Ethiopian highland coffee landscape",
  },
  {
    number: "03",
    label: "The craft",
    title: "Careful processing",
    description:
      "Washed and natural coffees are prepared with close attention to sorting, drying, consistency, and each coffee's character.",
    src: assetPath("/images/about/processing.webp"),
    alt: "Red coffee cherries drying on raised beds",
  },
  {
    number: "04",
    label: "The promise",
    title: "Quality to export",
    description:
      "Quality control continues through preparation, packaging, and shipment so every coffee arrives ready for the global market.",
    src: assetPath("/images/about/quality_to_export.webp"),
    alt: "Coffee cherries drying in carefully prepared rows",
  },
];

const values = [
  {
    number: "01",
    title: "Honest business",
    description: "Fair, responsible, and transparent practices at every stage.",
  },
  {
    number: "02",
    title: "Customer focus",
    description: "Friendly, professional service shaped around each client's needs.",
  },
  {
    number: "03",
    title: "Consistent quality",
    description: "Careful work designed to meet or exceed customer expectations.",
  },
  {
    number: "04",
    title: "Shared progress",
    description: "Supporting Ethiopia, its people, and its coffee communities.",
  },
];

const operatingAreas = [
  "Sourcing, quality control, sales & marketing",
  "Production & shipping",
  "Administration & finance",
];

export default function AboutPage() {
  return (
    <main className="about-page">
      <Header />

      <section className="hero">
        <Image
          src={assetPath("/images/about/background.webp")}
          alt="Yihonal Coffee"
          fill
          className="hero-bg"
          priority
        />
        <div className="hero-overlay" />
        <div className="hero-content">
          <h1>Yihonal Coffee</h1>
          <p className="tagline">Handpicked in Ethiopia, Roasted with Care</p>
        </div>
      </section>

      <section className="about-origin" aria-labelledby="about-origin-title">
        <div className="about-origin-orbit" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>

        <AnimatedSection className="about-origin-panel">
          <div className="about-origin-copy">
            <p className="about-kicker">Yihonal Trading Plc</p>
            <h2 id="about-origin-title">Brief Company Profile</h2>
            <p className="about-lead">
              Yihonal Trading is a private limited company registered under Ethiopian commercial
              codes and owned by shareholders, with an initial capital of 2 million Ethiopian birr.
            </p>
            <p>
              Yihonal Trading Plc is involved in the marketing and exportation of Ethiopian
              specialty coffee beans, mainly exporting traceable and exemplary Ethiopian coffee
              varietals, including coffees from Sidama and other renowned Ethiopian origins.
            </p>
            <p>
              Yihonal provides highly customized solutions to meet our customers&apos; specific
              requirements and unique needs in sourcing, processing, and packaging award-winning
              coffees. We work closely with every customer throughout the process.
            </p>
            <p>
              Yihonal Company&apos;s mission is to enhance people&apos;s lives and guarantee our
              customers consistent, high-quality services and products, supported by efficient,
              friendly, customer-focused, and professional service.
            </p>
            <p>
              One of the company&apos;s guiding principles is social responsibility and
              environmental sustainability. We honor people first and engage only in fair and
              legitimate business. The company strives to create lasting value for people and the
              environment.
            </p>
            <p>
              Yihonal is organized into three main functional areas: product sourcing, quality
              control, sales and marketing; production and shipping; and administration and
              finance.
            </p>

            <div className="about-regions" aria-label="Coffee sourcing regions">
              <span>Bensa</span>
              <span>Arbegona</span>
              <span>Duwancho</span>
              <span>Rumudamo</span>
            </div>
          </div>

          <div className="about-origin-visual">
            <div className="about-origin-image">
              <Image
                src={assetPath("/images/about/our_story.webp")}
                alt="Raised coffee drying beds beneath the Ethiopian sky"
                fill
                sizes="(max-width: 820px) 92vw, 45vw"
              />
            </div>
            <div className="about-origin-badge">
              <strong>4</strong>
              <span>specialty sourcing regions</span>
            </div>
            <svg
              className="about-route-graphic"
              viewBox="0 0 260 150"
              aria-hidden="true"
            >
              <path d="M18 123C58 28 120 145 169 62C193 22 221 32 244 12" />
              <circle cx="18" cy="123" r="6" />
              <circle cx="169" cy="62" r="6" />
              <circle cx="244" cy="12" r="6" />
            </svg>
          </div>

          <div className="about-origin-facts">
            <div>
              <strong>2M</strong>
              <span>birr initial capital</span>
            </div>
            <div>
              <strong>100%</strong>
              <span>Ethiopian origin</span>
            </div>
            <div>
              <strong>Global</strong>
              <span>market connection</span>
            </div>
          </div>
        </AnimatedSection>
      </section>

      <section className="about-journey" aria-labelledby="journey-title">
        <div className="journey-bean journey-bean-one" aria-hidden="true" />
        <div className="journey-bean journey-bean-two" aria-hidden="true" />

        <AnimatedSection className="about-section-heading">
          <p className="about-kicker about-kicker-light">From hillside to shipment</p>
          <h2 id="journey-title">Care, carried through every step.</h2>
          <p>
            We work across sourcing, processing, quality control, and export to protect
            traceability and preserve the character of every coffee.
          </p>
        </AnimatedSection>

        <div className="about-journey-grid">
          {journeySteps.map((step, index) => (
            <AnimatedSection
              key={step.number}
              className="about-journey-reveal"
              delay={index * 90}
            >
              <article className="about-journey-card">
                <div className="about-journey-image">
                  <Image
                    src={step.src}
                    alt={step.alt}
                    fill
                    sizes="(max-width: 720px) 94vw, 46vw"
                  />
                  <div className="about-journey-shade" />
                  <span className="about-step-number">{step.number}</span>
                </div>
                <div className="about-journey-copy">
                  <p>{step.label}</p>
                  <h3>{step.title}</h3>
                  <span>{step.description}</span>
                </div>
              </article>
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection className="about-quality-note">
          <span className="about-quality-mark" aria-hidden="true">Q</span>
          <div>
            <p className="about-kicker about-kicker-light">Quality &amp; innovation</p>
            <h3>Distinctive coffee, protected by better practice.</h3>
          </div>
          <p>
            We use improved processing practices and appropriate technologies, with customized
            sourcing, processing, and packaging solutions for each client. Our partner network
            includes award-winning growers, including a Top 40 finalist in the 2022 Ethiopia Cup
            of Excellence.
          </p>
        </AnimatedSection>
      </section>

      <section className="about-principles" aria-labelledby="principles-title">
        <AnimatedSection className="about-principles-intro">
          <div>
            <p className="about-kicker">What guides us</p>
            <h2 id="principles-title">Coffee that creates value beyond the cup.</h2>
          </div>
          <p>
            Our mission is to improve lives by delivering consistent, high-quality coffee
            through efficient, friendly, customer-focused, and professional service.
          </p>
        </AnimatedSection>

        <div className="about-values-grid">
          {values.map((value, index) => (
            <AnimatedSection key={value.number} className="about-value-reveal" delay={index * 70}>
              <article className="about-value-card">
                <span>{value.number}</span>
                <h3>{value.title}</h3>
                <p>{value.description}</p>
              </article>
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection className="about-responsibility">
          <div className="about-leaf-graphic" aria-hidden="true">
            <span />
            <span />
            <span />
          </div>
          <div className="about-responsibility-copy">
            <p className="about-kicker">People &amp; planet</p>
            <h3>Responsibility is part of the process.</h3>
            <p>
              We put people first, conduct fair and legitimate business, and support community
              development. Our decisions consider employee well-being, community interests, and
              environmental responsibility.
            </p>
            <p>
              We select methods and technologies that prevent pollution, protect health and
              safety, and promote sustainable coffee production.
            </p>
          </div>
        </AnimatedSection>

        <AnimatedSection className="about-structure">
          <div className="about-structure-heading">
            <p className="about-kicker">How we work</p>
            <h3>Three connected areas. One standard of quality.</h3>
            <p>This structure supports accountability, efficiency, and consistent quality.</p>
          </div>
          <ol>
            {operatingAreas.map((area, index) => (
              <li key={area}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <p>{area}</p>
              </li>
            ))}
          </ol>
        </AnimatedSection>
      </section>

      <section className="about-leadership" aria-labelledby="leadership-title">
        <Image
          src={assetPath("/images/about/background.webp")}
          alt="Ethiopian coffee landscape"
          fill
          sizes="100vw"
          className="about-leadership-bg"
        />
        <div className="about-leadership-overlay" />

        <AnimatedSection className="about-leadership-card">
          <p className="about-kicker about-kicker-light">Leadership</p>
          <h2 id="leadership-title">Mr. Aklilu Admassu</h2>
          <p className="about-leadership-role">Owner &amp; General Manager</p>
          <p>
            Mr. Aklilu oversees company management, product sourcing, and quality control across
            all operational levels. Born and raised in Bensa, a renowned Ethiopian coffee
            district, he brings extensive experience in coffee production, processing, and
            international marketing, supported by a deep understanding of Ethiopian coffee
            culture and origin.
          </p>
          <div className="about-welcome">
            <span aria-hidden="true" />
            <p>Selamta &mdash; welcome to our table.</p>
          </div>
          <Link href="/#contact" className="about-contact-link">
            Start a conversation <span aria-hidden="true">&#8594;</span>
          </Link>
        </AnimatedSection>
      </section>
    </main>
  );
}
