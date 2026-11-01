/**
 * Shape of the Services copy (index + six detail pages). services.en.ts and
 * services.ru.ts MUST both satisfy ServicesContent so the locales cannot drift.
 * Hrefs are logical (locale-less) paths; components resolve them with localeHref().
 */
export interface ServicePageData {
  slug: string
  name: string
  color: string // hex
  colorName: string
  tagline: string
  heroMetrics: { value: string; label: string }[]
  problemHeading: string
  problemBody: string
  approachHeading: string
  approachPoints: string[]
  proofMetrics: { metric: string; before: string; after: string }[]
  techStack: string[]
  deploymentOptions: string[]
  pricingNote: string
  faqs: { q: string; a: string }[]
  relatedServices: { name: string; href: string; color: string }[]
}

/** Chrome strings of ServicePageTemplate. `{name}` in finalHeading is replaced by the service name. */
export interface ServiceUi {
  discussCta: string
  problemEyebrow: string
  approachEyebrow: string
  proofEyebrow: string
  colMetric: string
  colBefore: string
  colAfter: string
  techStackEyebrow: string
  deploymentEyebrow: string
  pricingEyebrow: string
  quoteCta: string
  faqEyebrow: string
  relatedEyebrow: string
  finalHeading: string
  finalBody: string
  finalCta: string
}

export type ServiceSlug =
  | 'ai-voice-agents'
  | 'document-intelligence'
  | 'enterprise-rag'
  | 'saas-development'
  | 'ai-automation'
  | 'content-video'

export interface PageMeta {
  title: string
  description: string
}

export interface ServicesContent {
  ui: ServiceUi
  index: {
    meta: PageMeta
    /** Used for the Russian JSON-LD name. */
    jsonLdName: string
    hero: { eyebrow: string; heading: string; body: string }
    /** Same order as the icons in ServicesIndex. */
    items: { slug: ServiceSlug; name: string; tagline: string; description: string }[]
  }
  meta: Record<ServiceSlug, PageMeta>
  pages: Record<ServiceSlug, ServicePageData>
}
