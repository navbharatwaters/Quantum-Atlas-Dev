import Link from 'next/link'
import { getCaseStudies } from '@/content/caseStudies'
import { localeHref, type Locale } from '@/lib/i18n'

export function CaseStudiesView({ locale = 'en' }: { locale?: Locale }) {
  const c = getCaseStudies(locale)
  return (
    <div className="bg-space-dark min-h-screen">
      <section className="pt-32 pb-16 px-6 lg:px-8" style={{ background: '#0C0A08' }}>
        <div className="max-w-5xl mx-auto">
          <p className="text-electric-blue text-[11px] tracking-[3px] uppercase mb-4" style={{ fontFamily: 'var(--font-mono)' }}>
            {c.eyebrow}
          </p>
          <h1 className="font-bold text-text-primary mb-6" style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 4vw, 2.5rem)' }}>
            {c.heading}
          </h1>
          <p className="text-text-secondary text-lg max-w-2xl">{c.intro}</p>
        </div>
      </section>

      <section className="py-16 px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {c.items.map((cs) => (
              <div
                key={cs.title}
                className="p-6 rounded-xl border border-space-border"
                style={{ background: '#171411', borderTop: '1px solid #2E261F' }}
              >
                <div className="flex items-center gap-2 mb-3">
                  <span
                    className="px-2 py-0.5 rounded-full text-[10px]"
                    style={{
                      background: cs.available ? '#FFBF0015' : '#2E261F',
                      color: cs.available ? '#FFBF00' : '#A8998A',
                      fontFamily: 'var(--font-mono)',
                    }}
                  >
                    {cs.available ? c.statusAvailable : c.statusPending}
                  </span>
                </div>
                <p className="text-text-secondary text-[11px] tracking-wider uppercase mb-2" style={{ fontFamily: 'var(--font-mono)' }}>
                  {cs.sector}
                </p>
                <h2 className="text-text-primary font-semibold text-base mb-1" style={{ fontFamily: 'var(--font-display)' }}>
                  {cs.title}
                </h2>
                <p className="text-text-secondary text-xs mb-3" style={{ fontFamily: 'var(--font-mono)' }}>{cs.service}</p>
                <p className="text-text-secondary text-sm">{cs.outcome}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="text-text-secondary mb-4">{c.cta.text}</p>
            <Link
              href={localeHref(locale, '/contact')}
              className="inline-flex px-6 py-3 rounded-lg bg-electric-blue text-white text-sm font-semibold hover:brightness-110 transition-all"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              {c.cta.button}
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
