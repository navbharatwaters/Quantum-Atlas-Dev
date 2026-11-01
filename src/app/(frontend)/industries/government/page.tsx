import type { Metadata } from 'next'
import { IndustryPageTemplate } from '@/components/templates/IndustryPageTemplate'
import { pageAlternates } from '@/lib/i18n'
import { getIndustries } from '@/content/industries'

export const metadata: Metadata = {
  title: 'AI for Government',
  description: 'On-premise AI systems for government departments — RAG, document intelligence, data sovereignty. IGST-grade architecture.',
  alternates: pageAlternates('en', '/industries/government'),
}

export default function GovernmentPage() {
  return <IndustryPageTemplate data={getIndustries('en').pages.government} slug="government" />
}
