import Script from 'next/script'
import type { Metadata } from 'next'
import { ContactView } from '@/components/pages/ContactView'
import { pageAlternates } from '@/lib/i18n'
import { RU_CONTACT } from '@/lib/contact'
import { ruUrl } from '@/lib/site'

const L = 'ru' as const

const TITLE = 'Записаться на консультацию — Quantum Atlas'
const DESCRIPTION =
  'Расскажите Quantum Atlas о вашей задаче по внедрению ИИ. Разговор на 30 минут: без обязательств и без навязчивых продаж. Заявка уходит команде по почте.'

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: pageAlternates(L, '/contact'),
  openGraph: {
    title: 'Записаться на консультацию — Quantum Atlas',
    description: DESCRIPTION,
    type: 'website',
    locale: 'ru_RU',
    url: ruUrl('/contact'),
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ContactPage',
  '@id': `${ruUrl('/contact')}#webpage`,
  url: ruUrl('/contact'),
  name: TITLE,
  description: DESCRIPTION,
  inLanguage: 'ru',
  mainEntity: {
    '@type': 'Organization',
    name: 'Quantum Atlas',
    url: ruUrl('/'),
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'sales',
      name: RU_CONTACT.person,
      email: RU_CONTACT.email,
      telephone: '+79227446060',
      availableLanguage: 'ru',
    },
  },
}

export default function ContactPageRu() {
  return (
    <div className="bg-space-dark min-h-screen">
      <Script
        id="ld-contact"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ContactView locale={L} />
    </div>
  )
}
