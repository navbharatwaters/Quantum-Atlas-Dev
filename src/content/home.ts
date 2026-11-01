import type { Locale } from '@/lib/i18n'
import type { HomeContent } from './home.types'
import { homeEn } from './home.en'
import { homeRu } from './home.ru'

const home: Record<Locale, HomeContent> = { en: homeEn, ru: homeRu }

export function getHome(locale: Locale = 'en'): HomeContent {
  return home[locale]
}
