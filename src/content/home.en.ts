import type { HomeContent } from './home.types'

export const homeEn: HomeContent = {
  hero: {
    eyebrow: 'Quantum Atlas · AI Infrastructure',
    headline: ['Built in', 'Production.', 'Proven at Scale.'],
    subtitle:
      'AI systems that run in the real world — voice agents, document intelligence, knowledge systems and custom SaaS. Self-hosted. Enterprise-grade.',
    ctaPrimary: 'Book a Discovery Call',
    ctaSecondary: 'See Our Work →',
    coordinates: '18.9667° N · 72.8333° E · MUMBAI',
  },
  proofBar: {
    ariaLabel: 'Proof points',
    points: [
      '4 months production · Voice AI',
      'Government RAG deployment · Active',
      '1000+ corporate clients',
      '$0.08 per page · Document processing',
      'Self-hosted · Zero vendor lock-in',
      'On-premise deployment · Government-ready',
      '40+ years industry presence',
    ],
  },
  servicesGrid: {
    eyebrow: 'What We Build',
    heading: 'Six capabilities. One team.',
    intro:
      'We build and run these in our own operations before offering them to clients. Content & Video is a supporting service.',
    items: [
      {
        name: 'AI Voice Agents',
        description:
          'Website and phone voice agents on infrastructure you control. Inbound and outbound, with full observability and no dependency on hosted cloud voice platforms.',
        href: '/services/ai-voice-agents',
      },
      {
        name: 'Document Intelligence',
        description:
          'Extraction, checking and routing for document-heavy teams. Every extracted field carries a citation back to its source page.',
        href: '/services/document-intelligence',
      },
      {
        name: 'Enterprise RAG',
        description:
          'Knowledge systems with a citation on every answer. Hybrid retrieval, row-level security multi-tenancy, and on-premise deployment.',
        href: '/services/enterprise-rag',
      },
      {
        name: 'Custom AI SaaS',
        description:
          'Multi-tenant products built end to end, from data model to deployment, on open components with no vendor lock-in.',
        href: '/services/saas-development',
      },
      {
        name: 'AI Automation',
        description:
          'Workflows and agents wired into your systems. Stateful agent graphs, document triggers, and integrations with ERP and accounting tools.',
        href: '/services/ai-automation',
      },
      {
        name: 'Content & Video',
        description:
          'Avatar and video production, supporting service. Corporate training videos, product demos and marketing content using AI-generated avatars.',
        href: '/services/content-video',
      },
    ],
  },
  whyDifferent: {
    eyebrow: 'Why Quantum Atlas',
    heading: ['Production proof.', 'Not promises.'],
    body: 'Every system we offer has been running in production in our own companies. We are our own most demanding client.',
    points: [
      { value: '$0.08/min', label: 'Voice AI cost — 10x below market' },
      { value: '$0.08/page', label: 'Document processing — 3.5x below Nanonets' },
      { value: '4 months', label: 'Voice AI in production — Navbharat Shipping' },
      { value: '1000+', label: 'Corporate clients — existing relationships' },
      { value: 'ERP replaced', label: 'Custom-built iKargos platform from scratch' },
      { value: '15 → 2', label: 'Staff reduction — internal automation proof' },
    ],
  },
  deepDive: {
    cta: 'Discuss This Service →',
    visuals: { query: 'QUERY', processed: 'PROCESSED', answerCite: 'ANSWER + CITE' },
    items: [
      {
        id: 'voice',
        label: 'AI Voice Agents',
        heading: 'Voice AI at a tenth of the cost',
        description:
          'Enterprise inbound and outbound voice agents with native Indian carrier integration. Self-hosted. No Twilio. No ElevenLabs.',
        bullets: [
          'Airtel + Jio SIP integration — no third-party carrier markup',
          '$0.08/minute end-to-end cost — verified over 4 months production',
          'RAG-powered agents — know your business, not just scripts',
          'Grafana + Prometheus observability — every call logged',
          '4 months in production at Navbharat Shipping',
        ],
        href: '/services/ai-voice-agents',
      },
      {
        id: 'idp',
        label: 'Document Intelligence',
        heading: 'Hundreds of documents. Minutes, not days.',
        description:
          'Bulk intelligent document processing with domain fine-tuning. Three times cheaper than Nanonets. On-premise available.',
        bullets: [
          '$0.08 per page — vs $0.30 at Nanonets',
          'Contract clause extraction and risk flagging',
          'Fine-tuned models for your document types',
          'Bulk processing pipeline — hundreds in minutes',
          'On-premise deployment for data sovereignty',
        ],
        href: '/services/document-intelligence',
      },
      {
        id: 'rag',
        label: 'Enterprise RAG',
        heading: 'Knowledge systems governments trust',
        description:
          'Hybrid retrieval — BM25 + vector + graph — all on PostgreSQL. Citations on every answer. On-premise. SOC2-grade architecture.',
        bullets: [
          'Hybrid retrieval — keyword + semantic + graph',
          'Every answer cites the source document',
          'Multi-tenant with complete data isolation',
          'On-premise deployment — no data leaves your servers',
          'Langfuse observability — full audit trail',
        ],
        href: '/services/enterprise-rag',
      },
      {
        id: 'saas',
        label: 'Custom SaaS Development',
        heading: 'Replace your ERP. Own your platform.',
        description:
          'Production-grade multi-tenant SaaS built for your exact workflow. Not a template. Not a customized off-the-shelf product.',
        bullets: [
          'Full multi-tenancy with row-level security',
          'Clerk auth + Stripe billing built in',
          'Self-hosted — you own everything',
          'Proven: replaced a costly legacy ERP with iKargos',
          'API-first — integrates with anything',
        ],
        href: '/services/saas-development',
      },
    ],
  },
  activeEngagements: {
    eyebrow: 'Active Engagements',
    heading: 'In production. Right now.',
    items: [
      {
        sector: 'Government · Customs & Taxation',
        service: 'Enterprise RAG',
        status: 'Active Implementation',
        outcome: '40+ senior government officers evaluating for large-scale IGST deployment',
      },
      {
        sector: 'Global Logistics · Fortune 500',
        service: 'Document Intelligence',
        status: 'Production Testing Complete',
        outcome: 'Bulk document processing at enterprise scale — evaluated and approved',
      },
      {
        sector: 'Shipping & Logistics',
        service: 'AI Voice Agents',
        status: '4 months in production',
        outcome: 'Inbound and outbound calls — native carrier SIP integration — $0.08/min',
      },
    ],
  },
  industries: {
    eyebrow: 'Industries We Serve',
    heading: 'Deep vertical expertise. Not generic AI.',
    challengesTitle: (label) => `${label} Challenges`,
    items: [
      {
        id: 'government',
        label: 'Government',
        href: '/industries/government',
        pain: 'Data sovereignty. Compliance requirements. On-premise mandates. Slow procurement processes.',
        services: ['Enterprise RAG', 'Document Intelligence', 'Custom SaaS'],
        cta: 'Explore Government AI →',
      },
      {
        id: 'logistics',
        label: 'Logistics',
        href: '/industries/logistics-shipping',
        pain: 'High call volume. Document-heavy workflows. Time-sensitive clearances. Fragmented systems.',
        services: ['AI Voice Agents', 'Document Intelligence', 'AI Automation'],
        cta: 'Explore Logistics AI →',
      },
      {
        id: 'fintech',
        label: 'Fintech & BFSI',
        href: '/industries/fintech-bfsi',
        pain: 'KYC backlogs. Compliance overhead. Loan processing delays. Regulatory documentation.',
        services: ['Document Intelligence', 'Enterprise RAG', 'AI Automation'],
        cta: 'Explore Fintech AI →',
      },
      {
        id: 'legal',
        label: 'Legal',
        href: '/industries/legal',
        pain: 'Contract review bottlenecks. Due diligence timelines. Paralegal costs. Risk exposure.',
        services: ['Document Intelligence', 'Enterprise RAG'],
        cta: 'Explore Legal AI →',
      },
      {
        id: 'manufacturing',
        label: 'Manufacturing',
        href: '/industries/manufacturing',
        pain: 'Purchase order processing. Quality certification management. Import/export documentation.',
        services: ['Document Intelligence', 'AI Automation'],
        cta: 'Explore Manufacturing AI →',
      },
      {
        id: 'healthcare',
        label: 'Healthcare',
        href: '/industries/healthcare',
        pain: 'Patient record processing. Insurance pre-authorization. Clinical document management.',
        services: ['Document Intelligence', 'Enterprise RAG'],
        cta: 'Explore Healthcare AI →',
      },
      {
        id: 'real-estate',
        label: 'Real Estate',
        href: '/industries/real-estate',
        pain: 'Property document processing. Lease agreement review. NOC and registration workflows.',
        services: ['Document Intelligence', 'AI Automation'],
        cta: 'Explore Real Estate AI →',
      },
    ],
  },
  techStack: {
    eyebrow: 'The Stack',
    heading: 'Self-hosted. Production-proven. No dependencies.',
    intro:
      'Every technology was chosen because it eliminates a vendor dependency and runs reliably in production environments we control.',
    rows: [
      {
        label: 'Infrastructure',
        items: [
          { name: 'LiveKit', note: 'Self-hosted WebRTC — no LiveKit Cloud dependency' },
          { name: 'PostgreSQL', note: 'Single database for all data including vectors' },
          { name: 'Docker', note: 'Containerized deployment — portable and reproducible' },
          { name: 'Pulumi', note: 'Infrastructure as code — version-controlled infra' },
          { name: 'Tailscale', note: 'Zero-trust internal networking — no open ports' },
          { name: 'Caddy', note: 'Auto SSL — no nginx config complexity' },
        ],
      },
      {
        label: 'AI / ML',
        items: [
          { name: 'LangGraph', note: 'Stateful agent graphs — complex multi-step AI' },
          { name: 'n8n', note: 'Self-hosted workflow automation — no Zapier dependency' },
          { name: 'LiteLLM', note: 'Multi-provider LLM routing with cost controls' },
          { name: 'Langfuse', note: 'Full observability — every query logged and traced' },
          { name: 'Deepgram', note: 'STT/TTS — cost-effective, low-latency voice' },
          { name: 'Jina v4', note: 'Asymmetric embeddings — optimized for RAG retrieval' },
        ],
      },
      {
        label: 'Data',
        items: [
          { name: 'pgvector', note: 'Vector search in Postgres — no Pinecone dependency' },
          { name: 'ParadeDB', note: 'BM25 in Postgres — no Elasticsearch needed' },
          { name: 'Apache AGE', note: 'Graph queries in Postgres — no Neo4j dependency' },
          { name: 'Redis', note: 'Session caching and rate limiting' },
          { name: 'MinIO', note: 'S3-compatible object storage — self-hosted' },
        ],
      },
    ],
  },
  knowledgePreview: {
    eyebrow: 'Knowledge Hub',
    heading: 'How we think. What we have learned.',
    readTime: (minutes) => `${minutes} min read`,
    viewAll: 'View all articles →',
    posts: [
      {
        title: 'How We Built a Voice Agent at $0.08/min — Full Technical Breakdown',
        category: 'Technical Deep Dive',
        readMinutes: 12,
        date: 'Apr 2026',
        href: '/blog',
      },
      {
        title: 'Why We Chose PostgreSQL Over Pinecone for RAG — And What Happened',
        category: 'AI Implementation',
        readMinutes: 8,
        date: 'Mar 2026',
        href: '/blog',
      },
      {
        title: 'On-Premise AI for Government: What Actually Matters',
        category: 'Industry Guide',
        readMinutes: 6,
        date: 'Mar 2026',
        href: '/blog',
      },
    ],
    guide: {
      eyebrow: 'Free Guide',
      title: 'Enterprise RAG Architecture Guide — On-Premise Deployment',
      body: 'How to build a production-grade RAG system using PostgreSQL, pgvector, ParadeDB and Apache AGE — without proprietary vector databases.',
    },
    form: {
      namePlaceholder: 'Your name',
      emailPlaceholder: 'Work email',
      submit: 'Download Free →',
      submitting: 'Sending...',
      successTitle: 'Guide sent to your inbox',
      successBody: 'Check your email for the RAG Architecture Guide.',
      note: 'No spam. One email with your guide.',
    },
  },
  cta: {
    heading: ['Ready to build something', 'that actually works?'],
    body: 'Not a demo. Not a PoC. A production system. Let us show you what we have running today.',
    primary: 'Book a Discovery Call',
    secondary: 'See All Services',
  },
}
