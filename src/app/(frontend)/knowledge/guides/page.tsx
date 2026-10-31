import type { Metadata } from 'next'
import { PageHero } from '@/components/shared/PageHero'

export const metadata: Metadata = {
  title: 'Implementation Guides',
  description: 'Step-by-step AI implementation checklists and readiness guides.',
}

const guides = [
  { title: 'Voice AI Readiness Checklist', steps: ['Current call infrastructure assessment', 'SIP carrier compatibility check', 'Use case definition and agent scripting', 'Integration requirements with CRM/ticketing', 'Success metrics definition'] },
  { title: 'RAG Implementation Requirements', steps: ['Document corpus assessment and formatting', 'Access control and data isolation requirements', 'Query pattern analysis', 'Hardware sizing for on-premise deployment', 'Observability and audit requirements'] },
  { title: 'Document Type Coverage Guide', steps: ['Document inventory and volume assessment', 'Required extraction fields per document type', 'Accuracy requirements and confidence thresholds', 'Human review workflow for low-confidence extractions', 'Integration with downstream systems'] },
  { title: 'AI Readiness Self-Assessment', steps: ['Current process documentation', 'Data availability and quality assessment', 'IT infrastructure evaluation', 'Stakeholder readiness check', 'Success criteria definition'] },
]

export default function GuidesPage() {
  return (
    <div className="bg-space-dark min-h-screen">
      <PageHero
        eyebrow="Implementation Guides"
        heading="Before you build — understand what you need."
        body="Free access. No email required."
      />
      <section className="py-16 px-6 lg:px-8">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
          {guides.map((guide) => (
            <div
              key={guide.title}
              className="flex flex-col p-6 rounded-xl border border-[#2E261F]"
              style={{ background: '#171411', borderRadius: '12px' }}
            >
              <p
                className="font-semibold text-text-primary mb-4"
                style={{ fontFamily: 'var(--font-display)', fontSize: '17px' }}
              >
                {guide.title}
              </p>
              <ol className="flex flex-col gap-2">
                {guide.steps.map((step, i) => (
                  <li key={i} className="flex items-start gap-3 text-[14px] text-text-secondary leading-[1.65]">
                    <span className="text-electric-blue shrink-0" style={{ fontFamily: 'var(--font-mono)' }}>0{i + 1}</span>
                    {step}
                  </li>
                ))}
              </ol>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
