'use client'
import Link from 'next/link'
import { motion } from 'framer-motion'
import Script from 'next/script'
import { ContentCard } from '@/components/shared/ContentCard'

export interface IndustryPageData {
  id: string
  name: string
  heroHeadline: string
  heroSubtext: string
  challenges: { title: string; body: string }[]
  services: { name: string; href: string; color: string; relevance: string }[]
  compliance: { title: string; body: string }[]
  activeWork: { sector: string; outcome: string; color: string } | null
  ctaHeadline: string
}

export function IndustryPageTemplate({ data }: { data: IndustryPageData }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: `AI for ${data.name}`,
    description: data.heroSubtext,
    provider: {
      '@type': 'Organization',
      name: 'Quantum Atlas',
      url: 'https://quantumatlas.ai',
    },
    areaServed: 'India',
  }

  return (
    <div className="bg-space-dark min-h-screen">
      <Script
        id={`ld-${data.id}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <section className="pt-32 pb-24 px-6 lg:px-8" style={{ background: '#0C0A08' }}>
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <p className="text-electric-blue text-[11px] tracking-[3px] uppercase mb-4" style={{ fontFamily: 'var(--font-mono)' }}>
              {data.name}
            </p>
            <h1 className="font-bold text-text-primary leading-[1.1] mb-6" style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 4vw, 2.5rem)' }}>
              {data.heroHeadline}
            </h1>
            <p className="text-text-secondary text-xl leading-relaxed max-w-2xl">{data.heroSubtext}</p>
          </motion.div>
        </div>
      </section>

      {/* Challenges */}
      <section className="py-20 px-6 lg:px-8" style={{ background: '#12100D' }}>
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-[11px] tracking-[3px] uppercase mb-8 text-text-secondary" style={{ fontFamily: 'var(--font-mono)' }}>
              Industry Challenges
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {data.challenges.map((c, i) => (
                <div key={i} className="p-6 rounded-xl border border-space-border" style={{ background: '#171411' }}>
                  <h3 className="text-text-primary font-semibold mb-2" style={{ fontFamily: 'var(--font-display)' }}>
                    {c.title}
                  </h3>
                  <p className="text-text-secondary text-sm leading-relaxed">{c.body}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Services for this industry */}
      <section className="py-20 px-6 lg:px-8" style={{ background: '#0C0A08' }}>
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-[11px] tracking-[3px] uppercase mb-8 text-text-secondary" style={{ fontFamily: 'var(--font-mono)' }}>
              Services for {data.name}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {data.services.map((svc) => (
                <ContentCard
                  key={svc.href}
                  href={svc.href}
                  title={svc.name}
                  description={svc.relevance}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Compliance */}
      <section className="py-20 px-6 lg:px-8" style={{ background: '#12100D' }}>
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-[11px] tracking-[3px] uppercase mb-8 text-text-secondary" style={{ fontFamily: 'var(--font-mono)' }}>
              Compliance &amp; Requirements
            </p>
            <div className="flex flex-col gap-4">
              {data.compliance.map((c, i) => (
                <div key={i} className="flex flex-col md:flex-row gap-3 p-5 rounded-xl border border-space-border" style={{ background: '#171411' }}>
                  <p className="text-electric-blue font-medium min-w-40 shrink-0" style={{ fontFamily: 'var(--font-display)' }}>
                    {c.title}
                  </p>
                  <p className="text-text-secondary text-sm leading-relaxed">{c.body}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Active work */}
      {data.activeWork && (
        <section className="py-20 px-6 lg:px-8" style={{ background: '#0C0A08' }}>
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6 }}
            >
              <p className="text-[11px] tracking-[3px] uppercase mb-6 text-text-secondary" style={{ fontFamily: 'var(--font-mono)' }}>
                Active Work in This Sector
              </p>
              <div
                className="p-8 rounded-xl border border-space-border"
                style={{ background: '#171411', borderTop: '1px solid #2E261F' }}
              >
                <span
                  className="inline-flex px-2 py-0.5 rounded-full text-[10px] font-medium mb-4"
                  style={{ background: '#FFBF0015', color: '#FFBF00', fontFamily: 'var(--font-mono)' }}
                >
                  Active
                </span>
                <p className="text-text-secondary text-[11px] tracking-wider uppercase mb-2" style={{ fontFamily: 'var(--font-mono)' }}>
                  {data.activeWork.sector}
                </p>
                <p className="text-text-primary text-lg leading-relaxed">{data.activeWork.outcome}</p>
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-24 px-6 lg:px-8 text-center" style={{ background: '#12100D' }}>
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold text-text-primary mb-4" style={{ fontFamily: 'var(--font-display)' }}>
              {data.ctaHeadline}
            </h2>
            <p className="text-text-secondary mb-8">
              30 minutes. We review your specific challenge and show you relevant production examples.
            </p>
            <Link
              href="/contact"
              className="inline-flex px-8 py-4 rounded-lg bg-electric-blue text-white font-semibold hover:brightness-110 transition-all"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Book a Discovery Call
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
