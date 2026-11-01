/**
 * Copy for the industries index and the seven industry pages. industries.en.ts
 * and industries.ru.ts MUST both satisfy this interface.
 * Hrefs are logical (locale-less) paths; components resolve them with localeHref().
 */
export interface IndustryPageContent {
  /** Used for the element id of the JSON-LD script. */
  id: string
  name: string
  heroHeadline: string
  heroSubtext: string
  challenges: { title: string; body: string }[]
  services: { name: string; href: string; relevance: string }[]
  compliance: { title: string; body: string }[]
  activeWork: { sector: string; outcome: string } | null
  ctaHeadline: string
}

export interface IndustryUi {
  challengesLabel: string
  servicesLabel: (name: string) => string
  complianceLabel: string
  activeWorkLabel: string
  activeBadge: string
  ctaBody: string
  ctaButton: string
  jsonLdName: (name: string) => string
}

export const INDUSTRY_SLUGS = [
  'government',
  'logistics-shipping',
  'fintech-bfsi',
  'legal',
  'manufacturing',
  'healthcare',
  'real-estate',
] as const

export type IndustrySlug = (typeof INDUSTRY_SLUGS)[number]

export interface IndustriesContent {
  index: {
    eyebrow: string
    heading: string
    items: { slug: IndustrySlug; name: string; headline: string }[]
  }
  ui: IndustryUi
  pages: Record<IndustrySlug, IndustryPageContent>
}
