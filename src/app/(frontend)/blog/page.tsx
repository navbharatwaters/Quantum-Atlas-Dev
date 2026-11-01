import type { Metadata } from 'next'
import Link from 'next/link'
import { PageHero } from '@/components/shared/PageHero'
import { ContentCard } from '@/components/shared/ContentCard'
import { CmsBlogIndex } from '@/components/cms/BlogViews'
import { legacyPosts } from '@/content/blog-legacy'
import { listDocs } from '@/lib/cms'
import { cmsAlternates } from '@/lib/cmsSeo'

// CMS reads happen at request time (ISR), never at build time.
export const revalidate = 300

const baseMetadata: Metadata = {
  title: 'Blog',
  description: 'Technical deep dives, AI implementation guides, and industry insights from the team at Quantum Atlas.',
}

export async function generateMetadata(): Promise<Metadata> {
  // hreflang only when the Russian blog has posts too
  const ru = await listDocs('blog-posts', 'ru')
  return ru.length ? { ...baseMetadata, alternates: cmsAlternates('en', '/blog', true) } : baseMetadata
}

const placeholderPosts = legacyPosts
const categories = ['All', 'Technical Deep Dives', 'AI Implementation', 'Industry Guides', 'Case Studies', 'Company']

function LegacyBlogPage() {
  const featured = placeholderPosts.find((p) => p.featured)
  const rest = placeholderPosts.filter((p) => !p.featured)

  return (
    <div className="bg-space-dark min-h-screen">
      <PageHero
        eyebrow="Knowledge Hub · Blog"
        heading="How we think. What we have learned."
      />

      {/* Category tabs */}
      <div className="px-6 lg:px-8 pt-4 pb-2">
        <div className="max-w-5xl mx-auto flex flex-wrap gap-2">
          {categories.map((cat) => (
            <span
              key={cat}
              className="px-4 py-2 rounded-full text-sm border cursor-pointer transition-colors"
              style={{
                background: cat === 'All' ? '#FFBF00' : 'transparent',
                color: cat === 'All' ? '#0C0A08' : '#A8998A',
                borderColor: cat === 'All' ? '#FFBF00' : '#2E261F',
                fontFamily: 'var(--font-display)',
              }}
            >
              {cat}
            </span>
          ))}
        </div>
      </div>

      <section className="py-12 px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          {/* Featured post */}
          {featured && (
            <Link
              href={`/blog/${featured.slug}`}
              className="group flex flex-col p-6 rounded-xl border border-[#2E261F] hover:border-[#42352A] motion-safe:hover:-translate-y-px transition-all mb-8"
              style={{ background: '#171411', borderRadius: '12px' }}
            >
              <span
                className="block text-[11px] mb-3"
                style={{ letterSpacing: '0.14em', color: '#A8998A', fontFamily: 'var(--font-mono)' }}
              >
                {featured.category} · {featured.readTime} min · {featured.date}
              </span>
              <p
                className="font-semibold text-text-primary mb-3 leading-snug"
                style={{ fontFamily: 'var(--font-display)', fontSize: '18px' }}
              >
                {featured.title}
              </p>
              <p className="text-[14px] text-text-secondary leading-[1.65] grow">{featured.excerpt}</p>
              <p className="mt-4 text-[14px] font-medium" style={{ color: '#FFBF00' }}>
                Read more{' '}
                <span className="inline-block transition-transform motion-safe:group-hover:translate-x-1" aria-hidden="true">→</span>
              </p>
            </Link>
          )}

          {/* Post grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {rest.map((post) => (
              <ContentCard
                key={post.slug}
                href={`/blog/${post.slug}`}
                label={`${post.category} · ${post.readTime} min · ${post.date}`}
                title={post.title}
                description={post.excerpt}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default async function BlogPage() {
  const posts = await listDocs('blog-posts', 'en')
  if (posts.length > 0) return <CmsBlogIndex locale="en" posts={posts} />
  return <LegacyBlogPage />
}
