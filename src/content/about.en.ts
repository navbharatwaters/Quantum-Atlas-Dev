import type { AboutContent } from './about.types'

export const aboutEn: AboutContent = {
  hero: {
    heading: 'We build AI systems that outlast the people who built them.',
    body: 'Quantum Atlas was founded on a single principle: production-grade or not at all. Every system we offer has been running in our own companies first — handling real volume, real failures, and real consequences. We are our own most demanding client.',
  },
  philosophy: {
    eyebrow: 'Philosophy',
    pillars: [
      {
        title: 'Production First',
        body: 'If it has not run in production, we do not sell it. Every service on this site is backed by months of production operation in our own companies.',
      },
      {
        title: 'No Dependencies',
        body: 'Self-hosted infrastructure. No vendor lock-in. Clients own their data and their platform. If we go away, their systems keep running.',
      },
      {
        title: 'Long-term Thinking',
        body: 'We build institutions, not projects. The decisions we make today are designed to hold up at 10x scale without a rewrite.',
      },
    ],
  },
  proof: {
    eyebrow: 'Internal Proof',
    heading: 'What we have built and run ourselves',
    items: [
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
    ],
  },
  founders: {
    eyebrow: 'Founders',
    founder: {
      initial: 'A',
      name: 'Anurag',
      role: 'Founder',
      bio: 'Civil engineering background. Self-taught full AI and software stack over 12 months. Runs four companies simultaneously. Quantum Atlas is built on the conviction that production-first AI is not a slogan — it is the only defensible position.',
    },
  },
  group: {
    eyebrow: 'Group Context',
    body: 'Quantum Atlas operates independently within a group that has 40+ years of presence in shipping and logistics in India. The production systems powering the group companies are the reference implementations behind every service we offer.',
  },
  cta: {
    heading: 'Want to see what we have running?',
    body: '30-minute call. We show you the actual systems, not slides about them.',
    button: 'Book a Discovery Call',
  },
}
