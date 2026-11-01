'use client'

import { getHome } from '@/content/home'
import type { Locale } from '@/lib/i18n'

export function ProofBar({ locale = 'en' }: { locale?: Locale }) {
  const c = getHome(locale).proofBar
  const items = [...c.points, ...c.points]

  return (
    <div
      className="w-full overflow-hidden border-t border-b border-space-border py-5"
      style={{ background: '#12100D' }}
      aria-label={c.ariaLabel}
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
