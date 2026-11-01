import Script from 'next/script'
import type { Metadata } from 'next'
import { CaseStudiesView } from '@/components/pages/CaseStudiesView'
import { pageAlternates } from '@/lib/i18n'
import { ruUrl } from '@/lib/site'

const L = 'ru' as const

const TITLE = 'Кейсы внедрения ИИ в продакшене — Quantum Atlas'
const DESCRIPTION =
  'Кейсы промышленного внедрения ИИ: голосовой агент для Navbharat Shipping и платформа iKargos. Остальные опубликуем после согласования с клиентами.'

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: pageAlternates(L, '/knowledge/case-studies'),
  openGraph: {
    title: 'Кейсы внедрения ИИ в продакшене — Quantum Atlas',
    description: DESCRIPTION,
    type: 'website',
    locale: 'ru_RU',
    url: ruUrl('/knowledge/case-studies'),
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  '@id': `${ruUrl('/knowledge/case-studies')}#webpage`,
  url: ruUrl('/knowledge/case-studies'),
  name: TITLE,
  description: DESCRIPTION,
  inLanguage: 'ru',
  isPartOf: { '@type': 'WebSite', name: 'Quantum Atlas', url: ruUrl('/') },
}

export default function CaseStudiesPageRu() {
  return (
    <>
      <Script
        id="ld-case-studies"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <CaseStudiesView locale={L} />
    </>
  )
}
