import type { Metadata } from 'next'
import { IndustryPageTemplate } from '@/components/templates/IndustryPageTemplate'
import { pageAlternates } from '@/lib/i18n'
import { ruUrl } from '@/lib/site'
import { getIndustries } from '@/content/industries'

const L = 'ru' as const
const SLUG = 'fintech-bfsi' as const
const PATH = `/industries/${SLUG}`

const TITLE = 'ИИ для финтеха и BFSI: KYC, комплаенс, голос'
const DESCRIPTION =
  'Автоматизация KYC, обработка кредитных документов, RAG по комплаенсу и голосовой ИИ для банков и финансовых услуг. Доступно развёртывание on-premise.'

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: pageAlternates(L, PATH),
  openGraph: { title: TITLE, description: DESCRIPTION, type: 'website', locale: 'ru_RU', url: ruUrl(PATH) },
}

export default function FintechPageRu() {
  return <IndustryPageTemplate data={getIndustries(L).pages[SLUG]} slug={SLUG} locale={L} />
}
