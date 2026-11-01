# Moving the Russian site to its own .ru domain

Today Russian lives under the English site at `/ru/...`. Everything Russian is
self-contained (`src/app/(ru)/`, `src/content/*.ru.ts`) and every host/path comes
from three env vars read in `src/lib/site.ts`. No hostname is hardcoded elsewhere.

| Variable | Default | Meaning |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | `https://quantumatlas.dev` | English origin |
| `NEXT_PUBLIC_RU_BASE_URL` | `${NEXT_PUBLIC_SITE_URL}/ru` | Public origin + prefix of the Russian site (no trailing slash) |
| `NEXT_PUBLIC_RU_PATH_PREFIX` | `/ru` | Path prefix of Russian URLs on the host that serves them. `''` when Russian is served at the root |

These are `NEXT_PUBLIC_*`, so they are baked in at **build** time.

## Steps

1. Build the Russian site for the new host with:
   - `NEXT_PUBLIC_RU_BASE_URL=https://<your-domain>.ru`
   - `NEXT_PUBLIC_RU_PATH_PREFIX=` (empty)
   - `NEXT_PUBLIC_SITE_URL` unchanged (still the English origin, used for hreflang and "EN" links).
2. Serve that build on the `.ru` host (Yandex Cloud) and rewrite every request
   `/:path*` to `/ru/:path*` for that host only (reverse proxy, e.g. Caddy/nginx
   `rewrite`, or `rewrites()` in `next.config.ts`). Static assets under `/_next/`
   and `/api/` must be excluded from the rewrite.
3. Rebuild the English site with `NEXT_PUBLIC_RU_BASE_URL=https://<your-domain>.ru`
   (prefix stays `/ru`) so its language switcher, hreflang and sitemap point to
   the `.ru` URLs. Add a 301 from `quantumatlas.dev/ru/:path*` to
   `https://<your-domain>.ru/:path*`.
4. Canonical, `hreflang` (en, ru, x-default), the sitemap entries and the JSON-LD URLs
   follow automatically from the env vars. Check `/ru` view-source after deploy.
5. Pages not yet translated link to the English page. When Russian is on another
   host these links become absolute English URLs automatically (`localeHref`).
6. Submit the `.ru` sitemap to Yandex Webmaster / Google Search Console and verify
   the new property. The chat widget calls `/api/chat` on the same host, so the
   `.ru` deployment needs the `/api/chat` route and its env (`OPENROUTER_API_KEY`) too.

## Checklist after switching

- `<html lang="ru">`, canonical = `.ru` URL, hreflang pairs reciprocal on both sites.
- Footer phone is a `tel:` link; email is `mailto:`.
- No `quantumatlas.dev/ru` links remain on the `.ru` host (grep the rendered HTML).
