"use client";

import { INSTAGRAM_URL } from "@/app/lib/seo";
import { useTranslation } from "@/i18n/I18nContext";

export default function ContactContent() {
  const { t } = useTranslation();

  return (
    <>
      <section className="dedicated-contact-hero">
        <div>
          <p>{t("contact.kicker", "Contact Yihonal Trading Plc")}</p>
          <h1>{t("contact.title", "Start a conversation about Ethiopian specialty coffee.")}</h1>
          <span>
            {t(
              "contact.subtitle",
              "International buyers, roasters, cafés, and coffee partners can contact Yihonal directly for product information and sourcing requirements."
            )}
          </span>
        </div>
      </section>

      <section className="dedicated-contact-grid">
        <div className="dedicated-contact-details">
          <p className="resource-kicker">{t("contact.companyContact", "Company contact")}</p>
          <h2>{t("common.companyName", "Yihonal Trading Plc")}</h2>
          <address>
            <div>
              <span>{t("contact.locationLabel", "Location")}</span>
              <a href="https://maps.app.goo.gl/WtqKMGCMbYB24QYz6?g_st=it" target="_blank" rel="noreferrer">
                {t("contact.locationValue", "Addis Ababa, Bole, Ethiopia")}
              </a>
            </div>
            <div>
              <span>{t("contact.phoneLabel", "Phone / WhatsApp")}</span>
              <a href="tel:+251916823355">+251 916823355</a>
            </div>
            <div>
              <span>{t("contact.emailLabel", "Email")}</span>
              <a href="mailto:yihonal4@gmail.com">yihonal4@gmail.com</a>
            </div>
            <div>
              <span>{t("contact.instagramLabel", "Instagram")}</span>
              <a href={INSTAGRAM_URL} target="_blank" rel="noreferrer">@yihonal_coffee</a>
            </div>
          </address>
          <a className="dedicated-whatsapp-link" href="https://wa.me/251916823355" target="_blank" rel="noreferrer">
            {t("contact.messageWhatsApp", "Message Yihonal on WhatsApp")} <span aria-hidden="true">→</span>
          </a>
        </div>

        <div className="dedicated-contact-map">
          <iframe
            src="https://www.google.com/maps?q=9.0054781%2C38.8120751&z=17&output=embed"
            title={t("contact.mapTitle", "Yihonal Trading location in Addis Ababa, Bole")}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </section>
    </>
  );
}

