import type { Metadata } from 'next'
import { PageHero } from '@/components/shared/PageHero'
import { ContentCard } from '@/components/shared/ContentCard'
import { Mic2, FileText, Brain, Code2, Workflow, Video } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Services',
  description: 'Enterprise AI services — voice agents, document intelligence, RAG systems, custom SaaS, automation, and content production.',
}

const services = [
  { Icon: Mic2, name: 'AI Voice Agents', slug: 'ai-voice-agents', tagline: '$0.08/min · 4 months production · Airtel/Jio native', description: 'Self-hosted inbound and outbound voice agents with Indian carrier integration.' },
  { Icon: FileText, name: 'Document Intelligence', slug: 'document-intelligence', tagline: '$0.08/page · 3.5x cheaper than Nanonets · Hundreds per minute', description: 'Bulk IDP pipeline with contract intelligence and workflow integration.' },
  { Icon: Brain, name: 'Enterprise RAG', slug: 'enterprise-rag', tagline: 'On-premise · Citations on every answer · PostgreSQL-native', description: 'Hybrid retrieval knowledge systems for government and regulated enterprises.' },
  { Icon: Code2, name: 'Custom SaaS Development', slug: 'saas-development', tagline: 'iKargos reference · 1000+ clients · Full multi-tenancy', description: 'Production-grade multi-tenant SaaS platforms built from scratch.' },
  { Icon: Workflow, name: 'AI Automation', slug: 'ai-automation', tagline: '15→2 staff · LangGraph + n8n · Tally ETL', description: 'Stateful agent graphs and workflow orchestration for enterprise processes.' },
  { Icon: Video, name: 'Content & Video', slug: 'content-video', tagline: 'ComfyUI · Tavus · Digital avatars', description: 'AI-powered video production pipeline for enterprise content at scale.' },
]

export default function ServicesPage() {
  return (
    <div className="bg-space-dark min-h-screen">
      <PageHero
        eyebrow="Services"
        heading="The full stack. Under one roof."
        body="One partner for voice AI, document intelligence, RAG systems, and custom SaaS."
      />
      <section className="py-16 px-6 lg:px-8">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map(({ Icon, ...svc }) => (
            <ContentCard
              key={svc.slug}
              icon={<Icon size={20} strokeWidth={1.5} />}
              href={`/services/${svc.slug}`}
              title={svc.name}
              description={svc.description}
              meta={svc.tagline}
            />
          ))}
        </div>
      </section>
    </div>
  )
}
