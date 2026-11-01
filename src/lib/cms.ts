/**
 * Read side of the CMS (Payload local API). Server-only.
 *
 * Rules:
 *  - Public reads always run with overrideAccess:false and no user, so the
 *    collection access rules (published only; case studies also approved) apply.
 *  - Lists never throw: an unreachable database yields [] and the caller shows the
 *    legacy / empty state (the build must not need a database).
 *  - Detail lookups return {ok:false} on error so a database blip is NOT cached as a 404.
 *  - Russian never falls back to English: a document without a Russian title does
 *    not exist in Russian.
 */
import { cache } from 'react'
import { getPayload } from 'payload'
import config from '@payload-config'
import type { Locale } from '@/lib/i18n'
import type { BlogPost, CaseStudy, Guide } from '@/payload-types'

export type CmsCollection = 'blog-posts' | 'case-studies' | 'guides'
/** Public documents always have a title (lists and lookups filter on it). */
export type CmsPost = BlogPost & { title: string }
export type CmsCase = CaseStudy & { title: string }
export type CmsGuide = Guide & { title: string }
interface DocByCollection {
  'blog-posts': CmsPost
  'case-studies': CmsCase
  guides: CmsGuide
}

export type Lookup<T> = { ok: true; doc: T | null } | { ok: false }

const SORT: Record<CmsCollection, string> = {
  'blog-posts': '-publishedDate',
  'case-studies': '-updatedAt',
  guides: '-publishedDate',
}

const fallbackFor = (locale: Locale) => (locale === 'ru' ? (false as const) : undefined)

/** Published (and, for case studies, approved) documents that have a title in `locale`. */
export const listDocs = cache(async <C extends CmsCollection>(collection: C, locale: Locale): Promise<DocByCollection[C][]> => {
  try {
    const payload = await getPayload({ config })
    const res = await payload.find({
      collection,
      locale,
      fallbackLocale: fallbackFor(locale),
      overrideAccess: false,
      draft: false,
      depth: 1,
      limit: 100,
      pagination: false,
      sort: SORT[collection],
    })
    return (res.docs as unknown as DocByCollection[C][]).filter((d) => Boolean((d as { title?: string }).title))
  } catch (err) {
    console.error('[cms] list failed:', collection, err instanceof Error ? err.message : err)
    return []
  }
})

/** One document by slug in `locale`; null when missing (or no Russian title for ru). */
export const getDoc = cache(async <C extends CmsCollection>(collection: C, slug: string, locale: Locale): Promise<Lookup<DocByCollection[C]>> => {
  try {
    const payload = await getPayload({ config })
    const res = await payload.find({
      collection,
      locale,
      fallbackLocale: fallbackFor(locale),
      overrideAccess: false,
      draft: false,
      depth: 1,
      limit: 1,
      pagination: false,
      where: { slug: { equals: slug } },
    })
    const doc = res.docs[0] as unknown as DocByCollection[C] | undefined
    return { ok: true, doc: doc && (doc as { title?: string }).title ? doc : null }
  } catch (err) {
    console.error('[cms] get failed:', collection, slug, err instanceof Error ? err.message : err)
    return { ok: false }
  }
})

/** Public display name of an author (users are not publicly readable; only the name leaves the server). */
export const getAuthorName = cache(async (author: BlogPost['author']): Promise<string | null> => {
  if (!author) return null
  try {
    if (typeof author === 'object') return author.name || null
    const payload = await getPayload({ config })
    const u = await payload.findByID({ collection: 'users', id: author, depth: 0, overrideAccess: true, select: { name: true } })
    return u.name || null
  } catch {
    return null
  }
})

export interface SitemapDoc {
  slug: string
  updatedAt: string
  hasRu: boolean
}

/** Slugs for sitemap.xml. Never throws. */
export async function sitemapDocs(collection: CmsCollection): Promise<SitemapDoc[]> {
  try {
    const payload = await getPayload({ config })
    const base = { collection, overrideAccess: false, draft: false, depth: 0, limit: 500, pagination: false, select: { slug: true, title: true, updatedAt: true } } as const
    const [en, ru] = await Promise.all([
      payload.find({ ...base, locale: 'en' }),
      payload.find({ ...base, locale: 'ru', fallbackLocale: false }),
    ])
    const ruSlugs = new Set((ru.docs as unknown as { slug: string; title?: string }[]).filter((d) => d.title).map((d) => d.slug))
    return (en.docs as unknown as { slug: string; title?: string; updatedAt: string }[])
      .filter((d) => d.title && d.slug)
      .map((d) => ({ slug: d.slug, updatedAt: d.updatedAt, hasRu: ruSlugs.has(d.slug) }))
  } catch (err) {
    console.error('[cms] sitemap failed:', collection, err instanceof Error ? err.message : err)
    return []
  }
}
