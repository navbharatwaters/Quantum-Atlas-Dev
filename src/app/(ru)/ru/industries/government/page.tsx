import type { Metadata } from 'next'
import { IndustryPageTemplate } from '@/components/templates/IndustryPageTemplate'
import { pageAlternates } from '@/lib/i18n'
import { ruUrl } from '@/lib/site'
import { getIndustries } from '@/content/industries'

const L = 'ru' as const
const SLUG = 'government' as const
const PATH = `/industries/${SLUG}`

const TITLE = 'ИИ для госсектора: on-premise и суверенитет данных'
const DESCRIPTION =
  'On-premise ИИ для госсектора: RAG, обработка документов, суверенитет данных, полный журнал аудита. Архитектура уровня IGST, проверенная в продакшене.'

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: pageAlternates(L, PATH),
  openGraph: { title: TITLE, description: DESCRIPTION, type: 'website', locale: 'ru_RU', url: ruUrl(PATH) },
}

export default function GovernmentPageRu() {
  return <IndustryPageTemplate data={getIndustries(L).pages[SLUG]} slug={SLUG} locale={L} />
}
