import type { Metadata } from 'next'
import { IndustryPageTemplate } from '@/components/templates/IndustryPageTemplate'
import type { IndustryPageData } from '@/components/templates/IndustryPageTemplate'

export const metadata: Metadata = {
  title: 'AI for Manufacturing',
  description: 'Purchase order automation, quality certificate processing, import/export document intelligence for manufacturing enterprises.',
}

const data: IndustryPageData = {
  id: 'manufacturing',
  name: 'Manufacturing',
  heroHeadline: 'From purchase order to production floor — without the manual handoffs',
  heroSubtext: 'Document intelligence that handles POs, quality certs, and import/export paperwork — so your operations team can focus on operations.',
  challenges: [
    { title: 'Purchase order processing volume', body: 'High-volume manufacturers receive hundreds of POs daily from multiple customers in different formats. Manual data entry into ERP is a bottleneck and an error source.' },
    { title: 'Quality certification management', body: 'Material certifications, test reports, and compliance documents arrive with shipments and must be matched, verified, and archived.' },
    { title: 'Import/export documentation', body: 'Cross-border manufacturing requires processing letters of credit, customs declarations, certificates of origin, and packing lists — each with strict accuracy requirements.' },
    { title: 'Multi-system fragmentation', body: 'ERP, warehouse management, and procurement systems do not share data automatically. Manual re-entry at each system boundary introduces errors and delays.' },
  ],
  services: [
    { name: 'Document Intelligence', href: '/services/document-intelligence', color: '#FFBF00', relevance: 'PO extraction, quality cert processing, import/export document handling' },
    { name: 'AI Automation', href: '/services/ai-automation', color: '#FFBF00', relevance: 'ERP integration, approval routing, exception handling for document mismatches' },
    { name: 'Enterprise RAG', href: '/services/enterprise-rag', color: '#FFBF00', relevance: 'Internal knowledge base — specs, compliance requirements, supplier documentation' },
  ],
  compliance: [
    { title: 'BIS/ISO Compliance', body: 'Compliance documentation management — standards certificates, test reports, and product certification documents indexed and searchable.' },
    { title: 'Export Control', body: 'Dual-use item tracking, export license verification, denied party screening — automated against your product and customer database.' },
    { title: 'Audit Readiness', body: 'Full document processing history — every document received, extracted, and processed — with timestamps and operator records.' },
  ],
  activeWork: null,
  ctaHeadline: 'Running a manufacturing operation?',
}

export default function ManufacturingPage() {
  return <IndustryPageTemplate data={data} />
}
