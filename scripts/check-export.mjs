import assert from "node:assert/strict";
import { readdir, readFile, stat } from "node:fs/promises";
import path from "node:path";

const root = path.resolve("out");
const origin = "https://yihonaltrading.com";
const pages = [];
async function walk(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const filename = path.join(directory, entry.name);
    if (entry.isDirectory()) await walk(filename);
    else if (filename.endsWith(".html")) pages.push(filename);
  }
}
async function exists(filename) {
  try { return await stat(filename); } catch { return null; }
}
function attributes(tag) {
  return Object.fromEntries([...tag.matchAll(/([\w-]+)="([^"]*)"/g)].map((match) => [match[1].toLowerCase(), match[2]]));
}
const checked = new Set();
async function checkReference(reference, page) {
  if (!reference.startsWith("/") || reference.startsWith("//")) return;
  const url = new URL(reference, origin);
  if (checked.has(url.pathname)) return;
  checked.add(url.pathname);
  const filename = path.join(root, decodeURIComponent(url.pathname));
  const info = await exists(filename);
  assert(info, `Missing asset or route: ${reference} in ${page}`);
  if (info.isDirectory()) assert(await exists(path.join(filename, "index.html")), `Missing route index: ${reference}`);
}

await walk(root);
for (const page of pages) {
  const html = await readFile(page, "utf8");
  const relative = path.relative(root, page).replaceAll(path.sep, "/");
  const error = relative === "404.html" || relative.startsWith("404/") || relative.startsWith("_not-found/");
  assert.equal((html.match(/<h1(?:\s|>)/g) || []).length, 1, `${relative}: expected one H1`);
  assert.match(html, /<title>[^<]*Yihonal Trading[^<]*<\/title>/, `${relative}: branded title`);
  assert.match(html, /<meta name="description" content="[^\"]+"/, `${relative}: description`);
  const canonical = [...html.matchAll(/<link\b[^>]*rel="canonical"[^>]*>/g)];
  if (error) {
    assert.match(html, /<meta name="robots" content="[^"]*noindex/, `${relative}: noindex on error page`);
    assert.equal(canonical.length, 0, `${relative}: error pages must not canonicalize to the homepage`);
  } else {
    assert.equal(canonical.length, 1, `${relative}: one canonical`);
    const route = relative === "index.html" ? "/" : "/" + relative.replace(/index\.html$/, "");
    assert.equal(attributes(canonical[0][0]).href, origin + route, `${relative}: production canonical`);
    assert(!/<meta name="robots" content="[^"]*noindex/.test(html), `${relative}: indexable`);
  }
  for (const match of html.matchAll(/<(?:a|img|script|link|source)\b[^>]*>/g)) {
    const attrs = attributes(match[0]);
    if (match[0].startsWith("<img")) {
      assert("alt" in attrs, `${relative}: missing image alt`);
      assert(attrs.srcset, `${relative}: missing responsive image variants`);
    }
    for (const key of ["href", "src"]) if (attrs[key]) await checkReference(attrs[key], relative);
    for (const candidate of (attrs.srcset || "").split(",")) {
      const src = candidate.trim().split(/\s+/)[0];
      if (src) await checkReference(src, relative);
    }
  }
  for (const match of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) JSON.parse(match[1]);
  assert(!html.includes("/_next/image?"), `${relative}: server image API in static export`);
}
const sitemap = await readFile(path.join(root, "sitemap.xml"), "utf8");
const urls = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map((match) => match[1]);
assert.equal(urls.length, 11, "Expected 11 public pages in sitemap");
for (const url of urls) {
  assert.equal(new URL(url).origin, origin, "Production sitemap origin");
  await checkReference(new URL(url).pathname, "sitemap");
}
const robots = await readFile(path.join(root, "robots.txt"), "utf8");
assert(robots.includes(`Sitemap: ${origin}/sitemap.xml`), "Production robots sitemap");
assert(!robots.includes("Disallow: /"), "Public pages must be crawlable");
const rules = await readFile(path.join(root, ".htaccess"), "utf8");
assert(rules.includes("ErrorDocument 404 /404.html"), "Custom 404 hosting rule");
assert(rules.includes(origin), "Canonical HTTPS hosting rule");
console.log(`Verified ${pages.length} exported HTML pages, ${urls.length} sitemap URLs, and ${checked.size} local routes/assets.`);
