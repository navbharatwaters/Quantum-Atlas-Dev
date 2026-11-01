import type { Metadata } from 'next'
import { PageHero } from '@/components/shared/PageHero'
import { ContentCard } from '@/components/shared/ContentCard'
import { pageAlternates } from '@/lib/i18n'
import { getIndustries } from '@/content/industries'

export const metadata: Metadata = {
  title: 'Industries',
  description: 'AI solutions for government, logistics, fintech, legal, manufacturing, healthcare, and real estate.',
  alternates: pageAlternates('en', '/industries'),
}

export default function IndustriesPage() {
  const { index } = getIndustries('en')
  return (
    <div className="bg-space-dark min-h-screen">
      <PageHero eyebrow={index.eyebrow} heading={index.heading} />
      <section className="py-16 px-6 lg:px-8">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
          {index.items.map((ind) => (
            <ContentCard
              key={ind.slug}
              href={`/industries/${ind.slug}`}
              title={ind.name}
              description={ind.headline}
            />
          ))}
        </div>
      </section>
    </div>
  )
}
