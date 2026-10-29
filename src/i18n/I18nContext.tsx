"use client";

import {
  type ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  DEFAULT_LOCALE,
  RTL_LOCALES,
  isSupportedLocale,
} from "./config";
import {
  clearPersistedLocale,
  detectVisitorLocale,
  getPersistedLocale,
  persistLocale,
} from "./geoip";
import { dictionaries, getDictionary } from "./locales";
import type { SupportedLocale, TranslationDictionary } from "./types";

interface I18nContextType {
  locale: SupportedLocale;
  dictionary: TranslationDictionary;
  isRTL: boolean;
  detectedCountry: string | null;
  isDetecting: boolean;
  setLocale: (locale: SupportedLocale) => void;
  redetectGeoIP: () => Promise<void>;
  t: (keyPath: string, fallback?: string) => string;
}

const I18nContext = createContext<I18nContextType | null>(null);

function getNestedValue(obj: unknown, path: string): string | undefined {
  if (!obj || typeof obj !== "object") return undefined;
  const parts = path.split(".");
  let current: unknown = obj;

  for (const part of parts) {
    if (current === null || current === undefined || typeof current !== "object") {
      return undefined;
    }
    current = (current as Record<string, unknown>)[part];
  }

  return typeof current === "string" ? current : undefined;
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<SupportedLocale>(() => {
    if (typeof window === "undefined") return DEFAULT_LOCALE;
    return getPersistedLocale() || DEFAULT_LOCALE;
  });
  const [detectedCountry, setDetectedCountry] = useState<string | null>(null);
  const [isDetecting, setIsDetecting] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    return !getPersistedLocale();
  });

  // Sync HTML lang and dir attributes
  const updateHtmlAttributes = useCallback((loc: SupportedLocale) => {
    if (typeof document === "undefined") return;
    const isRtl = RTL_LOCALES.includes(loc);

    document.documentElement.lang = loc;
    document.documentElement.dir = isRtl ? "rtl" : "ltr";

    if (isRtl) {
      document.documentElement.classList.add("rtl");
      document.body.classList.add("rtl");
    } else {
      document.documentElement.classList.remove("rtl");
      document.body.classList.remove("rtl");
    }
  }, []);

  // Set locale and update persistence & HTML attributes
  const setLocale = useCallback(
    (newLocale: SupportedLocale) => {
      if (!isSupportedLocale(newLocale)) return;
      setLocaleState(newLocale);
      persistLocale(newLocale, true);
      updateHtmlAttributes(newLocale);
    },
    [updateHtmlAttributes]
  );

  // Run initial detection on mount
  useEffect(() => {
    let isMounted = true;

    // Synchronize HTML attributes with current locale
    updateHtmlAttributes(locale);

    const stored = getPersistedLocale();
    if (stored) {
      return;
    }

    // Otherwise run full detection (checks URL overrides, server headers, and client GeoIP)
    detectVisitorLocale().then((result) => {
      if (!isMounted) return;
      setLocaleState(result.locale);
      setDetectedCountry(result.country);
      updateHtmlAttributes(result.locale);
      setIsDetecting(false);
    });

    return () => {
      isMounted = false;
    };
  }, [locale, updateHtmlAttributes]);

  // Re-run GeoIP detection on demand (e.g., after switching VPN)
  const redetectGeoIP = useCallback(async () => {
    setIsDetecting(true);
    clearPersistedLocale();
    const result = await detectVisitorLocale();
    setLocaleState(result.locale);
    setDetectedCountry(result.country);
    updateHtmlAttributes(result.locale);
    setIsDetecting(false);
  }, [updateHtmlAttributes]);

  const dictionary = useMemo(() => getDictionary(locale), [locale]);
  const isRTL = useMemo(() => RTL_LOCALES.includes(locale), [locale]);

  // Translation helper
  const t = useCallback(
    (keyPath: string, fallback?: string): string => {
      // 1. Look up in current dictionary
      const val = getNestedValue(dictionary, keyPath);
      if (val !== undefined) return val;

      // 2. Fall back to English dictionary
      const fallbackVal = getNestedValue(dictionaries.en, keyPath);
      if (fallbackVal !== undefined) return fallbackVal;

      // 3. Fall back to explicit default text or path
      return fallback !== undefined ? fallback : keyPath;
    },
    [dictionary]
  );

  const value = useMemo(
    () => ({
      locale,
      dictionary,
      isRTL,
      detectedCountry,
      isDetecting,
      setLocale,
      redetectGeoIP,
      t,
    }),
    [locale, dictionary, isRTL, detectedCountry, isDetecting, setLocale, redetectGeoIP, t]
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useTranslation() {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error("useTranslation must be used within an I18nProvider");
  }
  return context;
}
