/**
 * Shape of the homepage copy. home.en.ts and home.ru.ts MUST both satisfy this
 * interface so the two locales cannot drift structurally.
 * Hrefs are logical (locale-less) paths; components resolve them with localeHref().
 */
export interface HomeContent {
  hero: {
    eyebrow: string
    headline: [string, string, string]
    subtitle: string
    ctaPrimary: string
    ctaSecondary: string
    coordinates: string
  }
  proofBar: { ariaLabel: string; points: string[] }
  servicesGrid: {
    eyebrow: string
    heading: string
    intro: string
    /** Same order as the icons in ServicesGrid. */
    items: { name: string; description: string; href: string }[]
  }
  whyDifferent: {
    eyebrow: string
    heading: [string, string]
    body: string
    points: { value: string; label: string }[]
  }
  deepDive: {
    cta: string
    visuals: { query: string; processed: string; answerCite: string }
    items: {
      id: 'voice' | 'idp' | 'rag' | 'saas'
      label: string
      heading: string
      description: string
      bullets: string[]
      href: string
    }[]
  }
  activeEngagements: {
    eyebrow: string
    heading: string
    items: { sector: string; service: string; status: string; outcome: string }[]
  }
  industries: {
    eyebrow: string
    heading: string
    challengesTitle: (label: string) => string
    items: {
      id: string
      label: string
      href: string
      pain: string
      services: string[]
      cta: string
    }[]
  }
  techStack: {
    eyebrow: string
    heading: string
    intro: string
    rows: { label: string; items: { name: string; note: string }[] }[]
  }
  knowledgePreview: {
    eyebrow: string
    heading: string
    readTime: (minutes: number) => string
    viewAll: string
    posts: { title: string; category: string; readMinutes: number; date: string; href: string }[]
    guide: { eyebrow: string; title: string; body: string }
    form: {
      namePlaceholder: string
      emailPlaceholder: string
      submit: string
      submitting: string
      successTitle: string
      successBody: string
      note: string
    }
  }
  cta: {
    heading: [string, string]
    body: string
    primary: string
    secondary: string
  }
}
