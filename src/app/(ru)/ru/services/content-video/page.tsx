import Script from 'next/script'
import type { Metadata } from 'next'
import { ServicePageTemplate } from '@/components/templates/ServicePageTemplate'
import { getServices } from '@/content/services'
import { pageAlternates } from '@/lib/i18n'
import { ruUrl } from '@/lib/site'

const L = 'ru' as const
const SLUG = 'content-video'
const PATH = `/services/${SLUG}`
const content = getServices(L)
const meta = content.meta[SLUG]

export const metadata: Metadata = {
  title: meta.title,
  description: meta.description,
  alternates: pageAlternates(L, PATH),
  openGraph: {
    title: meta.title,
    description: meta.description,
    type: 'website',
    locale: 'ru_RU',
    url: ruUrl(PATH),
  },
}

const webPageJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  '@id': `${ruUrl(PATH)}#webpage`,
  url: ruUrl(PATH),
  name: meta.title,
  description: meta.description,
  inLanguage: 'ru',
  isPartOf: { '@type': 'WebSite', name: 'Quantum Atlas', url: ruUrl('/'), inLanguage: 'ru' },
}

export default function Page() {
  return (
    <>
      <Script
        id={`ld-webpage-${SLUG}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageJsonLd) }}
      />
      <ServicePageTemplate data={content.pages[SLUG]} ui={content.ui} locale={L} />
    </>
  )
}
