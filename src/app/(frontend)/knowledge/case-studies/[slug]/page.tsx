import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { CmsCaseDetail } from '@/components/cms/CaseViews'
import { getDoc } from '@/lib/cms'
import { buildMetadata } from '@/lib/cmsSeo'

// CMS reads happen at request time (ISR), never at build time.
export const revalidate = 300
export const dynamicParams = true
export function generateStaticParams() {
  return []
}

type Params = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params
  const [en, ru] = await Promise.all([getDoc('case-studies', slug, 'en'), getDoc('case-studies', slug, 'ru')])
  if (!(en.ok && en.doc)) return { robots: { index: false } }
  const item = en.doc
  return buildMetadata({
    locale: 'en',
    path: `/knowledge/case-studies/${item.slug}`,
    title: item.seo?.title || item.title,
    description: item.seo?.description,
    bothLanguages: ru.ok && Boolean(ru.doc),
    image: item.featuredImage,
    modifiedTime: item.updatedAt,
  })
}

export default async function CaseStudyPage({ params }: Params) {
  const { slug } = await params
  const found = await getDoc('case-studies', slug, 'en')
  if (!found.ok) throw new Error('CMS unavailable')
  if (!found.doc) notFound()
  return <CmsCaseDetail locale="en" item={found.doc} />
}
