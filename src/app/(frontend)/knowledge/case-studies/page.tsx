import type { Metadata } from 'next'
import { CaseStudiesView } from '@/components/pages/CaseStudiesView'
import { CmsCaseList } from '@/components/cms/CaseViews'
import { listDocs } from '@/lib/cms'
import { pageAlternates } from '@/lib/i18n'

// CMS reads happen at request time (ISR), never at build time.
export const revalidate = 300

export const metadata: Metadata = {
  title: 'Case Studies',
  description: 'Production AI deployment case studies from Quantum Atlas.',
  alternates: pageAlternates('en', '/knowledge/case-studies'),
}

export default async function CaseStudiesPage() {
  const items = await listDocs('case-studies', 'en')
  if (items.length > 0) return <CmsCaseList locale="en" items={items} />
  return <CaseStudiesView />
}
