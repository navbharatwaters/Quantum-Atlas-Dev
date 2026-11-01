'use client'
import { motion } from 'framer-motion'

import { getHome } from '@/content/home'
import type { Locale } from '@/lib/i18n'

export function TechStack({ locale = 'en' }: { locale?: Locale }) {
  const c = getHome(locale).techStack
  const rows = c.rows
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
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <p className="text-electric-blue text-[11px] tracking-[3px] uppercase mb-4" style={{ fontFamily: 'var(--font-mono)' }}>
            {c.eyebrow}
          </p>
          <h2 className="text-4xl font-bold text-text-primary mb-4" style={{ fontFamily: 'var(--font-display)' }}>
            {c.heading}
          </h2>
          <p className="text-text-secondary max-w-xl mx-auto">
            {c.intro}
          </p>
        </motion.div>

        <div className="flex flex-col gap-12">
          {rows.map((row, ri) => (
            <motion.div
              key={row.label}
              initial={{ opacity: 0, y: 60, x: ri % 2 === 0 ? -40 : 40 }}
              whileInView={{ opacity: 1, y: 0, x: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.8, ease: 'easeOut', delay: ri * 0.12 }}
            >
              <p
                className="text-[11px] tracking-[2px] uppercase text-text-secondary mb-6"
                style={{ fontFamily: 'var(--font-mono)' }}
              >
                {row.label}
              </p>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {row.items.map((item) => (
                  <div
                    key={item.name}
                    className="group p-4 rounded-xl border border-space-border hover:border-electric-blue/40 transition-all cursor-default"
                    style={{ background: '#171411' }}
                  >
                    <p
                      className="text-text-secondary group-hover:text-text-primary font-semibold text-sm mb-2 transition-colors"
                      style={{ fontFamily: 'var(--font-display)' }}
                    >
                      {item.name}
                    </p>
                    <p className="text-[11px] text-text-secondary opacity-60 group-hover:opacity-100 transition-opacity leading-snug">
                      {item.note}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
