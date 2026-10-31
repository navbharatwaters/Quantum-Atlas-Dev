'use client'
import { motion } from 'framer-motion'

const engagements = [
  {
    sector: 'Government · Customs & Taxation',
    service: 'Enterprise RAG',
    status: 'Active Implementation',
    outcome: '40+ senior government officers evaluating for large-scale IGST deployment',
    color: '#FFBF00',
  },
  {
    sector: 'Global Logistics · Fortune 500',
    service: 'Document Intelligence',
    status: 'Production Testing Complete',
    outcome: 'Bulk document processing at enterprise scale — evaluated and approved',
    color: '#FFBF00',
  },
  {
    sector: 'Shipping & Logistics',
    service: 'AI Voice Agents',
    status: '4 months in production',
    outcome: 'Inbound and outbound calls — native carrier SIP integration — $0.08/min',
    color: '#FFBF00',
  },
]

export function ActiveEngagements() {
  return (
    <section className="relative py-24 px-6 lg:px-8" style={{ background: '#12100D' }}>
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
          className="mb-12"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <p className="text-electric-blue text-[11px] tracking-[3px] uppercase mb-4" style={{ fontFamily: 'var(--font-mono)' }}>
            Active Engagements
          </p>
          <h2 className="text-4xl font-bold text-text-primary" style={{ fontFamily: 'var(--font-display)' }}>
            In production. Right now.
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {engagements.map((eng, i) => (
            <motion.div
              key={i}
              className="rounded-xl border border-space-border p-6"
              style={{ background: '#171411', borderTop: '1px solid #2E261F' }}
              initial={{ opacity: 0, y: 70, rotate: 1 }}
              whileInView={{ opacity: 1, y: 0, rotate: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.75, ease: 'easeOut', delay: i * 0.12 }}
            >
              <div className="flex items-center gap-2 mb-4">
                <span
                  className="px-2 py-0.5 rounded-full text-[10px] font-medium"
                  style={{ background: '#FFBF0015', color: '#FFBF00', fontFamily: 'var(--font-mono)' }}
                >
                  {eng.status}
                </span>
              </div>
              <p className="text-text-secondary text-[11px] tracking-wider uppercase mb-2" style={{ fontFamily: 'var(--font-mono)' }}>
                {eng.sector}
              </p>
              <p className="text-electric-blue text-sm font-medium mb-3" style={{ fontFamily: 'var(--font-display)' }}>
                {eng.service}
              </p>
              <p className="text-text-secondary text-sm leading-relaxed">{eng.outcome}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
