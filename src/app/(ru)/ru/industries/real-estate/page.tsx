import type { Metadata } from 'next'
import { IndustryPageTemplate } from '@/components/templates/IndustryPageTemplate'
import { pageAlternates } from '@/lib/i18n'
import { ruUrl } from '@/lib/site'
import { getIndustries } from '@/content/industries'

const L = 'ru' as const
const SLUG = 'real-estate' as const
const PATH = `/industries/${SLUG}`

const TITLE = 'ИИ для недвижимости: договоры, NOC, аренда'
const DESCRIPTION =
  'Обработка документов на недвижимость, извлечение данных из договоров купли-продажи и анализ договоров аренды для девелоперов и управляющих компаний.'

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: pageAlternates(L, PATH),
  openGraph: { title: TITLE, description: DESCRIPTION, type: 'website', locale: 'ru_RU', url: ruUrl(PATH) },
}

export default function RealEstatePageRu() {
  return <IndustryPageTemplate data={getIndustries(L).pages[SLUG]} slug={SLUG} locale={L} />
}
