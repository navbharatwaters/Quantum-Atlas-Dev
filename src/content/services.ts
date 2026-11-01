import type { Locale } from '@/lib/i18n'
import type { ServicesContent } from './services.types'
import { servicesEn } from './services.en'
import { servicesRu } from './services.ru'

const services: Record<Locale, ServicesContent> = { en: servicesEn, ru: servicesRu }

export function getServices(locale: Locale = 'en'): ServicesContent {
  return services[locale]
}
