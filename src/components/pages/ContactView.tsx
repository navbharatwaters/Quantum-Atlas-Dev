import { ContactForm } from '@/components/forms/ContactForm'
import { getContact } from '@/content/contact'
import { RU_CONTACT } from '@/lib/contact'
import type { Locale } from '@/lib/i18n'

const linkClass = 'text-electric-blue font-medium hover:underline'

export function ContactView({ locale = 'en' }: { locale?: Locale }) {
  const c = getContact(locale)
  return (
    <section className="pt-32 pb-24 px-6 lg:px-8">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        {/* Left: context */}
        <div>
          <p className="text-electric-blue text-[11px] tracking-[3px] uppercase mb-6" style={{ fontFamily: 'var(--font-mono)' }}>
            {c.eyebrow}
          </p>
          <h1
            className="font-bold text-text-primary leading-[1.1] mb-6"
            style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 4vw, 2.5rem)' }}
          >
            {c.heading}
          </h1>
          <p className="text-text-secondary text-lg leading-relaxed mb-8">{c.intro}</p>

          <div className="flex flex-col gap-4 mb-10">
            {c.bullets.map((item, i) => (
              <div key={i} className="flex items-start gap-3">
                <span className="text-electric-blue mt-0.5 shrink-0">&#9670;</span>
                <span className="text-text-secondary">{item}</span>
              </div>
            ))}
          </div>

          <div className="p-5 rounded-xl border border-space-border" style={{ background: '#171411' }}>
            <p className="text-text-secondary text-sm mb-1">{c.direct.label}</p>
            {locale === 'ru' ? (
              <div className="flex flex-col gap-1">
                <p className="text-text-primary font-medium">{RU_CONTACT.person}</p>
                <a href={RU_CONTACT.phoneHref} className={linkClass} style={{ fontFamily: 'var(--font-mono)' }}>
                  {RU_CONTACT.phoneDisplay}
                </a>
                <a href={`mailto:${RU_CONTACT.email}`} className={linkClass} style={{ fontFamily: 'var(--font-mono)' }}>
                  {RU_CONTACT.email}
                </a>
              </div>
            ) : (
              <a href="mailto:contact@quantumatlas.dev" className={linkClass} style={{ fontFamily: 'var(--font-mono)' }}>
                contact@quantumatlas.dev
              </a>
            )}
            <p className="text-text-secondary text-sm mt-2">{c.direct.note}</p>
          </div>
        </div>

        {/* Right: form */}
        <div className="rounded-2xl border border-space-border p-8" style={{ background: '#171411' }}>
          <ContactForm locale={locale} />
        </div>
      </div>
    </section>
  )
}
