import type { Metadata } from 'next'
import { IndustryPageTemplate } from '@/components/templates/IndustryPageTemplate'
import type { IndustryPageData } from '@/components/templates/IndustryPageTemplate'

export const metadata: Metadata = {
  title: 'AI for Healthcare',
  description: 'Patient record processing, insurance pre-authorization, clinical document intelligence for hospitals and healthcare enterprises.',
}

const data: IndustryPageData = {
  id: 'healthcare',
  name: 'Healthcare',
  heroHeadline: 'Clinical decisions supported by accurate document processing',
  heroSubtext: 'From insurance pre-authorization to patient record extraction — document intelligence built for the accuracy requirements of healthcare.',
  challenges: [
    { title: 'Insurance pre-authorization delays', body: 'Pre-authorization requests require assembling clinical documentation, submitting to insurers, and following up — a process that can take days and delay treatment.' },
    { title: 'Patient record processing', body: 'Referral letters, discharge summaries, diagnostic reports, and prescription histories arrive in unstructured formats that need to be structured and indexed.' },
    { title: 'Clinical documentation overhead', body: 'Physicians spend significant time on documentation rather than patient care. Structured data extraction from clinical notes reduces this burden.' },
    { title: 'Compliance documentation', body: 'NABH accreditation, PCPNDT compliance, drug trial documentation — regulatory document management is a persistent operational burden.' },
  ],
  services: [
    { name: 'Document Intelligence', href: '/services/document-intelligence', color: '#FFBF00', relevance: 'Patient records, clinical docs, insurance documents — structured extraction' },
    { name: 'Enterprise RAG', href: '/services/enterprise-rag', color: '#FFBF00', relevance: 'Clinical knowledge base, drug interaction lookup, protocol search' },
    { name: 'AI Automation', href: '/services/ai-automation', color: '#FFBF00', relevance: 'Pre-auth workflow, document routing, follow-up automation' },
  ],
  compliance: [
    { title: 'Patient Data Privacy', body: 'On-premise deployment ensures patient data never leaves the hospital network. DPDP Act compliance by architecture.' },
    { title: 'Audit Trail', body: 'Every document accessed, every extraction performed — logged with clinician or administrator ID, timestamp, and action taken.' },
    { title: 'Human Oversight', body: 'AI extracts and surfaces information. Clinical decisions remain with qualified clinicians. The system is designed to assist, not replace, clinical judgment.' },
  ],
  activeWork: null,
  ctaHeadline: 'Running a hospital or healthcare enterprise?',
}

export default function HealthcarePage() {
  return <IndustryPageTemplate data={data} />
}
