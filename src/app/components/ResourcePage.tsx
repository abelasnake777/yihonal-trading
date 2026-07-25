import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import Header from "@/app/components/Header";
import { assetPath } from "@/app/lib/assets";

type ResourcePageProps = {
  kicker: string;
  title: string;
  intro: string;
  children: ReactNode;
  image?: string;
};

export default function ResourcePage({
  kicker,
  title,
  intro,
  children,
  image = "/images/backgrounds/image3.webp",
}: ResourcePageProps) {
  return (
    <main className="resource-page">
      <Header />
      <section className="resource-hero">
        <Image
          src={assetPath(image)}
          alt="Ethiopian specialty coffee origin"
          fill
          priority
          sizes="100vw"
          className="resource-hero-image"
        />
        <div className="resource-hero-overlay" />
        <div className="resource-hero-content">
          <p>{kicker}</p>
          <h1>{title}</h1>
          <div className="resource-hero-rule" aria-hidden="true" />
          <span>{intro}</span>
        </div>
      </section>

      <article className="resource-content">
        {children}
        <aside className="resource-cta">
          <div>
            <p>For international coffee buyers</p>
            <h2>Request coffee information or start a sourcing conversation.</h2>
          </div>
          <Link href="/contact">Contact Yihonal Trading <span aria-hidden="true">→</span></Link>
        </aside>
      </article>
    </main>
  );
}
