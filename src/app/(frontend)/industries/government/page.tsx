import type { Metadata } from 'next'
import { IndustryPageTemplate } from '@/components/templates/IndustryPageTemplate'
import type { IndustryPageData } from '@/components/templates/IndustryPageTemplate'

export const metadata: Metadata = {
  title: 'AI for Government',
  description: 'On-premise AI systems for government departments — RAG, document intelligence, data sovereignty. IGST-grade architecture.',
}

const data: IndustryPageData = {
  id: 'government',
  name: 'Government',
  heroHeadline: "AI that passes the CISO's checklist",
  heroSubtext: 'On-premise deployment. Data sovereignty. Full audit trail. Government AI built for real procurement requirements — not demos.',
  challenges: [
    { title: 'Data sovereignty mandates', body: 'Government data cannot leave government-controlled infrastructure. Most AI vendors cannot meet this requirement.' },
    { title: 'Compliance and audit requirements', body: 'Every AI output must be traceable. Officers need to see exactly which source document generated each answer.' },
    { title: 'Air-gapped environment constraints', body: 'Some government environments have no internet access. Cloud-first AI vendors cannot operate in these environments.' },
    { title: 'Multi-department data isolation', body: "Department A must not be able to access Department B's data — even on shared infrastructure." },
  ],
  services: [
    { name: 'Enterprise RAG', href: '/services/enterprise-rag', color: '#FFBF00', relevance: 'Circular search, policy Q&A, regulation lookup — with citations on every answer' },
    { name: 'Document Intelligence', href: '/services/document-intelligence', color: '#FFBF00', relevance: 'Bulk processing of government documents, forms, and notifications' },
    { name: 'AI Automation', href: '/services/ai-automation', color: '#FFBF00', relevance: 'Workflow automation for document routing, approval chains, and compliance checks' },
    { name: 'Custom SaaS Dev', href: '/services/saas-development', color: '#FFBF00', relevance: 'Purpose-built government portals — compliant, maintainable, sovereign' },
  ],
  compliance: [
    { title: 'Data Localisation', body: 'All data processing on government-controlled servers. No data leaves the jurisdiction. Architecturally enforced, not just policy.' },
    { title: 'Audit Trail', body: 'Every query, every answer, every document accessed — logged with timestamp, user ID, and source citation. Exportable for audit.' },
    { title: 'Access Control', body: 'Row-level security at the database layer. Officer-level permissions enforced at data access — not just UI level.' },
    { title: 'Air-gapped Deployment', body: 'Complete offline operation. LLM, embedding model, and database all run on-premise with no external API calls.' },
  ],
  activeWork: {
    sector: 'Government · Customs & Taxation · IGST',
    outcome: '40+ senior Customs Commissioners evaluating for IGST department deployment — on-premise RAG for circular and notification search.',
    color: '#FFBF00',
  },
  ctaHeadline: 'Building AI for a government department?',
}

export default function GovernmentPage() {
  return <IndustryPageTemplate data={data} />
}
