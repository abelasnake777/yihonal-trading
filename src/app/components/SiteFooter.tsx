"use client";

import Link from "next/link";
import { INSTAGRAM_URL } from "@/app/lib/seo";
import { useTranslation } from "@/i18n/I18nContext";

export default function SiteFooter() {
  const { t } = useTranslation();

  const coffeeLinks = [
    { label: t("footer.ethiopianCoffee", "Ethiopian Coffee"), href: "/ethiopian-coffee" },
    { label: t("footer.sidamaCoffee", "Sidama Coffee"), href: "/coffee-origins/sidama-coffee" },
    { label: t("footer.coffeeProcessing", "Coffee Processing"), href: "/coffee-processing" },
    { label: t("footer.qualityTraceability", "Quality & Traceability"), href: "/quality-and-traceability" },
    { label: t("footer.exportServices", "Export Services"), href: "/export-services" },
  ];

  const companyLinks = [
    { label: t("footer.about", "About"), href: "/about" },
    { label: t("footer.sites", "Coffee Sites"), href: "/sites" },
    { label: t("footer.gallery", "Gallery"), href: "/gallery" },
    { label: t("footer.contact", "Contact"), href: "/contact" },
  ];

  return (
    <footer className="site-footer">
      <div className="site-footer-inner">
        <div className="site-footer-brand">
          <p className="site-footer-kicker">{t("footer.kicker", "Yihonal Trading Plc")}</p>
          <h2>{t("footer.title", "Traceable Ethiopian coffee, connected to the world.")}</h2>
          <p>
            {t(
              "footer.desc",
              "Specialty coffee sourcing, processing, quality control, and export support from Addis Ababa and Sidama, Ethiopia."
            )}
          </p>
        </div>

        <div className="site-footer-links">
          <div>
            <h3>{t("footer.coffee", "Coffee")}</h3>
            {coffeeLinks.map((item) => (
              <Link key={item.href} href={item.href}>{item.label}</Link>
            ))}
          </div>
          <div>
            <h3>{t("footer.company", "Company")}</h3>
            {companyLinks.map((item) => (
              <Link key={item.href} href={item.href}>{item.label}</Link>
            ))}
          </div>
          <div>
            <h3>{t("footer.contact", "Contact")}</h3>
            <a href="tel:+251916823355">+251 916823355</a>
            <a href="mailto:yihonal4@gmail.com">yihonal4@gmail.com</a>
            <a href={INSTAGRAM_URL} target="_blank" rel="noreferrer">Instagram</a>
            <span>{t("footer.address", "Addis Ababa, Bole, Ethiopia")}</span>
          </div>
        </div>
      </div>
      <div className="site-footer-bottom">
        <p>© {new Date().getFullYear()} {t("common.companyName", "Yihonal Trading Plc")}. {t("footer.rights", "All rights reserved.")}</p>
        <p>{t("footer.tagline", "Ethiopian specialty coffee supplier and exporter")}</p>
      </div>
    </footer>
  );
}
