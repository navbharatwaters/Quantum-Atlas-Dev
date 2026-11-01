import type { Metadata } from 'next'
import { IndustryPageTemplate } from '@/components/templates/IndustryPageTemplate'
import { pageAlternates } from '@/lib/i18n'
import { getIndustries } from '@/content/industries'

export const metadata: Metadata = {
  title: 'AI for Healthcare',
  description: 'Patient record processing, insurance pre-authorization, clinical document intelligence for hospitals and healthcare enterprises.',
  alternates: pageAlternates('en', '/industries/healthcare'),
}

export default function HealthcarePage() {
  return <IndustryPageTemplate data={getIndustries('en').pages.healthcare} slug="healthcare" />
}
