import type { Metadata } from 'next'
import { ServicesIndex } from '@/components/templates/ServicesIndex'
import { getServices } from '@/content/services'
import { pageAlternates } from '@/lib/i18n'

export const metadata: Metadata = {
  ...getServices('en').index.meta,
  alternates: pageAlternates('en', '/services'),
}

export default function ServicesPage() {
  return <ServicesIndex />
}
