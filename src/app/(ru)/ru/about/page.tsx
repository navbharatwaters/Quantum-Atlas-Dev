import Script from 'next/script'
import type { Metadata } from 'next'
import { AboutView } from '@/components/pages/AboutView'
import { pageAlternates } from '@/lib/i18n'
import { ruUrl } from '@/lib/site'

const L = 'ru' as const

const TITLE = 'О компании Quantum Atlas — ИИ сначала в продакшене'
const DESCRIPTION =
  'Внедрение ИИ по принципу «сначала продакшен»: каждая наша система сначала работает в собственных компаниях. Мы — самый требовательный клиент для себя.'

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: pageAlternates(L, '/about'),
  openGraph: {
    title: 'О компании Quantum Atlas',
    description: DESCRIPTION,
    type: 'website',
    locale: 'ru_RU',
    url: ruUrl('/about'),
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'AboutPage',
  '@id': `${ruUrl('/about')}#webpage`,
  url: ruUrl('/about'),
  name: TITLE,
  description: DESCRIPTION,
  inLanguage: 'ru',
  about: { '@type': 'Organization', name: 'Quantum Atlas', url: ruUrl('/') },
}

export default function AboutPageRu() {
  return (
    <>
      <Script
        id="ld-about"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <AboutView locale={L} />
    </>
  )
}
