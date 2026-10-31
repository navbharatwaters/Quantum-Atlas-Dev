import type { Metadata } from 'next'
import Link from 'next/link'
import { PageHero } from '@/components/shared/PageHero'
import { ContentCard } from '@/components/shared/ContentCard'

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Technical deep dives, AI implementation guides, and industry insights from the team at Quantum Atlas.',
}

// Placeholder posts — will be replaced by Payload CMS data
const placeholderPosts = [
  { title: 'How We Built a Voice Agent at $0.08/min — Full Technical Breakdown', slug: 'voice-agent-cost-breakdown', category: 'Technical Deep Dive', excerpt: 'A complete breakdown of the architecture, cost components, and engineering decisions behind our production voice AI deployment.', date: 'Apr 2026', readTime: 12, featured: true },
  { title: 'Why We Chose PostgreSQL Over Pinecone for RAG — And What Happened', slug: 'postgresql-rag-vs-pinecone', category: 'AI Implementation', excerpt: 'The case for keeping all your data in one database — and the retrieval quality results that justified the decision.', date: 'Mar 2026', readTime: 8, featured: false },
  { title: 'On-Premise AI for Government: What Actually Matters', slug: 'on-premise-government-ai', category: 'Industry Guide', excerpt: 'After working with government departments on AI procurement, here is what separates deployable from demoable.', date: 'Mar 2026', readTime: 6, featured: false },
  { title: 'Contract Analysis at Scale — Processing 500 Agreements in 2 Hours', slug: 'contract-analysis-at-scale', category: 'Technical Deep Dive', excerpt: 'The pipeline architecture behind bulk contract intelligence — OCR, extraction, clause analysis, and the audit trail.', date: 'Feb 2026', readTime: 10, featured: false },
  { title: 'How We Reduced a 15-Person Team to 2 With AI Automation', slug: 'team-reduction-automation', category: 'AI Implementation', excerpt: 'Internal proof: the LangGraph + n8n architecture that automated accounting and HR workflows for the Navbharat group.', date: 'Feb 2026', readTime: 7, featured: false },
  { title: 'The Real Cost of Nanonets vs Building Your Own IDP Pipeline', slug: 'nanonets-vs-custom-idp', category: 'Technical Deep Dive', excerpt: 'A side-by-side cost and capability analysis — with production numbers from our own document processing deployment.', date: 'Jan 2026', readTime: 9, featured: false },
]

const categories = ['All', 'Technical Deep Dives', 'AI Implementation', 'Industry Guides', 'Case Studies', 'Company']

export default function BlogPage() {
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
