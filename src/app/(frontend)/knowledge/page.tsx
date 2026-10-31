import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Knowledge Hub',
  description: 'Whitepapers, ROI calculators, implementation guides, and case studies from Quantum Atlas.',
}

const sections = [
  {
    title: 'Whitepapers & Guides',
    description: 'Technical guides and ROI frameworks — free with email registration.',
    href: '/knowledge/whitepapers',
    color: '#FFBF00',
    items: ['Enterprise RAG Architecture Guide', 'AI Voice Agent Cost Calculator', 'IDP vs Manual Processing — ROI Analysis', 'Contract Intelligence for Legal Teams', 'Government AI Procurement Checklist'],
  },
  {
    title: 'ROI Calculator',
    description: 'Calculate your savings from voice AI and document processing.',
    href: '/knowledge/roi-calculator',
    color: '#FFBF00',
    items: ['Voice AI cost vs current cost', 'Document processing vs Nanonets', 'Annual savings projection', 'Payback period estimate'],
  },
  {
    title: 'Implementation Guides',
    description: 'Step-by-step readiness checklists for each service — free access.',
    href: '/knowledge/guides',
    color: '#FFBF00',
    items: ['Voice AI readiness checklist', 'RAG implementation requirements', 'Document type coverage guide', 'AI readiness self-assessment'],
  },
  {
    title: 'Case Studies',
    description: 'Detailed breakdowns of production deployments.',
    href: '/knowledge/case-studies',
    color: '#FFBF00',
    items: ['Published when client-approved', 'Internal cases available now', 'Navbharat Shipping — Voice AI', 'iKargos — SaaS Platform'],
  },
]

export default function KnowledgePage() {
  return (
    <div className="bg-space-dark min-h-screen">
      <section className="pt-32 pb-16 px-6 lg:px-8" style={{ background: '#0C0A08' }}>
        <div className="max-w-5xl mx-auto">
          <p className="text-electric-blue text-[11px] tracking-[3px] uppercase mb-4" style={{ fontFamily: 'var(--font-mono)' }}>
            Knowledge Hub
          </p>
          <h1 className="font-bold text-text-primary mb-6" style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 4vw, 2.5rem)' }}>
            Resources that help you decide.
          </h1>
          <p className="text-text-secondary text-xl max-w-2xl leading-relaxed">
            Technical guides, ROI calculators, and case studies from four months of production deployments.
          </p>
        </div>
      </section>

      <section className="py-16 px-6 lg:px-8">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          {sections.map((s) => (
            <Link
              key={s.href}
              href={s.href}
              className="group p-6 rounded-xl border border-space-border hover:-translate-y-1 transition-all flex flex-col gap-4"
              style={{ background: '#171411', borderTop: '1px solid #2E261F' }}
            >
              <div>
                <h2 className="text-text-primary font-bold text-xl mb-2 group-hover:text-electric-blue transition-colors" style={{ fontFamily: 'var(--font-display)' }}>
                  {s.title} →
                </h2>
                <p className="text-text-secondary text-sm">{s.description}</p>
              </div>
              <ul className="flex flex-col gap-1.5">
                {s.items.map((item) => (
                  <li key={item} className="flex items-center gap-2 text-xs text-text-secondary">
                    <span style={{ color: s.color }}>◆</span> {item}
                  </li>
                ))}
              </ul>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}
