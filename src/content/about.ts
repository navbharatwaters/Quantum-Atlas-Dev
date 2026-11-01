import type { Locale } from '@/lib/i18n'
import type { AboutContent } from './about.types'
import { aboutEn } from './about.en'
import { aboutRu } from './about.ru'

const about: Record<Locale, AboutContent> = { en: aboutEn, ru: aboutRu }

export function getAbout(locale: Locale = 'en'): AboutContent {
  return about[locale]
}
