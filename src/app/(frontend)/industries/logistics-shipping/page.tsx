import type { Metadata } from 'next'
import { IndustryPageTemplate } from '@/components/templates/IndustryPageTemplate'
import { pageAlternates } from '@/lib/i18n'
import { getIndustries } from '@/content/industries'

export const metadata: Metadata = {
  title: 'AI for Logistics & Shipping',
  description: 'Voice AI, document intelligence, and automation for logistics and shipping companies. Proven at Navbharat Shipping — 4 months production.',
  alternates: pageAlternates('en', '/industries/logistics-shipping'),
}

export default function LogisticsPage() {
  return <IndustryPageTemplate data={getIndustries('en').pages['logistics-shipping']} slug="logistics-shipping" />
}
