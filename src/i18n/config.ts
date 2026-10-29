import type { LocaleInfo, SupportedLocale } from "./types";

export const SUPPORTED_LOCALES: readonly SupportedLocale[] = [
  "am",
  "zh",
  "ja",
  "ko",
  "fr",
  "de",
  "es",
  "ar",
  "nl",
  "it",
  "pt",
  "en",
] as const;

export const DEFAULT_LOCALE: SupportedLocale = "en";

export const RTL_LOCALES: readonly SupportedLocale[] = ["ar"] as const;

export const LOCALE_STORAGE_KEY = "yihonal_lang";

export const LOCALE_DETAILS: Record<SupportedLocale, LocaleInfo> = {
  am: {
    code: "am",
    name: "Amharic",
    nativeName: "አማርኛ",
    dir: "ltr",
    flag: "🇪🇹",
    countryCode: "ET",
  },
  zh: {
    code: "zh",
    name: "Chinese (Simplified)",
    nativeName: "简体中文",
    dir: "ltr",
    flag: "🇨🇳",
    countryCode: "CN",
  },
  ja: {
    code: "ja",
    name: "Japanese",
    nativeName: "日本語",
    dir: "ltr",
    flag: "🇯🇵",
    countryCode: "JP",
  },
  ko: {
    code: "ko",
    name: "Korean",
    nativeName: "한국어",
    dir: "ltr",
    flag: "🇰🇷",
    countryCode: "KR",
  },
  fr: {
    code: "fr",
    name: "French",
    nativeName: "Français",
    dir: "ltr",
    flag: "🇫🇷",
    countryCode: "FR",
  },
  de: {
    code: "de",
    name: "German",
    nativeName: "Deutsch",
    dir: "ltr",
    flag: "🇩🇪",
    countryCode: "DE",
  },
  es: {
    code: "es",
    name: "Spanish",
    nativeName: "Español",
    dir: "ltr",
    flag: "🇪🇸",
    countryCode: "ES",
  },
  ar: {
    code: "ar",
    name: "Arabic",
    nativeName: "العربية",
    dir: "rtl",
    flag: "🇸🇦",
    countryCode: "SA",
  },
  nl: {
    code: "nl",
    name: "Dutch",
    nativeName: "Nederlands",
    dir: "ltr",
    flag: "🇳🇱",
    countryCode: "NL",
  },
  it: {
    code: "it",
    name: "Italian",
    nativeName: "Italiano",
    dir: "ltr",
    flag: "🇮🇹",
    countryCode: "IT",
  },
  pt: {
    code: "pt",
    name: "Portuguese",
    nativeName: "Português",
    dir: "ltr",
    flag: "🇧🇷",
    countryCode: "BR",
  },
  en: {
    code: "en",
    name: "English",
    nativeName: "English",
    dir: "ltr",
    flag: "🇬🇧",
    countryCode: "US",
  },
};

/**
 * GeoIP Country Code (ISO 3166-1 alpha-2) to SupportedLocale Mapping
 * Explicitly fulfills the mapping rules requirement.
 */
export const COUNTRY_TO_LOCALE: Record<string, SupportedLocale> = {
  // Japan -> ja
  JP: "ja",

  // South Korea -> ko
  KR: "ko",

  // China -> zh
  CN: "zh",
  HK: "zh",
  TW: "zh",

  // Ethiopia -> am
  ET: "am",

  // France -> fr
  FR: "fr",
  MC: "fr",

  // Germany -> de
  DE: "de",
  AT: "de",

  // Spain -> es
  ES: "es",
  MX: "es",
  AR: "es",
  CO: "es",
  CL: "es",
  PE: "es",

  // Saudi Arabia / UAE / Arabic-speaking regions -> ar
  SA: "ar",
  AE: "ar",
  EG: "ar",
  QA: "ar",
  KW: "ar",
  OM: "ar",
  BH: "ar",
  JO: "ar",
  LB: "ar",
  IQ: "ar",
  MA: "ar",
  DZ: "ar",
  TN: "ar",
  YE: "ar",
  SD: "ar",
  LY: "ar",
  SY: "ar",
  PS: "ar",

  // Netherlands -> nl
  NL: "nl",

  // Italy -> it
  IT: "it",

  // Brazil / Portugal -> pt
  BR: "pt",
  PT: "pt",
  AO: "pt",
  MZ: "pt",
};

export function isSupportedLocale(code: string | null | undefined): code is SupportedLocale {
  if (!code) return false;
  return SUPPORTED_LOCALES.includes(code.toLowerCase() as SupportedLocale);
}

export function mapCountryToLocale(countryCode: string | null | undefined): SupportedLocale {
  if (!countryCode) return DEFAULT_LOCALE;
  const upper = countryCode.trim().toUpperCase();
  return COUNTRY_TO_LOCALE[upper] || DEFAULT_LOCALE;
}

