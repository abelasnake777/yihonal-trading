import {
  DEFAULT_LOCALE,
  LOCALE_STORAGE_KEY,
  isSupportedLocale,
  mapCountryToLocale,
} from "./config";
import type { SupportedLocale } from "./types";

export interface GeoDetectionResult {
  locale: SupportedLocale;
  country: string | null;
  source: "url_mock" | "url_lang" | "persisted" | "header" | "geoip_api" | "fallback";
}

/**
 * Read cookie by name in browser context
 */
export function getCookie(name: string): string | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(new RegExp("(^|;\\s*)(" + name + ")=([^;]*)"));
  return match ? decodeURIComponent(match[3]) : null;
}

/**
 * Set cookie with expiration
 */
export function setCookie(name: string, value: string, days = 365): void {
  if (typeof document === "undefined") return;
  const maxAge = days * 24 * 60 * 60;
  document.cookie = `${name}=${encodeURIComponent(value)}; path=/; max-age=${maxAge}; SameSite=Lax`;
}

/**
 * Delete a cookie
 */
export function deleteCookie(name: string): void {
  if (typeof document === "undefined") return;
  document.cookie = `${name}=; path=/; max-age=0; SameSite=Lax`;
}

/**
 * Retrieve user's explicitly persisted locale from localStorage or cookies
 */
export function getPersistedLocale(): SupportedLocale | null {
  if (typeof window === "undefined") return null;

  try {
    const fromStorage = localStorage.getItem(LOCALE_STORAGE_KEY);
    if (isSupportedLocale(fromStorage)) return fromStorage;
  } catch {
    // localStorage might be unavailable in private browsing
  }

  const fromCookie = getCookie(LOCALE_STORAGE_KEY);
  if (isSupportedLocale(fromCookie)) return fromCookie;

  return null;
}

/**
 * Check if the user made an explicit manual selection previously
 */
export function hasManualSelection(): boolean {
  if (typeof window === "undefined") return false;
  try {
    if (localStorage.getItem("yihonal_lang_manual") === "true") return true;
  } catch {
    // ignore
  }
  return getCookie("yihonal_lang_manual") === "true";
}

/**
 * Save user's selected language
 */
export function persistLocale(locale: SupportedLocale, isManual = true): void {
  if (typeof window === "undefined") return;

  try {
    localStorage.setItem(LOCALE_STORAGE_KEY, locale);
    if (isManual) {
      localStorage.setItem("yihonal_lang_manual", "true");
    }
  } catch {
    // localStorage disabled
  }

  setCookie(LOCALE_STORAGE_KEY, locale, 365);
  if (isManual) {
    setCookie("yihonal_lang_manual", "true", 365);
  }
}

/**
 * Clear stored preferences (useful for testing)
 */
export function clearPersistedLocale(): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.removeItem(LOCALE_STORAGE_KEY);
    localStorage.removeItem("yihonal_lang_manual");
  } catch {
    // ignore
  }
  deleteCookie(LOCALE_STORAGE_KEY);
  deleteCookie("yihonal_lang_manual");
}

/**
 * Check for URL query parameter overrides:
 * - ?geo_mock=JP (simulates visit from Japan -> ja)
 * - ?lang=ja (direct language switch)
 */
export function checkURLOverride(): GeoDetectionResult | null {
  if (typeof window === "undefined") return null;

  try {
    const params = new URLSearchParams(window.location.search);

    // 1. geo_mock override (e.g., ?geo_mock=JP, ?geo_mock=ET, ?geo_mock=DE)
    const geoMock = params.get("geo_mock");
    if (geoMock) {
      const countryCode = geoMock.trim().toUpperCase();
      const mappedLocale = mapCountryToLocale(countryCode);
      persistLocale(mappedLocale, true);
      return {
        locale: mappedLocale,
        country: countryCode,
        source: "url_mock",
      };
    }

    // 2. Direct language query parameter (e.g., ?lang=ja, ?lang=am)
    const lang = params.get("lang");
    if (lang && isSupportedLocale(lang)) {
      persistLocale(lang, true);
      return {
        locale: lang,
        country: null,
        source: "url_lang",
      };
    }
  } catch {
    // ignore search params parsing error
  }

  return null;
}

/**
 * Check for server-injected headers or cookies:
 * e.g., Cloudflare 'CF-IPCountry' (in cookie cf-ipcountry),
 * Vercel 'x-vercel-ip-country', LiteSpeed 'GEOIP_COUNTRY_CODE',
 * or a meta tag <meta name="geo-country" content="JP">
 */
export function checkServerHeaders(): GeoDetectionResult | null {
  if (typeof document === "undefined") return null;

  // Check meta tag
  const metaTag = document.querySelector('meta[name="geo-country"]');
  const metaCountry = metaTag?.getAttribute("content");
  if (metaCountry && metaCountry.length === 2) {
    const country = metaCountry.toUpperCase();
    return {
      locale: mapCountryToLocale(country),
      country,
      source: "header",
    };
  }

  // Check Cloudflare or reverse proxy cookies
  const cfCountry =
    getCookie("cf-ipcountry") ||
    getCookie("x-country-code") ||
    getCookie("x-geoip-country");
  if (cfCountry && cfCountry.length === 2) {
    const country = cfCountry.toUpperCase();
    return {
      locale: mapCountryToLocale(country),
      country,
      source: "header",
    };
  }

  return null;
}

/**
 * Fetch visitor's country using free client-side GeoIP lookup APIs.
 * When a developer or user is connected via a VPN (e.g. to Japan, Germany, etc.),
 * this fetch resolves the VPN exit IP and returns the matching country code.
 */
export async function fetchClientGeoIP(timeoutMs = 2500): Promise<{ country: string } | null> {
  const fetchWithTimeout = async (url: string): Promise<Response> => {
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), timeoutMs);
    try {
      const response = await fetch(url, {
        signal: controller.signal,
        headers: { Accept: "application/json" },
      });
      clearTimeout(id);
      return response;
    } catch (e) {
      clearTimeout(id);
      throw e;
    }
  };

  // Provider 1: freeipapi.com (Fast, CORS friendly, SSL)
  try {
    const res = await fetchWithTimeout("https://freeipapi.com/api/json");
    if (res.ok) {
      const data = await res.json();
      const code = data.countryCode || data.country_code;
      if (typeof code === "string" && code.length === 2) {
        return { country: code.toUpperCase() };
      }
    }
  } catch {
    // Try fallback provider
  }

  // Provider 2: ipapi.co
  try {
    const res = await fetchWithTimeout("https://ipapi.co/json/");
    if (res.ok) {
      const data = await res.json();
      const code = data.country_code || data.country;
      if (typeof code === "string" && code.length === 2) {
        return { country: code.toUpperCase() };
      }
    }
  } catch {
    // Try next fallback provider
  }

  // Provider 3: ipwho.is
  try {
    const res = await fetchWithTimeout("https://ipwho.is/");
    if (res.ok) {
      const data = await res.json();
      const code = data.country_code;
      if (typeof code === "string" && code.length === 2) {
        return { country: code.toUpperCase() };
      }
    }
  } catch {
    // All remote lookups failed
  }

  return null;
}

/**
 * Orchestrate complete GeoIP and locale detection flow:
 * 1. URL query parameters (?geo_mock=XX or ?lang=xx)
 * 2. Persisted explicit preference (localStorage / cookies)
 * 3. Server-injected headers or cookies
 * 4. Client-side GeoIP lookup (detects VPN IP!)
 * 5. Browser language fallback (navigator.language)
 * 6. Default fallback ("en")
 */
export async function detectVisitorLocale(): Promise<GeoDetectionResult> {
  // 1. URL Parameter Overrides (e.g. ?geo_mock=JP)
  const urlOverride = checkURLOverride();
  if (urlOverride) {
    return urlOverride;
  }

  // 2. Persisted language (if previously chosen or detected)
  const persisted = getPersistedLocale();
  if (persisted) {
    return {
      locale: persisted,
      country: null,
      source: "persisted",
    };
  }

  // 3. Server Header / Cookie inspection (e.g. Cloudflare / Nginx headers)
  const serverDetection = checkServerHeaders();
  if (serverDetection) {
    persistLocale(serverDetection.locale, false);
    return serverDetection;
  }

  // 4. Live GeoIP Lookup (Works seamlessly with VPNs!)
  try {
    const geo = await fetchClientGeoIP();
    if (geo?.country) {
      const mappedLocale = mapCountryToLocale(geo.country);
      persistLocale(mappedLocale, false);
      return {
        locale: mappedLocale,
        country: geo.country,
        source: "geoip_api",
      };
    }
  } catch {
    // Network unavailable or offline
  }

  // 5. Browser Language fallback
  if (typeof navigator !== "undefined" && navigator.languages) {
    for (const lang of navigator.languages) {
      const prefix = lang.slice(0, 2).toLowerCase();
      if (isSupportedLocale(prefix)) {
        persistLocale(prefix, false);
        return {
          locale: prefix,
          country: null,
          source: "fallback",
        };
      }
    }
  }

  // 6. Default fallback (en)
  return {
    locale: DEFAULT_LOCALE,
    country: null,
    source: "fallback",
  };
}
