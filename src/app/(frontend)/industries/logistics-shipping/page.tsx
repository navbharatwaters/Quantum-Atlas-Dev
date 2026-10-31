import type { Metadata } from 'next'
import { IndustryPageTemplate } from '@/components/templates/IndustryPageTemplate'
import type { IndustryPageData } from '@/components/templates/IndustryPageTemplate'

export const metadata: Metadata = {
  title: 'AI for Logistics & Shipping',
  description: 'Voice AI, document intelligence, and automation for logistics and shipping companies. Proven at Navbharat Shipping — 4 months production.',
}

const data: IndustryPageData = {
  id: 'logistics',
  name: 'Logistics & Shipping',
  heroHeadline: 'Documents processed before the cargo lands',
  heroSubtext: 'From voice agents that handle inbound calls to IDP pipelines that process hundreds of shipping documents in minutes — built for the pace of logistics.',
  challenges: [
    { title: 'High inbound call volume', body: 'Shipping enquiries, status updates, delivery notifications — all requiring live responses at hours that human teams cannot sustain.' },
    { title: 'Document-heavy operations', body: 'Bills of lading, bills of entry, certificates of origin, customs documents — each shipment generates a document bundle that must be processed accurately and fast.' },
    { title: 'Time-sensitive customs clearance', body: 'Delays in customs clearance cost money by the hour. Document processing errors cause rejections. Speed and accuracy are both required.' },
    { title: 'Fragmented systems', body: 'Shipping management, accounting, and customs software rarely talk to each other. Manual data re-entry introduces errors at every handoff.' },
  ],
  services: [
    { name: 'AI Voice Agents', href: '/services/ai-voice-agents', color: '#FFBF00', relevance: 'Inbound call handling, shipment status, delivery notifications — $0.08/min' },
    { name: 'Document Intelligence', href: '/services/document-intelligence', color: '#FFBF00', relevance: 'BOE, BL, certificates — bulk processing for your document types' },
    { name: 'AI Automation', href: '/services/ai-automation', color: '#FFBF00', relevance: 'Connect shipping, customs, and accounting systems — eliminate manual re-entry' },
    { name: 'Enterprise RAG', href: '/services/enterprise-rag', color: '#FFBF00', relevance: 'Customs regulation search, tariff lookup, circular compliance Q&A' },
  ],
  compliance: [
    { title: 'Customs Compliance', body: 'Our RAG system indexes IGST circulars, customs notifications, and tariff schedules. Officers can query for applicable regulations with citations to the source document.' },
    { title: 'Data Handling', body: 'Shipping documents contain commercially sensitive data. On-premise deployment options ensure data stays within your network.' },
    { title: 'Audit Trail', body: 'Every document processed, every answer generated — logged with source, timestamp, and confidence score.' },
  ],
  activeWork: {
    sector: 'Shipping & Logistics · India',
    outcome: 'AI voice agent handling inbound and outbound calls for Navbharat Shipping — 4 months in production, Airtel/Jio SIP, $0.08/min end-to-end cost.',
    color: '#FFBF00',
  },
  ctaHeadline: 'Running a logistics or shipping operation?',
}

export default function LogisticsPage() {
  return <IndustryPageTemplate data={data} />
}
