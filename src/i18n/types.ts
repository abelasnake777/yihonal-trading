export type SupportedLocale =
  | "am"
  | "zh"
  | "ja"
  | "ko"
  | "fr"
  | "de"
  | "es"
  | "ar"
  | "nl"
  | "it"
  | "pt"
  | "en";

export interface LocaleInfo {
  code: SupportedLocale;
  name: string;
  nativeName: string;
  dir: "ltr" | "rtl";
  flag: string;
  countryCode: string;
}

export interface TranslationDictionary {
  common: {
    brandName: string;
    companyName: string;
    tagline: string;
    subTagline: string;
    contactUs: string;
    exploreSites: string;
    viewProducts: string;
    learnMore: string;
    backToHome: string;
    skipToContent: string;
    close: string;
    previous: string;
    next: string;
    origin: string;
    rightsReserved: string;
  };
  nav: {
    home: string;
    about: string;
    products: string;
    awards: string;
    sites: string;
    gallery: string;
    contact: string;
    openMenu: string;
    closeMenu: string;
    selectLanguage: string;
    autoDetect: string;
    detectedFrom: string;
  };
  hero: {
    title: string;
    tagline: string;
    exporterTitle: string;
    exporterDesc: string;
    scrollDown: string;
  };
  highlights: {
    origin: string;
    originDesc: string;
    traceability: string;
    traceabilityDesc: string;
    processing: string;
    processingDesc: string;
    export: string;
    exportDesc: string;
  };
  products: {
    kicker: string;
    title: string;
    intro: string;
    clickForDetails: string;
    notesLabel: string;
    dialogTitle: string;
    washed: { name: string; notes: string; desc: string; details: string };
    natural: { name: string; notes: string; desc: string; details: string };
    honey: { name: string; notes: string; desc: string; details: string };
    anaerobic: { name: string; notes: string; desc: string; details: string };
    experimental: { name: string; notes: string; desc: string; details: string };
  };
  awards: {
    kicker: string;
    title: string;
    featuredTitle: string;
    featuredResult: string;
    featuredDesc: string;
    viewCertificate: string;
    galleryTitle: string;
    dialogTitle: string;
  };
  sites: {
    kicker: string;
    title: string;
    subtitle: string;
    elevationRange: string;
    exploreLink: string;
    chooseOrigin: string;
    fourSites: string;
    fourSitesDesc: string;
    altitudeBadge: string;
    metresAsl: string;
    elevationProfile: string;
    aboveSeaLevel: string;
    highElevation: string;
    region: string;
    localArea: string;
    variety: string;
    processingSystem: string;
    archiveNote: string;
    siteNumber: string;
    originArchive: string;
  };
  gallery: {
    kicker: string;
    title: string;
    subtitle: string;
    moments: string;
    livingArchive: string;
    archiveKicker: string;
    archiveTitle: string;
    archiveSubtitle: string;
    moreMoments: string;
    dialogTitle: string;
  };
  about: {
    heroTitle: string;
    heroTagline: string;
    journeyKicker: string;
    journeyTitle: string;
    step1Label: string;
    step1Title: string;
    step1Desc: string;
    step2Label: string;
    step2Title: string;
    step2Desc: string;
    step3Label: string;
    step3Title: string;
    step3Desc: string;
    step4Label: string;
    step4Title: string;
    step4Desc: string;
    valuesKicker: string;
    valuesTitle: string;
    value1Title: string;
    value1Desc: string;
    value2Title: string;
    value2Desc: string;
    value3Title: string;
    value3Desc: string;
    value4Title: string;
    value4Desc: string;
  };
  contact: {
    kicker: string;
    title: string;
    subtitle: string;
    companyContact: string;
    locationLabel: string;
    locationValue: string;
    phoneLabel: string;
    emailLabel: string;
    instagramLabel: string;
    messageWhatsApp: string;
    mapTitle: string;
  };
  resource: {
    buyerKicker: string;
    buyerTitle: string;
    contactCta: string;
    exploreProcessing: string;
  };
  footer: {
    kicker: string;
    title: string;
    desc: string;
    coffee: string;
    company: string;
    contact: string;
    ethiopianCoffee: string;
    sidamaCoffee: string;
    coffeeProcessing: string;
    qualityTraceability: string;
    exportServices: string;
    about: string;
    sites: string;
    gallery: string;
    address: string;
    rights: string;
    tagline: string;
  };
  geoBanner: {
    detectedNotice: string;
    switchPrompt: string;
    stay: string;
  };
}

