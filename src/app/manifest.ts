import type { MetadataRoute } from "next";
import { assetUrl, SITE_NAME } from "@/app/lib/seo";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: SITE_NAME,
    short_name: "Yihonal Coffee",
    description:
      "Traceable Ethiopian specialty coffee for international buyers.",
    start_url: "./",
    display: "standalone",
    background_color: "#eee2cf",
    theme_color: "#21130c",
    icons: [
      {
        src: assetUrl("images/yihonal_icon.png"),
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
    ],
  };
}
