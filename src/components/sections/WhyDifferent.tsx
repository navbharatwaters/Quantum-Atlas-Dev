'use client'
import { motion } from 'framer-motion'

import { getHome } from '@/content/home'
import type { Locale } from '@/lib/i18n'

export function WhyDifferent({ locale = 'en' }: { locale?: Locale }) {
  const c = getHome(locale).whyDifferent
  const proofPoints = c.points.map((p) => ({ ...p, color: '#FFBF00' }))
  return (
    <section
      className="relative py-24 px-6 lg:px-8"
      style={{ background: '#0C0A08' }}
    >
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
        <motion.p
          className="text-electric-blue text-[11px] tracking-[3px] uppercase mb-12"
          style={{ fontFamily: 'var(--font-mono)' }}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        >
          {c.eyebrow}
        </motion.p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left: statement */}
          <motion.div
            initial={{ opacity: 0, x: -80 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.85, ease: 'easeOut' }}
          >
            <h2
              className="text-4xl lg:text-5xl font-bold text-text-primary leading-[1.1] mb-6"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              {c.heading[0]}<br />{c.heading[1]}
            </h2>
            <p className="text-text-secondary text-lg leading-relaxed">
              {c.body}
            </p>
          </motion.div>

          {/* Right: proof points grid */}
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 gap-6"
            initial={{ opacity: 0, x: 80 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.85, ease: 'easeOut', delay: 0.12 }}
          >
            {proofPoints.map((pt, i) => (
              <div
                key={i}
                className="flex flex-col gap-1 p-4 rounded-lg border border-space-border"
                style={{ background: '#12100D' }}
              >
                <span
                  className="text-xl font-bold"
                  style={{ color: pt.color, fontFamily: 'var(--font-mono)' }}
                >
                  ◆ {pt.value}
                </span>
                <span className="text-text-secondary text-sm">{pt.label}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
