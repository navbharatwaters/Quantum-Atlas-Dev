import { PageHero } from '@/components/shared/PageHero'
import { ContentCard } from '@/components/shared/ContentCard'
import { Mic2, FileText, Brain, Code2, Workflow, Video } from 'lucide-react'
import { localeHref, type Locale } from '@/lib/i18n'
import { getServices } from '@/content/services'

// Same order as getServices(locale).index.items
const ICONS = [Mic2, FileText, Brain, Code2, Workflow, Video]

export function ServicesIndex({ locale = 'en' }: { locale?: Locale }) {
  const { hero, items } = getServices(locale).index
  return (
    <div className="bg-space-dark min-h-screen">
      <PageHero eyebrow={hero.eyebrow} heading={hero.heading} body={hero.body} />
      <section className="py-16 px-6 lg:px-8">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
          {items.map((svc, i) => {
            const Icon = ICONS[i]
            return (
              <ContentCard
                key={svc.slug}
                icon={<Icon size={20} strokeWidth={1.5} />}
                href={localeHref(locale, `/services/${svc.slug}`)}
                title={svc.name}
                description={svc.description}
                meta={svc.tagline}
                locale={locale}
              />
            )
          })}
        </div>
      </section>
    </div>
  )
}
