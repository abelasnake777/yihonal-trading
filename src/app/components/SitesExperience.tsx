"use client";

import Image from "@/app/components/OptimizedImage";
import { type CSSProperties, useState } from "react";
import { sites } from "@/app/data/site";
import { useTranslation } from "@/i18n/I18nContext";

type AltitudeStyle = CSSProperties & {
  "--site-altitude-position": string;
};

export default function SitesExperience() {
  const { t } = useTranslation();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const selectedSite = sites[selectedIndex];
  const minimumAltitude = Math.min(...sites.map((site) => site.altitudeMin));
  const maximumAltitude = Math.max(...sites.map((site) => site.altitudeMax));
  const altitudePosition =
    ((selectedSite.altitude - 2200) / (2500 - 2200)) * 100;
  const altitudeStyle: AltitudeStyle = {
    "--site-altitude-position": String(altitudePosition) + "%",
  };

  function selectSite(index: number) {
    setSelectedIndex(index);
    setActiveImageIndex(0);
  }

  return (
    <>
      <section className="sites-hero">
        <Image
          src="/images/backgrounds/image.webp"
          alt="Ethiopian coffee highlands"
          fill
          sizes="100vw"
          className="sites-hero-bg"
          priority
        />
        <div className="sites-hero-overlay" />
        <svg
          className="sites-topography"
          viewBox="0 0 1200 700"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path d="M-40 585C110 465 205 650 350 529S586 386 747 478s282 33 493-122" />
          <path d="M-62 626C96 498 215 698 378 561s267-162 421-58 285 29 475-137" />
          <path d="M-73 667C89 527 232 742 408 597s286-180 447-68 294 24 463-151" />
          <path d="M774-35c-132 98-16 226-127 307S445 348 481 481s-56 217-164 252" />
          <path d="M834-37c-151 112-21 247-145 342S465 394 511 532s-67 229-184 279" />
        </svg>

        <div className="sites-hero-inner">
          <p className="sites-kicker">{t("sites.kicker", "Our coffee origins")}</p>
          <h1>{t("sites.title", "Meet the places behind the coffee.")}</h1>
          <p>
            {t(
              "sites.subtitle",
              "Explore four Ethiopian sites through their elevation and visual archive. Select a site below to discover its profile."
            )}
          </p>
          <div className="sites-hero-range">
            <svg viewBox="0 0 46 32" aria-hidden="true">
              <path d="M2 29 15 11l7 9L30 5l14 24Z" />
            </svg>
            <span>
              <strong>{minimumAltitude.toLocaleString()}–{maximumAltitude.toLocaleString()} m</strong>
              {" "}{t("sites.elevationRange", "elevation range")}
            </span>
          </div>
          <a href="#site-explorer" className="sites-scroll-link">
            {t("sites.exploreLink", "Explore the sites")} <span aria-hidden="true">&#8595;</span>
          </a>
        </div>

        <div className="sites-hero-coordinate" aria-hidden="true">
          <span />
          <p>{t("common.origin", "Origin · Ethiopia")}</p>
        </div>
      </section>

      <section className="sites-explorer" id="site-explorer" aria-labelledby="sites-title">
        <div className="sites-orbit sites-orbit-one" aria-hidden="true" />
        <div className="sites-orbit sites-orbit-two" aria-hidden="true" />

        <div className="sites-explorer-heading">
          <div>
            <p className="sites-kicker">{t("sites.chooseOrigin", "Choose an origin")}</p>
            <h2 id="sites-title">{t("sites.fourSites", "Four sites, four elevations.")}</h2>
          </div>
          <p>
            {t(
              "sites.fourSitesDesc",
              "Each profile brings together its elevation, character, and dedicated visual archive from origin."
            )}
          </p>
        </div>

        <div className="sites-explorer-layout">
          <div
            className="sites-selector"
            role="tablist"
            aria-label="Select a coffee site"
          >
            {sites.map((site, index) => (
              <button
                key={site.name}
                type="button"
                role="tab"
                aria-selected={selectedIndex === index}
                aria-controls="selected-site-panel"
                className={"site-selector-button" + (selectedIndex === index ? " is-active" : "")}
                onClick={() => selectSite(index)}
              >
                <span className="site-selector-number">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="site-selector-name">{site.name}</span>
                <span className="site-selector-altitude">
                  {site.altitudeRange} m
                </span>
                <span className="site-selector-arrow" aria-hidden="true">&#8594;</span>
              </button>
            ))}
          </div>

          <article
            key={selectedSite.name}
            className="site-detail-panel"
            id="selected-site-panel"
            role="tabpanel"
          >
            <div className="site-detail-header">
              <div>
                <p className="sites-kicker">
                  {t("sites.siteNumber", "Site")} {String(selectedIndex + 1).padStart(2, "0")}
                </p>
                <h3>{selectedSite.name}</h3>
              </div>
              <div className="site-altitude-badge">
                <span>{t("sites.altitudeBadge", "Altitude")}</span>
                <strong>{selectedSite.altitudeRange}</strong>
                <small>{t("sites.metresAsl", "metres a.s.l.")}</small>
              </div>
            </div>

            <div className="site-detail-content">
              <div className="site-media">
                <div className="site-main-photo" key={selectedSite.images[activeImageIndex]}>
                  <Image
                    src={selectedSite.images[activeImageIndex]}
                    alt={
                      "View from " +
                      selectedSite.name +
                      ", image " +
                      (activeImageIndex + 1)
                    }
                    fill
                    sizes="(max-width: 768px) 94vw, (max-width: 1100px) 68vw, 48vw"
                  />
                  <div className="site-photo-overlay" />
                  <span className="site-photo-status">{t("sites.originArchive", "Origin archive")}</span>
                  <span className="site-photo-count">
                    {String(activeImageIndex + 1).padStart(2, "0")} /{" "}
                    {String(selectedSite.images.length).padStart(2, "0")}
                  </span>
                </div>

                <div className="site-thumbnails">
                  {selectedSite.images.map((image, imageIndex) => (
                    <button
                      key={image}
                      type="button"
                      className={"site-thumbnail" + (activeImageIndex === imageIndex ? " is-active" : "")}
                      onClick={() => setActiveImageIndex(imageIndex)}
                      aria-label={
                        "Show " + selectedSite.name + " image " + (imageIndex + 1)
                      }
                    >
                      <Image
                        src={image}
                        alt=""
                        fill
                        sizes="(max-width: 768px) 28vw, 14vw"
                      />
                      <span>{String(imageIndex + 1).padStart(2, "0")}</span>
                    </button>
                  ))}
                </div>
              </div>

              <aside className="site-profile">
                <div className="site-elevation-card">
                  <div
                    className="site-altitude-meter"
                    style={altitudeStyle}
                    role="img"
                    aria-label={
                      selectedSite.name +
                      " altitude: " +
                      selectedSite.altitudeRange +
                      " metres above sea level"
                    }
                  >
                    <span className="site-meter-label site-meter-top">2,500</span>
                    <span className="site-meter-label site-meter-middle">2,350</span>
                    <span className="site-meter-label site-meter-bottom">2,200</span>
                    <span className="site-meter-line" />
                    <span className="site-meter-marker">
                      <i />
                      {selectedSite.altitudeRange} m
                    </span>
                  </div>

                  <div className="site-elevation-copy">
                    <p className="sites-kicker sites-kicker-light">{t("sites.elevationProfile", "Elevation profile")}</p>
                    <h4>{selectedSite.altitudeRange} {t("sites.aboveSeaLevel", "metres above sea level.")}</h4>
                    <p>
                      {t("sites.highElevation", "High-elevation specialty coffee from")}{" "}
                      {selectedSite.localArea}, {selectedSite.region}.
                    </p>
                  </div>
                </div>

                <dl className="site-minor-info">
                  <div>
                    <dt>{t("sites.region", "Region")}</dt>
                    <dd>{selectedSite.region}</dd>
                  </div>
                  <div>
                    <dt>{t("sites.localArea", "Local area")}</dt>
                    <dd>{selectedSite.localArea}</dd>
                  </div>
                  <div>
                    <dt>{t("sites.variety", "Variety")}</dt>
                    <dd>{selectedSite.variety}</dd>
                  </div>
                  <div>
                    <dt>{t("sites.processingSystem", "Processing system")}</dt>
                    <dd>{selectedSite.processingSystem}</dd>
                  </div>
                </dl>
              </aside>
            </div>
          </article>
        </div>

        <div className="sites-temporary-note">
          <span aria-hidden="true">&#10022;</span>
          <p>
            {t(
              "sites.archiveNote",
              "Each gallery is drawn from its dedicated site archive, keeping every origin's photographs together."
            )}
          </p>
        </div>
      </section>
    </>
  );
}
