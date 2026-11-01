import type { Locale } from '@/lib/i18n'
import type { ContactContent } from './contact.types'
import { contactEn } from './contact.en'
import { contactRu } from './contact.ru'

const contact: Record<Locale, ContactContent> = { en: contactEn, ru: contactRu }

export function getContact(locale: Locale = 'en'): ContactContent {
  return contact[locale]
}
