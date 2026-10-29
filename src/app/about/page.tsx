import type { Metadata } from "next";
import Header from "@/app/components/Header";
import AboutContent from "@/app/about/AboutContent";
import { createPageMetadata } from "@/app/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "About Yihonal Trading Plc",
  description:
    "Learn about Yihonal Trading Plc, an Ethiopian specialty coffee supplier focused on responsible sourcing, quality control, processing, and international export.",
  path: "/about",
  keywords: ["Yihonal Trading Ethiopia", "Ethiopian coffee company", "specialty coffee exporter Addis Ababa"],
});

export default function AboutPage() {
  return (
    <main id="main-content" tabIndex={-1} className="about-page">
      <Header />
      <AboutContent />
    </main>
  );
}
