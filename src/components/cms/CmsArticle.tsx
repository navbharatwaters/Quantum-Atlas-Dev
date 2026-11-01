import Link from 'next/link'
import { localeHref, type Locale } from '@/lib/i18n'
import { getCmsUi } from '@/content/cms'
import type { Media } from '@/payload-types'

export interface CmsImage {
  url: string
  alt: string
}

/** Payload prefixes media urls with serverURL; keep them host-relative so the page works on any host. */
export function relativeUrl(url: string | null | undefined): string | null {
  if (!url) return null
  return /^https?:\/\//.test(url) ? new URL(url).pathname : url
}

/** Resolve a populated Media relation to the best size for a wide image. */
export function mediaImage(m: number | Media | null | undefined, size: 'card' | 'hero' = 'hero'): CmsImage | null {
  if (!m || typeof m !== 'object') return null
  const url = relativeUrl(m.sizes?.[size]?.url || m.url)
  return url ? { url, alt: m.alt || '' } : null
}

export function formatDate(iso: string | null | undefined, locale: Locale): string | null {
  if (!iso) return null
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return null
  return d.toLocaleDateString(locale === 'ru' ? 'ru-RU' : 'en-GB', { month: 'long', year: 'numeric', timeZone: 'UTC' })
}

interface Props {
  locale: Locale
  jsonLd: Record<string, unknown>
  jsonLdId: string
  chips: string[]
  metaLine?: string
  title: string
  lede?: string | null
  image?: CmsImage | null
  backHref: string
  backLabel: string
  /** Hide the discovery-call CTA band (it is on by default). */
  noCta?: boolean
  children: React.ReactNode
}

/** Shared dark/amber article shell for CMS blog posts, case studies and guides. */
export function CmsArticle({ locale, jsonLd, jsonLdId, chips, metaLine, title, lede, image, backHref, backLabel, noCta, children }: Props) {
  const ui = getCmsUi(locale)
  return (
    <div className="bg-space-dark min-h-screen">
      <script id={jsonLdId} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }} />

      <section className="pt-32 pb-12 px-6 lg:px-8" style={{ background: '#0C0A08' }}>
        <div className="max-w-3xl mx-auto">
          <div className="flex flex-wrap items-center gap-3 mb-6">
            {chips.map((c) => (
              <span key={c} className="px-2.5 py-1 rounded text-[11px]" style={{ background: '#FFBF0020', color: '#FFBF00', fontFamily: 'var(--font-mono)' }}>
                {c}
              </span>
            ))}
            {metaLine && (
              <span className="text-text-secondary text-xs" style={{ fontFamily: 'var(--font-mono)' }}>
                {metaLine}
              </span>
            )}
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold text-text-primary leading-[1.1] mb-6" style={{ fontFamily: 'var(--font-display)' }}>
            {title}
          </h1>
          {lede && <p className="text-text-secondary text-xl leading-relaxed">{lede}</p>}
        </div>
      </section>

      {image && (
        <div className="px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={image.url} alt={image.alt} className="w-full h-auto rounded-xl border border-space-border" />
          </div>
        </div>
      )}

      <section className="py-12 px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">{children}</div>
      </section>

      {!noCta && (
        <section className="py-16 px-6 lg:px-8 border-t border-space-border">
          <div className="max-w-3xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
            <p className="text-text-primary font-semibold" style={{ fontFamily: 'var(--font-display)' }}>
              {ui.ctaLead}
            </p>
            <Link
              href={localeHref(locale, '/contact')}
              className="shrink-0 px-6 py-3 rounded-lg bg-electric-blue text-white font-semibold text-sm hover:brightness-110 transition-all"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              {ui.ctaButton}
            </Link>
          </div>
        </section>
      )}

      <section className="py-12 px-6 lg:px-8" style={{ background: '#12100D' }}>
        <div className="max-w-3xl mx-auto">
          <Link href={backHref} className="text-electric-blue hover:underline text-sm">
            {backLabel} →
          </Link>
        </div>
      </section>
    </div>
  )
}
