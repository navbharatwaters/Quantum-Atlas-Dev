'use client'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Phone, Brain, Bot, FileText, ArrowDown } from 'lucide-react'

const services = [
  {
    id: 'voice',
    color: '#FFBF00',
    badge: 'VOICE',
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
    bg: '#12100D',
  },
  {
    id: 'idp',
    color: '#FFBF00',
    badge: 'IDP',
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
    bg: '#0C0A08',
  },
  {
    id: 'rag',
    color: '#FFBF00',
    badge: 'RAG',
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
    bg: '#12100D',
  },
  {
    id: 'saas',
    color: '#FFBF00',
    badge: 'SAAS',
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
    bg: '#0C0A08',
  },
]

// ─── Visual: Voice AI ─────────────────────────────────────────────────────────
function VoiceVisual({ color }: { color: string }) {
  const icons = [Phone, Brain, Bot]
  return (
    <DiagramCard badge="VOICE" color={color}>
      <div className="flex items-center justify-center gap-4">
        {icons.map((Icon, i) => (
          <div
            key={i}
            className="w-16 h-16 rounded-xl flex items-center justify-center"
            style={{ border: `1px solid ${color}40`, background: `${color}0A` }}
          >
            <Icon size={26} style={{ color }} />
          </div>
        ))}
      </div>
      <div className="mt-6 flex justify-center">
        <div
          className="px-4 py-1.5 rounded text-[11px] font-mono tracking-widest"
          style={{ border: `1px solid ${color}30`, color: `${color}CC`, background: `${color}08` }}
        >
          SIP · AIRTEL · JIO
        </div>
      </div>
    </DiagramCard>
  )
}

// ─── Visual: Document Intelligence ───────────────────────────────────────────
function DocVisual({ color }: { color: string }) {
  return (
    <DiagramCard badge="IDP" color={color}>
      <div className="flex items-center justify-center gap-2">
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className="w-12 h-14 rounded-lg flex items-center justify-center"
            style={{ border: `1px solid ${color}40`, background: `${color}0A` }}
          >
            <FileText size={20} style={{ color }} />
          </div>
        ))}
      </div>
      <div className="flex flex-col items-center mt-5 gap-2">
        <ArrowDown size={18} style={{ color: `${color}80` }} />
        <div
          className="px-5 py-2 rounded-lg text-[12px] font-mono font-semibold tracking-widest"
          style={{ background: `${color}18`, color, border: `1px solid ${color}50` }}
        >
          PROCESSED
        </div>
      </div>
    </DiagramCard>
  )
}

// ─── Visual: Enterprise RAG ───────────────────────────────────────────────────
function RagVisual({ color }: { color: string }) {
  return (
    <DiagramCard badge="RAG" color={color}>
      <div className="flex flex-col gap-3">
        {/* Row 1 */}
        <div className="flex items-center justify-center gap-2">
          <DiagramBox label="QUERY" color={color} />
          <span style={{ color: `${color}50` }} className="text-lg">→</span>
          <DiagramBox label="BM25" color={color} />
          <DiagramBox label="VECTOR" color={color} />
          <DiagramBox label="GRAPH" color={color} />
        </div>
        {/* Arrow down */}
        <div className="flex justify-center">
          <ArrowDown size={16} style={{ color: `${color}60` }} />
        </div>
        {/* Row 2 */}
        <div className="flex items-center justify-center gap-2">
          <DiagramBox label="RERANK" color={color} wide />
          <span style={{ color: `${color}50` }} className="text-lg">→</span>
          <DiagramBox label="ANSWER + CITE" color={color} wide />
        </div>
      </div>
    </DiagramCard>
  )
}

// ─── Visual: SaaS Architecture ────────────────────────────────────────────────
function SaasVisual({ color }: { color: string }) {
  const rows = [
    ['Auth', 'API', 'DB'],
    ['Cache', 'Queue', 'Storage'],
  ]
  return (
    <DiagramCard badge="SAAS" color={color}>
      <div className="flex flex-col gap-3">
        {rows.map((row, ri) => (
          <div key={ri} className="flex items-center gap-3 justify-center">
            {row.map((label) => (
              <div
                key={label}
                className="w-20 h-12 rounded-lg flex items-center justify-center text-[12px] font-mono font-semibold"
                style={{ border: `1px solid ${color}40`, background: `${color}0A`, color }}
              >
                {label}
              </div>
            ))}
          </div>
        ))}
      </div>
    </DiagramCard>
  )
}

// ─── Shared primitives ────────────────────────────────────────────────────────
function DiagramCard({
  badge,
  color,
  children,
}: {
  badge: string
  color: string
  children: React.ReactNode
}) {
  return (
    <div
      className="relative rounded-xl border border-space-border p-6 min-h-[260px] flex flex-col"
      style={{ background: '#171411' }}
    >
      {/* Grid bg */}
      <div
        className="absolute inset-0 rounded-xl opacity-10"
        style={{
          backgroundImage:
            'linear-gradient(currentcolor 1px, transparent 1px), linear-gradient(90deg, currentcolor 1px, transparent 1px)',
          backgroundSize: '20px 20px',
        }}
      />
      {/* Badge */}
      <div className="relative z-10 mb-5">
        <span
          className="px-2 py-0.5 rounded text-[10px] tracking-[2px] font-semibold"
          style={{
            fontFamily: 'var(--font-mono)',
            background: `${color}15`,
            color,
            border: `1px solid ${color}30`,
          }}
        >
          {badge}
        </span>
      </div>
      {/* Diagram content */}
      <div className="relative z-10 flex-1 flex items-center justify-center">
        {children}
      </div>
    </div>
  )
}

function DiagramBox({
  label,
  color,
  wide = false,
}: {
  label: string
  color: string
  wide?: boolean
}) {
  return (
    <div
      className={`${wide ? 'px-4' : 'w-16'} h-9 rounded flex items-center justify-center text-[10px] font-mono font-semibold tracking-wide`}
      style={{ border: `1px solid ${color}40`, background: `${color}0A`, color }}
    >
      {label}
    </div>
  )
}

// ─── Visual selector ──────────────────────────────────────────────────────────
function ServiceVisual({ id, color }: { id: string; color: string }) {
  if (id === 'voice') return <VoiceVisual color={color} />
  if (id === 'idp')   return <DocVisual color={color} />
  if (id === 'rag')   return <RagVisual color={color} />
  if (id === 'saas')  return <SaasVisual color={color} />
  return null
}

// ─── Main export ──────────────────────────────────────────────────────────────
export function ServicesDeepDive() {
  return (
    <div>
      {services.map((svc, i) => (
        <section
          key={svc.id}
          className="relative py-24 px-6 lg:px-8"
          style={{ background: svc.bg }}
        >
          {/* Grid overlay */}
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage:
                'linear-gradient(currentcolor 1px, transparent 1px), linear-gradient(90deg, currentcolor 1px, transparent 1px)',
              backgroundSize: '20px 20px',
            }}
          />
          <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Content — alternates left/right */}
            <motion.div
              className={i % 2 === 1 ? 'lg:order-2' : ''}
              initial={{ opacity: 0, x: i % 2 === 0 ? -80 : 80 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
            >
              <p
                className="text-[11px] tracking-[3px] uppercase mb-3"
                style={{ color: svc.color, fontFamily: 'var(--font-mono)' }}
              >
                {svc.label}
              </p>
              <h2
                className="text-3xl lg:text-4xl font-bold text-text-primary leading-[1.15] mb-4"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                {svc.heading}
              </h2>
              <p className="text-text-secondary leading-relaxed mb-6">{svc.description}</p>
              <ul className="flex flex-col gap-3 mb-8">
                {svc.bullets.map((b, bi) => (
                  <li key={bi} className="flex items-start gap-3 text-sm text-text-secondary">
                    <span style={{ color: svc.color }} className="mt-0.5 shrink-0">◆</span>
                    {b}
                  </li>
                ))}
              </ul>
              <Link
                href={svc.href}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border text-sm font-medium transition-all hover:opacity-80"
                style={{
                  borderColor: svc.color,
                  color: svc.color,
                  fontFamily: 'var(--font-display)',
                }}
              >
                Discuss This Service →
              </Link>
            </motion.div>

            {/* Visual */}
            <motion.div
              className={i % 2 === 1 ? 'lg:order-1' : ''}
              initial={{ opacity: 0, x: i % 2 === 0 ? 80 : -80 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.8, ease: 'easeOut', delay: 0.12 }}
            >
              <ServiceVisual id={svc.id} color={svc.color} />
            </motion.div>
          </div>
        </section>
      ))}
    </div>
  )
}
