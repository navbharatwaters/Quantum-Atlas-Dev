'use client'
import Link from 'next/link'
import Script from 'next/script'
import { motion } from 'framer-motion'
import { ContentCard } from '@/components/shared/ContentCard'
import { localeHref, type Locale } from '@/lib/i18n'
import { enUrl, ruUrl } from '@/lib/site'
import type { ServicePageData, ServiceUi } from '@/content/services.types'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

import type { Easing } from 'framer-motion'

export type { ServicePageData }

function fadeUp(delay = 0) {
  return {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-100px' as const },
    transition: { duration: 0.6, ease: 'easeOut' as Easing, delay },
  }
}

export function ServicePageTemplate({
  data,
  ui,
  locale = 'en',
}: {
  data: ServicePageData
  ui: ServiceUi
  locale?: Locale
}) {
  const contactHref = localeHref(locale, '/contact')
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Service',
        name: data.name,
        description: data.tagline,
        ...(locale === 'ru'
          ? { url: ruUrl(`/services/${data.slug}`), inLanguage: 'ru' }
          : {}),
        provider: {
          '@type': 'Organization',
          name: 'Quantum Atlas',
          url: locale === 'ru' ? ruUrl('/') : enUrl('/'),
        },
      },
      {
        '@type': 'FAQPage',
        ...(locale === 'ru' ? { inLanguage: 'ru' } : {}),
        mainEntity: data.faqs.map((faq) => ({
          '@type': 'Question',
          name: faq.q,
          acceptedAnswer: { '@type': 'Answer', text: faq.a },
        })),
      },
    ],
  }

  return (
    <div className="bg-space-dark min-h-screen">
      <Script
        id={`ld-${data.slug}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* S1: Hero */}
      <section
        className="pt-32 pb-24 px-6 lg:px-8"
        style={{ background: '#0C0A08', borderBottom: '1px solid #2E261F' }}
      >
        <div className="max-w-4xl mx-auto">
          <motion.div {...fadeUp()}>
            <p
              className="text-[11px] tracking-[3px] uppercase mb-4"
              style={{ color: data.color, fontFamily: 'var(--font-mono)' }}
            >
              {data.name}
            </p>
            <h1
              className="font-bold text-text-primary leading-[1.1] mb-6"
              style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 4vw, 2.5rem)' }}
            >
              {data.tagline}
            </h1>
            <div className="flex flex-wrap gap-8 mb-8">
              {data.heroMetrics.map((m, i) => (
                <div key={i}>
                  <p
                    className="text-2xl font-bold"
                    style={{ color: data.color, fontFamily: 'var(--font-mono)' }}
                  >
                    {m.value}
                  </p>
                  <p className="text-text-secondary text-sm">{m.label}</p>
                </div>
              ))}
            </div>
            <Link
              href={contactHref}
              className="inline-flex px-7 py-3 rounded-lg text-white font-semibold text-sm hover:brightness-110 transition-all"
              style={{ background: data.color, fontFamily: 'var(--font-display)' }}
            >
              {ui.discussCta}
            </Link>
          </motion.div>
        </div>
      </section>

      {/* S2: The Problem */}
      <section className="py-20 px-6 lg:px-8" style={{ background: '#12100D' }}>
        <div className="max-w-4xl mx-auto">
          <motion.div {...fadeUp()}>
            <p
              className="text-[11px] tracking-[3px] uppercase mb-4 text-text-secondary"
              style={{ fontFamily: 'var(--font-mono)' }}
            >
              {ui.problemEyebrow}
            </p>
            <h2
              className="text-3xl font-bold text-text-primary mb-6"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              {data.problemHeading}
            </h2>
            <p className="text-text-secondary text-lg leading-relaxed">{data.problemBody}</p>
          </motion.div>
        </div>
      </section>

      {/* S3: Our Approach */}
      <section className="py-20 px-6 lg:px-8" style={{ background: '#12100D' }}>
        <div className="max-w-4xl mx-auto">
          <motion.div {...fadeUp()}>
            <p
              className="text-[11px] tracking-[3px] uppercase mb-4"
              style={{ color: data.color, fontFamily: 'var(--font-mono)' }}
            >
              {ui.approachEyebrow}
            </p>
            <h2
              className="text-3xl font-bold text-text-primary mb-8"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              {data.approachHeading}
            </h2>
            <ul className="flex flex-col gap-4">
              {data.approachPoints.map((pt, i) => (
                <li key={i} className="flex items-start gap-3 text-text-secondary">
                  <span style={{ color: data.color }} className="mt-0.5 shrink-0">◆</span>
                  {pt}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </section>

      {/* S4: Proof */}
      <section className="py-20 px-6 lg:px-8" style={{ background: '#0C0A08' }}>
        <div className="max-w-4xl mx-auto">
          <motion.div {...fadeUp()}>
            <p
              className="text-[11px] tracking-[3px] uppercase mb-8 text-text-secondary"
              style={{ fontFamily: 'var(--font-mono)' }}
            >
              {ui.proofEyebrow}
            </p>
            <div className="border border-space-border rounded-xl overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-space-border" style={{ background: '#171411' }}>
                    <th className="text-left p-4 text-text-secondary font-medium">{ui.colMetric}</th>
                    <th className="text-left p-4 text-text-secondary font-medium">{ui.colBefore}</th>
                    <th className="text-left p-4 font-medium" style={{ color: data.color }}>{ui.colAfter}</th>
                  </tr>
                </thead>
                <tbody>
                  {data.proofMetrics.map((row, i) => (
                    <tr key={i} className="border-b border-space-border last:border-0">
                      <td className="p-4 text-text-primary" style={{ fontFamily: 'var(--font-display)' }}>{row.metric}</td>
                      <td className="p-4 text-text-secondary" style={{ fontFamily: 'var(--font-mono)' }}>{row.before}</td>
                      <td className="p-4 font-semibold" style={{ color: data.color, fontFamily: 'var(--font-mono)' }}>{row.after}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        </div>
      </section>

      {/* S5: Technical Specs */}
      <section className="py-20 px-6 lg:px-8" style={{ background: '#12100D' }}>
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
          <motion.div {...fadeUp()}>
            <p
              className="text-[11px] tracking-[3px] uppercase mb-4 text-text-secondary"
              style={{ fontFamily: 'var(--font-mono)' }}
            >
              {ui.techStackEyebrow}
            </p>
            <div className="flex flex-wrap gap-2">
              {data.techStack.map((t) => (
                <span
                  key={t}
                  className="px-3 py-1.5 rounded-lg border border-space-border text-sm text-text-secondary"
                  style={{ fontFamily: 'var(--font-mono)' }}
                >
                  {t}
                </span>
              ))}
            </div>
          </motion.div>
          <motion.div {...fadeUp(0.1)}>
            <p
              className="text-[11px] tracking-[3px] uppercase mb-4 text-text-secondary"
              style={{ fontFamily: 'var(--font-mono)' }}
            >
              {ui.deploymentEyebrow}
            </p>
            <ul className="flex flex-col gap-3">
              {data.deploymentOptions.map((opt) => (
                <li key={opt} className="flex items-start gap-2 text-text-secondary text-sm">
                  <span style={{ color: data.color }}>◆</span> {opt}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </section>

      {/* S6: Pricing Approach (light section) */}
      <section className="py-20 px-6 lg:px-8" style={{ background: '#FAF7F5' }}>
        <div className="max-w-4xl mx-auto text-center">
          <motion.div {...fadeUp()}>
            <p
              className="text-[11px] tracking-[3px] uppercase mb-4 text-gray-500"
              style={{ fontFamily: 'var(--font-mono)' }}
            >
              {ui.pricingEyebrow}
            </p>
            <p className="text-2xl font-semibold text-gray-900 mb-4" style={{ fontFamily: 'var(--font-display)' }}>
              {data.pricingNote}
            </p>
            <Link
              href={contactHref}
              className="inline-flex px-7 py-3 rounded-lg text-white font-semibold text-sm hover:brightness-110 transition-all"
              style={{ background: data.color, fontFamily: 'var(--font-display)' }}
            >
              {ui.quoteCta}
            </Link>
          </motion.div>
        </div>
      </section>

      {/* S7: FAQ */}
      <section className="py-20 px-6 lg:px-8" style={{ background: '#12100D' }}>
        <div className="max-w-3xl mx-auto">
          <motion.div {...fadeUp()}>
            <p
              className="text-[11px] tracking-[3px] uppercase mb-8 text-text-secondary"
              style={{ fontFamily: 'var(--font-mono)' }}
            >
              {ui.faqEyebrow}
            </p>
            <Accordion type="single" collapsible className="flex flex-col gap-2">
              {data.faqs.map((faq, i) => (
                <AccordionItem
                  key={i}
                  value={`faq-${i}`}
                  className="border border-space-border rounded-lg px-4"
                  style={{ background: '#171411' }}
                >
                  <AccordionTrigger
                    className="text-text-primary text-left font-medium py-4 hover:no-underline"
                    style={{ fontFamily: 'var(--font-display)' }}
                  >
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-text-secondary pb-4 leading-relaxed">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>
        </div>
      </section>

      {/* S8: Related Services */}
      <section className="py-20 px-6 lg:px-8" style={{ background: '#0C0A08' }}>
        <div className="max-w-4xl mx-auto">
          <motion.div {...fadeUp()}>
            <p
              className="text-[11px] tracking-[3px] uppercase mb-8 text-text-secondary"
              style={{ fontFamily: 'var(--font-mono)' }}
            >
              {ui.relatedEyebrow}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {data.relatedServices.map((svc) => (
                <ContentCard
                  key={svc.href}
                  href={localeHref(locale, svc.href)}
                  title={svc.name}
                  locale={locale}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 px-6 lg:px-8 text-center" style={{ background: '#0C0A08' }}>
        <div className="max-w-2xl mx-auto">
          <motion.div {...fadeUp()}>
            <h2
              className="text-3xl font-bold text-text-primary mb-4"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              {ui.finalHeading.replace('{name}', data.name)}
            </h2>
            <p className="text-text-secondary mb-8">
              {ui.finalBody}
            </p>
            <Link
              href={contactHref}
              className="inline-flex px-8 py-4 rounded-lg text-white font-semibold hover:brightness-110 transition-all"
              style={{ background: data.color, fontFamily: 'var(--font-display)' }}
            >
              {ui.finalCta}
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
