import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { CmsBlogPost } from '@/components/cms/BlogViews'
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
  const [ru, en] = await Promise.all([getDoc('blog-posts', slug, L), getDoc('blog-posts', slug, 'en')])
  if (!(ru.ok && ru.doc)) return { robots: { index: false } }
  const post = ru.doc
  return buildMetadata({
    locale: L,
    path: `/blog/${post.slug}`,
    title: post.seo?.title || post.title,
    description: post.seo?.description || post.excerpt,
    bothLanguages: en.ok && Boolean(en.doc),
    image: post.featuredImage,
    openGraphType: 'article',
    publishedTime: post.publishedDate,
    modifiedTime: post.updatedAt,
  })
}

export default async function BlogPostPageRu({ params }: Params) {
  const { slug } = await params
  const found = await getDoc('blog-posts', slug, L)
  if (!found.ok) throw new Error('CMS unavailable')
  if (!found.doc) notFound()
  return <CmsBlogPost locale={L} post={found.doc} />
}
