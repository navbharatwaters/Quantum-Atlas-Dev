'use client'
import { motion } from 'framer-motion'

const rows = [
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
]

export function TechStack() {
  return (
    <section className="relative py-24 px-6 lg:px-8" style={{ background: '#0C0A08' }}>
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
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <p className="text-electric-blue text-[11px] tracking-[3px] uppercase mb-4" style={{ fontFamily: 'var(--font-mono)' }}>
            The Stack
          </p>
          <h2 className="text-4xl font-bold text-text-primary mb-4" style={{ fontFamily: 'var(--font-display)' }}>
            Self-hosted. Production-proven. No dependencies.
          </h2>
          <p className="text-text-secondary max-w-xl mx-auto">
            Every technology was chosen because it eliminates a vendor dependency
            and runs reliably in production environments we control.
          </p>
        </motion.div>

        <div className="flex flex-col gap-12">
          {rows.map((row, ri) => (
            <motion.div
              key={row.label}
              initial={{ opacity: 0, y: 60, x: ri % 2 === 0 ? -40 : 40 }}
              whileInView={{ opacity: 1, y: 0, x: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.8, ease: 'easeOut', delay: ri * 0.12 }}
            >
              <p
                className="text-[11px] tracking-[2px] uppercase text-text-secondary mb-6"
                style={{ fontFamily: 'var(--font-mono)' }}
              >
                {row.label}
              </p>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {row.items.map((item) => (
                  <div
                    key={item.name}
                    className="group p-4 rounded-xl border border-space-border hover:border-electric-blue/40 transition-all cursor-default"
                    style={{ background: '#171411' }}
                  >
                    <p
                      className="text-text-secondary group-hover:text-text-primary font-semibold text-sm mb-2 transition-colors"
                      style={{ fontFamily: 'var(--font-display)' }}
                    >
                      {item.name}
                    </p>
                    <p className="text-[11px] text-text-secondary opacity-60 group-hover:opacity-100 transition-opacity leading-snug">
                      {item.note}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
