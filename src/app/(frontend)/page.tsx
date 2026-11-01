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

export const metadata: Metadata = {
  alternates: pageAlternates('en', '/'),
  title: 'Quantum Atlas — Production-Grade AI Implementation',
  description: 'Enterprise AI implementation — voice agents at $0.08/min, document intelligence, RAG systems and custom SaaS. Self-hosted. Production-proven.',
  openGraph: {
    title: 'Quantum Atlas — Production-Grade AI',
    description: 'Built in production. Proven at scale. Voice AI, Document Intelligence, Enterprise RAG, Custom SaaS.',
    type: 'website',
    url: 'https://quantumatlas.dev',
  },
}

const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': 'https://quantumatlas.dev/#organization',
      name: 'Quantum Atlas',
      url: 'https://quantumatlas.dev',
      description: 'Enterprise AI implementation partner — voice agents, document intelligence, RAG systems and custom SaaS. Self-hosted. Production-proven.',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Mumbai',
        addressRegion: 'Maharashtra',
        addressCountry: 'IN',
      },
      contactPoint: {
        '@type': 'ContactPoint',
        contactType: 'sales',
        email: 'contact@quantumatlas.dev',
      },
      sameAs: [],
      offers: [
        { '@type': 'Offer', name: 'AI Voice Agents', description: 'Self-hosted voice AI at $0.08/minute' },
        { '@type': 'Offer', name: 'Document Intelligence', description: 'Bulk document processing at $0.08/page' },
        { '@type': 'Offer', name: 'Enterprise RAG', description: 'On-premise knowledge systems' },
        { '@type': 'Offer', name: 'Custom SaaS Development', description: 'Multi-tenant SaaS platforms' },
        { '@type': 'Offer', name: 'AI Automation', description: 'LangGraph + n8n workflow automation' },
      ],
    },
    {
      '@type': 'WebSite',
      '@id': 'https://quantumatlas.dev/#website',
      url: 'https://quantumatlas.dev',
      name: 'Quantum Atlas',
      publisher: { '@id': 'https://quantumatlas.dev/#organization' },
      potentialAction: {
        '@type': 'SearchAction',
        target: { '@type': 'EntryPoint', urlTemplate: 'https://quantumatlas.dev/blog?q={search_term_string}' },
        'query-input': 'required name=search_term_string',
      },
    },
  ],
}

export default function HomePage() {
  return (
    <>
      <Script
        id="ld-organization"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
      />
      <Hero />
      <ProofBar />
      <ServicesGrid />
      <WhyDifferent />
      <ServicesDeepDive />
      <ActiveEngagements />
      <Industries />
      <TechStack />
      <KnowledgePreview />
      <CTASection />
    </>
  )
}
