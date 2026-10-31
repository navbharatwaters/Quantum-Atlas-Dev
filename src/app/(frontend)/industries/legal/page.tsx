import type { Metadata } from 'next'
import { IndustryPageTemplate } from '@/components/templates/IndustryPageTemplate'
import type { IndustryPageData } from '@/components/templates/IndustryPageTemplate'

export const metadata: Metadata = {
  title: 'AI for Legal',
  description: 'Contract intelligence, clause extraction, risk flagging, and document RAG for law firms and legal teams. Process 500 contracts before the weekend.',
}

const data: IndustryPageData = {
  id: 'legal',
  name: 'Legal',
  heroHeadline: '500 contracts reviewed before the weekend',
  heroSubtext: 'Contract clause extraction, obligation tracking, risk flagging, and due diligence at a scale no legal team can match manually.',
  challenges: [
    { title: 'Contract review bottlenecks', body: 'M&A due diligence requires reviewing hundreds of contracts in days. Legal teams cannot scale headcount fast enough. Deals get delayed or risk gets missed.' },
    { title: 'Obligation and deadline tracking', body: 'Contracts have obligations, deadlines, renewal dates, and notice periods. Manual tracking in spreadsheets misses critical dates.' },
    { title: 'Non-standard clause detection', body: 'Every firm has baseline clause positions. Identifying deviations from standard positions requires reading every clause in every contract — which humans do not do consistently.' },
    { title: 'Cross-contract analysis', body: 'Understanding how obligations interact across a portfolio of 500 contracts requires capabilities that no human team has at reasonable cost.' },
  ],
  services: [
    { name: 'Document Intelligence', href: '/services/document-intelligence', color: '#FFBF00', relevance: 'Contract clause extraction, obligation identification, risk flagging, deadline tracking' },
    { name: 'Enterprise RAG', href: '/services/enterprise-rag', color: '#FFBF00', relevance: 'Q&A across contract corpus — find precedents, identify risks, query obligations' },
    { name: 'AI Automation', href: '/services/ai-automation', color: '#FFBF00', relevance: 'Deadline notification workflows, approval routing, document management' },
  ],
  compliance: [
    { title: 'Attorney-Client Privilege', body: 'On-premise deployment ensures client documents never leave your network. No third-party access to privileged information.' },
    { title: 'Audit Trail', body: 'Every extraction flagged, every clause identified — logged with source location, confidence score, and reviewer.' },
    { title: 'Human-in-the-Loop', body: 'AI extracts and flags. Lawyers review and decide. The system is designed to assist, not replace, legal judgment.' },
  ],
  activeWork: null,
  ctaHeadline: 'Running a legal team or law firm?',
}

export default function LegalPage() {
  return <IndustryPageTemplate data={data} />
}
