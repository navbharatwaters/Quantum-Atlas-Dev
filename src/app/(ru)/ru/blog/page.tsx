import type { Metadata } from 'next'
import { CmsBlogEmpty, CmsBlogIndex } from '@/components/cms/BlogViews'
import { getCmsUi } from '@/content/cms'
import { listDocs } from '@/lib/cms'
import { buildMetadata } from '@/lib/cmsSeo'

const L = 'ru' as const

// CMS reads happen at request time (ISR), never at build time.
export const revalidate = 300

export async function generateMetadata(): Promise<Metadata> {
  const ru = await listDocs('blog-posts', L)
  const ui = getCmsUi(L)
  if (ru.length === 0) {
    // Nothing published in Russian yet: keep the empty page out of search.
    return buildMetadata({ locale: L, path: '/blog', title: ui.blogEmptyTitle, bothLanguages: false, noindex: true })
  }
  const en = await listDocs('blog-posts', 'en')
  return buildMetadata({
    locale: L,
    path: '/blog',
    title: 'Блог Quantum Atlas',
    description: ui.blogHeading,
    bothLanguages: en.length > 0,
  })
}

export default async function BlogPageRu() {
  const posts = await listDocs('blog-posts', L)
  if (posts.length === 0) return <CmsBlogEmpty locale={L} />
  return <CmsBlogIndex locale={L} posts={posts} />
}
