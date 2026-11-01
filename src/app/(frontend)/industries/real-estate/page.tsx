import type { Metadata } from 'next'
import { IndustryPageTemplate } from '@/components/templates/IndustryPageTemplate'
import { pageAlternates } from '@/lib/i18n'
import { getIndustries } from '@/content/industries'

export const metadata: Metadata = {
  title: 'AI for Real Estate',
  description: 'Property document processing, sale deed extraction, lease agreement intelligence for real estate enterprises and developers.',
  alternates: pageAlternates('en', '/industries/real-estate'),
}

export default function RealEstatePage() {
  return <IndustryPageTemplate data={getIndustries('en').pages['real-estate']} slug="real-estate" />
}
