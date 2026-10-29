import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import SiteFooter from "@/app/components/SiteFooter";
import { I18nProvider } from "@/i18n/I18nContext";
import {
  absoluteUrl,
  assetUrl,
  DEFAULT_DESCRIPTION,
  INSTAGRAM_URL,
  SITE_NAME,
  SITE_SHORT_NAME,
  SITE_URL,
} from "@/app/lib/seo";
import "./globals.css";

const googleVerification = process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION;
const bingVerification = process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL + "/"),
  applicationName: SITE_NAME,
  title: {
    default: "Ethiopian Specialty Coffee Exporter | Yihonal Trading",
    template: "%s | Yihonal Trading",
  },
  description: DEFAULT_DESCRIPTION,
  keywords: [
    "Yihonal Trading",
    "Ethiopian coffee exporter",
    "Ethiopian specialty coffee",
    "Ethiopian green coffee supplier",
    "Sidama coffee exporter",
    "specialty coffee exporter Ethiopia",
    "Ethiopian coffee international buyers",
  ],
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  category: "Coffee export",
  alternates: { canonical: absoluteUrl("/") },
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: absoluteUrl("/"),
    siteName: SITE_NAME,
    title: "Yihonal Trading | Ethiopian Specialty Coffee Exporter",
    description: DEFAULT_DESCRIPTION,
    images: [
      {
        url: assetUrl("images/yihonal-coffee-og.jpg"),
        width: 1200,
        height: 630,
        alt: "Ethiopian specialty coffee landscape represented by Yihonal Trading",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Yihonal Trading | Ethiopian Specialty Coffee Exporter",
    description: DEFAULT_DESCRIPTION,
    images: [assetUrl("images/yihonal-coffee-og.jpg")],
  },
  icons: {
    icon: assetUrl("images/yihonal_icon.png"),
    shortcut: assetUrl("images/yihonal_icon.png"),
    apple: assetUrl("images/yihonal_icon.png"),
  },
  manifest: assetUrl("manifest.webmanifest"),
  verification: {
    ...(googleVerification ? { google: googleVerification } : {}),
    ...(bingVerification ? { other: { "msvalidate.01": bingVerification } } : {}),
  },
};

export const viewport: Viewport = {
  themeColor: "#21130c",
  colorScheme: "light",
};

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": SITE_URL + "/#organization",
      name: SITE_NAME,
      alternateName: [SITE_SHORT_NAME, "Yihonal Coffee"],
      url: absoluteUrl("/"),
      logo: {
        "@type": "ImageObject",
        url: assetUrl("images/yihonal_logo.png"),
        width: 800,
        height: 527,
      },
      description: DEFAULT_DESCRIPTION,
      email: "yihonal4@gmail.com",
      telephone: "+251916823355",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Addis Ababa",
        addressRegion: "Bole",
        addressCountry: "ET",
      },
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "sales",
        email: "yihonal4@gmail.com",
        telephone: "+251916823355",
        availableLanguage: ["English", "Amharic"],
        areaServed: "Worldwide",
      },
      sameAs: [INSTAGRAM_URL],
      knowsAbout: [
        "Ethiopian specialty coffee",
        "Sidama coffee",
        "Green coffee export",
        "Coffee processing",
        "Coffee quality control",
      ],
    },
    {
      "@type": "WebSite",
      "@id": SITE_URL + "/#website",
      url: absoluteUrl("/"),
      name: SITE_NAME,
      description: DEFAULT_DESCRIPTION,
      publisher: { "@id": SITE_URL + "/#organization" },
      inLanguage: "en",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <noscript>
          <style>{".about-reveal,.gallery-tile{opacity:1!important;transform:none!important}"}</style>
        </noscript>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
          }}
        />
        <I18nProvider>
          <a className="skip-to-content" href="#main-content">Skip to content</a>
          {children}
          <SiteFooter />
        </I18nProvider>
      </body>
    </html>
  );
}
