import type { Metadata } from "next";
import Header from "@/app/components/Header";
import { INSTAGRAM_URL, createPageMetadata } from "@/app/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Contact Yihonal Trading",
  description:
    "Contact Yihonal Trading Plc in Addis Ababa for Ethiopian specialty coffee, buyer enquiries, sourcing requirements, samples, and export conversations.",
  path: "/contact",
  keywords: ["contact Ethiopian coffee exporter", "coffee supplier Addis Ababa", "Yihonal Trading contact"],
});

export default function ContactPage() {
  return (
    <main id="main-content" tabIndex={-1} className="dedicated-contact-page">
      <Header />
      <section className="dedicated-contact-hero">
        <div>
          <p>Contact Yihonal Trading Plc</p>
          <h1>Start a conversation about Ethiopian specialty coffee.</h1>
          <span>
            International buyers, roasters, cafés, and coffee partners can contact Yihonal
            directly for product information and sourcing requirements.
          </span>
        </div>
      </section>

      <section className="dedicated-contact-grid">
        <div className="dedicated-contact-details">
          <p className="resource-kicker">Company contact</p>
          <h2>Yihonal Trading Plc</h2>
          <address>
            <div><span>Location</span><a href="https://maps.app.goo.gl/WtqKMGCMbYB24QYz6?g_st=it" target="_blank" rel="noreferrer">Addis Ababa, Bole, Ethiopia</a></div>
            <div><span>Phone / WhatsApp</span><a href="tel:+251916823355">+251 916823355</a></div>
            <div><span>Email</span><a href="mailto:yihonal4@gmail.com">yihonal4@gmail.com</a></div>
            <div><span>Instagram</span><a href={INSTAGRAM_URL} target="_blank" rel="noreferrer">@yihonal_coffee</a></div>
          </address>
          <a className="dedicated-whatsapp-link" href="https://wa.me/251916823355" target="_blank" rel="noreferrer">Message Yihonal on WhatsApp <span aria-hidden="true">→</span></a>
        </div>

        <div className="dedicated-contact-map">
          <iframe
            src="https://www.google.com/maps?q=9.0054781%2C38.8120751&z=17&output=embed"
            title="Yihonal Trading location in Addis Ababa, Bole"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </section>
    </main>
  );
}
