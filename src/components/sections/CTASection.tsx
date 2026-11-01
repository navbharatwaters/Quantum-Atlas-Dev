'use client'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { getHome } from '@/content/home'
import { localeHref, type Locale } from '@/lib/i18n'

export function CTASection({ locale = 'en' }: { locale?: Locale }) {
  const c = getHome(locale).cta
  return (
    <section
      className="py-32 px-6 lg:px-8 text-center relative"
      style={{
        background: '#0C0A08',
        backgroundImage: 'radial-gradient(ellipse at 50% 50%, rgba(255,191,0,0.07) 0%, transparent 70%)',
      }}
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
      <div className="max-w-3xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 70 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.85, ease: 'easeOut' }}
        >
          <h2
            className="text-4xl lg:text-5xl font-bold text-text-primary mb-6 leading-[1.1]"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            {c.heading[0]}<br />{c.heading[1]}
          </h2>
          <p className="text-text-secondary text-lg mb-10 leading-relaxed">
            {c.body}
          </p>
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <Link
              href={localeHref(locale, '/contact')}
              className="px-8 py-4 rounded-lg bg-electric-blue text-white font-semibold hover:brightness-110 hover:scale-[1.02] transition-all text-base"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              {c.primary}
            </Link>
            <Link
              href={localeHref(locale, '/services')}
              className="px-8 py-4 rounded-lg border border-space-border text-text-secondary hover:border-electric-blue hover:text-text-primary transition-all text-base font-medium"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              {c.secondary}
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
