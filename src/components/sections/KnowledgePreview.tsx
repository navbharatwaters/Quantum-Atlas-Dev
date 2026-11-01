'use client'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { useState } from 'react'

import { getHome } from '@/content/home'
import { localeHref, type Locale } from '@/lib/i18n'

function WhitepaperGate({ locale }: { locale: Locale }) {
  const f = getHome(locale).knowledgePreview.form
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    await new Promise((r) => setTimeout(r, 800))
    setSubmitted(true)
    setLoading(false)
  }

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center h-full gap-4 text-center py-8">
        <div className="w-12 h-12 rounded-full bg-electric-blue/10 flex items-center justify-center">
          <span className="text-electric-blue text-2xl">&#10003;</span>
        </div>
        <p className="text-text-primary font-semibold">{f.successTitle}</p>
        <p className="text-text-secondary text-sm">{f.successBody}</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <input
        type="text"
        placeholder={f.namePlaceholder}
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        className="px-4 py-3 rounded-lg border border-space-border bg-space-dark text-text-primary text-sm placeholder:text-text-secondary/50 focus:outline-none focus:border-electric-blue transition-colors"
      />
      <input
        type="email"
        placeholder={f.emailPlaceholder}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className="px-4 py-3 rounded-lg border border-space-border bg-space-dark text-text-primary text-sm placeholder:text-text-secondary/50 focus:outline-none focus:border-electric-blue transition-colors"
      />
      <button
        type="submit"
        disabled={loading}
        className="px-6 py-3 rounded-lg bg-electric-blue text-white text-sm font-semibold hover:bg-electric-blue/90 transition-colors disabled:opacity-70"
        style={{ fontFamily: 'var(--font-display)' }}
      >
        {loading ? f.submitting : f.submit}
      </button>
      <p className="text-[11px] text-text-secondary text-center">{f.note}</p>
    </form>
  )
}

export function KnowledgePreview({ locale = 'en' }: { locale?: Locale }) {
  const c = getHome(locale).knowledgePreview
  const placeholderPosts = c.posts
  return (
    <section className="relative py-24 px-6 lg:px-8" style={{ background: '#12100D' }}>
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

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Blog posts — left 2 columns */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            {placeholderPosts.map((post, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 60, x: -40 }}
                whileInView={{ opacity: 1, y: 0, x: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.75, ease: 'easeOut', delay: i * 0.12 }}
              >
                <Link
                  href={localeHref(locale, post.href)}
                  className="flex flex-col gap-3 p-5 rounded-xl border border-space-border hover:border-electric-blue/40 transition-all group"
                  style={{ background: '#171411' }}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className="px-2 py-0.5 rounded text-[10px] font-medium"
                      style={{ background: '#FFBF0020', color: '#FFBF00', fontFamily: 'var(--font-mono)' }}
                    >
                      {post.category}
                    </span>
                    <span className="text-text-secondary text-[11px]" style={{ fontFamily: 'var(--font-mono)' }}>
                      {c.readTime(post.readMinutes)} &middot; {post.date}
                    </span>
                  </div>
                  <h3
                    className="text-text-primary text-[15px] font-medium leading-snug group-hover:text-electric-blue transition-colors"
                    style={{ fontFamily: 'var(--font-display)' }}
                  >
                    {post.title}
                  </h3>
                </Link>
              </motion.div>
            ))}
            <Link
              href={localeHref(locale, '/blog')}
              className="text-sm text-text-secondary hover:text-electric-blue transition-colors mt-2"
            >
              {c.viewAll}
            </Link>
          </div>

          {/* Whitepaper gate — right column */}
          <motion.div
            className="rounded-xl border border-space-border p-6"
            style={{ background: '#171411', borderTop: '1px solid #2E261F' }}
            initial={{ opacity: 0, x: 80, y: 30 }}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.85, ease: 'easeOut', delay: 0.1 }}
          >
            <p
              className="text-electric-blue text-[10px] tracking-[2px] uppercase mb-3"
              style={{ fontFamily: 'var(--font-mono)' }}
            >
              {c.guide.eyebrow}
            </p>
            <h3
              className="text-text-primary font-semibold text-base mb-2 leading-snug"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              {c.guide.title}
            </h3>
            <p className="text-text-secondary text-sm mb-6 leading-relaxed">
              {c.guide.body}
            </p>
            <WhitepaperGate locale={locale} />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
