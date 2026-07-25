import type { Metadata } from "next";

export const SITE_NAME = "Yihonal Trading Plc";
export const SITE_SHORT_NAME = "Yihonal Trading";
export const DEFAULT_SITE_URL =
  "https://abelasnake777.github.io/yihonal-trading";

export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || DEFAULT_SITE_URL).replace(/\/$/, "");

export const DEFAULT_DESCRIPTION =
  "Yihonal Trading Plc supplies and exports traceable Ethiopian specialty coffee from Sidama for international coffee buyers.";

export const INSTAGRAM_URL =
  "https://www.instagram.com/yihonal_coffee?igsh=MTVzcGJ1dmU0eGwwcQ==";

export function absoluteUrl(path = "/") {
  if (/^https?:\/\//.test(path)) return path;
  const normalized = path === "/" ? "" : "/" + path.replace(/^\/+|\/+$/g, "");
  return SITE_URL + normalized + (normalized ? "/" : "/");
}

export function assetUrl(path: string) {
  return SITE_URL + "/" + path.replace(/^\/+/, "");
}

type PageMetadataInput = {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
};

export function createPageMetadata({
  title,
  description,
  path,
  keywords = [],
}: PageMetadataInput): Metadata {
  const canonical = absoluteUrl(path);
  const socialImage = assetUrl("/images/yihonal-coffee-og.jpg");

  return {
    title,
    description,
    keywords,
    alternates: { canonical },
    openGraph: {
      type: "website",
      locale: "en_US",
      url: canonical,
      siteName: SITE_NAME,
      title: `${title} | ${SITE_SHORT_NAME}`,
      description,
      images: [
        {
          url: socialImage,
          width: 1200,
          height: 630,
          alt: "Ethiopian specialty coffee landscape represented by Yihonal Trading",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${SITE_SHORT_NAME}`,
      description,
      images: [socialImage],
    },
  };
}
