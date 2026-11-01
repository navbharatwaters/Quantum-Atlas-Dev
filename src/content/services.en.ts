import type { ServicesContent } from './services.types'

export const servicesEn: ServicesContent = {
  ui: {
    discussCta: 'Discuss This Service',
    problemEyebrow: 'The Problem',
    approachEyebrow: 'Our Approach',
    proofEyebrow: 'Production Proof',
    colMetric: 'Metric',
    colBefore: 'Before',
    colAfter: 'After',
    techStackEyebrow: 'Tech Stack',
    deploymentEyebrow: 'Deployment Options',
    pricingEyebrow: 'Pricing',
    quoteCta: 'Get a Quote',
    faqEyebrow: 'Frequently Asked Questions',
    relatedEyebrow: 'Related Services',
    finalHeading: 'Ready to discuss {name}?',
    finalBody: '30-minute call. We review your current state and share relevant production examples.',
    finalCta: 'Book a Discovery Call',
  },
  index: {
    meta: {
      title: 'Services',
      description:
        'Enterprise AI services — voice agents, document intelligence, RAG systems, custom SaaS, automation, and content production.',
    },
    jsonLdName: 'Services',
    hero: {
      eyebrow: 'Services',
      heading: 'The full stack. Under one roof.',
      body: 'One partner for voice AI, document intelligence, RAG systems, and custom SaaS.',
    },
    items: [
      { slug: 'ai-voice-agents', name: 'AI Voice Agents', tagline: '$0.08/min · 4 months production · Airtel/Jio native', description: 'Self-hosted inbound and outbound voice agents with Indian carrier integration.' },
      { slug: 'document-intelligence', name: 'Document Intelligence', tagline: '$0.08/page · 3.5x cheaper than Nanonets · Hundreds per minute', description: 'Bulk IDP pipeline with contract intelligence and workflow integration.' },
      { slug: 'enterprise-rag', name: 'Enterprise RAG', tagline: 'On-premise · Citations on every answer · PostgreSQL-native', description: 'Hybrid retrieval knowledge systems for government and regulated enterprises.' },
      { slug: 'saas-development', name: 'Custom SaaS Development', tagline: 'iKargos reference · 1000+ clients · Full multi-tenancy', description: 'Production-grade multi-tenant SaaS platforms built from scratch.' },
      { slug: 'ai-automation', name: 'AI Automation', tagline: '15→2 staff · LangGraph + n8n · Tally ETL', description: 'Stateful agent graphs and workflow orchestration for enterprise processes.' },
      { slug: 'content-video', name: 'Content & Video', tagline: 'ComfyUI · Tavus · Digital avatars', description: 'AI-powered video production pipeline for enterprise content at scale.' },
    ],
  },
  meta: {
    'ai-voice-agents': {
      title: 'AI Voice Agents',
      description:
        'Self-hosted enterprise voice AI at $0.08/minute. Airtel + Jio SIP integration, no Twilio, no ElevenLabs. 4 months in production.',
    },
    'document-intelligence': {
      title: 'Document Intelligence',
      description:
        'Bulk intelligent document processing at $0.08/page — 3.5x cheaper than Nanonets. Contract intelligence, IDP pipelines, on-premise deployment.',
    },
    'enterprise-rag': {
      title: 'Enterprise RAG',
      description:
        'On-premise knowledge systems with hybrid BM25 + vector + graph retrieval. Citations on every answer. PostgreSQL-native. Government-grade.',
    },
    'saas-development': {
      title: 'Custom SaaS Development',
      description:
        'Production-grade multi-tenant SaaS built from scratch. Next.js + FastAPI + PostgreSQL. Proven: replaced a costly legacy ERP with iKargos for 1000+ clients.',
    },
    'ai-automation': {
      title: 'AI Automation',
      description:
        'LangGraph + n8n workflow automation. Tally ETL, MCP servers, stateful agent graphs. Proven: 15-person team reduced to 2.',
    },
    'content-video': {
      title: 'AI Content & Video Production',
      description:
        'ComfyUI-powered digital avatars, lipsync, virtual try-on, long video generation. Tavus integration. Enterprise content production at scale.',
    },
  },
  pages: {
    'ai-voice-agents': {
      slug: 'ai-voice-agents',
      name: 'AI Voice Agents',
      color: '#FFBF00',
      colorName: 'electric-blue',
      tagline: 'Voice AI at a tenth of the cost',
      heroMetrics: [
        { value: '$0.08/min', label: 'End-to-end cost' },
        { value: '4 months', label: 'In production' },
        { value: 'Airtel + Jio', label: 'Native SIP' },
      ],
      problemHeading: 'Voice AI costs enterprises too much — or locks them into foreign vendors',
      problemBody:
        'Most enterprise voice AI platforms charge $0.60–$1.00/minute when you stack Twilio, ElevenLabs, and a cloud LLM. Enterprises pay a currency premium on top of that. The result: voice automation that costs more than the human agents it was meant to replace.',
      approachHeading: 'Self-hosted, carrier-native, cost-engineered from the start',
      approachPoints: [
        'Airtel + Jio SIP integration — no Twilio, no international call routing overhead',
        'Deepgram STT/TTS — low latency, enterprise-grade, no ElevenLabs dependency',
        'LangGraph stateful agent graphs — complex multi-step conversations handled correctly',
        'n8n orchestration — connects voice agent to your CRM, ERP, and ticketing systems',
        'Self-hosted LiveKit for WebRTC — no LiveKit Cloud dependency, data stays on your servers',
        'Grafana + Prometheus observability — every call logged, latency monitored, errors alerted',
      ],
      proofMetrics: [
        { metric: 'Cost per minute', before: '$0.60–$1.00/min (market avg)', after: '$0.08/min' },
        {
          metric: 'Deployment model',
          before: 'Third-party cloud (Twilio, ElevenLabs)',
          after: 'Self-hosted on your infrastructure',
        },
        { metric: 'Production duration', before: 'N/A', after: '4+ months, Navbharat Shipping' },
        { metric: 'Call types handled', before: 'Scripted IVR only', after: 'Inbound + outbound, context-aware' },
        { metric: 'Data sovereignty', before: 'Data processed offshore', after: 'All data on-premise' },
      ],
      techStack: [
        'LiveKit (self-hosted)',
        'Deepgram',
        'LangGraph',
        'n8n',
        'Airtel SIP',
        'Jio SIP',
        'Grafana',
        'Prometheus',
        'PostgreSQL',
      ],
      deploymentOptions: [
        'Cloud-hosted — managed by Quantum Atlas on dedicated VPS',
        'On-premise — deployed on your own servers, no external data transfer',
        'Hybrid — SIP carrier on-premise, AI processing in your cloud',
      ],
      pricingNote: 'Per-minute pricing or monthly retainer based on call volume. Contact for enterprise pricing.',
      faqs: [
        {
          q: 'What languages does the voice agent support?',
          a: 'English and Hindi by default. Additional Indian languages can be added based on Deepgram model availability and your use case requirements.',
        },
        {
          q: 'Can it integrate with our existing call center software?',
          a: 'Yes. SIP integration means it works with any SIP-compatible PBX or call center platform. We also build n8n workflows to connect call outcomes to your CRM or ticketing system.',
        },
        {
          q: 'How is the $0.08/minute cost broken down?',
          a: 'Airtel/Jio SIP (~$0.01/min), Deepgram STT/TTS (~$0.03/min), LLM inference (~$0.03/min), infrastructure (~$0.01/min). These are real production numbers from our Navbharat Shipping deployment.',
        },
        {
          q: 'What happens if the AI cannot answer a question?',
          a: 'The agent escalates to a human and logs the unanswered query. We use this data to improve the agent over time. The escalation path is configurable.',
        },
        {
          q: 'How long does deployment take?',
          a: 'Standard deployment: 4–6 weeks from signed agreement to production calls. This includes SIP setup, agent training on your business context, and testing.',
        },
        {
          q: 'Is our call data secure?',
          a: 'All call data is processed on infrastructure you control. With on-premise deployment, audio and transcripts never leave your servers. We do not use your call data for any other purpose.',
        },
      ],
      relatedServices: [
        { name: 'AI Automation', href: '/services/ai-automation', color: '#FFBF00' },
        { name: 'Document Intelligence', href: '/services/document-intelligence', color: '#FFBF00' },
        { name: 'Enterprise RAG', href: '/services/enterprise-rag', color: '#FFBF00' },
      ],
    },
    'document-intelligence': {
      slug: 'document-intelligence',
      name: 'Document Intelligence',
      color: '#FFBF00',
      colorName: 'electric-blue',
      tagline: 'Hundreds of documents. Minutes, not days.',
      heroMetrics: [
        { value: '$0.08/page', label: 'Processing cost' },
        { value: '3.5x', label: 'Cheaper than Nanonets' },
        { value: 'Hundreds', label: 'Documents per minute' },
      ],
      problemHeading: 'Document processing is slow, expensive, and fragmented',
      problemBody:
        'Nanonets charges $0.30/page and processes at 2 pages/minute. Manual teams process even slower at 10–20x the cost. Most enterprises have no choice — they absorb the cost or stay manual. Neither option scales.',
      approachHeading: 'Production-grade IDP pipeline, built in-house, three layers deep',
      approachPoints: [
        'Layer 1 (Extraction): Structured data from any document type — invoices, KYC, BOE, shipping docs, contracts, medical records',
        'Layer 2 (Intelligence): Clause extraction, obligation tracking, risk flagging, cross-document analysis, RAG-powered Q&A on document corpus',
        'Layer 3 (Integration): Connect directly to ERP, CRM, Tally, accounting systems via n8n workflows',
        'Fine-tuned models via Unsloth + Label Studio for your specific document types',
        'GLM OCR + Google Document AI + LLMWhisperer — best OCR for each document class',
        'Audit trail on every extraction — who extracted what, when, with what confidence',
      ],
      proofMetrics: [
        { metric: 'Cost per page', before: '$0.30/page (Nanonets)', after: '$0.08/page' },
        { metric: 'Processing speed', before: '2 pages/min (Nanonets)', after: 'Hundreds/min (bulk pipeline)' },
        {
          metric: 'Deployment options',
          before: 'Cloud only (Nanonets SaaS)',
          after: 'Cloud or on-premise',
        },
        {
          metric: 'Model customization',
          before: 'Generic pre-trained models',
          after: 'Fine-tuned to your document types',
        },
        { metric: 'Audit trail', before: 'None', after: 'Full extraction audit log' },
      ],
      techStack: [
        'GLM OCR',
        'Google Document AI',
        'LLMWhisperer',
        'n8n',
        'Unsloth',
        'Label Studio',
        'PostgreSQL',
        'FastAPI',
      ],
      deploymentOptions: [
        'Managed cloud — we operate the pipeline, you get the API',
        'On-premise — full pipeline on your servers, no data leaves your network',
        'Hybrid — OCR on-premise, LLM inference in your cloud',
      ],
      pricingNote: 'Per-document or monthly volume-based pricing. Contact for enterprise rates.',
      faqs: [
        {
          q: 'What document types do you support?',
          a: 'Invoices, KYC documents, bills of entry, bills of lading, shipping certificates, contracts, purchase orders, bank statements, medical records, property documents, tax forms, and more. If we have not processed your document type, we fine-tune a model for it.',
        },
        {
          q: 'How accurate is the extraction?',
          a: 'Accuracy depends on document quality and type. For standard structured documents (invoices, KYC), we achieve 97–99% field-level accuracy after fine-tuning. We provide confidence scores on every extraction so your systems can route low-confidence results for human review.',
        },
        {
          q: 'Can it handle handwritten documents?',
          a: 'Yes, with limitations. Printed documents achieve near-perfect accuracy. Handwritten documents depend on quality — we use GLM OCR which handles most handwriting, but accuracy varies. We test on your actual document corpus before quoting accuracy targets.',
        },
        {
          q: 'How does contract intelligence work?',
          a: 'We extract structured data from contracts — parties, dates, obligations, payment terms, termination clauses, liability caps, IP ownership, and custom fields you define. The system flags unusual clauses against a baseline, tracks deadlines, and lets you query the entire contract corpus via RAG.',
        },
        {
          q: 'What happens with confidential documents?',
          a: 'With on-premise deployment, documents never leave your servers. With our managed cloud, documents are processed and deleted — we do not store your document content. We sign NDAs and data processing agreements as required.',
        },
        {
          q: 'How long does integration take?',
          a: '6–8 weeks for a standard deployment including document type configuration, fine-tuning, and ERP/CRM integration. Simpler single-document-type deployments can be done in 3–4 weeks.',
        },
      ],
      relatedServices: [
        { name: 'Enterprise RAG', href: '/services/enterprise-rag', color: '#FFBF00' },
        { name: 'AI Automation', href: '/services/ai-automation', color: '#FFBF00' },
        { name: 'AI Voice Agents', href: '/services/ai-voice-agents', color: '#FFBF00' },
      ],
    },
    'enterprise-rag': {
      slug: 'enterprise-rag',
      name: 'Enterprise RAG',
      color: '#FFBF00',
      colorName: 'electric-blue',
      tagline: 'Knowledge systems governments trust',
      heroMetrics: [
        { value: 'On-premise', label: 'Deployment option' },
        { value: '100%', label: 'Answer citations' },
        { value: 'PostgreSQL', label: 'No vector DB vendor' },
      ],
      problemHeading: 'Enterprise knowledge is locked in documents that AI cannot access reliably',
      problemBody:
        'Most RAG implementations use simple vector search that misses exact matches. They cannot cite sources reliably. They cannot run on-premise. They cannot isolate data between departments. They fail compliance audits. Governments and regulated enterprises cannot deploy them.',
      approachHeading: 'Hybrid retrieval on PostgreSQL — no proprietary vector database',
      approachPoints: [
        'Hybrid retrieval: BM25 (ParadeDB) + pgvector semantic + Apache AGE graph — all on PostgreSQL',
        'RRF fusion (k=60) with reranking — combines keyword, semantic, and graph signals',
        'Jina v4 asymmetric embeddings — separate query and passage LoRA adapters',
        'Every answer includes citations to source documents — auditable, verifiable, defensible',
        'Multi-tenant with PostgreSQL RLS — complete data isolation between departments and clients',
        'Langfuse observability — full query audit trail, latency monitoring, answer quality tracking',
        'On-premise deployment — data never leaves your servers, CISO-approvable architecture',
      ],
      proofMetrics: [
        { metric: 'Deployment model', before: 'Cloud-only (Pinecone, Weaviate)', after: 'On-premise or cloud' },
        { metric: 'Answer citations', before: 'None or unreliable', after: '100% — every answer cites source' },
        {
          metric: 'Vector DB vendor',
          before: 'Pinecone/Weaviate dependency',
          after: 'PostgreSQL — no new vendor',
        },
        { metric: 'Multi-tenancy', before: 'Shared index (data leakage risk)', after: 'RLS-enforced isolation' },
        { metric: 'Audit capability', before: 'No query audit trail', after: 'Full Langfuse audit log' },
        {
          metric: 'Active deployment',
          before: 'N/A',
          after: 'Government IGST evaluation — active',
        },
      ],
      techStack: ['PostgreSQL', 'pgvector', 'ParadeDB', 'Apache AGE', 'Jina v4', 'Langfuse', 'FastAPI', 'LangGraph'],
      deploymentOptions: [
        'On-premise — complete isolation, CISO-approvable, air-gapped environments supported',
        'Private cloud — VPC-isolated deployment in your own cloud account',
        'Managed cloud — we operate, you own the data and schema',
      ],
      pricingNote: 'Implementation fee + monthly maintenance. Contact for enterprise and government pricing.',
      faqs: [
        {
          q: 'Why PostgreSQL instead of Pinecone or Weaviate?',
          a: 'PostgreSQL already handles your operational data. Adding pgvector, ParadeDB, and Apache AGE means no additional vendor, no additional cost, no additional operational complexity, and no data leaving a system you already trust. Our retrieval quality matches or beats standalone vector databases for enterprise document search.',
        },
        {
          q: 'Can it run in an air-gapped government environment?',
          a: 'Yes. We have deployed in environments with no internet access. The entire stack — PostgreSQL, pgvector, ParadeDB, the embedding model, and the LLM — can run on your hardware with no external calls.',
        },
        {
          q: 'How does citation work?',
          a: 'Every answer includes references to the source document chunks used to generate it — document name, section, page number where applicable. Officers can click through to the original source. This is non-negotiable for government and compliance use cases.',
        },
        {
          q: 'How many documents can it handle?',
          a: 'We have tested against corpora of 100,000+ documents. Performance depends on your hardware. On a standard 16-core server with 64GB RAM, query latency is under 2 seconds for corpora up to 500,000 chunks.',
        },
        {
          q: "Can different government departments share a system without seeing each other's data?",
          a: "Yes. PostgreSQL row-level security ensures complete isolation. A user authenticated to department A cannot query department B's documents — enforced at the database level, not the application level.",
        },
        {
          q: 'What document formats are supported?',
          a: 'PDF, Word, Excel, PowerPoint, HTML, plain text, and scanned PDFs (via OCR integration with our Document Intelligence pipeline). We can add connectors to SharePoint, Google Drive, or internal file systems.',
        },
      ],
      relatedServices: [
        { name: 'Document Intelligence', href: '/services/document-intelligence', color: '#FFBF00' },
        { name: 'Custom SaaS Dev', href: '/services/saas-development', color: '#FFBF00' },
        { name: 'AI Automation', href: '/services/ai-automation', color: '#FFBF00' },
      ],
    },
    'saas-development': {
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
    },
    'ai-automation': {
      slug: 'ai-automation',
      name: 'AI Automation',
      color: '#FFBF00',
      colorName: 'electric-blue',
      tagline: 'Automate the work, not just the reporting about it.',
      heroMetrics: [
        { value: '15 → 2', label: 'Team size reduction' },
        { value: 'n8n + LangGraph', label: 'Orchestration stack' },
        { value: 'Tally-native', label: 'ERP integration' },
      ],
      problemHeading: 'Most automation tools automate the form, not the function',
      problemBody:
        'Zapier and Make.com automate data copying between APIs. They cannot handle conditional logic, multi-step reasoning, or processes that require judgment. Most enterprise workflows fall into this gap: too complex for simple automation, not complex enough to justify custom software.',
      approachHeading: 'Stateful agent graphs + workflow orchestration for real enterprise processes',
      approachPoints: [
        'LangGraph for stateful agent graphs — handles complex multi-step processes with memory and branching',
        'n8n self-hosted for workflow orchestration — no Zapier dependency, your workflows on your server',
        'MCP server development with safety gates — controlled AI tool use with audit trails',
        'Tally ETL pipelines — extract, transform, and load accounting data for Indian SME workflows',
        'Internal proof: 15-person accounting and HR team reduced to 2 through workflow automation',
        'Pydantic models for all data validation — structured outputs from LLMs enforced at runtime',
      ],
      proofMetrics: [
        { metric: 'Internal team size', before: '15 people', after: '2 people — same throughput' },
        {
          metric: 'Automation approach',
          before: 'Zapier/Make — limited logic',
          after: 'LangGraph — stateful, conditional',
        },
        {
          metric: 'Deployment',
          before: 'Third-party cloud (Zapier)',
          after: 'Self-hosted n8n on your servers',
        },
        { metric: 'ERP integration', before: 'Manual Tally export/import', after: 'Automated ETL pipeline' },
        {
          metric: 'Process documentation',
          before: 'Tribal knowledge',
          after: 'Codified in workflow graphs',
        },
      ],
      techStack: ['LangGraph', 'n8n (self-hosted)', 'Pydantic', 'FastAPI', 'PostgreSQL', 'Redis', 'Python'],
      deploymentOptions: [
        'Self-hosted n8n — your workflows on your server, no vendor lock-in',
        'On-premise — full stack including LangGraph agents on your hardware',
        'Managed — we operate n8n and agents, you own the workflow definitions',
      ],
      pricingNote: 'Project-based scoping. Contact to map your automation opportunities.',
      faqs: [
        {
          q: 'What types of processes are good candidates for automation?',
          a: 'Processes that: repeat frequently, follow defined rules, involve data movement between systems, require document processing, or involve notifications and approvals. Poor candidates: one-off tasks, highly creative work, relationship-dependent decisions.',
        },
        {
          q: 'How is LangGraph different from a simple chatbot or Zapier flow?',
          a: 'LangGraph handles stateful, multi-step processes with branching logic. An agent can collect information across multiple turns, make decisions based on context, call external tools, handle errors gracefully, and resume interrupted processes. Zapier cannot do any of this.',
        },
        {
          q: 'We use Tally for accounting — can you integrate with it?',
          a: 'Yes. We have built Tally ETL pipelines for internal use. We can extract data from Tally, transform it for your downstream systems, and push structured data back into Tally.',
        },
        {
          q: 'What are MCP servers and why do you mention safety gates?',
          a: 'Model Context Protocol servers let AI agents call tools and access external systems. Safety gates are approval steps, rate limits, and permission checks that ensure the AI only does what it is supposed to. Enterprise AI automation requires this — you do not want an agent with unchecked access to your database.',
        },
        {
          q: 'How do you document the automations you build?',
          a: 'Every workflow is version-controlled in Git. n8n workflows are exportable JSON. LangGraph code is documented with inline comments and architecture diagrams. We train your team to understand and modify the workflows.',
        },
      ],
      relatedServices: [
        { name: 'AI Voice Agents', href: '/services/ai-voice-agents', color: '#FFBF00' },
        { name: 'Document Intelligence', href: '/services/document-intelligence', color: '#FFBF00' },
        { name: 'Custom SaaS Dev', href: '/services/saas-development', color: '#FFBF00' },
      ],
    },
    'content-video': {
      slug: 'content-video',
      name: 'AI Content & Video',
      color: '#FFBF00',
      colorName: 'electric-blue',
      tagline: 'Enterprise video at scale, without a studio.',
      heroMetrics: [
        { value: 'ComfyUI', label: 'Production pipeline' },
        { value: 'Avatars', label: 'Digital presenter' },
        { value: 'One vendor', label: 'End-to-end' },
      ],
      problemHeading: 'Enterprise video production is slow, expensive, and does not scale',
      problemBody:
        'Traditional video production requires studios, crews, and weeks of post-production for content that may only be used once. Training videos, product demos, and multilingual content are perpetually delayed or never made because the cost-to-impact ratio makes them impractical.',
      approachHeading: 'ComfyUI-native pipeline for enterprise video at production scale',
      approachPoints: [
        'ComfyUI for end-to-end video generation — digital avatars, lipsync, virtual try-on, face identity preservation',
        'PuLID face identity for consistent presenter appearance across all content',
        'FramePack for long-form video generation — not limited to 10-second clips',
        'Tavus integration for scalable personalized video at volume',
        'Adobe Premiere post-production for final quality control',
        'Inpainting and upscaling for existing asset enhancement',
      ],
      proofMetrics: [
        { metric: 'Production speed', before: 'Weeks (traditional studio)', after: 'Days (AI pipeline)' },
        {
          metric: 'Cost per video',
          before: 'High (crew + studio + post)',
          after: 'Fraction — no crew required',
        },
        {
          metric: 'Language variants',
          before: 'One language (re-shoot required)',
          after: 'Multiple — same avatar, dubbed',
        },
        {
          metric: 'Brand consistency',
          before: 'Varies by shoot/crew',
          after: 'Consistent via face identity',
        },
        {
          metric: 'Scale capability',
          before: 'Linear with headcount',
          after: 'Parallel — batch production',
        },
      ],
      techStack: ['ComfyUI', 'Tavus', 'PuLID', 'FramePack', 'Adobe Premiere', 'Stable Diffusion', 'Deepgram TTS'],
      deploymentOptions: [
        'Project-based — we produce the content, you receive final assets',
        'Managed pipeline — your content brief, our production, ongoing relationship',
        'License + training — we set up the ComfyUI pipeline on your hardware and train your team',
      ],
      pricingNote: 'Per-project pricing based on content volume and complexity. Contact to discuss scope.',
      faqs: [
        {
          q: 'Can the digital avatar look like a specific person?',
          a: 'Yes. PuLID face identity preservation creates a consistent presenter from reference photos. The avatar can be a real employee, a branded spokesperson, or a synthesized persona. Legal and consent requirements are your responsibility for real individuals.',
        },
        {
          q: 'What is the video quality output?',
          a: 'We produce at 1080p minimum, 4K on request. Adobe Premiere post-production ensures broadcast-quality output. The AI generation step and the post-production step are separate — we do not ship raw AI output as the final product.',
        },
        {
          q: 'Can you produce training videos in multiple Indian languages?',
          a: 'Yes. The avatar video is generated in English, then audio is dubbed in target languages using Deepgram TTS or human voice artists. Lip sync is re-applied to match the dubbed audio.',
        },
        {
          q: 'Is this a standalone service or bundled with other services?',
          a: 'Both. We offer it standalone for enterprises that need video production. We also bundle it with other services — for example, RAG-powered voice agents combined with video training content for enterprise onboarding programs.',
        },
        {
          q: 'What file formats do you deliver?',
          a: 'MP4 (H.264) for web and email distribution. MOV (ProRes) for broadcast or archival. SCORM packages for LMS integration on request.',
        },
      ],
      relatedServices: [
        { name: 'AI Voice Agents', href: '/services/ai-voice-agents', color: '#FFBF00' },
        { name: 'AI Automation', href: '/services/ai-automation', color: '#FFBF00' },
        { name: 'Custom SaaS Dev', href: '/services/saas-development', color: '#FFBF00' },
      ],
    },
  },
}
