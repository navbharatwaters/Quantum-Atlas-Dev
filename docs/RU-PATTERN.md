# Russian site: the pattern

Established by the homepage pilot. Follow it for every new Russian page.

## File layout

```
src/app/(frontend)/**           English pages (root layout, <html lang="en">)
src/app/(ru)/layout.tsx         Russian root layout (<html lang="ru">, Manrope for --font-display)
src/app/(ru)/ru/<page>/page.tsx Russian pages (URL /ru/<page>)
src/content/<page>.types.ts     One interface for the page copy (both locales satisfy it)
src/content/<page>.en.ts        English copy (moved out of the component, text unchanged)
src/content/<page>.ru.ts        Russian copy
src/content/<page>.ts           getX(locale) accessor (see home.ts)
src/lib/i18n.ts                 Locale, UI dictionary, link + hreflang helpers, RU_PAGES
src/lib/site.ts                 SITE_URL_EN, RU_BASE_URL, RU_PATH_PREFIX, enUrl(), ruUrl()
src/lib/contact.ts              RU_CONTACT (exact owner-provided details)
```

Components take `locale?: Locale` (default `'en'`), read copy with `getX(locale)`
and chrome strings with `getUi(locale)`. Copy never lives inline in a component.

## Add a page

1. Move the English copy into `src/content/<page>.en.ts` behind a typed
   `<page>.types.ts` interface. English output must stay identical.
2. Write `<page>.ru.ts` (formal "вы", natural business Russian, no calques; keep
   numbers, product names and claims exactly as in English; no new claims).
3. Make the English components/sections accept `locale` and read from the content.
4. Create `src/app/(ru)/ru/<page>/page.tsx`. Copy the metadata block from
   `src/app/(ru)/ru/page.tsx`: Russian title (<= 60 chars), description (130-155),
   `alternates: pageAlternates('ru', '/<page>')`, `openGraph.locale: 'ru_RU'`,
   JSON-LD with `inLanguage: 'ru'` and `ruUrl()` URLs.
5. In the English page add `alternates: pageAlternates('en', '/<page>')`.
6. Add `'/<page>'` to `RU_PAGES` in `src/lib/i18n.ts`. This single change turns on
   Russian links everywhere (nav, footer, buttons), the language switcher target and
   the sitemap entries (with alternates).
7. Use `localeHref(locale, '/path')` for every internal link (never raw strings).

## Add dictionary strings

Shared chrome (nav, footer, chat, common buttons) goes in `UiStrings` in
`src/lib/i18n.ts`. Add the key to the interface first, then both `en` and `ru`
objects (TypeScript fails the build if one is missing). Page-specific copy goes in
`src/content/`, not in the dictionary.

## Rules

- Contact details on Russian pages come only from `RU_CONTACT`. Do not invent
  address, job title, messenger, hours or a Cyrillic spelling of the name.
- No hostnames in code: use `enUrl()` / `ruUrl()` / `RU_BASE_URL`.
- Keep pages static (no `headers()` / `cookies()` in layouts or pages).
- Fonts: the Russian tree overrides `--font-display`; use `var(--font-display)` /
  `font-display` as the English pages do, never a hard-coded font name.

## Checklist before merging a Russian page

- [ ] `pnpm exec tsc --noEmit` and `pnpm build` pass; `/ru/<page>` is `○` (static)
- [ ] `<html lang="ru">`, one `<h1>`, title <= 60, description 130-155 chars
- [ ] canonical = Russian URL; hreflang en / ru / x-default present on both versions
- [ ] English page text unchanged (diff the content files, not the components)
- [ ] All internal links use `localeHref`; untranslated targets listed in the PR
- [ ] Added to `RU_PAGES`; appears in `/sitemap.xml` with alternates
- [ ] No hardcoded hostnames and no legacy-domain references in code or copy
