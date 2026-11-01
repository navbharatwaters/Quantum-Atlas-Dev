import type { Metadata } from 'next'
import { IndustryPageTemplate } from '@/components/templates/IndustryPageTemplate'
import { pageAlternates } from '@/lib/i18n'
import { ruUrl } from '@/lib/site'
import { getIndustries } from '@/content/industries'

const L = 'ru' as const
const SLUG = 'healthcare' as const
const PATH = `/industries/${SLUG}`

const TITLE = 'ИИ для здравоохранения: документы и страховые'
const DESCRIPTION =
  'Обработка медицинских карт, предварительное согласование со страховыми и интеллектуальная обработка клинических документов для больниц и клиник.'

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: pageAlternates(L, PATH),
  openGraph: { title: TITLE, description: DESCRIPTION, type: 'website', locale: 'ru_RU', url: ruUrl(PATH) },
}

export default function HealthcarePageRu() {
  return <IndustryPageTemplate data={getIndustries(L).pages[SLUG]} slug={SLUG} locale={L} />
}
