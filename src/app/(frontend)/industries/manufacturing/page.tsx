import type { Metadata } from 'next'
import { IndustryPageTemplate } from '@/components/templates/IndustryPageTemplate'
import { pageAlternates } from '@/lib/i18n'
import { getIndustries } from '@/content/industries'

export const metadata: Metadata = {
  title: 'AI for Manufacturing',
  description: 'Purchase order automation, quality certificate processing, import/export document intelligence for manufacturing enterprises.',
  alternates: pageAlternates('en', '/industries/manufacturing'),
}

export default function ManufacturingPage() {
  return <IndustryPageTemplate data={getIndustries('en').pages.manufacturing} slug="manufacturing" />
}
