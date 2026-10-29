"use client";

import Image from "@/app/components/OptimizedImage";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { navigation } from "@/app/data/site";
import LanguageSwitcher from "@/app/components/LanguageSwitcher";
import { useTranslation } from "@/i18n/I18nContext";

const navTranslationKeys: Record<string, string> = {
  Home: "nav.home",
  About: "nav.about",
  Products: "nav.products",
  Awards: "nav.awards",
  Sites: "nav.sites",
  Gallery: "nav.gallery",
  Contact: "nav.contact",
};

export default function Header() {
  const [slideUp, setSlideUp] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const { t } = useTranslation();

  useEffect(() => {
    let lastScroll = 0;

    function handleScroll() {
      setSlideUp(window.scrollY > lastScroll && window.scrollY > 100);
      lastScroll = window.scrollY;
    }

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.classList.toggle("navigation-open", menuOpen);

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setMenuOpen(false);
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.classList.remove("navigation-open");
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [menuOpen]);

  return (
    <>
      <header
        id="pageHeader"
        className={[
          slideUp && !menuOpen ? "slide-up" : "",
          menuOpen ? "menu-open" : "",
        ].filter(Boolean).join(" ")}
      >
        <div className="brand-wrap">
          <Link href="/" onClick={() => setMenuOpen(false)}>
            <Image
              src="/images/yihonal_logo.png"
              alt={t("common.brandName", "Yihonal Coffee")}
              width={90}
              height={90}
              className="logo"
              priority
            />
          </Link>
          <span className="brand-name">{t("common.brandName", "Yihonal Coffee")}</span>
        </div>

        <nav
          id="primary-navigation"
          className={menuOpen ? "is-open" : ""}
          aria-label={t("nav.openMenu", "Primary navigation")}
        >
          {navigation.map((item) => {
            const isPageLink = !item.href.includes("#");
            const isActive = isPageLink && pathname === item.href;
            const transKey = navTranslationKeys[item.label];
            const translatedLabel = transKey ? t(transKey, item.label) : item.label;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={isActive ? "active" : ""}
                onClick={() => setMenuOpen(false)}
              >
                {translatedLabel}
              </Link>
            );
          })}
          <div className="nav-mobile-lang">
            <LanguageSwitcher />
          </div>
        </nav>

        <div className="header-controls">
          <LanguageSwitcher className="header-desktop-lang" />
          <button
            type="button"
            className={"menu-toggle" + (menuOpen ? " is-open" : "")}
            aria-expanded={menuOpen}
            aria-controls="primary-navigation"
            aria-label={menuOpen ? t("nav.closeMenu", "Close navigation menu") : t("nav.openMenu", "Open navigation menu")}
            onClick={() => setMenuOpen((isOpen) => !isOpen)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </header>

      <button
        type="button"
        className={"menu-backdrop" + (menuOpen ? " is-visible" : "")}
        aria-label="Close navigation menu"
        tabIndex={menuOpen ? 0 : -1}
        onClick={() => setMenuOpen(false)}
      />
    </>
  );
}
