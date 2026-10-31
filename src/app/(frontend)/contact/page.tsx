import type { Metadata } from 'next'
import { ContactForm } from '@/components/forms/ContactForm'
import Script from 'next/script'

export const metadata: Metadata = {
  title: 'Book a Discovery Call',
  description: 'Talk to Quantum Atlas about your AI implementation challenge. 30-minute call — no obligation, no sales pitch.',
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'Quantum Atlas',
  description: 'Enterprise AI implementation partner — voice agents, document intelligence, RAG systems and custom SaaS.',
  url: 'https://quantumatlas.ai',
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

      <section className="pt-32 pb-24 px-6 lg:px-8">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left: context */}
          <div>
            <p className="text-electric-blue text-[11px] tracking-[3px] uppercase mb-6" style={{ fontFamily: 'var(--font-mono)' }}>
              Discovery Call
            </p>
            <h1
              className="font-bold text-text-primary leading-[1.1] mb-6"
              style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 4vw, 2.5rem)' }}
            >
              Let&apos;s talk about what you&apos;re building
            </h1>
            <p className="text-text-secondary text-lg leading-relaxed mb-8">
              Not a sales call. A conversation about your specific challenge
              and whether we are the right fit to solve it. If we are not, we will tell you.
            </p>

            <div className="flex flex-col gap-4 mb-10">
              {[
                '30-minute call — your time is respected',
                'We review your current state and pain points',
                'We share relevant production examples from our own systems',
                'No obligation — we are selective about the work we take on',
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <span className="text-electric-blue mt-0.5 shrink-0">&#9670;</span>
                  <span className="text-text-secondary">{item}</span>
                </div>
              ))}
            </div>

            <div
              className="p-5 rounded-xl border border-space-border"
              style={{ background: '#171411' }}
            >
              <p className="text-text-secondary text-sm mb-1">Direct contact</p>
              <a
                href="mailto:contact@quantumatlas.dev"
                className="text-electric-blue font-medium hover:underline"
                style={{ fontFamily: 'var(--font-mono)' }}
              >
                contact@quantumatlas.dev
              </a>
              <p className="text-text-secondary text-sm mt-2">Response within 24 hours</p>
            </div>
          </div>

          {/* Right: form */}
          <div
            className="rounded-2xl border border-space-border p-8"
            style={{ background: '#171411' }}
          >
            <ContactForm />
          </div>
        </div>
      </section>
    </div>
  )
}
