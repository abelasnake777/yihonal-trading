import { assetPath } from "@/app/lib/assets";

export const navigation = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Products", href: "/#products" },
  { label: "Awards", href: "/#awards" },
  { label: "Gallery", href: "/gallery" },
  { label: "Contact", href: "/#contact" },
];

export const products = [
  {
    name: "Washed",
    image: assetPath("/images/sample.jpg"),
    notes: "Floral, Citrus, Bright",
    description: "Clean washed lots prepared for roasters who need clarity and consistent cup structure.",
    details:
      "Washed coffee is selected for clean acidity, clear floral notes, and reliable structure. It is ideal for buyers who want a bright Ethiopian cup that performs well in filter roasting.",
  },
  {
    name: "Natural",
    image: assetPath("/images/farm.jpg"),
    notes: "Smooth, Sweet, Balanced",
    description: "Sun-dried naturals with a round body, berry sweetness, and a classic Yirgacheffe profile.",
    details:
      "Natural coffee is dried carefully to build sweetness and fruit character. This lot style works well for roasters looking for a memorable cup with body and aroma.",
  },
  {
    name: "Honey",
    image: assetPath("/images/sample.jpg"),
    notes: "Fruity, Rich Body",
    description: "Carefully processed honey coffee with fruit-forward sweetness and a polished finish.",
    details:
      "Honey processing keeps selected mucilage during drying, creating a cup that balances fruit, sweetness, and a rounded mouthfeel.",
  },
];

export const awards = [
  {
    year: "2024",
    title: "Cup of Excellence",
    detail: "Score 90.25 · Finalist\nYirgacheffe Natural Process",
    image: assetPath("/images/sample.jpg"),
  },
  {
    year: "2023",
    title: "Ethiopia Taste of Harvest",
    detail: "1st Place · Natural Category\nGedeb Woreda",
    image: assetPath("/images/back_image.jpg"),
  },
  {
    year: "2024",
    title: "Good Food Awards",
    detail: "Winner · USA",
    image: assetPath("/images/farm.jpg"),
  },
];

export const contactLinks = [
  { label: "Phone / WhatsApp", value: "+251 911 234 567", href: "tel:+251911234567" },
  { label: "Email", value: "hello@yihonalcoffee.com", href: "mailto:hello@yihonalcoffee.com" },
  { label: "Instagram", value: "@yihonalcoffee", href: "https://instagram.com/yihonalcoffee" },
  { label: "Facebook", value: "facebook.com/yihonalcoffee", href: "https://facebook.com/yihonalcoffee" },
  { label: "Location", value: "Gedeb Woreda, Yirgacheffe, Ethiopia", href: "" },
];

export const heroSlides = [
  assetPath("/images/back_image.jpg"),
  assetPath("/images/back_image2.jpg"),
  assetPath("/images/sample.jpg"),
  assetPath("/images/farm.jpg"),
];

export const galleryImages = [
  assetPath("/images/gallery/photo1.jpg"),
  assetPath("/images/gallery/photo2.jpg"),
  assetPath("/images/gallery/photo3.jpg"),
  assetPath("/images/gallery/photo4.jpg"),
  assetPath("/images/gallery/photo5.jpg"),
  assetPath("/images/gallery/photo6.jpg"),
  assetPath("/images/gallery/photo7.jpg"),
  assetPath("/images/gallery/photo8.jpg"),
  assetPath("/images/back_image.jpg"),
  assetPath("/images/back_image2.jpg"),
  assetPath("/images/farm.jpg"),
  assetPath("/images/sample.jpg"),
];
