import type { Metadata } from 'next'
import { AboutView } from '@/components/pages/AboutView'
import { pageAlternates } from '@/lib/i18n'

export const metadata: Metadata = {
  title: 'About Quantum Atlas',
  description: 'Production-first AI implementation. Every system we offer has been running in our own companies first. We are our own most demanding client.',
  alternates: pageAlternates('en', '/about'),
}

export default function AboutPage() {
  return <AboutView />
}
