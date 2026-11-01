import type { Metadata } from 'next'
import Script from 'next/script'
import { ContactView } from '@/components/pages/ContactView'
import { pageAlternates } from '@/lib/i18n'

export const metadata: Metadata = {
  title: 'Book a Discovery Call',
  description: 'Talk to Quantum Atlas about your AI implementation challenge. 30-minute call — no obligation, no sales pitch.',
  alternates: pageAlternates('en', '/contact'),
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'Quantum Atlas',
  description: 'Enterprise AI implementation partner — voice agents, document intelligence, RAG systems and custom SaaS.',
  url: 'https://quantumatlas.dev',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Mumbai',
    addressRegion: 'Maharashtra',
    addressCountry: 'IN',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 18.9667,
    longitude: 72.8333,
  },
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'sales',
    email: 'contact@quantumatlas.dev',
  },
}

export default function ContactPage() {
  return (
    <div className="bg-space-dark min-h-screen">
      <Script
        id="ld-contact"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ContactView />
    </div>
  )
}
