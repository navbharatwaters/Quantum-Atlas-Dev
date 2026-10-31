import type { Metadata } from 'next'
import { ServicePageTemplate } from '@/components/templates/ServicePageTemplate'
import type { ServicePageData } from '@/components/templates/ServicePageTemplate'

export const metadata: Metadata = {
  title: 'Enterprise RAG',
  description:
    'On-premise knowledge systems with hybrid BM25 + vector + graph retrieval. Citations on every answer. PostgreSQL-native. Government-grade.',
}

const data: ServicePageData = {
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
}

export default function EnterpriseRAGPage() {
  return <ServicePageTemplate data={data} />
}
