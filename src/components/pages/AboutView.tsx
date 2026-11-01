import Link from 'next/link'
import { getAbout } from '@/content/about'
import { localeHref, type Locale } from '@/lib/i18n'

export function AboutView({ locale = 'en' }: { locale?: Locale }) {
  const c = getAbout(locale)
  return (
    <div className="bg-space-dark min-h-screen">
      {/* Hero */}
      <section className="pt-32 pb-20 px-6 lg:px-8" style={{ background: '#0C0A08' }}>
        <div className="max-w-4xl mx-auto">
          <h1
            className="text-5xl lg:text-6xl font-bold text-text-primary leading-[1.05] mb-8"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            {c.hero.heading}
          </h1>
          <p className="text-text-secondary text-xl leading-relaxed max-w-2xl">{c.hero.body}</p>
        </div>
      </section>

      {/* Philosophy */}
      <section className="py-20 px-6 lg:px-8" style={{ background: '#12100D' }}>
        <div className="max-w-5xl mx-auto">
          <p className="text-electric-blue text-[11px] tracking-[3px] uppercase mb-12" style={{ fontFamily: 'var(--font-mono)' }}>
            {c.philosophy.eyebrow}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {c.philosophy.pillars.map((pillar) => (
              <div
                key={pillar.title}
                className="p-6 rounded-xl border border-space-border"
                style={{ background: '#171411', borderTop: '1px solid #2E261F' }}
              >
                <h3
                  className="text-text-primary font-bold text-xl mb-3"
                  style={{ fontFamily: 'var(--font-display)', color: '#FFBF00' }}
                >
                  {pillar.title}
                </h3>
                <p className="text-text-secondary leading-relaxed">{pillar.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What We Have Built */}
      <section className="py-20 px-6 lg:px-8" style={{ background: '#0C0A08' }}>
        <div className="max-w-5xl mx-auto">
          <p className="text-electric-blue text-[11px] tracking-[3px] uppercase mb-12" style={{ fontFamily: 'var(--font-mono)' }}>
            {c.proof.eyebrow}
          </p>
          <h2
            className="text-4xl font-bold text-text-primary mb-12"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            {c.proof.heading}
          </h2>
          <div className="flex flex-col gap-4">
            {c.proof.items.map((item) => (
              <div
                key={item.system}
                className="flex flex-col md:flex-row gap-4 p-6 rounded-xl border border-space-border"
                style={{ background: '#171411' }}
              >
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-text-primary font-semibold" style={{ fontFamily: 'var(--font-display)' }}>
                      {item.system}
                    </h3>
                    <span
                      className="px-2 py-0.5 rounded-full text-[10px]"
                      style={{ background: '#FFBF0015', color: '#FFBF00', fontFamily: 'var(--font-mono)' }}
                    >
                      {item.status}
                    </span>
                  </div>
                  <p className="text-text-secondary text-sm leading-relaxed">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Founders */}
      <section className="py-20 px-6 lg:px-8" style={{ background: '#12100D' }}>
        <div className="max-w-5xl mx-auto">
          <p className="text-electric-blue text-[11px] tracking-[3px] uppercase mb-12" style={{ fontFamily: 'var(--font-mono)' }}>
            {c.founders.eyebrow}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-6 rounded-xl border border-space-border" style={{ background: '#171411' }}>
              {/* Avatar placeholder */}
              <div
                className="w-16 h-16 rounded-full mb-4 flex items-center justify-center text-2xl font-bold"
                style={{ background: '#FFBF0020', color: '#FFBF00', fontFamily: 'var(--font-mono)' }}
              >
                {c.founders.founder.initial}
              </div>
              <h3 className="text-text-primary font-bold text-xl mb-1" style={{ fontFamily: 'var(--font-display)' }}>
                {c.founders.founder.name}
              </h3>
              <p className="text-electric-blue text-sm mb-3" style={{ fontFamily: 'var(--font-mono)' }}>
                {c.founders.founder.role}
              </p>
              <p className="text-text-secondary text-sm leading-relaxed">{c.founders.founder.bio}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Group Companies */}
      <section className="py-20 px-6 lg:px-8" style={{ background: '#0C0A08' }}>
        <div className="max-w-5xl mx-auto">
          <p className="text-electric-blue text-[11px] tracking-[3px] uppercase mb-8" style={{ fontFamily: 'var(--font-mono)' }}>
            {c.group.eyebrow}
          </p>
          <p className="text-text-secondary text-lg leading-relaxed max-w-2xl">{c.group.body}</p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 lg:px-8 text-center" style={{ background: '#12100D' }}>
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold text-text-primary mb-4" style={{ fontFamily: 'var(--font-display)' }}>
            {c.cta.heading}
          </h2>
          <p className="text-text-secondary mb-8">{c.cta.body}</p>
          <Link
            href={localeHref(locale, '/contact')}
            className="inline-flex px-8 py-4 rounded-lg bg-electric-blue text-white font-semibold hover:brightness-110 transition-all"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            {c.cta.button}
          </Link>
        </div>
      </section>
    </div>
  )
}
