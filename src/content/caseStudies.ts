import type { Locale } from '@/lib/i18n'
import type { CaseStudiesContent } from './caseStudies.types'
import { caseStudiesEn } from './caseStudies.en'
import { caseStudiesRu } from './caseStudies.ru'

const caseStudies: Record<Locale, CaseStudiesContent> = { en: caseStudiesEn, ru: caseStudiesRu }

export function getCaseStudies(locale: Locale = 'en'): CaseStudiesContent {
  return caseStudies[locale]
}
