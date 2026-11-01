import Script from 'next/script'
import type { Metadata } from 'next'
import { ServicesIndex } from '@/components/templates/ServicesIndex'
import { getServices } from '@/content/services'
import { pageAlternates } from '@/lib/i18n'
import { ruUrl } from '@/lib/site'

const L = 'ru' as const
const PATH = '/services'
const { meta, jsonLdName } = getServices(L).index

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

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  '@id': `${ruUrl(PATH)}#webpage`,
  url: ruUrl(PATH),
  name: jsonLdName,
  description: meta.description,
  inLanguage: 'ru',
  isPartOf: { '@type': 'WebSite', name: 'Quantum Atlas', url: ruUrl('/'), inLanguage: 'ru' },
}

export default function ServicesPageRu() {
  return (
    <>
      <Script
        id="ld-services"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ServicesIndex locale={L} />
    </>
  )
}
