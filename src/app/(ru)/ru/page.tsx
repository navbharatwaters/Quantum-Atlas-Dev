import Script from 'next/script'
import type { Metadata } from 'next'
import { Hero } from '@/components/sections/Hero'
import { ProofBar } from '@/components/sections/ProofBar'
import { ServicesGrid } from '@/components/sections/ServicesGrid'
import { WhyDifferent } from '@/components/sections/WhyDifferent'
import { ServicesDeepDive } from '@/components/sections/ServicesDeepDive'
import { ActiveEngagements } from '@/components/sections/ActiveEngagements'
import { Industries } from '@/components/sections/Industries'
import { TechStack } from '@/components/sections/TechStack'
import { KnowledgePreview } from '@/components/sections/KnowledgePreview'
import { CTASection } from '@/components/sections/CTASection'
import { pageAlternates } from '@/lib/i18n'
import { RU_CONTACT } from '@/lib/contact'
import { ruUrl } from '@/lib/site'

const L = 'ru' as const

// Title 56 chars, description 148 chars
const TITLE = 'Quantum Atlas — внедрение ИИ промышленного уровня'
const DESCRIPTION =
  'Внедрение ИИ для бизнеса: голосовые агенты по $0.08/мин, обработка документов, RAG-системы и SaaS на заказ. Self-hosted. Проверено в продакшене.'

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: pageAlternates(L, '/'),
  openGraph: {
    title: 'Quantum Atlas — ИИ промышленного уровня',
    description:
      'Создано в продакшене. Проверено в масштабе. Голосовой ИИ, обработка документов, корпоративный RAG, SaaS на заказ.',
    type: 'website',
    locale: 'ru_RU',
    url: ruUrl('/'),
  },
}

const orgId = `${ruUrl('/')}#organization`

const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': orgId,
      name: 'Quantum Atlas',
      url: ruUrl('/'),
      description:
        'Партнёр по внедрению ИИ в бизнесе: голосовые агенты, обработка документов, RAG-системы и SaaS на заказ. Self-hosted. Проверено в продакшене.',
      contactPoint: {
        '@type': 'ContactPoint',
        contactType: 'sales',
        name: RU_CONTACT.person,
        email: RU_CONTACT.email,
        telephone: '+79227446060',
        availableLanguage: 'ru',
      },
      sameAs: [],
      offers: [
        { '@type': 'Offer', name: 'Голосовые ИИ-агенты', description: 'Self-hosted голосовой ИИ по $0.08/мин' },
        { '@type': 'Offer', name: 'Интеллектуальная обработка документов', description: 'Массовая обработка документов по $0.08/стр.' },
        { '@type': 'Offer', name: 'Корпоративный RAG', description: 'Системы знаний on-premise' },
        { '@type': 'Offer', name: 'SaaS на заказ', description: 'Мультитенантные SaaS-платформы' },
        { '@type': 'Offer', name: 'ИИ-автоматизация', description: 'Автоматизация процессов на LangGraph и n8n' },
      ],
    },
    {
      '@type': 'WebSite',
      '@id': `${ruUrl('/')}#website`,
      url: ruUrl('/'),
      name: 'Quantum Atlas',
      inLanguage: 'ru',
      publisher: { '@id': orgId },
    },
    {
      '@type': 'WebPage',
      '@id': `${ruUrl('/')}#webpage`,
      url: ruUrl('/'),
      name: TITLE,
      inLanguage: 'ru',
      isPartOf: { '@id': `${ruUrl('/')}#website` },
    },
  ],
}

export default function HomePageRu() {
  return (
    <>
      <Script
        id="ld-organization"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
      />
      <Hero locale={L} />
      <ProofBar locale={L} />
      <ServicesGrid locale={L} />
      <WhyDifferent locale={L} />
      <ServicesDeepDive locale={L} />
      <ActiveEngagements locale={L} />
      <Industries locale={L} />
      <TechStack locale={L} />
      <KnowledgePreview locale={L} />
      <CTASection locale={L} />
    </>
  )
}
