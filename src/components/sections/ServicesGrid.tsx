'use client'
import Link from 'next/link'
import { Mic2, FileText, Brain, Code2, Workflow, Video } from 'lucide-react'

import { getHome } from '@/content/home'
import { getUi, localeHref, type Locale } from '@/lib/i18n'

// Icons by position; copy lives in src/content/home.<locale>.ts
const icons = [Mic2, FileText, Brain, Code2, Workflow, Video]

export function ServicesGrid({ locale = 'en' }: { locale?: Locale }) {
  const c = getHome(locale).servicesGrid
  const services = c.items.map((item, i) => ({ ...item, Icon: icons[i] }))
  return (
    <section
      className="py-[88px] px-6 lg:px-8"
      style={{ background: '#0C0A08' }}
      aria-labelledby="svc-h"
    >
      <div className="max-w-[1200px] mx-auto">
        {/* Header */}
        <div className="flex flex-col gap-2.5 mb-11">
          <span
            className="text-electric-blue uppercase tracking-[0.14em] text-[0.68rem]"
            style={{ fontFamily: 'var(--font-mono)' }}
          >
            {c.eyebrow}
          </span>
          <h2
            id="svc-h"
            className="text-[clamp(1.6rem,3vw,2.2rem)] font-semibold text-text-primary leading-tight tracking-[-0.015em]"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            {c.heading}
          </h2>
          <p className="text-[0.9rem] text-text-secondary max-w-[500px] leading-[1.65] mt-1">
            {c.intro}
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[14px]">
          {services.map((svc) => {
            const { Icon } = svc
            return (
              <Link
                key={svc.href}
                href={localeHref(locale, svc.href)}
                className="group flex flex-col gap-[13px] p-[26px_22px] rounded-xl border border-space-border bg-space-card transition-all duration-200 hover:border-border-hi focus-visible:outline-2 focus-visible:outline-electric-blue focus-visible:outline-offset-2"
                style={{
                  ['--tw-bg-opacity' as string]: '1',
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLAnchorElement
                  el.style.background = 'linear-gradient(135deg, rgba(255,191,0,0.05) 0%, #171411 60%)'
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLAnchorElement
                  el.style.background = ''
                }}
              >
                {/* Icon container */}
                <div
                  className="w-10 h-10 grid place-items-center rounded-lg border shrink-0"
                  style={{
                    background: 'rgba(255,191,0,0.10)',
                    borderColor: 'rgba(255,191,0,0.14)',
                  }}
                  aria-hidden="true"
                >
                  <Icon size={20} className="text-electric-blue" strokeWidth={1.5} />
                </div>

                <h3
                  className="text-[1.05rem] font-semibold text-text-primary"
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  {svc.name}
                </h3>

                <p className="text-[0.85rem] text-text-secondary leading-[1.65] flex-1">
                  {svc.description}
                </p>

                <span className="mt-1 inline-flex items-center gap-1.5 text-[0.85rem] font-medium text-electric-blue">
                  {getUi(locale).common.learnMore}
                  <span aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-1">→</span>
                </span>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
