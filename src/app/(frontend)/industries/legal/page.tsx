import type { Metadata } from 'next'
import { IndustryPageTemplate } from '@/components/templates/IndustryPageTemplate'
import { pageAlternates } from '@/lib/i18n'
import { getIndustries } from '@/content/industries'

export const metadata: Metadata = {
  title: 'AI for Legal',
  description: 'Contract intelligence, clause extraction, risk flagging, and document RAG for law firms and legal teams. Process 500 contracts before the weekend.',
  alternates: pageAlternates('en', '/industries/legal'),
}

export default function LegalPage() {
  return <IndustryPageTemplate data={getIndustries('en').pages.legal} slug="legal" />
}
