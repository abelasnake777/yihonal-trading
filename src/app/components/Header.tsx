"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { navigation } from "@/app/data/site";
import { assetPath } from "@/app/lib/assets";

export default function Header() {
  const [slideUp, setSlideUp] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

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
              src={assetPath("/images/yihonal_logo.png")}
              alt="Yihonal Coffee"
              width={90}
              height={90}
              className="logo"
              priority
            />
          </Link>
          <span className="brand-name">Yihonal Coffee</span>
        </div>

        <button
          type="button"
          className={"menu-toggle" + (menuOpen ? " is-open" : "")}
          aria-expanded={menuOpen}
          aria-controls="primary-navigation"
          aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
          onClick={() => setMenuOpen((isOpen) => !isOpen)}
        >
          <span />
          <span />
          <span />
        </button>

        <nav
          id="primary-navigation"
          className={menuOpen ? "is-open" : ""}
          aria-label="Primary navigation"
        >
          {navigation.map((item) => {
            const isPageLink = !item.href.includes("#");
            const isActive = isPageLink && pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={isActive ? "active" : ""}
                onClick={() => setMenuOpen(false)}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
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
