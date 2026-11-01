import { PageHero } from '@/components/shared/PageHero'
import { ContentCard } from '@/components/shared/ContentCard'
import { RichTextBody } from '@/components/cms/RichTextBody'
import { CmsArticle, mediaImage } from '@/components/cms/CmsArticle'
import { getCmsUi } from '@/content/cms'
import { cmsHref, pageUrl } from '@/lib/cmsSeo'
import { enUrl } from '@/lib/site'
import type { Locale } from '@/lib/i18n'
import type { CmsCase } from '@/lib/cms'

const BASE = '/knowledge/case-studies'

export function CmsCaseList({ locale, items }: { locale: Locale; items: CmsCase[] }) {
  const ui = getCmsUi(locale)
  return (
    <div className="bg-space-dark min-h-screen">
      <PageHero eyebrow={ui.caseEyebrow} heading={ui.caseHeading} body={ui.caseIntro} />
      <section className="py-12 px-6 lg:px-8">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
          {items.map((c) => (
            <ContentCard
              key={c.slug}
              locale={locale}
              href={cmsHref(locale, `${BASE}/${c.slug}`)}
              label={[c.client, c.deploymentStatus === 'pilot' ? ui.statusPilot : ui.statusProduction].filter(Boolean).join(' · ')}
              title={c.title}
              description={c.seo?.description ?? undefined}
            />
          ))}
        </div>
      </section>
    </div>
  )
}

export function CmsCaseDetail({ locale, item }: { locale: Locale; item: CmsCase }) {
  const ui = getCmsUi(locale)
  const path = `${BASE}/${item.slug}`
  const outcomes = (item.outcomes ?? []).filter((o) => o.metric)
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: item.title,
    description: item.seo?.description || undefined,
    inLanguage: locale,
    url: pageUrl(locale, path),
    dateModified: item.updatedAt,
    author: { '@type': 'Organization', name: 'Quantum Atlas', url: enUrl('/') },
    publisher: { '@type': 'Organization', name: 'Quantum Atlas', url: enUrl('/') },
  }
  return (
    <CmsArticle
      locale={locale}
      jsonLd={jsonLd}
      jsonLdId={`ld-case-${item.slug}`}
      chips={[ui.caseEyebrow, item.deploymentStatus === 'pilot' ? ui.statusPilot : ui.statusProduction]}
      metaLine={item.client ?? undefined}
      title={item.title}
      image={mediaImage(item.featuredImage)}
      backHref={cmsHref(locale, BASE)}
      backLabel={ui.allCaseStudies}
    >
      <div className="flex flex-col gap-10">
        {item.challenge && (
          <div>
            <h2 className="text-text-primary text-2xl font-bold mb-4" style={{ fontFamily: 'var(--font-display)' }}>{ui.challenge}</h2>
            <RichTextBody data={item.challenge as never} />
          </div>
        )}
        {item.solution && (
          <div>
            <h2 className="text-text-primary text-2xl font-bold mb-4" style={{ fontFamily: 'var(--font-display)' }}>{ui.solution}</h2>
            <RichTextBody data={item.solution as never} />
          </div>
        )}
        {outcomes.length > 0 && (
          <div>
            <h2 className="text-text-primary text-2xl font-bold mb-4" style={{ fontFamily: 'var(--font-display)' }}>{ui.outcomes}</h2>
            <div className="cms-prose">
              <table>
                <thead>
                  <tr><th>{ui.metric}</th><th>{ui.before}</th><th>{ui.after}</th></tr>
                </thead>
                <tbody>
                  {outcomes.map((o, i) => (
                    <tr key={o.id ?? i}><td>{o.metric}</td><td>{o.before}</td><td>{o.after}</td></tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
        {(item.techStack ?? []).length > 0 && (
          <p className="text-text-secondary text-sm" style={{ fontFamily: 'var(--font-mono)' }}>
            {ui.techStack}: {(item.techStack ?? []).map((t) => t.technology).filter(Boolean).join(', ')}
          </p>
        )}
      </div>
    </CmsArticle>
  )
}
