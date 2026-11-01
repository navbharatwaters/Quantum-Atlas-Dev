// Placeholder posts shown while the CMS has no published posts. Remove once real posts are live.
export const legacyPosts = [
  { title: 'How We Built a Voice Agent at $0.08/min — Full Technical Breakdown', slug: 'voice-agent-cost-breakdown', category: 'Technical Deep Dive', excerpt: 'A complete breakdown of the architecture, cost components, and engineering decisions behind our production voice AI deployment.', date: 'Apr 2026', readTime: 12, featured: true },
  { title: 'Why We Chose PostgreSQL Over Pinecone for RAG — And What Happened', slug: 'postgresql-rag-vs-pinecone', category: 'AI Implementation', excerpt: 'The case for keeping all your data in one database — and the retrieval quality results that justified the decision.', date: 'Mar 2026', readTime: 8, featured: false },
  { title: 'On-Premise AI for Government: What Actually Matters', slug: 'on-premise-government-ai', category: 'Industry Guide', excerpt: 'After working with government departments on AI procurement, here is what separates deployable from demoable.', date: 'Mar 2026', readTime: 6, featured: false },
  { title: 'Contract Analysis at Scale — Processing 500 Agreements in 2 Hours', slug: 'contract-analysis-at-scale', category: 'Technical Deep Dive', excerpt: 'The pipeline architecture behind bulk contract intelligence — OCR, extraction, clause analysis, and the audit trail.', date: 'Feb 2026', readTime: 10, featured: false },
  { title: 'How We Reduced a 15-Person Team to 2 With AI Automation', slug: 'team-reduction-automation', category: 'AI Implementation', excerpt: 'Internal proof: the LangGraph + n8n architecture that automated accounting and HR workflows for the Navbharat group.', date: 'Feb 2026', readTime: 7, featured: false },
  { title: 'The Real Cost of Nanonets vs Building Your Own IDP Pipeline', slug: 'nanonets-vs-custom-idp', category: 'Technical Deep Dive', excerpt: 'A side-by-side cost and capability analysis — with production numbers from our own document processing deployment.', date: 'Jan 2026', readTime: 9, featured: false },
]

export const legacyPlaceholderPost = {
  title: 'How We Built a Voice Agent at $0.08/min — Full Technical Breakdown',
  category: 'Technical Deep Dive',
  date: 'April 2026',
  readTime: 12,
  excerpt: 'A complete breakdown of the architecture, cost components, and engineering decisions behind our production voice AI deployment.',
}

export const legacySlugs: ReadonlySet<string> = new Set(legacyPosts.map((p) => p.slug))
