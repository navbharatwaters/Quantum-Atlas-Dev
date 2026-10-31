import type { Metadata } from 'next'
import { ServicePageTemplate } from '@/components/templates/ServicePageTemplate'
import type { ServicePageData } from '@/components/templates/ServicePageTemplate'

export const metadata: Metadata = {
  title: 'Document Intelligence',
  description:
    'Bulk intelligent document processing at $0.08/page — 3.5x cheaper than Nanonets. Contract intelligence, IDP pipelines, on-premise deployment.',
}

const data: ServicePageData = {
  slug: 'document-intelligence',
  name: 'Document Intelligence',
  color: '#FFBF00',
  colorName: 'electric-blue',
  tagline: 'Hundreds of documents. Minutes, not days.',
  heroMetrics: [
    { value: '$0.08/page', label: 'Processing cost' },
    { value: '3.5x', label: 'Cheaper than Nanonets' },
    { value: 'Hundreds', label: 'Documents per minute' },
  ],
  problemHeading: 'Document processing is slow, expensive, and fragmented',
  problemBody:
    'Nanonets charges $0.30/page and processes at 2 pages/minute. Manual teams process even slower at 10–20x the cost. Most enterprises have no choice — they absorb the cost or stay manual. Neither option scales.',
  approachHeading: 'Production-grade IDP pipeline, built in-house, three layers deep',
  approachPoints: [
    'Layer 1 (Extraction): Structured data from any document type — invoices, KYC, BOE, shipping docs, contracts, medical records',
    'Layer 2 (Intelligence): Clause extraction, obligation tracking, risk flagging, cross-document analysis, RAG-powered Q&A on document corpus',
    'Layer 3 (Integration): Connect directly to ERP, CRM, Tally, accounting systems via n8n workflows',
    'Fine-tuned models via Unsloth + Label Studio for your specific document types',
    'GLM OCR + Google Document AI + LLMWhisperer — best OCR for each document class',
    'Audit trail on every extraction — who extracted what, when, with what confidence',
  ],
  proofMetrics: [
    { metric: 'Cost per page', before: '$0.30/page (Nanonets)', after: '$0.08/page' },
    { metric: 'Processing speed', before: '2 pages/min (Nanonets)', after: 'Hundreds/min (bulk pipeline)' },
    {
      metric: 'Deployment options',
      before: 'Cloud only (Nanonets SaaS)',
      after: 'Cloud or on-premise',
    },
    {
      metric: 'Model customization',
      before: 'Generic pre-trained models',
      after: 'Fine-tuned to your document types',
    },
    { metric: 'Audit trail', before: 'None', after: 'Full extraction audit log' },
  ],
  techStack: [
    'GLM OCR',
    'Google Document AI',
    'LLMWhisperer',
    'n8n',
    'Unsloth',
    'Label Studio',
    'PostgreSQL',
    'FastAPI',
  ],
  deploymentOptions: [
    'Managed cloud — we operate the pipeline, you get the API',
    'On-premise — full pipeline on your servers, no data leaves your network',
    'Hybrid — OCR on-premise, LLM inference in your cloud',
  ],
  pricingNote: 'Per-document or monthly volume-based pricing. Contact for enterprise rates.',
  faqs: [
    {
      q: 'What document types do you support?',
      a: 'Invoices, KYC documents, bills of entry, bills of lading, shipping certificates, contracts, purchase orders, bank statements, medical records, property documents, tax forms, and more. If we have not processed your document type, we fine-tune a model for it.',
    },
    {
      q: 'How accurate is the extraction?',
      a: 'Accuracy depends on document quality and type. For standard structured documents (invoices, KYC), we achieve 97–99% field-level accuracy after fine-tuning. We provide confidence scores on every extraction so your systems can route low-confidence results for human review.',
    },
    {
      q: 'Can it handle handwritten documents?',
      a: 'Yes, with limitations. Printed documents achieve near-perfect accuracy. Handwritten documents depend on quality — we use GLM OCR which handles most handwriting, but accuracy varies. We test on your actual document corpus before quoting accuracy targets.',
    },
    {
      q: 'How does contract intelligence work?',
      a: 'We extract structured data from contracts — parties, dates, obligations, payment terms, termination clauses, liability caps, IP ownership, and custom fields you define. The system flags unusual clauses against a baseline, tracks deadlines, and lets you query the entire contract corpus via RAG.',
    },
    {
      q: 'What happens with confidential documents?',
      a: 'With on-premise deployment, documents never leave your servers. With our managed cloud, documents are processed and deleted — we do not store your document content. We sign NDAs and data processing agreements as required.',
    },
    {
      q: 'How long does integration take?',
      a: '6–8 weeks for a standard deployment including document type configuration, fine-tuning, and ERP/CRM integration. Simpler single-document-type deployments can be done in 3–4 weeks.',
    },
  ],
  relatedServices: [
    { name: 'Enterprise RAG', href: '/services/enterprise-rag', color: '#FFBF00' },
    { name: 'AI Automation', href: '/services/ai-automation', color: '#FFBF00' },
    { name: 'AI Voice Agents', href: '/services/ai-voice-agents', color: '#FFBF00' },
  ],
}

export default function DocumentIntelligencePage() {
  return <ServicePageTemplate data={data} />
}
