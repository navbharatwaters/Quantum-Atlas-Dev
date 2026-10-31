import type { Metadata } from 'next'
import { ServicePageTemplate } from '@/components/templates/ServicePageTemplate'
import type { ServicePageData } from '@/components/templates/ServicePageTemplate'

export const metadata: Metadata = {
  title: 'Custom SaaS Development',
  description:
    'Production-grade multi-tenant SaaS built from scratch. Next.js + FastAPI + PostgreSQL. Proven: replaced a costly legacy ERP with iKargos for 1000+ clients.',
}

const data: ServicePageData = {
  slug: 'saas-development',
  name: 'Custom SaaS Development',
  color: '#FFBF00',
  colorName: 'electric-blue',
  tagline: 'Replace your ERP. Own your platform.',
  heroMetrics: [
    { value: '1000+', label: 'Active client accounts' },
    { value: 'iKargos', label: 'Production reference' },
    { value: 'Full', label: 'Multi-tenancy + RLS' },
  ],
  problemHeading: 'Off-the-shelf ERPs are expensive, rigid, and owned by someone else',
  problemBody:
    'Enterprise software vendors charge for every seat, every module, every customization. When your workflow does not fit their template, you adapt your workflow — not their software. Maintenance windows are their schedule, not yours. And when they are acquired or discontinued, you start over.',
  approachHeading: 'Purpose-built platform for your exact workflow. You own everything.',
  approachPoints: [
    'Full multi-tenant architecture from day one — isolated schemas per client with PostgreSQL RLS',
    'Next.js frontend — fast, SEO-ready, mobile-first, TypeScript throughout',
    'FastAPI backend — typed API, async-first, production-grade from day one',
    'Clerk auth — SSO, MFA, RBAC, all configured and ready',
    'Stripe billing — subscription management, usage-based billing, invoice generation',
    'Docker + Pulumi — infrastructure as code, reproducible deployments, no manual server config',
    'Proven reference: iKargos CHA platform — replaced a legacy ERP — 1000+ corporate clients',
  ],
  proofMetrics: [
    { metric: 'Platform reference', before: 'N/A', after: 'iKargos — 1000+ corporate clients' },
    {
      metric: 'Time to production',
      before: '12–18 months (traditional ERP)',
      after: '4–6 months (custom build)',
    },
    { metric: 'Annual licensing', before: 'Large annual vendor fee', after: 'Zero — you own the code' },
    { metric: 'Customization cost', before: 'High per-customization fee', after: 'Zero — modify anytime' },
    { metric: 'Data sovereignty', before: 'Data in vendor cloud', after: 'Data on your servers' },
  ],
  techStack: [
    'Next.js',
    'FastAPI',
    'PostgreSQL',
    'Clerk',
    'Stripe',
    'Docker',
    'Pulumi',
    'TypeScript',
    'Tailwind CSS',
  ],
  deploymentOptions: [
    'Self-hosted on your VPS — you own and operate the infrastructure',
    'On-premise — deployed in your data center, no cloud dependency',
    'Managed cloud — we operate on infrastructure you control',
  ],
  pricingNote: 'Project-based with clear scope. Contact to discuss your requirements.',
  faqs: [
    {
      q: 'We have a complex workflow — can you handle it?',
      a: 'Our reference platform iKargos handles customs house agent workflows — one of the most document-intensive, regulation-heavy domains in Indian logistics. If we can handle that, we can handle your workflow.',
    },
    {
      q: 'How long does a typical project take?',
      a: 'A full multi-tenant SaaS platform with auth, billing, and core workflow typically takes 4–6 months to production. The timeline depends on feature scope. We define this precisely in the spec before writing any code.',
    },
    {
      q: 'What if we already have an existing system to migrate from?',
      a: 'Migration is part of the engagement. We build data migration scripts, run parallel operations, and cut over when you are ready. We have migrated from legacy systems including Logi-Sys.',
    },
    {
      q: 'Do we get the source code?',
      a: 'Yes. You own all code produced for your project. We use Git repositories under your account. You can hire any developer to modify the code after the project.',
    },
    {
      q: 'Can it integrate with Tally or other Indian ERP systems?',
      a: 'Yes. We have built Tally ETL pipelines for internal use. Tally integration is part of our standard capability set.',
    },
    {
      q: 'What does "production-grade" actually mean?',
      a: 'It means: row-level security enforced at database level, all inputs validated, authentication on every protected route, secrets in environment variables not code, error handling that fails safely, structured logging, and automated backups. Not aspirational — built-in from day one.',
    },
  ],
  relatedServices: [
    { name: 'AI Automation', href: '/services/ai-automation', color: '#FFBF00' },
    { name: 'Enterprise RAG', href: '/services/enterprise-rag', color: '#FFBF00' },
    { name: 'Document Intelligence', href: '/services/document-intelligence', color: '#FFBF00' },
  ],
}

export default function SaaSDevelopmentPage() {
  return <ServicePageTemplate data={data} />
}
