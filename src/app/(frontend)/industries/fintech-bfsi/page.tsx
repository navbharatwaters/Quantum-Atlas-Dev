import type { Metadata } from 'next'
import { IndustryPageTemplate } from '@/components/templates/IndustryPageTemplate'
import { pageAlternates } from '@/lib/i18n'
import { getIndustries } from '@/content/industries'

export const metadata: Metadata = {
  title: 'AI for Fintech & BFSI',
  description: 'KYC automation, loan document processing, compliance RAG, and voice AI for banks and financial services. On-premise deployment available.',
  alternates: pageAlternates('en', '/industries/fintech-bfsi'),
}

export default function FintechPage() {
  return <IndustryPageTemplate data={getIndustries('en').pages['fintech-bfsi']} slug="fintech-bfsi" />
}
