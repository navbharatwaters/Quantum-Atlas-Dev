import type { CaseStudiesContent } from './caseStudies.types'

export const caseStudiesEn: CaseStudiesContent = {
  eyebrow: 'Case Studies',
  heading: 'In production. Right now.',
  intro: 'Detailed case studies are published when clients approve. Internal deployments are available now.',
  statusAvailable: 'Available',
  statusPending: 'Pending approval',
  items: [
    { title: 'Navbharat Shipping — AI Voice Agent', sector: 'Logistics & Shipping', service: 'AI Voice Agents', outcome: '4 months production · $0.08/min · Inbound + outbound', available: true },
    { title: 'iKargos — ERP Replacement', sector: 'Logistics & CHA', service: 'Custom SaaS Development', outcome: '1000+ corporate clients · Multi-tenant · Legacy ERP replaced', available: true },
    { title: 'Government IGST — RAG System', sector: 'Government · Customs', service: 'Enterprise RAG', outcome: 'Active evaluation · 40+ senior officers · On-premise deployment', available: false },
    { title: 'Global Logistics — Document Intelligence', sector: 'Fortune 500 Logistics', service: 'Document Intelligence', outcome: 'Enterprise scale evaluation approved · Bulk processing pipeline', available: false },
  ],
  cta: { text: 'Want a detailed breakdown of a specific case?', button: 'Request a briefing' },
}
