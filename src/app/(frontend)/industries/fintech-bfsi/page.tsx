import type { Metadata } from 'next'
import { IndustryPageTemplate } from '@/components/templates/IndustryPageTemplate'
import type { IndustryPageData } from '@/components/templates/IndustryPageTemplate'

export const metadata: Metadata = {
  title: 'AI for Fintech & BFSI',
  description: 'KYC automation, loan document processing, compliance RAG, and voice AI for banks and financial services. On-premise deployment available.',
}

const data: IndustryPageData = {
  id: 'fintech',
  name: 'Fintech & BFSI',
  heroHeadline: 'KYC in seconds. Compliance maintained.',
  heroSubtext: 'Document intelligence that clears backlogs without compromising accuracy. RAG that keeps compliance teams current with regulation. Voice AI that handles customer enquiries at scale.',
  challenges: [
    { title: 'KYC document backlogs', body: 'Manual KYC review creates onboarding delays that cost customer acquisition. Automation must maintain accuracy while increasing speed.' },
    { title: 'Regulatory compliance overhead', body: 'RBI, SEBI, and IRDAI issue frequent circulars. Compliance teams cannot read and index everything manually. Critical regulation gets missed.' },
    { title: 'Loan document processing', body: 'Income statements, bank statements, property documents, and identification — each application generates a document bundle requiring structured extraction and cross-verification.' },
    { title: 'Customer service call volume', body: 'Balance enquiries, transaction disputes, loan status updates — high-volume, repetitive calls that trained agents should not be handling.' },
  ],
  services: [
    { name: 'Document Intelligence', href: '/services/document-intelligence', color: '#FFBF00', relevance: 'KYC extraction, loan document processing, bank statement analysis' },
    { name: 'Enterprise RAG', href: '/services/enterprise-rag', color: '#FFBF00', relevance: 'Regulatory compliance Q&A — RBI/SEBI/IRDAI circular search with citations' },
    { name: 'AI Voice Agents', href: '/services/ai-voice-agents', color: '#FFBF00', relevance: 'Customer service at scale — balance, status, FAQs — $0.08/min' },
    { name: 'AI Automation', href: '/services/ai-automation', color: '#FFBF00', relevance: 'Straight-through processing for standard loan and KYC workflows' },
  ],
  compliance: [
    { title: 'Data Localisation (RBI)', body: 'RBI requires certain financial data to be stored and processed in India. On-premise deployment satisfies this requirement architecturally.' },
    { title: 'Audit Trail', body: 'Every document processed, every decision made — logged with confidence scores and source citations for regulatory audit.' },
    { title: 'Model Explainability', body: 'Regulatory approval for AI-assisted decisions requires explainable outputs. Our pipelines provide structured extraction with confidence scores, not black-box decisions.' },
  ],
  activeWork: null,
  ctaHeadline: 'Working in financial services?',
}

export default function FintechPage() {
  return <IndustryPageTemplate data={data} />
}
