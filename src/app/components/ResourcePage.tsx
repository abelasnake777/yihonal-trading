"use client";

import type { ReactNode } from "react";
import Image from "@/app/components/OptimizedImage";
import Link from "next/link";
import Header from "@/app/components/Header";
import { useTranslation } from "@/i18n/I18nContext";

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
  const { t } = useTranslation();

  return (
    <main id="main-content" tabIndex={-1} className="resource-page">
      <Header />
      <section className="resource-hero">
        <Image
          src={image}
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
            <p>{t("resource.buyerKicker", "For international coffee buyers")}</p>
            <h2>{t("resource.buyerTitle", "Request coffee information or start a sourcing conversation.")}</h2>
          </div>
          <Link href="/contact">
            {t("resource.contactCta", "Contact Yihonal Trading")} <span aria-hidden="true">→</span>
          </Link>
        </aside>
      </article>
    </main>
  );
}
