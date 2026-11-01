'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'

import { getHome } from '@/content/home'
import { localeHref, type Locale } from '@/lib/i18n'

export function Industries({ locale = 'en' }: { locale?: Locale }) {
  const c = getHome(locale).industries
  const industries = c.items
  const [active, setActive] = useState('government')
  const current = industries.find((i) => i.id === active) ?? industries[0]

  return (
    <section className="relative py-24 px-6 lg:px-8" style={{ background: '#0C0A08' }}>
      {/* Grid overlay */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            'linear-gradient(currentcolor 1px, transparent 1px), linear-gradient(90deg, currentcolor 1px, transparent 1px)',
          backgroundSize: '20px 20px',
        }}
      />
      <div className="relative z-10 max-w-7xl mx-auto">
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <p className="text-electric-blue text-[11px] tracking-[3px] uppercase mb-4" style={{ fontFamily: 'var(--font-mono)' }}>
            {c.eyebrow}
          </p>
          <h2 className="text-4xl font-bold text-text-primary" style={{ fontFamily: 'var(--font-display)' }}>
            {c.heading}
          </h2>
        </motion.div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
          {industries.map((ind) => (
            <button
              key={ind.id}
              onClick={() => setActive(ind.id)}
              className="px-4 py-2 rounded-full text-sm font-medium transition-all border"
              style={{
                background: active === ind.id ? '#FFBF00' : 'transparent',
                color: active === ind.id ? '#fff' : '#A8998A',
                borderColor: active === ind.id ? '#FFBF00' : '#2E261F',
                fontFamily: 'var(--font-display)',
              }}
            >
              {ind.label}
            </button>
          ))}
        </div>

        {/* Content panel */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="rounded-xl border border-space-border p-8 grid grid-cols-1 md:grid-cols-3 gap-8"
            style={{ background: '#171411' }}
          >
            <div className="md:col-span-2">
              <h3 className="text-xl font-semibold text-text-primary mb-3" style={{ fontFamily: 'var(--font-display)' }}>
                {c.challengesTitle(current.label)}
              </h3>
              <p className="text-text-secondary leading-relaxed mb-6">{current.pain}</p>
              <div className="flex flex-wrap gap-2">
                {current.services.map((s) => (
                  <span
                    key={s}
                    className="px-3 py-1 rounded-full text-[12px] border border-space-border text-text-secondary"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
            <div className="flex flex-col justify-end">
              <Link
                href={localeHref(locale, current.href)}
                className="inline-flex items-center justify-center px-5 py-3 rounded-lg border border-electric-blue text-electric-blue text-sm font-medium hover:bg-electric-blue hover:text-white transition-all"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                {current.cta}
              </Link>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}
