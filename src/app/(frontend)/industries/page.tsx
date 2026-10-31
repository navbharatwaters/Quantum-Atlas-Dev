import type { Metadata } from 'next'
import { PageHero } from '@/components/shared/PageHero'
import { ContentCard } from '@/components/shared/ContentCard'

export const metadata: Metadata = {
  title: 'Industries',
  description: 'AI solutions for government, logistics, fintech, legal, manufacturing, healthcare, and real estate.',
}

const industries = [
  { name: 'Government', slug: 'government', headline: "AI that passes the CISO's checklist" },
  { name: 'Logistics & Shipping', slug: 'logistics-shipping', headline: 'Documents processed before the cargo lands' },
  { name: 'Fintech & BFSI', slug: 'fintech-bfsi', headline: 'KYC in seconds. Compliance maintained.' },
  { name: 'Legal', slug: 'legal', headline: '500 contracts reviewed before the weekend' },
  { name: 'Manufacturing', slug: 'manufacturing', headline: 'From PO to production floor without the handoffs' },
  { name: 'Healthcare', slug: 'healthcare', headline: 'Clinical decisions supported by accurate document processing' },
  { name: 'Real Estate', slug: 'real-estate', headline: 'Property documents processed before the signing date' },
]

export default function IndustriesPage() {
  return (
    <div className="bg-space-dark min-h-screen">
      <PageHero eyebrow="Industries" heading="Deep vertical expertise. Not generic AI." />
      <section className="py-16 px-6 lg:px-8">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
          {industries.map((ind) => (
            <ContentCard
              key={ind.slug}
              href={`/industries/${ind.slug}`}
              title={ind.name}
              description={ind.headline}
            />
          ))}
        </div>
      </section>
    </div>
  )
}
