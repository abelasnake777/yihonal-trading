"use client";

import { useEffect, useRef, useState } from "react";
import { LOCALE_DETAILS, SUPPORTED_LOCALES } from "@/i18n/config";
import { useTranslation } from "@/i18n/I18nContext";
import type { SupportedLocale } from "@/i18n/types";

interface LanguageSwitcherProps {
  className?: string;
}

export default function LanguageSwitcher({ className = "" }: LanguageSwitcherProps) {
  const { locale, setLocale, redetectGeoIP, isDetecting, detectedCountry, t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const currentInfo = LOCALE_DETAILS[locale];

  // Close on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  // Close on Escape key
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  function handleSelect(code: SupportedLocale) {
    setLocale(code);
    setIsOpen(false);
  }

  async function handleAutoDetect() {
    await redetectGeoIP();
    setIsOpen(false);
  }

  return (
    <div
      ref={containerRef}
      className={`lang-switcher-container ${className} ${isOpen ? "is-open" : ""}`}
    >
      <button
        type="button"
        className="lang-switcher-trigger"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-label={`${t("nav.selectLanguage", "Select language")}: ${currentInfo.nativeName}`}
      >
        <span className="lang-icon" aria-hidden="true">
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8">
            <circle cx="12" cy="12" r="10" />
            <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
          </svg>
        </span>
        <span className="lang-current-name">{currentInfo.nativeName}</span>
        <span className="lang-chevron" aria-hidden="true">
          <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.2">
            <path d="M6 9l6 6 6-6" />
          </svg>
        </span>
      </button>

      {isOpen && (
        <div className="lang-dropdown" role="listbox" aria-label="Available languages">
          <div className="lang-dropdown-header">
            <span>{t("nav.selectLanguage", "Select language")}</span>
            {detectedCountry && (
              <span className="lang-detected-badge">
                {t("nav.detectedFrom", "Detected")}: {detectedCountry}
              </span>
            )}
          </div>

          <div className="lang-list">
            {SUPPORTED_LOCALES.map((code) => {
              const info = LOCALE_DETAILS[code];
              const isSelected = code === locale;

              return (
                <button
                  key={code}
                  type="button"
                  role="option"
                  aria-selected={isSelected}
                  className={`lang-option ${isSelected ? "is-selected" : ""}`}
                  onClick={() => handleSelect(code)}
                >
                  <span className="lang-flag" aria-hidden="true">{info.flag}</span>
                  <div className="lang-names">
                    <span className="lang-native-name">{info.nativeName}</span>
                    <span className="lang-english-name">{info.name}</span>
                  </div>
                  {isSelected && (
                    <span className="lang-check" aria-hidden="true">
                      <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          <div className="lang-dropdown-footer">
            <button
              type="button"
              className="lang-auto-detect-btn"
              onClick={handleAutoDetect}
              disabled={isDetecting}
            >
              <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" className={isDetecting ? "spin" : ""}>
                <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67" />
              </svg>
              <span>{isDetecting ? t("common.loading", "Detecting...") : t("nav.autoDetect", "Auto-detect location")}</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

