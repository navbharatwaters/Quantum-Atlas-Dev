import type { Metadata } from 'next'
import { IndustryPageTemplate } from '@/components/templates/IndustryPageTemplate'
import { pageAlternates } from '@/lib/i18n'
import { ruUrl } from '@/lib/site'
import { getIndustries } from '@/content/industries'

const L = 'ru' as const
const SLUG = 'manufacturing' as const
const PATH = `/industries/${SLUG}`

const TITLE = 'ИИ для производства: заказы, сертификаты, ВЭД'
const DESCRIPTION =
  'Автоматизация заказов на закупку, обработка сертификатов качества и интеллектуальная обработка документов по импорту и экспорту для производств.'

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: pageAlternates(L, PATH),
  openGraph: { title: TITLE, description: DESCRIPTION, type: 'website', locale: 'ru_RU', url: ruUrl(PATH) },
}

export default function ManufacturingPageRu() {
  return <IndustryPageTemplate data={getIndustries(L).pages[SLUG]} slug={SLUG} locale={L} />
}
