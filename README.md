# Yihonal Trading Plc

Production website for Yihonal Trading Plc, an Ethiopian specialty coffee supplier and exporter based in Addis Ababa with coffee sites in Sidama.

## Stack

- Next.js App Router with static export
- React and TypeScript
- Plain responsive CSS
- Sharp for build-time gallery metadata
- GitHub Pages deployment through GitHub Actions

## Development

```bash
npm ci
npm run dev
```

Open `http://localhost:3000`.

## Quality checks

```bash
npm run lint
npm run build
```

The production export is generated in `out/`.

## SEO configuration

Copy `.env.example` when a local override is needed. The important values are:

- `NEXT_PUBLIC_SITE_URL`: full public website URL, including a subpath for a GitHub Pages project site
- `NEXT_PUBLIC_BASE_PATH`: deployment subpath, currently `/yihonal-trading` in GitHub Actions
- `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION`: Google Search Console verification token
- `NEXT_PUBLIC_BING_SITE_VERIFICATION`: Bing Webmaster Tools verification token

SEO files are generated at build time:

- `/sitemap.xml`
- `/robots.txt`
- `/manifest.webmanifest`

When a custom domain is purchased, update `NEXT_PUBLIC_SITE_URL` in `.github/workflows/deploy-pages.yml`, configure the domain in GitHub Pages, and submit the new sitemap URL in Google Search Console.

## Deployment

Pushes to `main` trigger `.github/workflows/deploy-pages.yml`. The workflow builds with the GitHub Pages base path and deploys the `out/` directory.

Current configured project URL:

`https://abelasnake777.github.io/yihonal-trading/`

## Search launch checklist

1. Confirm the GitHub Pages deployment is enabled for GitHub Actions.
2. Add the Google Search Console verification value as a repository secret named `GOOGLE_SITE_VERIFICATION`.
3. Optionally add Bing verification as `BING_SITE_VERIFICATION`.
4. Submit `sitemap.xml` after the production URL is live.
5. Request indexing for the home page and main coffee pages.
6. Keep business name, address, and phone consistent across the website and verified business profiles.
