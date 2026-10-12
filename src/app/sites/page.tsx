import type { Metadata } from "next";
import Header from "@/app/components/Header";
import SitesExperience from "@/app/components/SitesExperience";
import { createPageMetadata } from "@/app/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Sidama Coffee Sites",
  description:
    "Explore Yihonal Trading coffee sites in Hurre, Bensa Gonjobe, Duwancho, and Bochesa, with altitude, varieties, processing systems, and original site photographs.",
  path: "/sites",
  keywords: ["Sidama coffee sites", "Bensa coffee", "Arbegona coffee", "Duwancho coffee"],
});

export default function SitesPage() {
  return (
    <main id="main-content" tabIndex={-1} className="sites-page">
      <Header />
      <SitesExperience />
    </main>
  );
}
