import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Case Studies',
  description: 'Production AI deployment case studies from Quantum Atlas.',
}

export default function CaseStudiesPage() {
  return (
    <div className="bg-space-dark min-h-screen">
      <section className="pt-32 pb-16 px-6 lg:px-8" style={{ background: '#0C0A08' }}>
        <div className="max-w-5xl mx-auto">
          <p className="text-electric-blue text-[11px] tracking-[3px] uppercase mb-4" style={{ fontFamily: 'var(--font-mono)' }}>
            Case Studies
          </p>
          <h1 className="font-bold text-text-primary mb-6" style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 4vw, 2.5rem)' }}>
            In production. Right now.
          </h1>
          <p className="text-text-secondary text-lg max-w-2xl">
            Detailed case studies are published when clients approve. Internal deployments are available now.
          </p>
        </div>
      </section>

      <section className="py-16 px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { title: 'Navbharat Shipping — AI Voice Agent', sector: 'Logistics & Shipping', service: 'AI Voice Agents', outcome: '4 months production · $0.08/min · Inbound + outbound', color: '#FFBF00', available: true },
              { title: 'iKargos — ERP Replacement', sector: 'Logistics & CHA', service: 'Custom SaaS Development', outcome: '1000+ corporate clients · Multi-tenant · Legacy ERP replaced', color: '#FFBF00', available: true },
              { title: 'Government IGST — RAG System', sector: 'Government · Customs', service: 'Enterprise RAG', outcome: 'Active evaluation · 40+ senior officers · On-premise deployment', color: '#FFBF00', available: false },
              { title: 'Global Logistics — Document Intelligence', sector: 'Fortune 500 Logistics', service: 'Document Intelligence', outcome: 'Enterprise scale evaluation approved · Bulk processing pipeline', color: '#FFBF00', available: false },
            ].map((cs) => (
              <div
                key={cs.title}
                className="p-6 rounded-xl border border-space-border"
                style={{ background: '#171411', borderTop: '1px solid #2E261F' }}
              >
                <div className="flex items-center gap-2 mb-3">
                  <span
                    className="px-2 py-0.5 rounded-full text-[10px]"
                    style={{
                      background: cs.available ? '#FFBF0015' : '#2E261F',
                      color: cs.available ? '#FFBF00' : '#A8998A',
                      fontFamily: 'var(--font-mono)',
                    }}
                  >
                    {cs.available ? 'Available' : 'Pending approval'}
                  </span>
                </div>
                <p className="text-text-secondary text-[11px] tracking-wider uppercase mb-2" style={{ fontFamily: 'var(--font-mono)' }}>
                  {cs.sector}
                </p>
                <h2 className="text-text-primary font-semibold text-base mb-1" style={{ fontFamily: 'var(--font-display)' }}>
                  {cs.title}
                </h2>
                <p className="text-text-secondary text-xs mb-3" style={{ fontFamily: 'var(--font-mono)' }}>{cs.service}</p>
                <p className="text-text-secondary text-sm">{cs.outcome}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="text-text-secondary mb-4">Want a detailed breakdown of a specific case?</p>
            <Link
              href="/contact"
              className="inline-flex px-6 py-3 rounded-lg bg-electric-blue text-white text-sm font-semibold hover:brightness-110 transition-all"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Request a briefing
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
