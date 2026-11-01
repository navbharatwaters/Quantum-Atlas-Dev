import type { Metadata } from 'next'
import Link from 'next/link'
import Script from 'next/script'

// Seed data — swap for live Payload CMS fetch post-launch
const placeholderPost = {
  title: 'How We Built a Voice Agent at $0.08/min — Full Technical Breakdown',
  category: 'Technical Deep Dive',
  date: 'April 2026',
  readTime: 12,
  excerpt: 'A complete breakdown of the architecture, cost components, and engineering decisions behind our production voice AI deployment.',
}

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: placeholderPost.title,
    description: placeholderPost.excerpt,
    openGraph: {
      title: placeholderPost.title,
      description: placeholderPost.excerpt,
      type: 'article',
    },
  }
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: placeholderPost.title,
    description: placeholderPost.excerpt,
    author: { '@type': 'Organization', name: 'Quantum Atlas' },
    publisher: { '@type': 'Organization', name: 'Quantum Atlas', url: 'https://quantumatlas.dev' },
    datePublished: '2026-04-01',
  }

  return (
    <div className="bg-space-dark min-h-screen">
      <Script id={`ld-blog-${slug}`} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Hero */}
      <section className="pt-32 pb-16 px-6 lg:px-8" style={{ background: '#0C0A08' }}>
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <span className="px-2.5 py-1 rounded text-[11px]" style={{ background: '#FFBF0020', color: '#FFBF00', fontFamily: 'var(--font-mono)' }}>
              {placeholderPost.category}
            </span>
            <span className="text-text-secondary text-xs" style={{ fontFamily: 'var(--font-mono)' }}>
              {placeholderPost.readTime} min · {placeholderPost.date}
            </span>
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold text-text-primary leading-[1.1] mb-6" style={{ fontFamily: 'var(--font-display)' }}>
            {placeholderPost.title}
          </h1>
          <p className="text-text-secondary text-xl leading-relaxed">{placeholderPost.excerpt}</p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <p className="text-text-secondary/60 text-sm p-4 rounded-lg border border-space-border" style={{ background: '#171411' }}>
            Content published via Payload CMS — add articles at /admin.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-6 lg:px-8 border-t border-space-border">
        <div className="max-w-3xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <p className="text-text-secondary text-sm mb-1">Interested in implementing this?</p>
            <p className="text-text-primary font-semibold" style={{ fontFamily: 'var(--font-display)' }}>
              Let us discuss your specific challenge.
            </p>
          </div>
          <Link
            href="/contact"
            className="shrink-0 px-6 py-3 rounded-lg bg-electric-blue text-white font-semibold text-sm hover:brightness-110 transition-all"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Book a Discovery Call
          </Link>
        </div>
      </section>

      {/* Related */}
      <section className="py-16 px-6 lg:px-8" style={{ background: '#12100D' }}>
        <div className="max-w-3xl mx-auto">
          <p className="text-[11px] tracking-[3px] uppercase mb-6 text-text-secondary" style={{ fontFamily: 'var(--font-mono)' }}>
            More from the blog
          </p>
          <Link href="/blog" className="text-electric-blue hover:underline text-sm">
            View all articles →
          </Link>
        </div>
      </section>
    </div>
  )
}
