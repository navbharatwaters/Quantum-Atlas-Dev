import type { Locale } from '@/lib/i18n'
import type { IndustriesContent } from './industries.types'
import { industriesEn } from './industries.en'
import { industriesRu } from './industries.ru'

export type { IndustrySlug, IndustryPageContent } from './industries.types'

const industries: Record<Locale, IndustriesContent> = { en: industriesEn, ru: industriesRu }

export function getIndustries(locale: Locale = 'en'): IndustriesContent {
  return industries[locale]
}
