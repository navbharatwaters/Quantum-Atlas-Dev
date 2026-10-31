'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { Menu, X, ChevronDown } from 'lucide-react'

const services = [
  {
    label: 'AI Voice Agents',
    href: '/services/ai-voice-agents',
    color: 'border-electric-blue',
    description: 'Website and phone voice agents on infrastructure you control',
  },
  {
    label: 'Document Intelligence',
    href: '/services/document-intelligence',
    color: 'border-electric-blue',
    description: 'Extraction, checking and routing for document-heavy teams',
  },
  {
    label: 'Enterprise RAG',
    href: '/services/enterprise-rag',
    color: 'border-electric-blue',
    description: 'Knowledge systems with a citation on every answer',
  },
  {
    label: 'Custom SaaS Dev',
    href: '/services/saas-development',
    color: 'border-electric-blue',
    description: 'Multi-tenant products built end to end',
  },
  {
    label: 'AI Automation',
    href: '/services/ai-automation',
    color: 'border-electric-blue',
    description: 'Workflows and agents wired into your systems',
  },
  {
    label: 'Content & Video',
    href: '/services/content-video',
    color: 'border-electric-blue',
    description: 'Avatar and video production, supporting service',
  },
]

const navLinks = [
  { label: 'Industries', href: '/industries' },
  { label: 'Work', href: '/knowledge/case-studies' },
  { label: 'Knowledge', href: '/knowledge' },
  { label: 'About', href: '/about' },
  { label: 'Blog', href: '/blog' },
]

export function Navbar() {
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
            href="/"
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
                Services
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
                      href={service.href}
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
                href={link.href}
                className={cn(
                  'text-sm font-medium transition-colors',
                  pathname.startsWith(link.href)
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
            <Link
              href="/contact"
              className="hidden lg:inline-flex items-center px-4 py-2 rounded-lg bg-electric-blue text-space-black text-sm font-medium hover:brightness-110 transition-all"
            >
              Book a Call
            </Link>

            {/* Mobile hamburger */}
            <button
              className="lg:hidden text-text-secondary hover:text-text-primary transition-colors"
              onClick={() => setMobileOpen((v) => !v)}
              aria-label="Toggle menu"
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
                aria-label="Close menu"
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
                Services
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
                      href={service.href}
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
                  href={link.href}
                  className="px-3 py-2.5 rounded-lg text-sm font-medium text-text-secondary hover:text-text-primary hover:bg-space-dark transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            <div className="px-4 pb-6">
              <Link
                href="/contact"
                className="flex items-center justify-center w-full px-4 py-3 rounded-lg bg-electric-blue text-white text-sm font-medium hover:bg-electric-blue/90 transition-colors"
              >
                Book a Call
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
