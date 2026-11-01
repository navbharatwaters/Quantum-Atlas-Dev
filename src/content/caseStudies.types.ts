/** Case studies index copy. caseStudies.en.ts and caseStudies.ru.ts must both satisfy this. */
export interface CaseStudiesContent {
  eyebrow: string
  heading: string
  intro: string
  statusAvailable: string
  statusPending: string
  items: {
    title: string
    sector: string
    service: string
    outcome: string
    available: boolean
  }[]
  cta: { text: string; button: string }
}
