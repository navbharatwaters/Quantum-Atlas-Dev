'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { Menu, X, ChevronDown } from 'lucide-react'

import { getUi, localeHref, switcherHref, logicalPath, type Locale } from '@/lib/i18n'

function LangSwitch({
  locale,
  pathname,
  label,
  className,
}: {
  locale: Locale
  pathname: string
  label: string
  className?: string
}) {
  return (
    <div
      role="group"
      aria-label={label}
      className={cn('flex items-center gap-1.5 text-xs font-medium', className)}
      style={{ fontFamily: 'var(--font-mono)' }}
    >
      {(['en', 'ru'] as const).map((l, i) => (
        <span key={l} className="flex items-center gap-1.5">
          {i > 0 && <span className="text-text-dim" aria-hidden="true">|</span>}
          <Link
            href={switcherHref(l, pathname)}
            hrefLang={l}
            lang={l}
            aria-current={l === locale ? 'true' : undefined}
            className={cn(
              'uppercase transition-colors',
              l === locale ? 'text-electric-blue' : 'text-text-secondary hover:text-text-primary'
            )}
          >
            {l}
          </Link>
        </span>
      ))}
    </div>
  )
}
export function Navbar({ locale = 'en' }: { locale?: Locale }) {
  const ui = getUi(locale)
  const services = ui.serviceItems.map((s) => ({ ...s, color: 'border-electric-blue' }))
  const navLinks = [
    { label: ui.nav.industries, href: '/industries' },
    { label: ui.nav.work, href: '/knowledge/case-studies' },
    { label: ui.nav.knowledge, href: '/knowledge' },
    { label: ui.nav.about, href: '/about' },
    { label: ui.nav.blog, href: '/blog' },
  ]
  const [scrolled, setScrolled] = useState(false)
  const [servicesOpen, setServicesOpen] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false)
  const pathname = usePathname()
  const dropdownRef = useRef<HTMLDivElement>(null)
  const servicesButtonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close all menus when the route changes
  useEffect(() => {
    const close = () => {
      setMobileOpen(false)
      setServicesOpen(false)
    }
    close()
  }, [pathname])

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node) &&
        servicesButtonRef.current &&
        !servicesButtonRef.current.contains(e.target as Node)
      ) {
        setServicesOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b"
        style={scrolled ? {
          background: 'rgba(12,10,8,0.92)',
          backdropFilter: 'blur(14px)',
          WebkitBackdropFilter: 'blur(14px)',
          borderBottomColor: 'rgba(255,191,0,0.12)',
        } : {
          background: 'transparent',
          borderBottomColor: 'transparent',
        }}
      >
        <nav className="max-w-7xl mx-auto px-6 lg:px-8 flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            href={localeHref(locale, '/')}
            className="text-text-primary font-display font-semibold text-lg tracking-wide hover:text-electric-blue transition-colors"
          >
            QUANTUM ATLAS
          </Link>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-8">
            {/* Services dropdown */}
            <div className="relative">
              <button
                ref={servicesButtonRef}
                onClick={() => setServicesOpen((v) => !v)}
                className={cn(
                  'flex items-center gap-1 text-sm font-medium transition-colors',
                  servicesOpen ? 'text-electric-blue' : 'text-text-secondary hover:text-text-primary'
                )}
                aria-expanded={servicesOpen}
              >
                {ui.nav.services}
                <ChevronDown
                  size={15}
                  className={cn('transition-transform duration-200', servicesOpen && 'rotate-180')}
                />
              </button>

              {servicesOpen && (
                <div
                  ref={dropdownRef}
                  className="absolute top-full left-1/2 -translate-x-1/2 mt-4 w-[560px] bg-space-card border border-space-border rounded-xl shadow-2xl p-4 grid grid-cols-2 gap-2"
                >
                  {services.map((service) => (
                    <Link
                      key={service.href}
                      href={localeHref(locale, service.href)}
                      className={cn(
                        'flex flex-col gap-0.5 p-3 rounded-lg border-l-2 hover:bg-space-dark transition-colors',
                        service.color
                      )}
                      onClick={() => setServicesOpen(false)}
                    >
                      <span className="text-sm font-medium text-text-primary">{service.label}</span>
                      <span className="text-xs text-text-secondary leading-snug">
                        {service.description}
                      </span>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={localeHref(locale, link.href)}
                className={cn(
                  'text-sm font-medium transition-colors',
                  logicalPath(pathname).startsWith(link.href)
                    ? 'text-text-primary'
                    : 'text-text-secondary hover:text-text-primary'
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* CTA + mobile menu */}
          <div className="flex items-center gap-4">
            <LangSwitch locale={locale} pathname={pathname} label={ui.nav.language} className="hidden lg:flex" />
            <Link
              href={localeHref(locale, '/contact')}
              className="hidden lg:inline-flex items-center px-4 py-2 rounded-lg bg-electric-blue text-space-black text-sm font-medium hover:brightness-110 transition-all"
            >
              {ui.nav.bookCall}
            </Link>

            {/* Mobile hamburger */}
            <button
              className="lg:hidden text-text-secondary hover:text-text-primary transition-colors"
              onClick={() => setMobileOpen((v) => !v)}
              aria-label={ui.nav.toggleMenu}
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-space-black/60 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
          />
          {/* Drawer */}
          <div className="absolute top-0 right-0 bottom-0 w-80 bg-space-card border-l border-space-border flex flex-col overflow-y-auto">
            <div className="flex items-center justify-between px-6 h-16 border-b border-space-border">
              <span className="font-display font-semibold text-text-primary">QUANTUM ATLAS</span>
              <button
                onClick={() => setMobileOpen(false)}
                className="text-text-secondary hover:text-text-primary"
                aria-label={ui.nav.closeMenu}
              >
                <X size={20} />
              </button>
            </div>

            <nav className="flex-1 px-4 py-6 flex flex-col gap-1">
              {/* Services accordion */}
              <button
                onClick={() => setMobileServicesOpen((v) => !v)}
                className="flex items-center justify-between w-full px-3 py-2.5 rounded-lg text-sm font-medium text-text-secondary hover:text-text-primary hover:bg-space-dark transition-colors"
              >
                {ui.nav.services}
                <ChevronDown
                  size={15}
                  className={cn('transition-transform duration-200', mobileServicesOpen && 'rotate-180')}
                />
              </button>

              {mobileServicesOpen && (
                <div className="ml-3 flex flex-col gap-0.5 mt-1">
                  {services.map((service) => (
                    <Link
                      key={service.href}
                      href={localeHref(locale, service.href)}
                      className={cn(
                        'px-3 py-2 rounded-lg border-l-2 text-sm text-text-secondary hover:text-text-primary hover:bg-space-dark transition-colors',
                        service.color
                      )}
                    >
                      {service.label}
                    </Link>
                  ))}
                </div>
              )}

              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={localeHref(locale, link.href)}
                  className="px-3 py-2.5 rounded-lg text-sm font-medium text-text-secondary hover:text-text-primary hover:bg-space-dark transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            <div className="px-4 pb-6">
              <LangSwitch locale={locale} pathname={pathname} label={ui.nav.language} className="justify-center mb-4" />
              <Link
                href={localeHref(locale, '/contact')}
                className="flex items-center justify-center w-full px-4 py-3 rounded-lg bg-electric-blue text-white text-sm font-medium hover:bg-electric-blue/90 transition-colors"
              >
                {ui.nav.bookCall}
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
