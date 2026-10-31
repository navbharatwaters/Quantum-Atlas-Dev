import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'About Quantum Atlas',
  description: 'Production-first AI implementation. Every system we offer has been running in our own companies first. We are our own most demanding client.',
}

export default function AboutPage() {
  return (
    <div className="bg-space-dark min-h-screen">
      {/* Hero */}
      <section className="pt-32 pb-20 px-6 lg:px-8" style={{ background: '#0C0A08' }}>
        <div className="max-w-4xl mx-auto">
          <h1
            className="text-5xl lg:text-6xl font-bold text-text-primary leading-[1.05] mb-8"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            We build AI systems that outlast the people who built them.
          </h1>
          <p className="text-text-secondary text-xl leading-relaxed max-w-2xl">
            Quantum Atlas was founded on a single principle: production-grade or not at all.
            Every system we offer has been running in our own companies first — handling
            real volume, real failures, and real consequences. We are our own most demanding client.
          </p>
        </div>
      </section>

      {/* Philosophy */}
      <section className="py-20 px-6 lg:px-8" style={{ background: '#12100D' }}>
        <div className="max-w-5xl mx-auto">
          <p className="text-electric-blue text-[11px] tracking-[3px] uppercase mb-12" style={{ fontFamily: 'var(--font-mono)' }}>
            Philosophy
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Production First',
                body: 'If it has not run in production, we do not sell it. Every service on this site is backed by months of production operation in our own companies.',
                color: '#FFBF00',
              },
              {
                title: 'No Dependencies',
                body: 'Self-hosted infrastructure. No vendor lock-in. Clients own their data and their platform. If we go away, their systems keep running.',
                color: '#FFBF00',
              },
              {
                title: 'Long-term Thinking',
                body: 'We build institutions, not projects. The decisions we make today are designed to hold up at 10x scale without a rewrite.',
                color: '#FFBF00',
              },
            ].map((pillar) => (
              <div
                key={pillar.title}
                className="p-6 rounded-xl border border-space-border"
                style={{ background: '#171411', borderTop: '1px solid #2E261F' }}
              >
                <h3
                  className="text-text-primary font-bold text-xl mb-3"
                  style={{ fontFamily: 'var(--font-display)', color: pillar.color }}
                >
                  {pillar.title}
                </h3>
                <p className="text-text-secondary leading-relaxed">{pillar.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What We Have Built */}
      <section className="py-20 px-6 lg:px-8" style={{ background: '#0C0A08' }}>
        <div className="max-w-5xl mx-auto">
          <p className="text-electric-blue text-[11px] tracking-[3px] uppercase mb-12" style={{ fontFamily: 'var(--font-mono)' }}>
            Internal Proof
          </p>
          <h2
            className="text-4xl font-bold text-text-primary mb-12"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            What we have built and run ourselves
          </h2>
          <div className="flex flex-col gap-4">
            {[
              {
                system: 'iKargos CHA Platform',
                description: 'Full multi-tenant SaaS — replaced a legacy ERP system. 1000+ corporate clients. Built on Next.js + FastAPI + PostgreSQL.',
                status: 'Production',
              },
              {
                system: 'Voice AI — Navbharat Shipping',
                description: 'Inbound and outbound voice agent. Airtel/Jio SIP integration. 4+ months in production. $0.08/minute end-to-end cost.',
                status: '4 months live',
              },
              {
                system: 'Internal Automation — 15 to 2',
                description: 'LangGraph + n8n workflow automation for accounting and HR operations. 15-person team workload handled by 2 people.',
                status: 'Production',
              },
              {
                system: 'Email Infrastructure',
                description: 'Self-configured PowerMTA + MailWizz deployment. 8 months in production. Zero vendor dependency for email operations.',
                status: '8 months live',
              },
            ].map((item) => (
              <div
                key={item.system}
                className="flex flex-col md:flex-row gap-4 p-6 rounded-xl border border-space-border"
                style={{ background: '#171411' }}
              >
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3
                      className="text-text-primary font-semibold"
                      style={{ fontFamily: 'var(--font-display)' }}
                    >
                      {item.system}
                    </h3>
                    <span
                      className="px-2 py-0.5 rounded-full text-[10px]"
                      style={{ background: '#FFBF0015', color: '#FFBF00', fontFamily: 'var(--font-mono)' }}
                    >
                      {item.status}
                    </span>
                  </div>
                  <p className="text-text-secondary text-sm leading-relaxed">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Founders */}
      <section className="py-20 px-6 lg:px-8" style={{ background: '#12100D' }}>
        <div className="max-w-5xl mx-auto">
          <p className="text-electric-blue text-[11px] tracking-[3px] uppercase mb-12" style={{ fontFamily: 'var(--font-mono)' }}>
            Founders
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div
              className="p-6 rounded-xl border border-space-border"
              style={{ background: '#171411' }}
            >
              {/* Avatar placeholder */}
              <div
                className="w-16 h-16 rounded-full mb-4 flex items-center justify-center text-2xl font-bold"
                style={{ background: '#FFBF0020', color: '#FFBF00', fontFamily: 'var(--font-mono)' }}
              >
                A
              </div>
              <h3
                className="text-text-primary font-bold text-xl mb-1"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                Anurag
              </h3>
              <p className="text-electric-blue text-sm mb-3" style={{ fontFamily: 'var(--font-mono)' }}>
                Founder
              </p>
              <p className="text-text-secondary text-sm leading-relaxed">
                Civil engineering background. Self-taught full AI and software stack over 12 months.
                Runs four companies simultaneously. Quantum Atlas is built on the conviction that
                production-first AI is not a slogan — it is the only defensible position.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Group Companies */}
      <section className="py-20 px-6 lg:px-8" style={{ background: '#0C0A08' }}>
        <div className="max-w-5xl mx-auto">
          <p className="text-electric-blue text-[11px] tracking-[3px] uppercase mb-8" style={{ fontFamily: 'var(--font-mono)' }}>
            Group Context
          </p>
          <p className="text-text-secondary text-lg leading-relaxed max-w-2xl">
            Quantum Atlas operates independently within a group that has 40+ years of presence
            in shipping and logistics in India. The production systems powering the group companies
            are the reference implementations behind every service we offer.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 lg:px-8 text-center" style={{ background: '#12100D' }}>
        <div className="max-w-2xl mx-auto">
          <h2
            className="text-3xl font-bold text-text-primary mb-4"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Want to see what we have running?
          </h2>
          <p className="text-text-secondary mb-8">
            30-minute call. We show you the actual systems, not slides about them.
          </p>
          <Link
            href="/contact"
            className="inline-flex px-8 py-4 rounded-lg bg-electric-blue text-white font-semibold hover:brightness-110 transition-all"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Book a Discovery Call
          </Link>
        </div>
      </section>
    </div>
  )
}
