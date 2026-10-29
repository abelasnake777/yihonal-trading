#!/usr/bin/env node

/**
 * GeoIP & Localization Verification Script for yihonal_trading
 * 
 * Verifies:
 * 1. Current system IP & detected GeoIP country (live VPN check)
 * 2. All 12 country-to-language mapping rules
 * 3. All 12 translation dictionaries for syntax and key completeness
 * 4. Outputs testing links for Ubuntu dev environment with ?geo_mock=
 */

import { readFile } from "node:fs/promises";
import path from "node:path";
import assert from "node:assert/strict";

const MAPPING_RULES = [
  { country: "JP", expected: "ja", name: "Japanese (Japan)" },
  { country: "KR", expected: "ko", name: "Korean (South Korea)" },
  { country: "CN", expected: "zh", name: "Chinese - Simplified (China)" },
  { country: "ET", expected: "am", name: "Amharic (Ethiopia)" },
  { country: "FR", expected: "fr", name: "French (France)" },
  { country: "DE", expected: "de", name: "German (Germany)" },
  { country: "ES", expected: "es", name: "Spanish (Spain)" },
  { country: "SA", expected: "ar", name: "Arabic (Saudi Arabia - RTL)" },
  { country: "AE", expected: "ar", name: "Arabic (UAE - RTL)" },
  { country: "NL", expected: "nl", name: "Dutch (Netherlands)" },
  { country: "IT", expected: "it", name: "Italian (Italy)" },
  { country: "BR", expected: "pt", name: "Portuguese (Brazil)" },
  { country: "PT", expected: "pt", name: "Portuguese (Portugal)" },
  { country: "US", expected: "en", name: "English (Default fallback)" },
  { country: "GB", expected: "en", name: "English (Default fallback)" },
];

console.log("=================================================================");
console.log("🌍 Yihonal Trading - GeoIP & Multi-Language Verification");
console.log("=================================================================\n");

// 1. Check all 12 translation files
console.log("1. Validating 12 Locale Dictionaries:");
const localesDir = path.resolve("src/i18n/locales");
const expectedLocales = [
  "am", "zh", "ja", "ko", "fr", "de", "es", "ar", "nl", "it", "pt", "en"
];

const enRaw = await readFile(path.join(localesDir, "en.json"), "utf8");
const enJson = JSON.parse(enRaw);
const enKeys = Object.keys(enJson);

for (const loc of expectedLocales) {
  const filePath = path.join(localesDir, `${loc}.json`);
  const content = await readFile(filePath, "utf8");
  const parsed = JSON.parse(content);
  for (const section of enKeys) {
    assert(section in parsed, `Locale ${loc}.json is missing section: ${section}`);
  }
  console.log(`   ✓ ${loc}.json: Valid JSON and complete dictionary structure`);
}
console.log("   --> All 12 localization files verified!\n");

// 2. Validate Mapping Rules in src/i18n/config.ts
console.log("2. Validating Country-to-Language Mapping Rules in src/i18n/config.ts:");
const configTs = await readFile(path.resolve("src/i18n/config.ts"), "utf8");

function mapCountry(countryCode) {
  if (!countryCode) return "en";
  const regex = new RegExp(`['"]?${countryCode}['"]?\\s*:\\s*['"](\\w+)['"]`);
  const match = configTs.match(regex);
  return match ? match[1] : "en";
}

for (const rule of MAPPING_RULES) {
  const mapped = mapCountry(rule.country);
  assert.equal(
    mapped,
    rule.expected,
    `Mapping failure for ${rule.country}: expected ${rule.expected}, got ${mapped}`
  );
  console.log(`   ✓ Country ${rule.country} -> ${mapped} (${rule.name})`);
}
console.log("   --> All mapping rules verified in src/i18n/config.ts!\n");

// 3. Live VPN / External IP Check
console.log("3. Live Network & VPN Status Check:");
try {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 4000);
  const res = await fetch("https://freeipapi.com/api/json", {
    signal: controller.signal,
    headers: { Accept: "application/json" }
  });
  clearTimeout(timer);

  if (res.ok) {
    const data = await res.json();
    const currentCountry = (data.countryCode || data.country_code || "UNKNOWN").toUpperCase();
    const currentIp = data.ipAddress || data.ip || "Unknown IP";
    const mappedLang = mapCountry(currentCountry);

    console.log(`   • Current External IP: ${currentIp}`);
    console.log(`   • Detected GeoIP Country: ${currentCountry} (${data.countryName || ""})`);
    console.log(`   • Automatic Mapped Language: ${mappedLang}`);
    console.log(`   • VPN Test Status:`);
    if (currentCountry === "JP") {
      console.log(`     🎉 Your VPN is active to JAPAN! The site will automatically load in Japanese.`);
    } else if (currentCountry === "ET") {
      console.log(`     🎉 Your VPN/Location is ETHIOPIA! The site will automatically load in Amharic.`);
    } else {
      console.log(`     ℹ️ Connect your Ubuntu VPN to Japan (JP), Germany (DE), Korea (KR), etc., then re-run this script to see your live VPN IP recognized!`);
    }
  } else {
    console.log("   (Remote GeoIP service returned non-200, offline or rate-limited)");
  }
} catch (err) {
  console.log(`   (Network check note: ${err.message})`);
}

console.log("\n=================================================================");
console.log("🧪 Fast Local Testing URLs (No VPN needed):");
console.log("=================================================================");
console.log("Run 'npm run dev' and open any of these URLs in your browser:");
console.log("• Japan (Japanese):          http://localhost:3000/?geo_mock=JP");
console.log("• South Korea (Korean):      http://localhost:3000/?geo_mock=KR");
console.log("• China (Chinese):           http://localhost:3000/?geo_mock=CN");
console.log("• Ethiopia (Amharic):        http://localhost:3000/?geo_mock=ET");
console.log("• France (French):           http://localhost:3000/?geo_mock=FR");
console.log("• Germany (German):          http://localhost:3000/?geo_mock=DE");
console.log("• Spain (Spanish):           http://localhost:3000/?geo_mock=ES");
console.log("• Saudi Arabia (Arabic RTL): http://localhost:3000/?geo_mock=SA");
console.log("• Netherlands (Dutch):       http://localhost:3000/?geo_mock=NL");
console.log("• Italy (Italian):           http://localhost:3000/?geo_mock=IT");
console.log("• Brazil (Portuguese):       http://localhost:3000/?geo_mock=BR");
console.log("• Default (English):         http://localhost:3000/?geo_mock=US");
console.log("=================================================================\n");
