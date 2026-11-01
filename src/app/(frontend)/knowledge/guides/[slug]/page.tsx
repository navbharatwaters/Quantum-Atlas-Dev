import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { CmsGuideDetail } from '@/components/cms/GuideViews'
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
  const g = await getDoc('guides', slug, 'en')
  if (!(g.ok && g.doc)) return { robots: { index: false } }
  const item = g.doc
  return buildMetadata({
    locale: 'en',
    path: `/knowledge/guides/${item.slug}`,
    title: item.seo?.title || item.title,
    description: item.seo?.description || item.summary,
    bothLanguages: false, // no Russian Knowledge pages yet
    publishedTime: item.publishedDate,
    modifiedTime: item.updatedAt,
  })
}

export default async function GuidePage({ params }: Params) {
  const { slug } = await params
  const found = await getDoc('guides', slug, 'en')
  if (!found.ok) throw new Error('CMS unavailable')
  if (!found.doc) notFound()
  return <CmsGuideDetail item={found.doc} />
}
