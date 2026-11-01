import type { Metadata } from 'next'
import { alternates, localePath, pageAlternates, type Locale } from '@/lib/i18n'
import { enUrl, ruUrl } from '@/lib/site'
import type { Media } from '@/payload-types'

export const pageUrl = (locale: Locale, path: string) => (locale === 'ru' ? ruUrl(path) : enUrl(path))

/** Public link to a CMS page in `locale` (CMS URLs are not in RU_PAGES, so build them directly). */
export const cmsHref = (locale: Locale, path: string) => localePath(locale, path)

/** Canonical always; hreflang pairs only when the page exists in both languages. */
export function cmsAlternates(locale: Locale, path: string, bothLanguages: boolean): NonNullable<Metadata['alternates']> {
  if (bothLanguages) return pageAlternates(locale, path)
  return { canonical: alternates(path)[locale] }
}

export interface MetaInput {
  locale: Locale
  path: string
  title: string
  description?: string | null
  bothLanguages: boolean
  image?: Media | number | null
  openGraphType?: 'article' | 'website'
  publishedTime?: string | null
  modifiedTime?: string | null
  noindex?: boolean
}

export function buildMetadata(i: MetaInput): Metadata {
  const url = pageUrl(i.locale, i.path)
  const rawImg = i.image && typeof i.image === 'object' ? (i.image.sizes?.hero?.url || i.image.url) : null
  const img = rawImg ? (/^https?:\/\//.test(rawImg) ? new URL(rawImg).pathname : rawImg) : null
  const title = i.locale === 'ru' ? { absolute: `${i.title} — Quantum Atlas` } : i.title
  return {
    title,
    description: i.description || undefined,
    alternates: cmsAlternates(i.locale, i.path, i.bothLanguages),
    robots: i.noindex ? { index: false, follow: true } : undefined,
    openGraph: {
      title: i.title,
      description: i.description || undefined,
      type: i.openGraphType ?? 'website',
      locale: i.locale === 'ru' ? 'ru_RU' : 'en_US',
      url,
      ...(i.publishedTime ? { publishedTime: i.publishedTime } : {}),
      ...(i.modifiedTime ? { modifiedTime: i.modifiedTime } : {}),
      ...(img ? { images: [{ url: enUrl(img) }] } : {}),
    },
  }
}
