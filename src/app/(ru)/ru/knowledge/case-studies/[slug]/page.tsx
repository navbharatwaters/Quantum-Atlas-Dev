import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { CmsCaseDetail } from '@/components/cms/CaseViews'
import { getDoc } from '@/lib/cms'
import { buildMetadata } from '@/lib/cmsSeo'

const L = 'ru' as const

// CMS reads happen at request time (ISR), never at build time.
export const revalidate = 300
export const dynamicParams = true
export function generateStaticParams() {
  return []
}

type Params = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params
  const [ru, en] = await Promise.all([getDoc('case-studies', slug, L), getDoc('case-studies', slug, 'en')])
  if (!(ru.ok && ru.doc)) return { robots: { index: false } }
  const item = ru.doc
  return buildMetadata({
    locale: L,
    path: `/knowledge/case-studies/${item.slug}`,
    title: item.seo?.title || item.title,
    description: item.seo?.description,
    bothLanguages: en.ok && Boolean(en.doc),
    image: item.featuredImage,
    modifiedTime: item.updatedAt,
  })
}

export default async function CaseStudyPageRu({ params }: Params) {
  const { slug } = await params
  const found = await getDoc('case-studies', slug, L)
  if (!found.ok) throw new Error('CMS unavailable')
  if (!found.doc) notFound()
  return <CmsCaseDetail locale={L} item={found.doc} />
}
