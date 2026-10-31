'use client'

const proofPoints = [
  '4 months production · Voice AI',
  'Government RAG deployment · Active',
  '1000+ corporate clients',
  '$0.08 per page · Document processing',
  'Self-hosted · Zero vendor lock-in',
  'On-premise deployment · Government-ready',
  '40+ years industry presence',
]

export function ProofBar() {
  const items = [...proofPoints, ...proofPoints]

  return (
    <div
      className="w-full overflow-hidden border-t border-b border-space-border py-5"
      style={{ background: '#12100D' }}
      aria-label="Proof points"
    >
      <div
        className="flex items-center gap-12 whitespace-nowrap"
        style={{ animation: 'marquee 40s linear infinite' }}
      >
        {items.map((point, i) => (
          <span key={i} className="flex items-center gap-3 shrink-0">
            <span className="text-electric-blue text-sm">◆</span>
            <span
              className="text-text-secondary text-[12px] tracking-wide"
              style={{ fontFamily: 'var(--font-mono)' }}
            >
              {point}
            </span>
          </span>
        ))}
      </div>
    </div>
  )
}
