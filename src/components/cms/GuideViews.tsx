import Link from 'next/link'
import { RichTextBody } from '@/components/cms/RichTextBody'
import { CmsArticle, formatDate, relativeUrl } from '@/components/cms/CmsArticle'
import { ContentCard } from '@/components/shared/ContentCard'
import { getCmsUi } from '@/content/cms'
import { cmsHref, pageUrl } from '@/lib/cmsSeo'
import { enUrl } from '@/lib/site'
import type { Locale } from '@/lib/i18n'
import type { Media } from '@/payload-types'
import type { CmsGuide } from '@/lib/cms'

const BASE = '/knowledge/guides'

/** "From the CMS" block on /knowledge/guides (English only: there are no Russian Knowledge pages yet). */
export function CmsGuideSection({ items }: { items: CmsGuide[] }) {
  const ui = getCmsUi('en')
  return (
    <section className="pb-16 px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <p className="text-[11px] tracking-[3px] uppercase mb-6 text-text-secondary" style={{ fontFamily: 'var(--font-mono)' }}>
          {ui.fromCms}
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {items.map((g) => (
            <ContentCard
              key={g.slug}
              href={cmsHref('en', `${BASE}/${g.slug}`)}
              label={g.kind === 'whitepaper' ? ui.kindWhitepaper : ui.kindGuide}
              title={g.title}
              description={g.summary ?? undefined}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export function CmsGuideDetail({ item }: { item: CmsGuide }) {
  const locale: Locale = 'en'
  const ui = getCmsUi(locale)
  const path = `${BASE}/${item.slug}`
  const file = item.file && typeof item.file === 'object' ? (item.file as Media) : null
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: item.title,
    description: item.summary || item.seo?.description || undefined,
    inLanguage: locale,
    url: pageUrl(locale, path),
    dateModified: item.updatedAt,
    ...(item.publishedDate ? { datePublished: item.publishedDate } : {}),
    author: { '@type': 'Organization', name: 'Quantum Atlas', url: enUrl('/') },
    publisher: { '@type': 'Organization', name: 'Quantum Atlas', url: enUrl('/') },
  }
  return (
    <CmsArticle
      locale={locale}
      jsonLd={jsonLd}
      jsonLdId={`ld-guide-${item.slug}`}
      chips={[item.kind === 'whitepaper' ? ui.kindWhitepaper : ui.kindGuide]}
      metaLine={formatDate(item.publishedDate, locale) ?? undefined}
      title={item.title}
      lede={item.summary}
      backHref={cmsHref(locale, BASE)}
      backLabel={ui.allGuides}
    >
      <RichTextBody data={item.content as never} />
      {file?.url && (
        <div className="mt-10">
          {item.gated ? (
            <p className="text-text-secondary text-sm">{ui.gatedNote}</p>
          ) : (
            <Link href={relativeUrl(file.url) ?? file.url} className="inline-flex px-5 py-3 rounded-lg border border-[#42352A] text-electric-blue text-sm font-semibold hover:border-electric-blue transition-colors">
              {ui.download}
            </Link>
          )}
        </div>
      )}
    </CmsArticle>
  )
}
