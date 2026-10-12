import { createHash } from "node:crypto";
import { readdir, readFile, mkdir, writeFile, stat, unlink } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const root = path.resolve("public");
const destination = path.join(root, "optimized");
const manifest = {};
const generatedNames = new Set();
let originalBytes = 0;
let largestVariantBytes = 0;

async function visit(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  for (const entry of entries.sort((a, b) => a.name.localeCompare(b.name))) {
    const filename = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      await visit(filename);
      continue;
    }
    if (!/\.(?:jpe?g|png|webp|avif)$/i.test(entry.name)) continue;
    const input = await readFile(filename);
    const metadata = await sharp(input).metadata();
    const width = [5, 6, 7, 8].includes(metadata.orientation) ? metadata.height : metadata.width;
    const widths = [...new Set([160, 320, 480, 640, 960, 1280, 1600, Math.min(width, 1920)].filter((size) => size <= width))].sort((a, b) => a - b);
    const hash = createHash("sha256").update(input).update("webp-v1-quality78").digest("hex").slice(0, 16);
    const avifHash = createHash("sha256").update(input).update("avif-v1-quality45-effort0").digest("hex").slice(0, 16);
    const source = "/" + path.relative(root, filename).split(path.sep).join("/");
    const variants = [];
    for (const size of widths) {
      const name = `${hash}-${size}.webp`;
      const filename = path.join(destination, name);
      generatedNames.add(name);
      let bytes;
      try {
        bytes = (await stat(filename)).size;
      } catch {
        const output = await sharp(input).rotate().resize({ width: size, withoutEnlargement: true }).webp({ quality: 78, effort: 5 }).toBuffer();
        await writeFile(filename, output);
        bytes = output.length;
      }
      const avifName = `${avifHash}-${size}.avif`;
      const avifFilename = path.join(destination, avifName);
      generatedNames.add(avifName);
      let avifBytes;
      try {
        avifBytes = (await stat(avifFilename)).size;
      } catch {
        const output = await sharp(input).rotate().resize({ width: size, withoutEnlargement: true }).avif({ quality: 45, effort: 0 }).toBuffer();
        await writeFile(avifFilename, output);
        avifBytes = output.length;
      }
      variants.push({ src: "/optimized/" + name, width: size, bytes, avifSrc: "/optimized/" + avifName, avifBytes });
    }
    manifest[source] = variants;
    originalBytes += input.length;
    largestVariantBytes += variants.at(-1).bytes;
  }
}

await mkdir(destination, { recursive: true });
await visit(path.join(root, "images"));
for (const name of await readdir(destination)) {
  if (!generatedNames.has(name) && /^[a-f0-9]{16}-\d+\.(?:webp|avif)$/.test(name)) await unlink(path.join(destination, name));
}
await writeFile("src/app/data/optimized-images.json", JSON.stringify(manifest, null, 2) + "\n");
console.log(`Prepared ${Object.keys(manifest).length} responsive images; full-size variants ${(largestVariantBytes / 1e6).toFixed(2)} MB versus ${(originalBytes / 1e6).toFixed(2)} MB originals.`);
