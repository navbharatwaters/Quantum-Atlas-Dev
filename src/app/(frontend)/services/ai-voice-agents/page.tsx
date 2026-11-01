import type { Metadata } from 'next'
import { ServicePageTemplate } from '@/components/templates/ServicePageTemplate'
import { getServices } from '@/content/services'
import { pageAlternates } from '@/lib/i18n'

const SLUG = 'ai-voice-agents'
const content = getServices('en')

export const metadata: Metadata = {
  ...content.meta[SLUG],
  alternates: pageAlternates('en', `/services/${SLUG}`),
}

export default function Page() {
  return <ServicePageTemplate data={content.pages[SLUG]} ui={content.ui} />
}
