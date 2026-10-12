# Yihonal Trading Plc

Production website for Yihonal Trading Plc, an Ethiopian specialty coffee supplier and exporter based in Addis Ababa with coffee sites in Sidama.

## Stack

- Next.js App Router with static export
- React and TypeScript
- Plain responsive CSS
- Sharp for build-time responsive WebP images and gallery metadata
- Static hosting through Yegara DirectAdmin/LiteSpeed

## Development

```bash
npm ci
npm run dev
```

Open `http://localhost:3000`.

## Production checks and build

```bash
npm ci
npm audit --omit=dev
NEXT_PUBLIC_SITE_URL=https://yihonaltrading.com npm run release
```

The checked upload archive is generated at `release/yihonal-trading-yegara.zip`. Python 3 is needed only to package the ZIP; Node.js 22 LTS is recommended for development and builds.

The deployable website is generated in `out/`. It is a static site and does not require Docker, Node.js, PHP or a database on the hosting server.

## SEO configuration

The production domain defaults to `https://yihonaltrading.com`. Copy `.env.example` to `.env.production.local` only when verification values or a temporary domain override are needed.

- `NEXT_PUBLIC_SITE_URL`: canonical production origin without a trailing slash
- `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION`: Google Search Console HTML verification token
- `NEXT_PUBLIC_BING_SITE_VERIFICATION`: Bing Webmaster Tools verification token

SEO files are generated during the build:

- `/sitemap.xml`
- `/robots.txt`
- `/manifest.webmanifest`

## Yegara deployment

1. Run the production build shown above.
2. Use the generated release ZIP. It includes hidden `.htaccess`, with `index.html` at the archive root.
3. In DirectAdmin, open the domain's `public_html` directory.
4. Back up the existing website and preserve hosting-managed files such as `.well-known`.
5. Remove the default placeholder `index.html`.
6. Upload and extract the release archive directly into `public_html`.
7. Confirm that `public_html/index.html`, `public_html/_next/`, `public_html/images/`, `public_html/optimized/`, `public_html/robots.txt` and `public_html/sitemap.xml` exist.
8. Enable the automatic SSL certificate for both the root domain and `www`, then redirect all traffic to `https://yihonaltrading.com`.

Do not upload the source project, `node_modules`, or the outer `out` directory. Every update follows the same build, backup and replacement process.

The exported `.htaccess` supplies the canonical HTTPS redirect, custom 404, directory-listing protection, security headers, compression and caching rules for Yegara's LiteSpeed server. If Yegara has already created custom `.htaccess` rules, merge them instead of discarding either version.

## Search launch checklist

1. Verify `https://yihonaltrading.com/`, `/robots.txt` and `/sitemap.xml`.
2. Add the domain property to Google Search Console.
3. Add Google's DNS TXT verification record through the domain control panel.
4. Submit `https://yihonaltrading.com/sitemap.xml`.
5. Request indexing for the home page and main coffee pages.
6. Keep the business name, address and phone consistent across the website and verified business profiles.

## Responsive images and verification

Builds generate responsive WebP variants from the original images. `OptimizedImage` uses standard HTML `srcset`, reserves image dimensions, and lazy-loads images below the fold. Generated filenames contain a content hash for safe long-term caching. Originals are preserved. The homepage initially renders only the first background instead of downloading all slides together.

`npm run check:export` verifies production canonical URLs, branded titles, descriptions, one H1 per page, image descriptions and responsive variants, local assets and routes, structured-data JSON, sitemap, robots.txt, and error-page noindex behavior. It also rejects server image-optimization URLs in the static export.

GitHub checks builds and uploads the Yegara ZIP as an Actions artifact. The old GitHub Pages deployments are removed; pushing source does not publish changes to Yegara. Upload each verified release manually until a hosting deployment integration is configured.

## Checks after uploading

- Ensure SSL covers the root domain and `www`, then check both HTTP and `www` redirect to `https://yihonaltrading.com` without a loop.
- Confirm a nonexistent URL returns HTTP 404 with the custom error page. Normal pages must return HTTP 200.
- Check that `/robots.txt` and `/sitemap.xml` are reachable.
- Check mobile navigation, image viewers, WhatsApp, email, phone and map links.
- Measure the live site using PageSpeed Insights. Visual browser testing and Yegara behavior still need verification on the actual service.
- Verify Search Console using DNS TXT and submit the sitemap. DNS verification does not require a code change. Search engines control indexing and rankings.

## Dependency audit

The 2026-10-12 production audit (`npm audit --omit=dev`) reports zero vulnerabilities after framework and image-library updates. The full audit still reports the upstream `braces` advisory through the development-only Next.js ESLint plugin chain. There is no patched `braces` release available in the current registry; the suggested forced fix downgrades the lint configuration across major versions. This chain is used for linting trusted repository patterns and is not shipped as a server in the static release. Recheck it when updating development tooling.
