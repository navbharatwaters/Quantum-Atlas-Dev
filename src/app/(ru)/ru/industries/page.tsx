import Script from 'next/script'
import type { Metadata } from 'next'
import { PageHero } from '@/components/shared/PageHero'
import { ContentCard } from '@/components/shared/ContentCard'
import { localeHref, pageAlternates } from '@/lib/i18n'
import { ruUrl } from '@/lib/site'
import { getIndustries } from '@/content/industries'

const L = 'ru' as const

// Title 40 chars, description 154 chars
const TITLE = 'Отрасли — ИИ для бизнеса | Quantum Atlas'
const DESCRIPTION =
  'ИИ для госсектора, логистики, финтеха, юриспруденции, производства, здравоохранения и недвижимости. Решения промышленного уровня, проверены в продакшене.'

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: pageAlternates(L, '/industries'),
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    type: 'website',
    locale: 'ru_RU',
    url: ruUrl('/industries'),
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name: TITLE,
  description: DESCRIPTION,
  url: ruUrl('/industries'),
  inLanguage: 'ru',
  isPartOf: { '@type': 'WebSite', name: 'Quantum Atlas', url: ruUrl('/'), inLanguage: 'ru' },
}

export default function IndustriesPageRu() {
  const { index } = getIndustries(L)
  return (
    <div className="bg-space-dark min-h-screen">
      <Script
        id="ld-industries"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <PageHero eyebrow={index.eyebrow} heading={index.heading} />
      <section className="py-16 px-6 lg:px-8">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
          {index.items.map((ind) => (
            <ContentCard
              key={ind.slug}
              href={localeHref(L, `/industries/${ind.slug}`)}
              title={ind.name}
              description={ind.headline}
              locale={L}
            />
          ))}
        </div>
      </section>
    </div>
  )
}
