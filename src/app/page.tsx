import type { Metadata } from "next";
import Header from "@/app/components/Header";
import HomeClassic from "@/app/components/HomeClassic";
import { createPageMetadata } from "@/app/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Ethiopian Specialty Coffee Exporter",
  description:
    "Yihonal Trading supplies traceable Ethiopian specialty coffee from Sidama, with sourcing, processing, quality control, and export support for international buyers.",
  path: "/",
  keywords: [
    "Yihonal Trading",
    "Ethiopian coffee exporter",
    "Ethiopian green coffee supplier",
    "Sidama specialty coffee",
  ],
});

export default function Home() {
  return (
    <main>
      <Header />
      <HomeClassic />
    </main>
  );
}
