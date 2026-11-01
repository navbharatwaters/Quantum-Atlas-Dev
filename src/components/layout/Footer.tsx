import Link from 'next/link'
import { getUi, localeHref, type Locale } from '@/lib/i18n'
import { RU_CONTACT } from '@/lib/contact'
import { SocialIcons } from './SocialIcons'

const EN_EMAIL = 'contact@quantumatlas.dev'
const EN_PHONE = { display: '+91 22 4353 1111', href: 'tel:+912243531111' }
const EN_SALES_PHONE = { display: '+91 79654 80571', href: 'tel:+917965480571' }

export function Footer({ locale = 'en' }: { locale?: Locale }) {
  const ui = getUi(locale)
  const f = ui.footer
  const serviceLinks = ui.serviceItems.map((s, i) => ({ label: f.serviceLabels[i], href: s.href }))
  const linkClass =
    'text-text-secondary text-sm hover:text-electric-blue transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-electric-blue rounded-sm'
  const monoStyle = { fontFamily: 'var(--font-mono)' }
  const sep = (
    <span className="hidden sm:inline text-space-border" aria-hidden="true">
      ·
    </span>
  )

  const columns = [
    { title: f.services, links: serviceLinks },
    { title: f.industries, links: f.industryLinks },
    { title: f.company, links: f.companyLinks },
  ]

  return (
    <footer className="bg-space-dark border-t border-space-border" aria-label={f.ariaLabel}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        {/* Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand */}
          <div className="md:col-span-2 lg:col-span-2">
            <Link
              href={localeHref(locale, '/')}
              className="text-text-primary font-display font-semibold text-lg tracking-wide block mb-4 hover:text-electric-blue transition-colors"
            >
              QUANTUM ATLAS
            </Link>
            <p className="text-text-secondary text-sm leading-relaxed mb-6">{f.tagline}</p>
            <SocialIcons groupLabel={f.socialLabel} comingSoon={f.comingSoon} />
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <h2 className="font-display text-text-primary text-sm font-semibold mb-4 uppercase tracking-wider">
                {col.title}
              </h2>
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

        {/* Contact strip */}
        <div className="border-t border-space-border mt-12 pt-6 flex flex-col sm:flex-row sm:flex-wrap sm:items-center gap-x-4 gap-y-2 text-xs text-text-secondary">
          {locale === 'ru' ? (
            <>
              <span>
                {f.contactPerson}: {RU_CONTACT.person}
              </span>
              {sep}
              <a href={RU_CONTACT.phoneHref} className={linkClass} style={monoStyle}>
                {RU_CONTACT.phoneDisplay}
              </a>
              {sep}
              <a href={`mailto:${RU_CONTACT.email}`} className={linkClass} style={monoStyle}>
                {RU_CONTACT.email}
              </a>
            </>
          ) : (
            <>
              <a href={`mailto:${EN_EMAIL}`} className={linkClass} style={monoStyle}>
                {EN_EMAIL}
              </a>
              {sep}
              <a href={EN_PHONE.href} className={linkClass} style={monoStyle}>
                {EN_PHONE.display}
              </a>
              {sep}
              <span>
                {f.marketingSales}:{' '}
                <a href={EN_SALES_PHONE.href} className={linkClass} style={monoStyle}>
                  {EN_SALES_PHONE.display}
                </a>
              </span>
            </>
          )}
        </div>

        {/* Bottom bar */}
        <div className="border-t border-space-border mt-6 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-text-secondary text-sm">{f.copyright}</p>
          <nav aria-label={f.legalNavLabel}>
            <ul className="flex gap-6 items-center">
              {f.legalLinks.map((link) => (
                <li key={link.href}>
                  <Link href={localeHref(locale, link.href)} className={linkClass}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  )
}
