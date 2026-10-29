"use client";

import Image from "@/app/components/OptimizedImage";
import AnimatedSection from "@/app/components/AnimatedSection";
import { useTranslation } from "@/i18n/I18nContext";

export default function AboutContent() {
  const { t } = useTranslation();

  const journeySteps = [
    {
      number: "01",
      label: t("about.step1Label", "The land"),
      title: t("about.step1Title", "Rooted at origin"),
      description: t(
        "about.step1Desc",
        "Our local knowledge begins in Ethiopia's renowned coffee-growing communities, where altitude, soil, and careful cultivation shape every lot."
      ),
      src: "/images/about/root_of_origin.webp",
      alt: "Coffee-growing hills in Ethiopia",
    },
    {
      number: "02",
      label: t("about.step2Label", "The relationship"),
      title: t("about.step2Title", "Traceable sourcing"),
      description: t(
        "about.step2Desc",
        "We collaborate with farmers, processors, and trusted partners to build transparent, dependable supply chains."
      ),
      src: "/images/about/sourcing.webp",
      alt: "Ethiopian highland coffee landscape",
    },
    {
      number: "03",
      label: t("about.step3Label", "The craft"),
      title: t("about.step3Title", "Careful processing"),
      description: t(
        "about.step3Desc",
        "Washed and natural coffees are prepared with close attention to sorting, drying, consistency, and each coffee's character."
      ),
      src: "/images/about/processing.webp",
      alt: "Red coffee cherries drying on raised beds",
    },
    {
      number: "04",
      label: t("about.step4Label", "The promise"),
      title: t("about.step4Title", "Quality to export"),
      description: t(
        "about.step4Desc",
        "Quality control continues through preparation, packaging, and shipment so every coffee arrives ready for the global market."
      ),
      src: "/images/about/quality_to_export.webp",
      alt: "Coffee cherries drying in carefully prepared rows",
    },
  ];

  const values = [
    {
      number: "01",
      title: t("about.value1Title", "Honest business"),
      description: t("about.value1Desc", "Fair, responsible, and transparent practices at every stage."),
    },
    {
      number: "02",
      title: t("about.value2Title", "Customer focus"),
      description: t("about.value2Desc", "Friendly, professional service shaped around each client's needs."),
    },
    {
      number: "03",
      title: t("about.value3Title", "Consistent quality"),
      description: t("about.value3Desc", "Careful work designed to meet or exceed customer expectations."),
    },
    {
      number: "04",
      title: t("about.value4Title", "Shared progress"),
      description: t("about.value4Desc", "Supporting Ethiopia, its people, and its coffee communities."),
    },
  ];

  return (
    <>
      <section className="hero">
        <Image
          src="/images/about/background.webp"
          alt="Yihonal Coffee"
          fill
          className="hero-bg"
          priority
        />
        <div className="hero-overlay" />
        <div className="hero-content">
          <h1>{t("about.heroTitle", "Yihonal Coffee")}</h1>
          <p className="tagline">{t("about.heroTagline", "Handpicked in Ethiopia, Roasted with Care")}</p>
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
            <p className="about-kicker">{t("common.companyName", "Yihonal Trading Plc")}</p>
            <h2 id="about-origin-title">{t("about.journeyTitle", "Brief Company Profile")}</h2>
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
                src="/images/about/our_story.webp"
                alt="Raised coffee drying beds beneath the Ethiopian sky"
                fill
                sizes="(max-width: 820px) 92vw, 45vw"
              />
            </div>
            <div className="about-origin-badge">
              <strong>4</strong>
              <span>specialty sourcing regions</span>
            </div>
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
          <p className="about-kicker about-kicker-light">{t("about.journeyKicker", "From hillside to shipment")}</p>
          <h2 id="journey-title">{t("about.journeyTitle", "Care, carried through every step.")}</h2>
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
      </section>

      <section className="about-principles" aria-labelledby="principles-title">
        <AnimatedSection className="about-principles-intro">
          <div>
            <p className="about-kicker">{t("about.valuesKicker", "Guiding principles")}</p>
            <h2 id="principles-title">{t("about.valuesTitle", "Our values")}</h2>
          </div>
        </AnimatedSection>

        <div className="about-values-grid">
          {values.map((value, index) => (
            <AnimatedSection
              key={value.number}
              className="about-value-card"
              delay={index * 80}
            >
              <span>{value.number}</span>
              <h3>{value.title}</h3>
              <p>{value.description}</p>
            </AnimatedSection>
          ))}
        </div>
      </section>
    </>
  );
}
