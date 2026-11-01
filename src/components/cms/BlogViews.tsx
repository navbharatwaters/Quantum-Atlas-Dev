import Link from 'next/link'
import { PageHero } from '@/components/shared/PageHero'
import { ContentCard } from '@/components/shared/ContentCard'
import { RichTextBody } from '@/components/cms/RichTextBody'
import { CmsArticle, formatDate, mediaImage } from '@/components/cms/CmsArticle'
import { categoryLabels, getCmsUi } from '@/content/cms'
import { getAuthorName } from '@/lib/cms'
import { cmsHref, pageUrl } from '@/lib/cmsSeo'
import { enUrl } from '@/lib/site'
import type { Locale } from '@/lib/i18n'
import type { CmsPost } from '@/lib/cms'

const label = (locale: Locale, post: CmsPost) => {
  const cat = categoryLabels[locale][post.category] ?? post.category
  const ui = getCmsUi(locale)
  const parts = [cat, post.readTime ? `${post.readTime} ${ui.minRead}` : null, formatDate(post.publishedDate, locale)]
  return parts.filter(Boolean).join(' · ')
}

/** Blog index for published CMS posts. */
export function CmsBlogIndex({ locale, posts }: { locale: Locale; posts: CmsPost[] }) {
  const ui = getCmsUi(locale)
  const [first, ...rest] = posts
  return (
    <div className="bg-space-dark min-h-screen">
      <PageHero eyebrow={ui.blogEyebrow} heading={ui.blogHeading} />
      <section className="py-12 px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          {first && (
            <Link
              href={cmsHref(locale, `/blog/${first.slug}`)}
              className="group flex flex-col p-6 rounded-xl border border-[#2E261F] hover:border-[#42352A] motion-safe:hover:-translate-y-px transition-all mb-8"
              style={{ background: '#171411', borderRadius: '12px' }}
            >
              <span className="block text-[11px] mb-3" style={{ letterSpacing: '0.14em', color: '#A8998A', fontFamily: 'var(--font-mono)' }}>
                {label(locale, first)}
              </span>
              <h2 className="font-semibold text-text-primary mb-3 leading-snug" style={{ fontFamily: 'var(--font-display)', fontSize: '18px' }}>
                {first.title}
              </h2>
              <p className="text-[14px] text-text-secondary leading-[1.65] grow">{first.excerpt}</p>
              <p className="mt-4 text-[14px] font-medium" style={{ color: '#FFBF00' }}>
                {ui.readMore} <span aria-hidden="true">→</span>
              </p>
            </Link>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {rest.map((p) => (
              <ContentCard key={p.slug} locale={locale} href={cmsHref(locale, `/blog/${p.slug}`)} label={label(locale, p)} title={p.title} description={p.excerpt ?? undefined} />
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

/** Shown on /ru/blog while no post has a Russian version. */
export function CmsBlogEmpty({ locale }: { locale: Locale }) {
  const ui = getCmsUi(locale)
  return (
    <div className="bg-space-dark min-h-screen">
      <PageHero eyebrow={ui.blogEyebrow} heading={ui.blogEmptyTitle} body={ui.blogEmptyBody} />
      <section className="px-6 lg:px-8 pb-16">
        <div className="max-w-5xl mx-auto">
          <Link href={enUrl('/blog')} className="text-electric-blue hover:underline text-sm">
            {ui.blogEmptyLink} →
          </Link>
        </div>
      </section>
    </div>
  )
}

export async function CmsBlogPost({ locale, post }: { locale: Locale; post: CmsPost }) {
  const ui = getCmsUi(locale)
  const path = `/blog/${post.slug}`
  const authorName = await getAuthorName(post.author)
  const image = mediaImage(post.featuredImage)
  const description = post.seo?.description || post.excerpt
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description,
    inLanguage: locale,
    mainEntityOfPage: pageUrl(locale, path),
    url: pageUrl(locale, path),
    author: authorName ? { '@type': 'Person', name: authorName } : { '@type': 'Organization', name: 'Quantum Atlas' },
    publisher: { '@type': 'Organization', name: 'Quantum Atlas', url: enUrl('/') },
    ...(post.publishedDate ? { datePublished: post.publishedDate } : {}),
    dateModified: post.updatedAt,
    ...(image ? { image: image.url.startsWith('http') ? image.url : enUrl(image.url) } : {}),
  }
  const metaParts = [
    post.readTime ? `${post.readTime} ${ui.minRead}` : null,
    formatDate(post.publishedDate, locale),
    authorName ? `${ui.by} ${authorName}` : null,
  ].filter(Boolean)
  return (
    <CmsArticle
      locale={locale}
      jsonLd={jsonLd}
      jsonLdId={`ld-blog-${post.slug}`}
      chips={[categoryLabels[locale][post.category] ?? post.category]}
      metaLine={metaParts.join(' · ')}
      title={post.title}
      lede={post.excerpt}
      image={image}
      backHref={cmsHref(locale, '/blog')}
      backLabel={ui.backToBlog}
    >
      <RichTextBody data={post.content as never} />
    </CmsArticle>
  )
}
