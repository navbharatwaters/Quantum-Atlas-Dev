import type { Metadata } from 'next'
import { CaseStudiesView } from '@/components/pages/CaseStudiesView'
import { pageAlternates } from '@/lib/i18n'

export const metadata: Metadata = {
  title: 'Case Studies',
  description: 'Production AI deployment case studies from Quantum Atlas.',
  alternates: pageAlternates('en', '/knowledge/case-studies'),
}

export default function CaseStudiesPage() {
  return <CaseStudiesView />
}
