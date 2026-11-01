import Link from 'next/link'
import { getUi, localeHref, type Locale } from '@/lib/i18n'
import { RU_CONTACT } from '@/lib/contact'

export function Footer({ locale = 'en' }: { locale?: Locale }) {
  const ui = getUi(locale)
  const f = ui.footer
  const serviceLinks = ui.serviceItems.map((s, i) => ({ label: f.serviceLabels[i], href: s.href }))
  const linkClass = 'text-text-secondary text-sm hover:text-text-primary transition-colors'

  const columns = [
    { title: f.services, links: serviceLinks },
    { title: f.industries, links: f.industryLinks },
    { title: f.company, links: f.companyLinks },
    { title: f.legal, links: f.legalLinks },
  ]

  return (
    <footer
      className="bg-space-black border-t border-space-border"
      aria-label={f.ariaLabel}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        {/* Top section */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 mb-16">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link
              href={localeHref(locale, '/')}
              className="text-text-primary font-display font-semibold text-lg tracking-wide block mb-4 hover:text-electric-blue transition-colors"
            >
              QUANTUM ATLAS
            </Link>
            <p className="text-text-secondary text-sm leading-relaxed">
              {f.tagline}
            </p>
          </div>

          {columns.map((col) => (
            <div key={col.title} className="lg:col-span-1">
              <h3 className="text-text-primary text-sm font-semibold mb-4 uppercase tracking-wider">
                {col.title}
              </h3>
              <ul className="space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link href={localeHref(locale, link.href)} className={linkClass}>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="border-t border-space-border pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-text-secondary text-sm">
            {f.copyright}
          </p>
          {locale === 'ru' ? (
            <div className="flex flex-col sm:flex-row items-center gap-x-6 gap-y-1 text-center">
              <span className="text-text-secondary text-sm">
                {f.contactPerson}: {RU_CONTACT.person}
              </span>
              <a
                href={RU_CONTACT.phoneHref}
                className={linkClass}
                style={{ fontFamily: 'var(--font-mono)' }}
              >
                {RU_CONTACT.phoneDisplay}
              </a>
              <a
                href={`mailto:${RU_CONTACT.email}`}
                className={linkClass}
                style={{ fontFamily: 'var(--font-mono)' }}
              >
                {RU_CONTACT.email}
              </a>
            </div>
          ) : (
            <a
              href="mailto:contact@quantumatlas.dev"
              className={linkClass}
              style={{ fontFamily: 'var(--font-mono)' }}
            >
              contact@quantumatlas.dev
            </a>
          )}
        </div>
      </div>
    </footer>
  )
}
