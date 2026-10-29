import type { Metadata } from "next";
import Header from "@/app/components/Header";
import ContactContent from "@/app/contact/ContactContent";
import { createPageMetadata } from "@/app/lib/seo";

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
      <ContactContent />
    </main>
  );
}
