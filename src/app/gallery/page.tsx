import type { Metadata } from "next";
import { readdir } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";
import GalleryExperience, { type GalleryImageData } from "@/app/components/GalleryExperience";
import Header from "@/app/components/Header";
import { assetPath } from "@/app/lib/assets";
import { createPageMetadata } from "@/app/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Ethiopian Coffee Gallery",
  description:
    "View original photographs of Ethiopian coffee origins, farms, drying beds, processing, people, and quality-focused work from Yihonal Trading.",
  path: "/gallery",
  keywords: ["Ethiopian coffee photos", "Sidama coffee farms", "coffee drying beds Ethiopia"],
});

export const dynamic = "force-static";

const supportedExtensions = new Set([".jpg", ".jpeg", ".png", ".webp", ".avif", ".gif"]);

async function findImages(directory: string): Promise<string[]> {
  try {
    const entries = await readdir(directory, { withFileTypes: true });
    const discovered = await Promise.all(
      entries.map(async (entry) => {
        const entryPath = path.join(directory, entry.name);

        if (entry.isDirectory()) return findImages(entryPath);
        if (!supportedExtensions.has(path.extname(entry.name).toLowerCase())) return [];

        return [entryPath];
      }),
    );

    return discovered.flat();
  } catch {
    return [];
  }
}

function createAltText(filePath: string) {
  const name = path
    .basename(filePath, path.extname(filePath))
    .replace(/([a-zA-Z])(\d)/g, "$1 $2")
    .replace(/[-_]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  const title = name.replace(/\b\w/g, (letter) => letter.toUpperCase());
  return title ? "Yihonal Coffee — " + title : "Yihonal Coffee gallery image";
}

function galleryScore(value: string) {
  let hash = 2166136261;

  for (let index = 0; index < value.length; index += 1) {
    hash ^= value.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }

  return hash >>> 0;
}

async function getGalleryImages(): Promise<GalleryImageData[]> {
  const publicDirectory = path.join(process.cwd(), "public");
  const galleryDirectory = path.join(publicDirectory, "images", "gallery");
  const discoveredImages = await findImages(galleryDirectory);
  const uniqueImages = Array.from(new Set(discoveredImages));

  const images = await Promise.all(
    uniqueImages.map(async (filePath) => {
      let width = 4;
      let height = 3;

      try {
        const metadata = await sharp(filePath).metadata();
        width = metadata.width || width;
        height = metadata.height || height;

        if ([5, 6, 7, 8].includes(metadata.orientation || 1)) {
          [width, height] = [height, width];
        }
      } catch {
        // Keep the fallback ratio so one unreadable file cannot break the gallery.
      }

      const relativePath = path
        .relative(publicDirectory, filePath)
        .split(path.sep)
        .map((segment) => encodeURIComponent(segment))
        .join("/");

      return {
        src: assetPath("/" + relativePath),
        alt: createAltText(filePath),
        width,
        height,
      };
    }),
  );

  const shuffleSeed = String(images.length) + ":";
  return images.sort(
    (first, second) =>
      galleryScore(shuffleSeed + first.src) - galleryScore(shuffleSeed + second.src),
  );
}

export default async function GalleryPage() {
  const images = await getGalleryImages();

  return (
    <main className="gallery-page">
      <Header />
      <GalleryExperience images={images} />
    </main>
  );
}
