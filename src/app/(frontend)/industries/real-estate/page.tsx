import type { Metadata } from 'next'
import { IndustryPageTemplate } from '@/components/templates/IndustryPageTemplate'
import type { IndustryPageData } from '@/components/templates/IndustryPageTemplate'

export const metadata: Metadata = {
  title: 'AI for Real Estate',
  description: 'Property document processing, sale deed extraction, lease agreement intelligence for real estate enterprises and developers.',
}

const data: IndustryPageData = {
  id: 'real-estate',
  name: 'Real Estate',
  heroHeadline: 'Property documents processed before the signing date',
  heroSubtext: 'Sale deeds, lease agreements, NOCs, and encumbrance certificates — structured, verified, and queryable before any deal closes.',
  challenges: [
    { title: 'Transaction document volume', body: 'Each property transaction generates 15–30 documents. Large developers manage hundreds of transactions simultaneously. Manual document processing cannot scale.' },
    { title: 'Lease agreement management', body: 'Commercial property portfolios have hundreds of leases with different terms, renewal dates, and escalation clauses. Missing a renewal date costs significantly.' },
    { title: 'Due diligence speed', body: 'Title verification and encumbrance checks require reviewing chains of documents going back decades. Manual review is slow and prone to error.' },
    { title: 'Regulatory document tracking', body: 'RERA compliance, environmental clearances, fire NOCs, building plan approvals — each project has a document checklist that must be maintained and updated.' },
  ],
  services: [
    { name: 'Document Intelligence', href: '/services/document-intelligence', color: '#FFBF00', relevance: 'Sale deed extraction, lease term analysis, NOC and clearance processing' },
    { name: 'Enterprise RAG', href: '/services/enterprise-rag', color: '#FFBF00', relevance: 'Portfolio lease search, obligation tracking, regulatory compliance Q&A' },
    { name: 'AI Automation', href: '/services/ai-automation', color: '#FFBF00', relevance: 'Renewal notifications, document routing, checklist automation' },
  ],
  compliance: [
    { title: 'RERA Compliance', body: 'Project documentation indexed and searchable — builder disclosures, approvals, and completion certificates tracked against RERA requirements.' },
    { title: 'Title Verification', body: 'Chain of title documents extracted and linked — identifying gaps or encumbrances that affect clear title.' },
    { title: 'Data Confidentiality', body: 'Property transaction data is commercially sensitive. On-premise deployment keeps all data within your network.' },
  ],
  activeWork: null,
  ctaHeadline: 'In real estate development or property management?',
}

export default function RealEstatePage() {
  return <IndustryPageTemplate data={data} />
}
